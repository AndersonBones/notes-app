import express, { Router } from "express";
import { ConnectDB } from "../middlewares/DBconnection"
import {login, register, dashboard, allNotes, logout} from '../controllers/getControllers'
import { loginValidate, registerValidate, addNotes, deleteNotes, editNotes } from "../controllers/postControllers";
import { privateAuth } from "../config/passport";


const router = Router();

router.get('/', ConnectDB, privateAuth, dashboard)
router.get('/login', login)

router.get('/register', register)
router.get('/dashboard',privateAuth, dashboard)
router.get('/allNotes', privateAuth, allNotes)

router.get('/logout', logout)
router.post("/login", express.urlencoded({extended:true}), loginValidate)
router.post('/register', express.urlencoded({extended:true}), registerValidate)
router.post('/add-note', express.json(), privateAuth, addNotes)
router.delete('/delete-item/:index',express.json(), privateAuth, deleteNotes)
router.put("/edit-item/:index", express.json(), privateAuth, editNotes)
export default router