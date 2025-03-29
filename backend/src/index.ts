import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./database/config";
import {InvalidAPI } from "./invalid-API";
import userRouter from "./routers/user.route";
import bookRouter from "./routers/book.route";
import { errorHandler } from "./middleware/error.middleware";
// import { clientUse } from 'valid-ip-scope';
// import { routeMiddleware } from "./middleware/route.middleware";


dotenv.config();

const app = express();


app.use(cors());

app.use(express.json());

// app.use(clientUse()); //for client ips information
// app.use(routeMiddleware); //to block the access of invalid and certain ips


app.use("/api/auth", userRouter);
app.use("/api/books", bookRouter);


//invalid API
app.use("/*", InvalidAPI);

//global-error
app.use(errorHandler);


app.listen(process.env.PORT, async()=>{

    await connectDB();

    console.log(`Server is running on port ${process.env.PORT}`);

})


