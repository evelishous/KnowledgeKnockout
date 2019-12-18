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
    static register(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!(yield Authentication.userExists(email)))
                MySql_1.MySQL.query('INSERT INTO users (email, password, ...) VALUES (?, ?, ...)', [email, password /*, ...*/]);
        });
    }
    static login(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            let result = yield MySql_1.MySQL.query('SELECT email, password FROM users WHERE email=?', [email]);
            if (yield BCrypt_1.BCrypt.match(password, result.password))
                return new User_1.User(email /*, ...*/);
            else
                return new User_1.User();
        });
    }
    static userExists(email) {
        return __awaiter(this, void 0, void 0, function* () {
            let result = yield MySql_1.MySQL.query('SELECT email FROM users WHERE email=?', [email]);
            return !!result.email;
        });
    }
}
exports.Authentication = Authentication;
//# sourceMappingURL=Authentication.js.map