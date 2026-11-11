import { Router } from "express";
import conn from "../../database/conf.db.js";

const Quartosrouter = Router();

Quartosrouter.post("/CadastroQ", (req,res) =>{
    const {numero, tipo, valor_diaria, status} = req.body
    conn.query(`insert into quartos (numero, tipo, valor_diaria, status) value ('${numero}', '${tipo}', ${valor_diaria}, '${status}')`, (err,result)=>{
        if(err){
            res.json("Erro ao inserir Quarto")
        } else{
            res.json("Quarto cadastrado com sucesso")
        }
    })
})

Quartosrouter.post("/VerificacaoQ", (req, res) =>{
    const {numero, tipo} = req.body
    conn.query(`select * from quartos where numero = '${numero}' and tipo = '${tipo}'`, (err,result)=>{
        if(err){
            res.json("Erro na verificação do quarto")
        } else{
            if(result.length >0){
                res.json("Quarto está cadastrado")
            } else{
                res.json("Quarto não cadastrado")
            }
        }
    })
})

Quartosrouter.put("/AtualizarQ", (req,res) =>{
    const { numero, tipo, valor_diaria, status, id} = req.body
    conn.query(`update quartos set numero = '${numero}', tipo = '${tipo}', valor_diaria = ${valor_diaria}, status = '${status}' where id_quarto = ${id}`, (err,result)=>{
        if(err){
            res.json("Erro ao atualizar o sistema")
        }else{
            res.json("Atualizado com sucesso")
        }
    })
})

Quartosrouter.delete("/DeleteQ", (req,res)=>{
    const {id} = req.body
    conn.query(`delete from quartos where id_quarto = ${id}`, (err,result)=>{
        if(err){
            res.json("Não foi possível deletar")
        }else{
            res.json("Arquivo deletado com sucesso")
        }
    })
})

Quartosrouter.get("/InformacoesQ", (req, res) => {
    conn.query("select * from quartos ", (err, result)=>{
        if(err) {
            res.json("Erro ao buscar informações")
        }else{
        res.json(result)
        }
    })
})

Quartosrouter.post("/InfEspecQ", (req, res) => {
    const { id}= req.body
    conn.query(`select * from quartos where id_quarto ='${id}' `, (err, result)=>{
        if(err) {
            res.json("Erro ao buscar informações")
        }else{
        res.json(result)
        }
    })
})
export default Quartosrouter;