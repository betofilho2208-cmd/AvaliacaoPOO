import { Router } from "express";
import conn from "../../database/conf.db.js";
import bcrypt from "bcrypt";

const Hospedesrouter = Router();


Hospedesrouter.post("/CadastroH", (req, res) => {
    const { nome, cpf, telefone, senha } = req.body;

    if (!nome || !cpf || !telefone || !senha) {
        return res.status(400).json("Preencha todos os campos");
    }

    bcrypt.hash(senha, 10, (err, hash) => {

        if (err) {
            return res.status(500).json("Erro ao proteger a senha");
        }

        conn.query(
            "INSERT INTO hospedes (nome, cpf, telefone, senha) VALUES (?, ?, ?, ?)",
            [nome, cpf, telefone, hash],
            (err, result) => {

                if (err) {
                    return res.status(500).json("Erro ao inserir hospede");
                }

                res.status(201).json({"message": "Hospede cadastrado com sucesso"});
            }
        );
    });
});


Hospedesrouter.post("/VerificacaoH", (req, res) => {
    const { cpf } = req.body;

    conn.query(
        "SELECT id_hospede, nome, cpf, telefone FROM hospedes WHERE cpf = ?",
        [cpf],
        (err, result) => {

            if (err) {
                return res.status(500).json("Erro na verificação do usuário");
            }

            if (result.length > 0) {
                res.json(result[0]);
            } else {
                res.status(404).json("Usuário não cadastrado");
            }
        }
    );
});

Hospedesrouter.put("/AtualizarH", (req, res) => {
    const { nome, cpf, telefone, id } = req.body
    conn.query(`update hospedes set nome = '${nome}', cpf = '${cpf}', telefone = '${telefone}' where id_hospede = ${id}`, (err, result) => {
        if (err) {
            res.json("Erro ao atualizar o sistema")
        } else {
            res.json("Atualizado com sucesso")
        }
    })
})

Hospedesrouter.delete("/DeleteH", (req, res) => {
    const { id } = req.body
    conn.query(`delete from hospedes where id_hospede = ${id}`, (err, result) => {
        if (err) {
            res.json("Não foi possível deletar")
        } else {
            res.json("Arquivo deletado com sucesso")
        }
    })
})

Hospedesrouter.get("/InformacoesH", (req, res) => {
    conn.query("select * from hospedes ", (err, result) => {
        if (err) {
            res.json("Erro ao buscar informações")
        } else {
            res.json(result)
        }
    })
})

Hospedesrouter.post("/InfEspecH", (req, res) => {
    const { id } = req.body
    conn.query(`select * from hospedes where id_hospede ='${id}' `, (err, result) => {
        if (err) {
            res.json("Erro ao buscar informações")
        } else {
            res.json(result)
        }
    })
})
export default Hospedesrouter;