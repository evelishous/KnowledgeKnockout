import { Request, Response } from 'express';
import * as mysql from 'mysql';
import { MySQL } from '../mysql/MySql';
import * as path from 'path';

export function add_question_route_post(req: Request, res: Response) {

	console.log(req.body);

	let questionContent: string = req.body.content;
	let wrongAnswers: string[] = [
		req.body.wrongAnswer01,
		req.body.wrongAnswer02,
		req.body.wrongAnswer03
	];
	let correctAnswer:string = req.body.correctAnswer;
	let topicId: string = req.body.topicId;
	let topicBlockId: string = req.body.topicBlockId;
	let lastQuestionId: number = 0;

	let sql: string = 'insert into question (content, blockId, topicId) values (?, ?, ?)';
	let inserts: string[] = [questionContent, topicBlockId, topicId];

	MySQL.query(sql, inserts).then((results) => {
		lastQuestionId = results.insertId;

		let sql: string = `insert into answer (questionId, content, isCorrect) values (${lastQuestionId}, ${mysql.escape(wrongAnswers[0])}, false), (${lastQuestionId}, ${mysql.escape(wrongAnswers[1])}, false), (${lastQuestionId}, ${mysql.escape(wrongAnswers[2])}, false), (${lastQuestionId}, ${mysql.escape(correctAnswer)}, true)`;
		MySQL.query(sql, []).then((results) => {
			res.send(JSON.stringify({success: true}));
		}, (error) => {
				res.send(JSON.stringify({ success: false, error: error }));
		});
	}, (error) => {
			res.send(JSON.stringify({ success: false, error: error }));
	});
}

export function add_question_route_get(req: Request, res: Response) {

	console.log(path.resolve('./dist/views/add_question.html'));

	res.sendFile(path.resolve('./dist/views/add_question.html'));
	//res.send(req.body);
}