import { Server } from 'http';
import * as socketio from 'socket.io';

export class SocketConnection {
    private static sockets: Map<string, socketio.Socket>; // Map<userID, socket>
    private static io: socketio.Server;
    public static initialize(server: Server) {
        SocketConnection.io = socketio(server);
        SocketConnection.sockets = new Map();
        SocketConnection.io.on('connection', socket => {
            SocketConnection.sockets.set(SocketConnection.getSessionCookie(socket), socket);
            console.log(SocketConnection.getSessionCookie(socket));
        });
    }
    public static get(userID: string): socketio.Socket {
        return SocketConnection.sockets.get(userID);
    }
    public static getSessionCookie(socket: socketio.Socket): string {
        let match = socket.request.headers.cookie.match(new RegExp(`${process.env.SESSIONID}=s\%3A(.*)\\..*;`)); // session cookie example: s%3AjcEci1GnosCbRx-ovp6HjG33oA__H7Y1.E%2FtvkiJhQyDzUwqeeGX7jlAFmPt9Aa3YSfaibjuqL5g  // sid == jcEci1GnosCbRx-ovp6HjG33oA__H7Y1
        return match?.length > 0 ? match[1] : '';
    }
}