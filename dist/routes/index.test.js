"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const app_1 = __importDefault(require("../app"));
describe('Testing endpoints', () => {
    it('should main', (done) => {
        (0, supertest_1.default)(app_1.default).get('/').then(response => {
            expect(response.statusCode).not.toBe(401);
            return done();
        });
    });
});
