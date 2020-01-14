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
Object.defineProperty(exports, "__esModule", { value: true });
const helpers_1 = require("../helpers");
const MySql_1 = require("../mysql/MySql");
const Answer_1 = require("./Answer");
const Question_1 = require("./Question");
class Questions {
    static test(answerId, questionId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = (yield MySql_1.MySQL.query('SELECT isCorrect FROM answer WHERE id=? && questionId=?', [answerId, questionId]))[0];
                return !!result.isCorrect;
            }
            catch (error) {
                return false;
            }
        });
    }
    static getRandomQuestion(topicId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = (yield MySql_1.MySQL.query('SELECT * FROM question WHERE topicId=? ORDER BY RAND() LIMIT 1', [topicId]))[0];
                return new Question_1.Question(result.id, result.blockId, result.topicId, result.content, result.imgSrc, result.secondsToSolve);
            }
            catch (error) {
                console.error(error);
                return new Question_1.Question();
            }
        });
    }
    static getQuestion(questionId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = (yield MySql_1.MySQL.query('SELECT * FROM question WHERE id=?', [questionId]))[0];
                return new Question_1.Question(result.id, result.blockId, result.topicId, result.content, result.imgSrc, result.secondsToSolve);
            }
            catch (error) {
                console.error(error);
                return new Question_1.Question();
            }
        });
    }
    static getAnswers(questionId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield MySql_1.MySQL.query('SELECT * FROM answer WHERE questionId=?', [questionId]);
                return helpers_1.randomizeArray(result.map((a) => new Answer_1.Answer(a.id, a.questionId, a.content, a.isCorrect, a.imgSrc)));
            }
            catch (error) {
                console.error(error);
                return [];
            }
        });
    }
}
exports.Questions = Questions;
//# sourceMappingURL=Questions.js.map