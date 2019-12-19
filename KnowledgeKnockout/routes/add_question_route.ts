import { Request, Response } from 'express';
import * as mysql from 'mysql';
import * as path from 'path';
import { MySQL } from '../mysql/MySql';

export function add_question_route_get(req: Request, res: Response): void {
	console.log(path.resolve('./dist/views/add_question.html'));

	res.sendFile(path.resolve('./dist/views/add_question.html'));
	//res.send(req.body);
}

export async function add_question_route_post(req: Request, res: Response): Promise<void> {
	console.log(req.body);

	let questionContent: string = req.body.content;
	let wrongAnswers: string[] = [req.body.wrongAnswer01, req.body.wrongAnswer02, req.body.wrongAnswer03];
	let correctAnswer: string = req.body.correctAnswer;
	let topicId: string = req.body.topicId;
	let topicBlockId: string = req.body.topicBlockId;
	let lastQuestionId: number = 0;

	try {
		let sql: string = 'insert into question (content, blockId, topicId) values (?, ?, ?)';
		let inserts: string[] = [questionContent, topicBlockId, topicId];
		//const results = await MySQL.query(sql, inserts);
		const results = await MySQL.queryWithTransaction(sql, inserts);
		lastQuestionId = results.insertId;
	}
	catch (error) {
		res.send(JSON.stringify({ success: false, error: error.code }));
		return;
	}

	try {
		let sql: string = 'insert into answer (questionId, content, isCorrect) values (?, ?, false), (?, ?, false), (?, ?, false), (?, ?, true)';
		let inserts: any[] = [lastQuestionId, wrongAnswers[0], lastQuestionId, wrongAnswers[1], lastQuestionId, wrongAnswers[2], lastQuestionId, correctAnswer];
		//await MySQL.query(sql, inserts);
		await MySQL.queryWithTransaction(sql, inserts);
		res.send(JSON.stringify({ success: true }));
	}
	catch (error) {
		res.send(JSON.stringify({ success: false, error: error.code }));
	}
}