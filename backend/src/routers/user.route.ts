import { authenticate } from "../middleware/auth.middleware";
import { getProfile, login, register } from "../controllers/auth.controller";
import express from "express";


const app = express.Router();

app.route("/register").post(register);
app.route("/login").post(login);
app.route("/profile").get(authenticate, getProfile);


export default app;