import { Router } from "express";
import {registration, login, getUser} from "../controllers/authController.js";

const authRouter = new Router();

authRouter.post('/registration', (req, res) => registration(req, res));
authRouter.post('/login', (req, res) => login(req, res));
authRouter.get('/user', (req, res) => getUser(req, res));

export {authRouter};