import { Router } from "express";
import conn from "../../database/conf.db.js";
import { differenceInCalendarDays, parse, isValid, format } from "date-fns";

const Reservrouter = Router();

Reservrouter.post("/CadastroR", (req,res)=>{
    const {hospede_id, quarto_id, checkin, checkout} = req.body

    const entrada = parse(checkin, "dd/MM/yyyy", new Date());
    const saida = parse(checkout, "dd/MM/yyyy", new Date());

    const diarias = differenceInCalendarDays(saida, entrada);

    if(!isValid(entrada) || !isValid(saida) || diarias <= 0){
        return res.status(400).json("Datas inválidas")
    }

    const dataAtual = format(new Date(), "yyyy-MM-dd");
    const dataCheckin = format(entrada, "yyyy-MM-dd");
    const dataCheckout = format(saida, "yyyy-MM-dd");

    conn.query(`select * from quartos where id_quarto = ${quarto_id}`, (err,result)=>{
        if(err){
            console.log("Erro ao buscar quarto", err)
            return res.status(500).json("Erro ao buscar quarto")
        }

        if(result.length === 0){
            return res.status(404).json("Quarto não encontrado")
        }

        if(result[0].status !== "disponivel"){
            return res.status(400).json("Quarto indisponível ou em manutenção")
        }

        conn.query(`select * from reservas 
        where id_quarto = ${quarto_id}
        and data_checkin < '${dataCheckout}'
        and data_checkout > '${dataCheckin}'`, (err,reservas)=>{

            if(err){
                console.log("Erro ao verificar reservas", err)
                return res.status(500).json("Erro na verificação")
            }

            if(reservas.length > 0){
                return res.status(400).json("Quarto já reservado nesse período")
            }

            conn.query(`insert into reservas 
            (hospede_id, quarto_id, data_checkin, data_checkout) 
            values (?, ?, ?, ?)`,
            [hospede_id, quarto_id, dataCheckin, dataCheckout], (err,result)=>{

                if(err){
                    console.log("Erro ao cadastrar reserva", err)
                    return res.status(500).json("Erro ao cadastrar")
                }

                // Verificar se a reserva já está acontecendo
                if(dataAtual >= dataCheckin && dataAtual < dataCheckout){

                    conn.query(`update quartos set status = 'indisponivel' 
                    where id_quarto = ?`, [quarto_id], (err)=>{

                        if(err){
                            console.log("Erro ao atualizar status", err)
                        }
                    })
                }

                conn.query(`select * from quartos where id_quarto = ?`, [quarto_id], (err,result)=>{

                    if(err){
                        console.log("Erro ao buscar quarto", err)
                        return res.status(500).json("Erro ao buscar quarto")
                    }

                    const resultado = Number(result[0].valor_diaria)*diarias

                    res.json(`Cadastro realizado com valor R$ ${resultado.toFixed(2)}`)
                })
            })
        })
    })
})

Reservrouter.put("/AtualizarR", (req,res)=>{
    const {hospede_id, quarto_id, checkin, checkout, id_reserva} = req.body
    conn.query(`update reservas set hospede_id = ${hospede_id}, quarto_id = ${quarto_id}, data_checkin = '${checkin}', data_checkout = '${checkout}' where id_reserva = ${id_reserva}`, (err,result)=>{
        if(err){
            res.json("Erro ao atualizar")
        }else{
            res.json("Atualização realizada com sucesso")
        }
    })
})

export default Reservrouter;