import { Request, Response } from 'express';
import { Questions } from '../questions/Questions';

export async function training_route_get(req: Request, res: Response) {
    res.send('html');
}

export async function training_route_post(req: Request, res: Response) {
    if (req.body.topic) {
        const question = await Questions.getQuestion(req.body.topic);
        const answers = await Questions.getAnswers(question.id);

        res.send({ q: question.content, answers: answers.map(a => a.content) });
    } else if (req.body.answer && req.body.qId) {
        res.send(await Questions.test(req.body.answer, req.body.qId));
    }
}