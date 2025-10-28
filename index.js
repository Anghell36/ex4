import express from "express";
import { connectDB } from "./db.js";
import { Card } from "./models/Card.js";
import dotenv from "dotenv";

dotenv.config();
const app = express();

// Conexión a MongoDB
connectDB();

// Middleware para leer JSON
app.use(express.json());

/* ===========================
   ✅ 1. CREATE CARD (VERSIÓN CORREGIDA)
   =========================== */
app.post("/createCard", async (req, res) => {
  try {
    const { name, link, description } = req.body;

    // ✅ Validar campos obligatorios
    if (!name || !link) {
      return res.status(400).json({ 
        error: "Los campos 'name' y 'link' son obligatorios",
        details: `Recibido: name=${name}, link=${link}`
      });
    }

    const card = await Card.create({ 
      name, 
      link, 
      description: description || "" // description es opcional
    });
    
    res.status(201).json({
      message: "Card created successfully",
      data: card
    });
  } catch (error) {
    console.error("❌ Error creating card:", error); 
    res.status(500).json({ error: "Error creating card", details: error.message });
  }
});


/* ===========================
   ✅ 2. UPDATE CARD (total)
   =========================== */
app.put("/updateCard/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updatedCard = await Card.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedCard) return res.status(404).json({ error: "Card not found" });
    res.status(200).json({
      message: "Card updated successfully (total)",
      data: updatedCard
    });
  } catch (error) {
    console.error("❌ Error updating card:", error.message);
    res.status(500).json({ error: "Error updating card" });
  }
});

/* ===========================
   ✅ 3. UPDATE CARD (parcial)
   =========================== */
app.patch("/updateCardPartial/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updatedCard = await Card.findByIdAndUpdate(id, { $set: req.body }, { new: true });
    if (!updatedCard) return res.status(404).json({ error: "Card not found" });
    res.status(200).json({
      message: "Card updated successfully (partial)",
      data: updatedCard
    });
  } catch (error) {
    console.error("❌ Error updating card:", error.message);
    res.status(500).json({ error: "Error updating card" });
  }
});

/* ===========================
   ✅ 4. DELETE CARD
   =========================== */
app.delete("/deleteCard/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedCard = await Card.findByIdAndDelete(id);
    if (!deletedCard) return res.status(404).json({ error: "Card not found" });
    res.status(200).json({
      message: "Card deleted successfully",
      data: deletedCard
    });
  } catch (error) {
    console.error("❌ Error deleting card:", error.message);
    res.status(500).json({ error: "Error deleting card" });
  }
});

/* ===========================
   ✅ 5. GET ONE CARD
   =========================== */
app.get("/getCard/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const card = await Card.findById(id);
    if (!card) return res.status(404).json({ error: "Card not found" });
    res.status(200).json(card);
  } catch (error) {
    console.error("❌ Error getting card:", error.message);
    res.status(500).json({ error: "Error getting card" });
  }
});

/* ===========================
   ✅ 6. GET ALL CARDS
   =========================== */
app.get("/getAllCards", async (req, res) => {
  try {
    const cards = await Card.find();
    res.status(200).json(cards);
  } catch (error) {
    console.error("❌ Error getting cards:", error.message);
    res.status(500).json({ error: "Error getting cards" });
  }
});

/* ===========================
   🌐 TEST ENDPOINTS
   =========================== */
app.get("/hello", (req, res) => {
  res.status(200).send("Hola Mundo desde Node.js 😎");
});

/* ===========================
   🚀 SERVIDOR
   =========================== */
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Servidor ejecutándose en http://localhost:${PORT}`);
});
