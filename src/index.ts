import express, { Request, Response } from "express";
const { MongoClient } = require("mongodb");

import swaggerUi from "swagger-ui-express";
import swaggerJSDoc from "swagger-jsdoc";
import swagger from "./swagger";
import routes from "./routes";
import mongoose from "mongoose";
import bodyParser from 'body-parser'
const app = express();
const PORT: number = 3000;

const uri = "mongodb+srv://hrunushunasophia13:K2kWiIHQwrAvRzkO@cluster0.cev8jny.mongodb.net/?retryWrites=true&w=majority";

mongoose.connect(uri);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/api-docs", swaggerUi.serve, swagger());
app.use("/api", routes);
app.get("/", (req: Request, res: Response) => {
    res.send("Welcome to the root path!");
});

app.use((req: Request, res: Response) => {
    res.status(404).json({ error: "Not found" });
});
app.use((req: Request, res: Response) => {
    res.status(500).json({ error: "Internal server error" });
});
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
