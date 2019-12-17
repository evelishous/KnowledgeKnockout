"use strict";
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
        return new Promise((resolve, reject) => MySQL.connection.query(query, inserts, (error, results, fields) => error ? reject(error) : resolve(results)));
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