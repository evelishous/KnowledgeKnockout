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
const Questions_1 = require("../questions/Questions");
const SocketConnection_1 = require("../socket_connection/SocketConnection");
class Player {
    constructor(user) {
        this.answerIsCorrect = false;
        this.score = 0;
        this.user = user;
        this.socket = SocketConnection_1.SocketConnection.get(this.user.sessionID);
        this.socket.on('testAnswer', this.TestAnswerEvent.bind(this));
    }
    TestAnswerEvent(message) {
        return __awaiter(this, void 0, void 0, function* () {
            this.answerIsCorrect = yield Questions_1.Questions.test(message.answerId, message.questionId);
        });
    }
}
exports.Player = Player;
//# sourceMappingURL=player.js.map