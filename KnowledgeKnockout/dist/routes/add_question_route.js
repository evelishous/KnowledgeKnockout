"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mysql = require("mysql");
const MySql_1 = require("../mysql/MySql");
const path = require("path");
function add_question_route_post(req, res) {
    console.log(req.body);
    let questionContent = req.body.content;
    let wrongAnswers = [
        req.body.wrongAnswer01,
        req.body.wrongAnswer02,
        req.body.wrongAnswer03
    ];
    let correctAnswer = req.body.correctAnswer;
    let topicId = req.body.topicId;
    let topicBlockId = req.body.topicBlockId;
    let lastQuestionId = 0;
    let sql = 'insert into question (content, blockId, topicId) values (?, ?, ?)';
    let inserts = [questionContent, topicBlockId, topicId];
    MySql_1.MySQL.query(sql, inserts).then((results) => {
        lastQuestionId = results.insertId;
        let sql = `insert into answer (questionId, content, isCorrect) values (${lastQuestionId}, ${mysql.escape(wrongAnswers[0])}, false), (${lastQuestionId}, ${mysql.escape(wrongAnswers[1])}, false), (${lastQuestionId}, ${mysql.escape(wrongAnswers[2])}, false), (${lastQuestionId}, ${mysql.escape(correctAnswer)}, true)`;
        MySql_1.MySQL.query(sql, []).then((results) => {
            res.send(JSON.stringify({ success: true }));
        }, (error) => {
            res.send(JSON.stringify({ success: false, error: error }));
        });
    }, (error) => {
        res.send(JSON.stringify({ success: false, error: error }));
    });
}
exports.add_question_route_post = add_question_route_post;
function add_question_route_get(req, res) {
    console.log(path.resolve('./dist/views/add_question.html'));
    res.sendFile(path.resolve('./dist/views/add_question.html'));
    //res.send(req.body);
}
exports.add_question_route_get = add_question_route_get;
//# sourceMappingURL=add_question_route.js.map