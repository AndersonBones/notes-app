"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = __importDefault(require("../instances/pg"));
const sequelize_1 = require("sequelize");
const notes = pg_1.default.define('notes', {
    note_id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true
    },
    content: {
        type: sequelize_1.DataTypes.ARRAY(sequelize_1.DataTypes.TEXT),
    }
}, { timestamps: false });
exports.default = notes;
