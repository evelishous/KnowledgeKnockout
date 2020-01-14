"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const MySql_1 = require("../mysql/MySql");
const BCrypt_1 = require("./BCrypt");
const User_1 = require("./User");
class Authentication {
    static register(name, password, email) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (yield Authentication.userExists(name, email))
                    return Authentication.login(name, password);
                yield MySql_1.MySQL.queryWithTransaction('INSERT INTO user(name, email, password) VALUES(?, ?, ?)', [name, email, yield BCrypt_1.BCrypt.hash(password)]);
                const id = (yield MySql_1.MySQL.query('SELECT id FROM user WHERE name=?', [name]))[0].id;
                for (let i = 1; i <= 9; i++) {
                    yield MySql_1.MySQL.query(`INSERT INTO avatar(userId, level, topicId) VALUES(${id}, 0, ${i})`);
                }
                return yield Authentication.login(name, password);
            }
            catch (error) {
                console.error(error);
                return undefined;
            }
        });
    }
    static login(name, password) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield MySql_1.MySQL.query('SELECT * FROM user WHERE name=?', [name]);
                if (!result[0].password)
                    throw 'no password';
                if (yield BCrypt_1.BCrypt.match(password, result[0].password))
                    return new User_1.User(result[0].id, result[0].name, result[0].email, result[0].progress);
            }
            catch (error) {
                console.error(error);
                return undefined;
            }
        });
    }
    static userExists(name, email) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield MySql_1.MySQL.query('SELECT * FROM user WHERE name=? OR email=?', [name, email]);
                return result.length !== 0;
            }
            catch (error) {
                console.error(error);
                return false;
            }
        });
    }
    static loginCheck(req, res, next) {
        var _a;
        if ((_a = req.session) === null || _a === void 0 ? void 0 : _a.user)
            next();
        else
            res.redirect('/login');
    }
}
exports.Authentication = Authentication;
//# sourceMappingURL=Authentication.js.map