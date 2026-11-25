import { Router } from "express";
import conn from "../../database/conf.db.js";
import bcrypt from "bcrypt";

const Authrouter = Router();


Authrouter.post("/Cadastro", (req, res) => {

    const { nome, email, senha } = req.body;

    if (!nome || !email || !senha) {
        return res.status(400).json({
            mensagem: "Preencha todos os campos"
        });
    }

    bcrypt.hash(senha, 10, (err, hash) => {

        if (err) {
            return res.status(500).json({
                mensagem: "Erro ao proteger a senha"
            });
        }

        conn.query(
            "INSERT INTO usuarios (nome, email, senha) VALUES (?, ?, ?)",
            [nome, email, hash],
            (err, result) => {

                if (err) {
                    if (err.code === "ER_DUP_ENTRY") {
                        return res.status(409).json({
                            mensagem: "E-mail já cadastrado"
                        });
                    }

                    return res.status(500).json({
                        mensagem: "Erro ao cadastrar usuário"
                    });
                }

                res.status(201).json({
                    mensagem: "Usuário cadastrado com sucesso!"
                });
            }
        );
    });
});

export default Authrouter;