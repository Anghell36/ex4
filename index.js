import express from "express";
import { connectDB } from "./db.js";
import { Card } from "./models/Card.js";
import dotenv from "dotenv";
dotenv.config();
const app = express()
connectDB();
app.use(express.json());  
import cors from "cors";
connectDB();


app.use(cors());

//Middleware review 


// 1. create a card (INSERT INTO cards ...)
app.post("/createCard", async (req, res)=>{
    try{
        const card = await Card.create(req.body);
        console.log(card);
        res.status(201).json(card);
    }catch(error){
        console.error(error);
        res.status(500).json({ error: 'Failed to create card' });
    }
});

//1.2 Add card (same as the previous one, just different endpoint)
app.post ("/addCard", async (req,res) =>{
    try{
        const card = await Card.create (req.body);
     //   console.log(card);
        res.status(201).json(card);
    }catch{
        console.error(error);
        res.status(500).json({ error: 'Failed to add card' });
    }
});

//2. get all the cards  (SELECT * FROM cards)
app.get("/getCards", async (req, res) => {
    try {
        const cards = await Card.find();
        res.status(200).json(cards);
    } catch (error) {
        res.status(400).json({ error: 'Failed to fetch cards' });
        console.error(error);
    }
});
// 3. get card by id
app.get("/getCard/:id", async (req, res)=>{
    try{
        const { id } = req.params;
        const card = await Card.findById(id);
        if (!card) return res.status(404).json({ message: 'Card not found' });
        res.status(200).json(card);
    }catch(error){
        console.error(error);
        res.status(400).json({ error: 'Invalid id or request' });
    }
});

//4. Update card by id - this method updates an existing card
app.put('/updateCard/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const updated = await Card.findByIdAndUpdate(id, req.body, { 
            new: true,  // Reurns the updated document
            runValidators: true  // Excecute schema validators
        });
        if (!updated) return res.status(404).json({ message: 'Card not found' });
        return res.status(200).json({ message: 'Card updated', card: updated });
    } catch (error) {
        console.error(error);
        return res.status(400).json({ error: 'Invalid id or request' });
    }
});

// 5. Update card by id - this method partially updates an existing card
app.patch ("/updateCard/:id", async (req, res) => {
    try{
        const { id } = req.params;
        const updateCard = await Card.findByIdAndUpdate(
            id,
            req.body,
            { new: true, runValidators: true }
        );
        if (!updateCard){
            return res.status(404).json({ message: 'Card not found' });
        }

        res.status(200).json({
            message: 'Card updated successfully',
            card: updateCard
        });
    }catch(error){
        console.error(error);
        res.status(400).json({ error: 'Invalid id or request' });
    }
});

//6. delete card by id
app.delete('/delateCard/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await Card.findByIdAndDelete(id);
        if (!deleted) return res.status(404).json({ message: 'Card not found' });
        return res.status(200).json({ message: 'Card deleted', card: deleted });
    } catch (error) {
        console.error(error);
        return res.status(400).json({ error: 'Invalid id or request' });
    }
});


//TEST ROUTES

// root route - API documentation
app.get("/endpoints", (req, res) => {
    res.status(200).json({
        message: "API de Cards - Exercise 2",
        version: "1.0.0",
        endpoints: {
            cards: {
                createCard: "POST /createCard",
                addCard: "POST /addCard",
                getCards: "GET /getCards",
                getCard: "GET /getCard/:id",
                updateCardPUT: "PUT /updateCard/:id",
                updateCardPATCH: "PATCH /updateCard/:id",
                deleteCard: "DELETE /deleteCard/:id"
            },
            test: {
                hello: "GET /hola",
                send: "POST /send"
            }
        },
        status: "online",
        database: "connected"
    });
});


app.get("/hola",(req,res)=>{
     res.status(200).send("Hello world from my Server cute");
})

app.post("/send", (req, res)=>{
    const {user, email}= req.body;
    //let's assume we save this data to a database
    res.status(200).send("Data received successfully" + user + " " + email );
})

//SERVER START
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server started on http://localhost:${PORT}`);
});