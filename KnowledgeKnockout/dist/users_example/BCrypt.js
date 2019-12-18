"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt = require("bcrypt");
class BCrypt {
    static hash(str) {
        return bcrypt.hash(str, 10);
    }
    static match(str, hash) {
        return bcrypt.compare(str, hash);
    }
}
exports.BCrypt = BCrypt;
//# sourceMappingURL=BCrypt.js.map