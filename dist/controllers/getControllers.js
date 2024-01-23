"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logout = exports.allNotes = exports.dashboard = exports.register = exports.login = void 0;
const NotesService = __importStar(require("../services/NotesService"));
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let Unauthorized = false;
    let message = '';
    res.status(200).render('pages/login', { Unauthorized, message });
});
exports.login = login;
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.status(200).render("pages/register");
});
exports.register = register;
const dashboard = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let NotHaveNotes = "you still don't have any notes";
    let notes = [];
    let userID = 0;
    if (req.user) {
        userID = req.user;
        let userNotes = yield NotesService.getNotes(userID);
        if (userNotes instanceof Error) {
            NotHaveNotes = userNotes.message;
        }
        else {
            notes = [...userNotes.content];
        }
    }
    else {
        res.status(401).render('pages/error');
    }
    res.status(201).render('pages/dashboard', { notes, userID, error: NotHaveNotes });
});
exports.dashboard = dashboard;
const allNotes = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let NotHaveNotes = "you still don't have any notes";
    let notes = [];
    let userID = 0;
    if (req.user) {
        userID = req.user;
        let userNotes = yield NotesService.getNotes(userID);
        if (userNotes instanceof Error) {
            NotHaveNotes = userNotes.message;
        }
        else {
            notes = [...userNotes.content];
        }
    }
    else {
        res.status(401).json({ error: true, msg: 'Not authorization', NotHaveNotes });
    }
    res.status(201).json({ error: false, notes, userID });
});
exports.allNotes = allNotes;
const logout = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.status(200).clearCookie('token').redirect('/');
});
exports.logout = logout;
