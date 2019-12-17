"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Match {
    constructor(sockets) {
        this.sockets = sockets;
        setInterval(this.update.bind(this), 1000 / 64);
        sockets.forEach(socket => socket.on('msg', console.log));
    }
    update() {
        this.sockets.forEach(socket => socket.emit('kztovl', 'hi'));
    }
    static testAnswer(qID, answer) {
    }
}
exports.Match = Match;
// github pr test
//# sourceMappingURL=Match.js.map