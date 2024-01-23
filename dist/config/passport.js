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
exports.privateAuth = void 0;
const passport_1 = __importDefault(require("passport"));
const passport_jwt_1 = require("passport-jwt");
const dotenv_1 = __importDefault(require("dotenv"));
const UsersService_1 = __importDefault(require("../services/UsersService"));
dotenv_1.default.config();
const NotAuthorized = { status: 401, error: 'Unauthorized' };
const options = {
    jwtFromRequest: passport_jwt_1.ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.SECRET_TOKEN
};
passport_1.default.use(new passport_jwt_1.Strategy(options, (payload, done) => __awaiter(void 0, void 0, void 0, function* () {
    let user = yield UsersService_1.default.findById(payload.id);
    if (user) {
        return done(null, user.id);
    }
    else {
        return done(NotAuthorized, false);
    }
})));
const privateAuth = (req, res, next) => {
    const token = req.cookies.token;
    let Unauthorized = false;
    if (token) {
        req.headers.authorization = `Bearer ${token}`;
        const authFunction = passport_1.default.authenticate('jwt', (err, user) => {
            if (user) {
                req.user = user;
                next();
            }
            else {
                Unauthorized = true;
                next(Unauthorized);
            }
        });
        authFunction(req, res, next);
    }
    else {
        res.status(401).redirect('/login');
    }
};
exports.privateAuth = privateAuth;
