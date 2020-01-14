"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const socketio = require("socket.io");
const Sessions_1 = require("../user/Sessions");
class SocketConnection {
    static initialize(server) {
        SocketConnection.io = socketio(server);
        SocketConnection.sockets = new Map();
        SocketConnection.io.on('connection', socket => {
            SocketConnection.sockets.set(SocketConnection.getSessionId(socket), socket);
            socket.on('disconnect', () => SocketConnection.sockets.delete(SocketConnection.getSessionId(socket)));
            socket.on('chatmessage', msg => {
                var _a, _b;
                const user = (_a = Sessions_1.Users.get(SocketConnection.getSessionId(socket))) === null || _a === void 0 ? void 0 : _a.user;
                if (user && !((_b = user) === null || _b === void 0 ? void 0 : _b.isInMatch)) {
                    for (const [sessionID, socket] of SocketConnection.sockets) {
                        console.log(sessionID);
                        const user = Sessions_1.Users.get(sessionID).user;
                        if (!user.isInMatch)
                            socket.emit('chatmessage', { msg, user: user._name });
                    }
                }
            });
        });
    }
    static get(sessionID) {
        return SocketConnection.sockets.get(sessionID);
    }
    static getSessionId(socket) {
        var _a;
        const match = socket.request.headers.cookie.match(new RegExp(`${process.env.SESSIONID}=s\%3A(.*)\\..*;`)); // session cookie example: s%3AjcEci1GnosCbRx-ovp6HjG33oA__H7Y1.E%2FtvkiJhQyDzUwqeeGX7jlAFmPt9Aa3YSfaibjuqL5g  // sid == jcEci1GnosCbRx-ovp6HjG33oA__H7Y1
        return ((_a = match) === null || _a === void 0 ? void 0 : _a.length) > 0 ? match[1] : '';
    }
}
exports.SocketConnection = SocketConnection;
//# sourceMappingURL=SocketConnection.js.map