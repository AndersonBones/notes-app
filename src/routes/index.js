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
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importStar(require("express"));
const DBconnection_1 = require("../middlewares/DBconnection");
const getControllers_1 = require("../controllers/getControllers");
const postControllers_1 = require("../controllers/postControllers");
const passport_1 = require("../config/passport");
const router = (0, express_1.Router)();
router.get('/', DBconnection_1.ConnectDB, passport_1.privateAuth, getControllers_1.dashboard);
router.get('/login', getControllers_1.login);
router.get('/register', getControllers_1.register);
router.get('/dashboard', passport_1.privateAuth, getControllers_1.dashboard);
router.get('/allNotes', passport_1.privateAuth, getControllers_1.allNotes);
router.get('/logout', getControllers_1.logout);
router.post("/login", express_1.default.urlencoded({ extended: true }), postControllers_1.loginValidate);
router.post('/register', express_1.default.urlencoded({ extended: true }), postControllers_1.registerValidate);
router.post('/add-note', express_1.default.json(), passport_1.privateAuth, postControllers_1.addNotes);
router.delete('/delete-item/:index', express_1.default.json(), passport_1.privateAuth, postControllers_1.deleteNotes);
router.put("/edit-item/:index", express_1.default.json(), passport_1.privateAuth, postControllers_1.editNotes);
exports.default = router;
