import * as socketio from 'socket.io';

export class Match {
    private sockets: socketio.Socket[];
    public constructor(sockets: socketio.Socket[]) {
        this.sockets = sockets;
        setInterval(this.update.bind(this), 1000 / 64);
        sockets.forEach(socket => socket.on('msg', console.log));
    }
    private update() {
        this.sockets.forEach(socket => socket.emit('kztovl', 'hi'));

    }
    public static testAnswer(qID: number, answer: string) {

    }
}

// github pr test