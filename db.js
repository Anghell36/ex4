// db.js - Versión corregida
import mongoose from 'mongoose';

export const connectDB = async () => {
  try {
    console.log("Intentando conectar a MongoDB...");
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("✅ Conectado a MongoDB correctamente");
  } catch (error) {
    console.error("❌ Error conectando a MongoDB:", error);
    process.exit(1);
  }
};