import express from "express";
import "dotenv/config";
import mysql from "mysql2/promise";
import conn from "./database/conf.db.js";
import Hospedesrouter from "./Router/hospedes/hospedes.js";
import Quartosrouter from "./Router/quartos/quartos.js";
import Reservrouter from "./Router/reservas/reservas.js";



const app = express();
app.use(express.json());
app.use(Hospedesrouter);
app.use(Quartosrouter);
app.use(Reservrouter)

app.listen(6969, () => {
    console.log("Servidor rodando na porta 6969");
});