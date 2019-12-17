"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Match {
    constructor(sockets) {
        this.sockets = sockets;
        setInterval(this.update.bind(this), 1000 / 64);
        sockets.forEach(socket => socket.on('msg', (msg) => { console.log(msg); }));
    }
    update() {
        this.sockets.forEach(socket => socket.emit('kztovl', 'hi'));
    }
}
exports.Match = Match;
//# sourceMappingURL=Match.js.map