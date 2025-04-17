import express, { request, response } from "express";

import dotenv from "dotenv";
dotenv.config();

// import routes here
import roleRoute from "./routes/role.js";
import authRoute from "./routes/auth.js";

// import mongoose ORM to connect mongodb to our backend
import mongoose from "mongoose";

const app = express();
const port = 3000;
app.use(express.json());

// DB mongoDB Connection
const connectMongoDB = async () => {
  try {
    const mongoUrl = process.env.Mongo_URL;
    if (!mongoUrl) {
      throw new Error("Mongo_URL is not defined in the environment variables");
    }
    await mongoose.connect(mongoUrl);
    console.log("Connecté à la base de donnée MongoDB!");
  } catch (error) {
    console.error("Erreur de connexion à la base de donnée MongoDB", error);
    throw error;
  }
};

// hello world from Kaizenlytics server - first route
app.get("/", (req, res) => {
  res.send("Hello World from Kaizenlytics ! 🚀🔥");
});

// middleware for role
app.use("/api/role", roleRoute);


// middleware for authentication
app.use("/api/auth", authRoute);

const startServer = async () => {
  try {
    await connectMongoDB();
    console.log("MongoDB connection established. Starting server...");
    app.listen(port, () => {
      console.log(`app listening on port ${port}`);
    });
  } catch (error) {
    console.error(
      "Failed to start server due to MongoDB connection error",
      error
    );
  }
};

startServer();
