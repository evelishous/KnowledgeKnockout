"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const socketio = require("socket.io");
class SocketConnection {
    static initialize(server) {
        SocketConnection.io = socketio(server);
        SocketConnection.sockets = new Map();
        SocketConnection.io.on('connection', socket => {
            SocketConnection.sockets.set(SocketConnection.getSessionCookie(socket), socket);
            socket.on('disconnect', () => SocketConnection.sockets.delete(SocketConnection.getSessionCookie(socket)));
        });
    }
    static get(sessionID) {
        return SocketConnection.sockets.get(sessionID);
    }
    static getSessionCookie(socket) {
        var _a;
        let match = socket.request.headers.cookie.match(new RegExp(`${process.env.SESSIONID}=s\%3A(.*)\\..*;`)); // session cookie example: s%3AjcEci1GnosCbRx-ovp6HjG33oA__H7Y1.E%2FtvkiJhQyDzUwqeeGX7jlAFmPt9Aa3YSfaibjuqL5g  // sid == jcEci1GnosCbRx-ovp6HjG33oA__H7Y1
        return ((_a = match) === null || _a === void 0 ? void 0 : _a.length) > 0 ? match[1] : '';
    }
}
exports.SocketConnection = SocketConnection;
//# sourceMappingURL=SocketConnection.js.map