import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import morgan from "morgan";
// import serviceRoutes from "../routes/ServiceRoutes.js";
import serviceRoutes from "./routes/ServiceRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import authRoutes from "./routes/AuthRoutes.js";
import categoryRoutes from "./routes/CategoryRoutes.js";
import productRoutes from "./routes/ProductsRoute.js";
import cartRoutes from "./routes/CartRoutes.js";
import orderRoutes from "./routes/OrderRoutes.js";
import cors from "cors";
dotenv.config();

// file modules
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


connectDB();
const app = express();
app.use(morgan("dev"));
app.use(
  cors({
    origin: "*",
    // origin: [
    //   "https://tripuo-verse-api.azurewebsites.net",
    //   "http://localhost:5173",
    //   "http://192.168.1.101:5173/",
    //   "https://salmon-field-030140b10.4.azurestaticapps.net",
    // ],
  })
);

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/public", express.static(__dirname + "/public"));
app.use("/public", express.static(__dirname + "/frontend/dist"));

app.use(express.static("./frontend/dist"));

app.use((req, res, next) => {
  res.requestTime = new Date().toISOString();
  console.log(req.headers);
  next();
});

app.use("/api/services", serviceRoutes);
app.use("/api/users", userRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/carts", cartRoutes);
app.use("/api/orders", orderRoutes);

// app.get("/", (req, res) => {
//   console.log("App running and connected to DB");
//   // res.send("Good news from the server");
//   res.sendFile(__dirname + "/frontend/dist/index.html");
// });

app.get("/", (req, res) => {
  res.send("Welcome to Tripuo Verse API");
})

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
