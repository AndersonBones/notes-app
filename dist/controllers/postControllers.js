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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.editNotes = exports.deleteNotes = exports.addNotes = exports.registerValidate = exports.loginValidate = void 0;
const UsersService_1 = __importDefault(require("../services/UsersService"));
const NoteService = __importStar(require("../services/NotesService"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
let expiresCookie = Date.now() + 1000 * 3600 * 24 * 7;
const loginValidate = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let Unauthorized = false;
    if (req.body.password && req.body.email) {
        let email = req.body.email;
        let password = req.body.password;
        let user = yield UsersService_1.default.findByEmail(email);
        if (user && UsersService_1.default.matchPassword(password, user.password)) {
            const token = yield UsersService_1.default.genToken({ id: user.id }); // gera o token de autenticação
            res.status(201).cookie('token', token, { expires: new Date(expiresCookie), httpOnly: true }).redirect('/dashboard');
            return;
        }
        else {
            Unauthorized = true;
            res.status(401).render('pages/login', { Unauthorized, message: 'Incorrect email or password' });
        }
    }
});
exports.loginValidate = loginValidate;
const registerValidate = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.body.name && req.body.email && req.body.password) {
        let name = req.body.name;
        let email = req.body.email;
        let password = req.body.password;
        let newUser = yield UsersService_1.default.register(name, email, password); // cria um novo usuário
        if (newUser instanceof Error) { // precisa informar se já existe a conta
            return res.status(401).json({ error: newUser.message });
        }
        else {
            const token = yield UsersService_1.default.genToken({ id: newUser.id }); // gera o token de autenticação de cadastro
            res.status(201).cookie('token', token, { expires: new Date(expiresCookie), httpOnly: true }).redirect("/dashboard");
        }
    }
    else {
        res.status(401).render('pages/error');
    }
});
exports.registerValidate = registerValidate;
// Retornar apenas os dados atualizados sem a necessidade de redirecionar o usuário
// capturar um evento de clique e com o AJAX fazer uma requisição ao servidor conforme a necessidade
// o AJAX retornará o dado atualizado e atualizará a página sem refresh
const addNotes = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let id = Number(req.user);
    if (req.body.note && id) {
        let note = req.body.note;
        let user = yield NoteService.addNotes(note, id);
        if (user instanceof Error) {
            res.status(401).json({ error: true, msg: user.message });
        }
        else {
            res.status(201).json({ error: false, user });
        }
    }
    else {
        res.status(401).json({ error: 'Dados não enviados' });
    }
});
exports.addNotes = addNotes;
const deleteNotes = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let id = Number(req.user);
    if (req.params.index && id) {
        let indexNote = Number(req.params.index);
        let user = yield NoteService.deleteNotes(indexNote, id);
        if (user instanceof Error) {
            res.status(401).json({ error: true, msg: user.message });
        }
        else {
            res.status(201).json({ error: false, user });
        }
    }
    else {
        res.status(401).json({ error: true, msg: 'Dados não enviados' });
    }
});
exports.deleteNotes = deleteNotes;
const editNotes = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let id = Number(req.user);
    if (req.params.index && id && req.body.note) {
        let indexNote = Number(req.params.index);
        let note = req.body.note;
        let user = yield NoteService.editNotes(indexNote, id, note);
        if (user instanceof Error) {
            res.status(401).json({ error: true, msg: user.message });
        }
        else {
            res.status(201).json({ error: false, user });
        }
    }
    else {
        res.status(401).json({ error: true, msg: 'Dados não enviados' });
    }
});
exports.editNotes = editNotes;
