"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Question {
    constructor(questionId = 0, blockId = 0, topicId = 0, content = '', imgSrc = '', secondsToSolve = 0) {
        this.id = questionId;
        this.blockId = blockId;
        this.topicId = topicId;
        this.content = content;
        this.imgSrc = imgSrc;
        this.secondsToSolve = secondsToSolve;
    }
}
exports.Question = Question;
//# sourceMappingURL=Question.js.map