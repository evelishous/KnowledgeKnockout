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
const path_1 = require("path");
const Questions_1 = require("../questions/Questions");
function training_route_get(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        res.sendFile(path_1.resolve('./public/training_test.html'));
    });
}
exports.training_route_get = training_route_get;
function training_route_post(req, res) {
    var _a, _b, _c;
    return __awaiter(this, void 0, void 0, function* () {
        console.log(req.body);
        if (req.body.topic) {
            const question = yield Questions_1.Questions.getRandomQuestion(req.body.topic);
            const answers = yield Questions_1.Questions.getAnswers(question.id);
            console.log({ qId: question.id, q: question.content, answers: answers.map(a => [a.content, a.id]) });
            res.send({ qId: question.id, q: question.content, answers: answers.map(a => [a.content, a.id]) });
        }
        else if (req.body.answer && req.body.qId) {
            const correct = yield Questions_1.Questions.test(req.body.answer, req.body.qId);
            if ((_a = req.session) === null || _a === void 0 ? void 0 : _a.user) {
                const question = yield Questions_1.Questions.getQuestion(req.body.qId);
                const avatar = req.session.user.avatars.find(a => a.topicId === question.topicId);
                if (avatar)
                    avatar.level += 0.001 * question.secondsToSolve;
                console.log((_b = avatar) === null || _b === void 0 ? void 0 : _b.level, (_c = req.session) === null || _c === void 0 ? void 0 : _c.user);
            }
            res.send(correct);
        }
    });
}
exports.training_route_post = training_route_post;
//# sourceMappingURL=training_route.js.map