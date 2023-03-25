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
exports.ConnectDB = void 0;
const pg_1 = __importDefault(require("../instances/pg"));
const Users_1 = __importDefault(require("../models/Users"));
const Notes_1 = __importDefault(require("../models/Notes"));
const ConnectDB = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield pg_1.default.authenticate();
        Users_1.default.sync();
        Notes_1.default.sync();
        res.status(200);
        console.log('Connection has been established successfully.');
        next();
    }
    catch (error) {
        res.status(400).render('pages/error');
        console.error('Unable to connect to the database:', error);
    }
});
exports.ConnectDB = ConnectDB;
