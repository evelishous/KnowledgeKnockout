"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Answer {
    constructor(id = 0, questionId = 0, content = '', isCorrect = 0, imgSrc = '') {
        this.id = id;
        this.questionId = questionId;
        this.content = content;
        this.isCorrect = !!isCorrect;
        this.imgSrc = imgSrc;
    }
}
exports.Answer = Answer;
//# sourceMappingURL=Answer.js.map