"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const index_1 = __importDefault(require("./routes/index"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const passport_1 = __importDefault(require("passport"));
const app = (0, express_1.default)();
app.use((0, cookie_parser_1.default)()); // set cookies
app.use(passport_1.default.initialize()); // middleware 
// set static files
app.use(express_1.default.static(path_1.default.join(__dirname, '../public')));
// set template engine
app.set('view engine', 'ejs');
app.set('views', path_1.default.join(__dirname, 'views'));
app.use(index_1.default);
app.use((Request, Response) => {
    Response.status(404).render('pages/error');
});
const errorHandler = (err, req, res, next) => {
    if (err.status) {
        res.status(err.status);
    }
    else {
        res.status(400);
    }
    if (err.message) {
        res.json({ error: err.message });
    }
    if (err) {
        res.status(401).redirect('/login');
    }
};
app.use(errorHandler);
exports.default = app;
