import mongoose from "mongoose";
import auth from "./routes/auth.js";
import dotenv from "dotenv";
import express from "express";
import morgan from "morgan";
import category from "./routes/category.js";
import user from "./routes/user.js";
import cart from "./routes/cart.js";



const app = express();

//db

mongoose.set('strictQuery', false);
dotenv.config();

mongoose.connect(process.env.BASEURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    family: 4,
}).then(() => console.log("connect")).catch((err) => console.log(("foi nao"), err));

//middlewares
app.use(morgan("dev"))
app.use(express.json())

// router



app.use("/api", auth);
app.use("/api", category)
app.use("/api", user)
app.use("/api", cart)


app.listen(8000, () => { console.log("localhost:8000") })


