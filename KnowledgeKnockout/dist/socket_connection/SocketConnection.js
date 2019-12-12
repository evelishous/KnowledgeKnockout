"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const socketio = require("socket.io");
class SocketConnection {
    static initialize(server) {
        SocketConnection.io = socketio(server);
        SocketConnection.sockets = new Map();
        SocketConnection.io.on('connection', socket => {
            SocketConnection.sockets.set(SocketConnection.getSessionCookie(socket), socket);
            console.log(SocketConnection.getSessionCookie(socket));
        });
    }
    static get(userID) {
        return SocketConnection.sockets.get(userID);
    }
    static getSessionCookie(socket) {
        let match = socket.request.headers.cookie.match(new RegExp(`${process.env.SESSIONID}=s\%3A(.*)\\..*;`)); // session cookie example: s%3AjcEci1GnosCbRx-ovp6HjG33oA__H7Y1.E%2FtvkiJhQyDzUwqeeGX7jlAFmPt9Aa3YSfaibjuqL5g  // sid == jcEci1GnosCbRx-ovp6HjG33oA__H7Y1
        return match ? match[1] : '';
    }
}
exports.SocketConnection = SocketConnection;
//# sourceMappingURL=SocketConnection.js.map