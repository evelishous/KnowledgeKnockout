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
const helpers_1 = require("../helpers");
const Questions_1 = require("../questions/Questions");
const SocketConnection_1 = require("../socket_connection/SocketConnection");
const Sessions_1 = require("../user/Sessions");
const player_1 = require("./player");
class Fight {
    constructor(sessionIDs) {
        this.players = [];
        const users = sessionIDs.map(sessionID => Sessions_1.Users.get(sessionID).user);
        for (const user of users) {
            user.isInMatch = true;
            console.log('!!!!!!!!!!!!!!!!!!!', user, Sessions_1.Users.get(user.sessionID));
        }
        const interval = setInterval(() => {
            console.log(users.every(user => !!SocketConnection_1.SocketConnection.get(user.sessionID)));
            if (users.every(user => !!SocketConnection_1.SocketConnection.get(user.sessionID))) {
                for (const user of users) {
                    this.players.push(new player_1.Player(user));
                }
                for (const player of this.players) {
                    player.socket.on('chatmessage', msg => {
                        for (const player_ of this.players) {
                            player_.socket.emit('chatmessage', { msg: msg, user: player.user.name });
                        }
                    });
                }
                this.Start();
                clearInterval(interval);
            }
        }, 100);
    }
    Start() {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('match start');
            for (const player of this.players) {
                player.socket.emit('avatarInfo', this.players.map(player_ => ({ isThisPlayer: player.socket.id === player_.socket.id, avatars: player_.user.avatars.map(avatar => ({ topicId: avatar.topicId, level: avatar.level })) })));
            }
            for (let i = 0; i < this.players[0].user.avatars.length; i++) {
                const question = yield Questions_1.Questions.getRandomQuestion(i);
                for (const player of this.players) {
                    player.socket.emit('question', { id: question.id, content: question.content, time: question.secondsToSolve });
                }
                yield helpers_1.asyncTimeout(question.secondsToSolve * 1000);
                if (this.players.every(player => player.answerIsCorrect)) {
                    for (const player of this.players) {
                        player.score += player.user.getAvatar(i).level;
                    }
                }
                else if (!this.players.every(player => player.answerIsCorrect) && this.players.some(player => player.answerIsCorrect)) {
                    for (let j = 0; j < this.players.length; j++) {
                        const player = this.players[j];
                        if (player.answerIsCorrect) {
                            player.score += player.user.getAvatar(i).level;
                        }
                        else {
                            player.score += Math.max(0, player.user.getAvatar(i).level - this.players[(j + 1) % this.players.length].user.getAvatar(i).level);
                        }
                    }
                }
                for (const player of this.players) {
                    player.socket.emit('roundResult', this.players.map(player_ => ({ isThisPlayer: player.socket.id === player_.socket.id, correct: player_.answerIsCorrect, score: player_.score })));
                }
                yield helpers_1.asyncTimeout(3000);
            }
            for (let j = 0; j < this.players.length; j++) {
                const player = this.players[j];
                player.user.progress += player.score;
                player.socket.emit('matchend', this.players.map(player_ => ({ isThisPlayer: player.socket.id === player_.socket.id, score: player_.score, won: player.score > this.players[j + 1].score, progress: player.user.progress })));
            }
            yield helpers_1.asyncTimeout(5000);
            for (const player of this.players) {
                player.user.isInMatch = false;
            }
        });
    }
}
exports.Fight = Fight;
//# sourceMappingURL=fight.js.map