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
const path = require("path");
const MySql_1 = require("../mysql/MySql");
function add_question_route_get(req, res) {
    console.log(path.resolve('./dist/views/add_question.html'));
    res.sendFile(path.resolve('./dist/views/add_question.html'));
    //res.send(req.body);
}
exports.add_question_route_get = add_question_route_get;
function add_question_route_post(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log(req.body);
        let questionContent = req.body.content;
        let wrongAnswers = [req.body.wrongAnswer01, req.body.wrongAnswer02, req.body.wrongAnswer03];
        let correctAnswer = req.body.correctAnswer;
        let topicId = req.body.topicId;
        let topicBlockId = req.body.topicBlockId;
        let lastQuestionId = 0;
        try {
            let sql = 'insert into question (content, blockId, topicId) values (?, ?, ?)';
            let inserts = [questionContent, topicBlockId, topicId];
            //const results = await MySQL.query(sql, inserts);
            const results = yield MySql_1.MySQL.queryWithTransaction(sql, inserts);
            lastQuestionId = results.insertId;
        }
        catch (error) {
            res.send(JSON.stringify({ success: false, error: error }));
            return;
        }
        try {
            let sql = 'insert into answer (questionId, content, isCorrect) values (?, ?, false), (?, ?, false), (?, ?, false), (?, ?, true)';
            let inserts = [lastQuestionId, wrongAnswers[0], lastQuestionId, wrongAnswers[1], lastQuestionId, wrongAnswers[2], lastQuestionId, correctAnswer];
            //await MySQL.query(sql, inserts);
            yield MySql_1.MySQL.queryWithTransaction(sql, inserts);
            res.send(JSON.stringify({ success: true }));
        }
        catch (error) {
            res.send(JSON.stringify({ success: false, error: error }));
        }
    });
}
exports.add_question_route_post = add_question_route_post;
//# sourceMappingURL=add_question_route.js.map