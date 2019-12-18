"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const SocketConnection_1 = require("./socket_connection/SocketConnection");
class ChatExample {
    static initialize() {
        ChatExample.sockets = new Map();
        setInterval(ChatExample.update, 100);
    }
    static update() {
        var _a;
        for (let sessID of SocketConnection_1.SocketConnection.sockets.keys()) {
            if (!ChatExample.sockets.get(sessID)) {
                ChatExample.sockets.set(sessID, SocketConnection_1.SocketConnection.sockets.get(sessID));
                (_a = ChatExample.sockets.get(sessID)) === null || _a === void 0 ? void 0 : _a.on('chat', msg => ChatExample.sockets.forEach(socket => { var _a; return (_a = socket) === null || _a === void 0 ? void 0 : _a.emit('chat', JSON.stringify({ msg, username: sessID })); }));
            }
        }
        for (let sessID of ChatExample.sockets.keys()) {
            if (!SocketConnection_1.SocketConnection.sockets.get(sessID))
                ChatExample.sockets.delete(sessID);
        }
    }
}
exports.ChatExample = ChatExample;
//# sourceMappingURL=chat_example.js.map