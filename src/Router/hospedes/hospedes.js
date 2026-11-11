import { Router } from "express";
import conn from "../../database/conf.db.js";

const Hospedesrouter = Router();

Hospedesrouter.post("/CadastroH", (req,res) =>{
    const {nome, cpf, telefone} = req.body
    conn.query(`insert into hospedes (nome, cpf, telefone) value ('${nome}', '${cpf}', '${telefone}')`, (err,result)=>{
        if(err){
            res.json("Erro ao inserir hospede")
        } else{
            res.json("Usuario cadastrado com sucesso")
        }
    })
})

Hospedesrouter.post("/VerificacaoH", (req, res) =>{
    const {cpf} = req.body
    conn.query(`select * from hospedes where cpf = '${cpf}'`, (err,result)=>{
        if(err){
            res.json("Erro na verificação do usuário")
        } else{
            if(result.length >0){
                res.json("Usuário está cadastrado")
            } else{
                res.json("Usuário não cadastrado")
            }
        }
    })
})

Hospedesrouter.put("/AtualizarH", (req,res) =>{
    const { nome, cpf, telefone, id } = req.body
    conn.query(`update hospedes set nome = '${nome}', cpf = '${cpf}', telefone = '${telefone}' where id_hospede = ${id}`, (err,result)=>{
        if(err){
            res.json("Erro ao atualizar o sistema")
        }else{
            res.json("Atualizado com sucesso")
        }
    })
})

Hospedesrouter.delete("/DeleteH", (req,res)=>{
    const {id} = req.body
    conn.query(`delete from hospedes where id_hospede = ${id}`, (err,result)=>{
        if(err){
            res.json("Não foi possível deletar")
        }else{
            res.json("Arquivo deletado com sucesso")
        }
    })
})

Hospedesrouter.get("/InformacoesH", (req, res) => {
    conn.query("select * from hospedes ", (err, result)=>{
        if(err) {
            res.json("Erro ao buscar informações")
        }else{
        res.json(result)
        }
    })
})

Hospedesrouter.post("/InfEspecH", (req, res) => {
    const { id}= req.body
    conn.query(`select * from hospedes where id_hospede ='${id}' `, (err, result)=>{
        if(err) {
            res.json("Erro ao buscar informações")
        }else{
        res.json(result)
        }
    })
})
export default Hospedesrouter;