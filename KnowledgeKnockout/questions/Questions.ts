import { MySQL } from '../mysql/MySql';
import { Question } from './Question';

export class Questions {
    public static async test(answerID: number, questionID: number): Promise<boolean> {
        try {
            const result = (await MySQL.query('SELECT isCorrect FROM answer WHERE id=? && questionId=?', [answerID, questionID]))[0];
            return !!result.isCorrect;
        }
        catch (error) {
            return false;
        }
    }
    public static async getQuestion(topicId: number): Promise<Question | any> {
        try {
            const result = (await MySQL.query('SELECT * FROM question WHERE topicId=? ORDER BY RAND() LIMIT 1', [topicId]))[0];
            return new Question(result.id, result.blockId, result.topicId, result.content, result.imgSrc);
        }
        catch (error) {
            return error;
        }
    }
}