import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();


app.use(cors());

app.use(express.json());


app.get("/api", (req, res)=>{
    res.json({ message: "Hello from Vite backend" });
});


app.listen(process.env.PORT, ()=>{
    console.log(`Server is running on port ${process.env.PORT}`);
})


