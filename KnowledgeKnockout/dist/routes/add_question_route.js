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
const render_1 = require("../views/render");
function add_question_route_get(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        res.send(yield render_1.render(['add_question'], {
            title: 'add question'
        }));
    });
}
exports.add_question_route_get = add_question_route_get;
function add_question_route_post(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log(req.body);
        const questionContent = req.body.content;
        const wrongAnswers = [req.body.wrongAnswer01, req.body.wrongAnswer02, req.body.wrongAnswer03];
        const correctAnswer = req.body.correctAnswer;
        const topicId = req.body.topicId;
        const topicBlockId = req.body.topicBlockId;
        const secondsToAnswer = req.body.seconds;
        let lastQuestionId = 0;
        try {
            const sql = 'insert into question (content, blockId, topicId, secondsToAnswer) values (?, ?, ?, ?)';
            const inserts = [questionContent, topicBlockId, topicId, secondsToAnswer];
            //const results = await MySQL.query(sql, inserts);
            const results = yield MySql_1.MySQL.queryWithTransaction(sql, inserts);
            lastQuestionId = results.insertId;
        }
        catch (error) {
            res.send(JSON.stringify({ success: false, error: error.code }));
            return;
        }
        try {
            const sql = 'insert into answer (questionId, content, isCorrect) values (?, ?, false), (?, ?, false), (?, ?, false), (?, ?, true)';
            const inserts = [lastQuestionId, wrongAnswers[0], lastQuestionId, wrongAnswers[1], lastQuestionId, wrongAnswers[2], lastQuestionId, correctAnswer];
            //await MySQL.query(sql, inserts);
            yield MySql_1.MySQL.queryWithTransaction(sql, inserts);
            res.send(JSON.stringify({ success: true }));
        }
        catch (error) {
            res.send(JSON.stringify({ success: false, error: error.code }));
        }
    });
}
exports.add_question_route_post = add_question_route_post;
//# sourceMappingURL=add_question_route.js.map