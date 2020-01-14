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
const MySQLStore = require("express-mysql-session");
const mysql = require("mysql");
class MySQL {
    static initialize() {
        if (MySQL.initialized)
            return;
        MySQL.connection = mysql.createConnection(MySQL.connectionConfig);
        MySQL.connection.connect();
        MySQL._sessionStore = new MySQLStore(MySQL.connectionConfigSessionStore, MySQL.connection);
        MySQL.initialized = true;
    }
    static get sessionStore() {
        if (!MySQL.initialized)
            MySQL.initialize();
        return MySQL.sessionStore;
    }
    static query(query, inserts) {
        MySQL.initialize();
        return new Promise((resolve, reject) => MySQL.connection.query(query, inserts ? inserts.map(i => i.toString()) : [], (error, results, fields) => error ? reject(error) : resolve(results)));
    }
    static beginTransaction() {
        return new Promise((resolve, reject) => MySQL.connection.beginTransaction(error => error ? reject(error) : resolve()));
    }
    static commit() {
        return new Promise((resolve, reject) => MySQL.connection.commit(error => error ? reject(error) : resolve()));
    }
    static rollback() {
        return new Promise((resolve, reject) => MySQL.connection.commit(error => error ? reject(error) : resolve()));
    }
    static queryWithTransaction(query, inserts) {
        return __awaiter(this, void 0, void 0, function* () {
            MySQL.initialize();
            try {
                yield MySQL.beginTransaction();
                const results = yield MySQL.query(query, inserts ? inserts.map(i => i.toString()) : []);
                yield MySQL.commit();
                return results;
            }
            catch (error) {
                yield MySQL.rollback();
                throw error;
            }
        });
    }
}
exports.MySQL = MySQL;
MySQL.initialized = false;
MySQL.connectionConfig = {
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT + ''),
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
};
MySQL.connectionConfigSessionStore = {
    clearExpired: true,
    checkExpirationInterval: 900000,
    expiration: 86400000,
    createDatabaseTable: true
};
//# sourceMappingURL=MySql.js.map