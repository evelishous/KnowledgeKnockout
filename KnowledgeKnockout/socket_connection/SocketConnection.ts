import * as socketio from 'socket.io';
import { Server } from 'http';
import { randStr } from '../helpers';

export class SocketConnection {
    private static namespaces: Map<string, socketio.Namespace>;
    private static io: socketio.Server;
    public static initialize(server: Server) {
        SocketConnection.io = socketio(server);
    }
    private static getNamespaceName(): string {
        let ret = randStr(16);
        while (SocketConnection.namespaces.get(ret)) ret = randStr(16);
        return ret;
    }
    public static getConnection(): socketio.Namespace {
        return SocketConnection.io.of(SocketConnection.getNamespaceName());
    }
    public static disposeConnection(connection: socketio.Namespace) {
        delete SocketConnection.io.nsps[connection.name];
        SocketConnection.namespaces.delete(connection.name);
    }
}