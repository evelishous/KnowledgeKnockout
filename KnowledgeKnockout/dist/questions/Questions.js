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
const MySql_1 = require("../mysql/MySql");
class Questions {
    static test(qID, answerID) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield MySql_1.MySQL.query('SELECT isCorrect FROM answer WHERE id=? && questionId=?', [answerID, qID]);
                return !!result.isCorrect;
            }
            catch (error) {
                return false;
            }
        });
    }
}
exports.Questions = Questions;
//# sourceMappingURL=Questions.js.map