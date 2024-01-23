"use strict";
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
const Users_1 = __importDefault(require("../models/Users"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const register = (name, email, password) => __awaiter(void 0, void 0, void 0, function* () {
    const hash = bcrypt_1.default.hashSync(password, 10);
    let hasUser = yield Users_1.default.findOne({ where: { email } });
    if (!hasUser) {
        let newUser = yield Users_1.default.create({ name, email, password: hash });
        return newUser;
    }
    else {
        return new Error('E-mail já existe');
    }
});
const findByEmail = (email) => __awaiter(void 0, void 0, void 0, function* () {
    return yield Users_1.default.findOne({ where: { email } });
});
const findById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield Users_1.default.findOne({ where: { id } });
});
const matchPassword = (passTxt, hash) => {
    return bcrypt_1.default.compareSync(passTxt, hash);
};
const genToken = (data) => __awaiter(void 0, void 0, void 0, function* () {
    return jsonwebtoken_1.default.sign(data, process.env.SECRET_TOKEN, { expiresIn: '7d' });
});
exports.default = { findByEmail, findById, matchPassword, genToken, register };
