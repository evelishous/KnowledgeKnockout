import { Request, Response } from 'express';
import * as mysql from 'mysql';
import { MySQL } from '../mysql/MySql';
import * as path from 'path';

export function add_question_route_post(req: Request, res: Response) {

	MySQL.query('insert into question (content, blockId, topicId) values (?, ?, ?)', [req.body.content, req.body.topicBlockId, req.body.topicId]).then(
		(results) => {
		let lastQuestionId = results.insertId;

		let sql: string = `insert into answer (questionId, content, isCorrect) values (${lastQuestionId}, ${mysql.escape(req.body.wrongAnswer01)}, false), (${lastQuestionId}, ${mysql.escape(req.body.wrongAnswer02)}, false), (${lastQuestionId}, ${mysql.escape(req.body.wrongAnswer03)}, false), (${lastQuestionId}, ${mysql.escape(req.body.correctAnswer)}, true)`;

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
	res.sendFile(path.resolve('./dist/views/add_question.html'));
}