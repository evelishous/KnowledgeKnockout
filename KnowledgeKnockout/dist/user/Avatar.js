"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const MySql_1 = require("../mysql/MySql");
class Avatar {
    constructor(id, level, topicBlockId) {
        this._id = id;
        this._level = level;
        this.topicId = topicBlockId;
    }
    get level() {
        return this._level;
    }
    get id() {
        return this._id;
    }
    set level(val) {
        MySql_1.MySQL.query('UPDATE avatar SET level=? WHERE id=?', [val, this._id]);
        this._level = val;
    }
}
exports.Avatar = Avatar;
//# sourceMappingURL=Avatar.js.map