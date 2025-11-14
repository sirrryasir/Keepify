import express from "express";
import cors from "cors";
import { env } from "./lib/env.js";
import notesRouter from "./routes/notesRoutes.js";
import { connectDB } from "./config/db.js";

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/notes", notesRouter);

// Connect to MongoDB and start the server
const startServer = async () => {
  try {
    await connectDB(env.MONGO_URI);
    app.listen(env.PORT, () => {
      console.log(`Server is running on http://localhost:${env.PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
};

startServer();
