import express from "express";
import { connectDB } from "./db.js";
import { Card } from "./models/card.js";

const app = express();
connectDB();

app.use(express.json());

app.post("/cards", async (req, res) => {
    try{
        const card = await Card.create(req.body);
        res.status(201).json(card).send("Card Created")
    }catch(error){
        console.error(error);
    }
})
//App representa al servidor,

app.get("/hello", (req,res) => {
    res
    .status(200)
    .send("Hi World from node js")
});

app.post("/send", (req, res) => {
    const { user, email } = req.body;
    console.log("Datos recibidos: " + user + " " + email);

    res.status(200).send("Data recieved succesfuly")
});

app.listen(3000, () => {
    console.log("Servidor Ejecutandoce");
});