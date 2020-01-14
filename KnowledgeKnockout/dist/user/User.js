"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const MySql_1 = require("../mysql/MySql");
const Avatar_1 = require("./Avatar");
class User {
    constructor(id, name, email, progress) {
        this.avatars = [];
        this.sessionID = '';
        this.isSearchingMatch = false;
        this.isInMatch = false;
        this._id = id;
        this._name = name;
        this._email = email;
        this._progress = progress;
        MySql_1.MySQL.query('SELECT * FROM avatar WHERE userId=?', [this._id]).then(result => result.forEach((avatar) => this.avatars.push(new Avatar_1.Avatar(avatar.id, avatar.level, avatar.topicBlockId))));
    }
    set name(val) {
        MySql_1.MySQL.query('UPDATE user SET name=? WHERE name=?', [val, this._name]);
        this._name = val;
    }
    set email(val) {
        MySql_1.MySQL.query('UPDATE user SET email=? WHERE name=?', [val, this._name]);
        this._email = val;
    }
    set progress(val) {
        MySql_1.MySQL.query('UPDATE user SET progress=? WHERE name=?', [val, this._name]);
        this._progress = val;
    }
    get id() {
        return this._id;
    }
    get name() {
        return this._name;
    }
    get email() {
        return this._email;
    }
    get progress() {
        return this._progress;
    }
    getAvatar(id) {
        return this.avatars.find(avatar => avatar.id === id);
    }
    get avatarTotalLevel() {
        return this.avatars.reduce((total, current) => total + current.level, 0);
    }
}
exports.User = User;
//# sourceMappingURL=User.js.map