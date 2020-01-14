"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Users {
    static get(sessionID) {
        return Users.users.get(sessionID);
    }
    static add(session) {
        Users.users.set(session.id, session);
    }
    static remove(sessionID) {
        Users.users.delete(sessionID);
    }
}
exports.Users = Users;
Users.users = new Map();
//# sourceMappingURL=Sessions.js.map