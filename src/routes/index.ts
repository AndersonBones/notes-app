import express, { Router } from "express";
import { ConnectDB } from "../middlewares/DBconnection"
import {login, register, dashboard, logout} from '../controllers/getControllers'
import { loginValidate, registerValidate, addNotes, deleteNotes, editNotes } from "../controllers/postControllers";
import { privateAuth } from "../config/passport";


const router = Router();

router.get('/', ConnectDB, privateAuth, dashboard)
router.get('/login', login)

router.get('/register', register)
router.get('/dashboard', privateAuth, dashboard)
router.get('/logout', logout)
router.post("/login", express.urlencoded({extended:true}), loginValidate)
router.post('/register', express.urlencoded({extended:true}), registerValidate)
router.post('/add-note', express.urlencoded({extended:true}), privateAuth, addNotes)
router.post('/delete-item/:index', privateAuth, deleteNotes)
router.post("/edit-item/:index", express.urlencoded({extended:true}), privateAuth, editNotes)
export default router