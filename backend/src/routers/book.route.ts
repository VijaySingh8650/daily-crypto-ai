import { addNewBook, deleteTheBook, getAllBooks, updateABook } from "../controllers/book.controller";
import { authenticate } from "../middleware/auth.middleware";
import express from "express";


const app = express.Router();

app.route("/").get(authenticate, getAllBooks).post(authenticate, addNewBook);

app.route("/book/:id").delete(authenticate, deleteTheBook).patch(authenticate, updateABook);

export default app;




