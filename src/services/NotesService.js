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
exports.editNotes = exports.deleteNotes = exports.addNotes = exports.getNotes = void 0;
const Notes_1 = __importDefault(require("../models/Notes"));
const getNotes = (id) => __awaiter(void 0, void 0, void 0, function* () {
    let Findnotes = yield Notes_1.default.findOne({ where: { note_id: id } });
    if (Findnotes) {
        return Findnotes;
    }
    else {
        return new Error("you still don't have any notes");
    }
});
exports.getNotes = getNotes;
const addNotes = (n, id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let note = yield Notes_1.default.findOne({ where: { note_id: id } });
        if (note) {
            let notesArray = [...note.content];
            notesArray.push(n);
            note.content = notesArray;
            note.save();
            let dateNow = new Date();
            return note;
        }
        else {
            let notesArray = [];
            notesArray.push(n.trim());
            let newNote = yield Notes_1.default.create({ note_id: id, content: notesArray });
            return newNote;
        }
    }
    catch (error) {
        return new Error('Houve um erro ao adicionar um novo Note');
    }
});
exports.addNotes = addNotes;
const deleteNotes = (index, id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let note = yield Notes_1.default.findByPk(id);
        if (note) {
            let hasNote = note.content[index];
            let cloneArray = note.content.filter(item => {
                return item != hasNote;
            });
            note.content = cloneArray;
            note.save();
            return note;
        }
        else {
            return new Error('Erro ao editar esse documento');
        }
    }
    catch (error) {
        return new Error('Erro ao editar esse documento');
    }
});
exports.deleteNotes = deleteNotes;
const editNotes = (index, id, n) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let note = yield Notes_1.default.findByPk(id);
        if (note) {
            let array = [...note.content];
            array[index] = array[index].replace(array[index], n);
            note.content = array;
            note.save();
            return note;
        }
        else {
            return new Error('Erro ao editar esse documento');
        }
    }
    catch (error) {
    }
});
exports.editNotes = editNotes;
