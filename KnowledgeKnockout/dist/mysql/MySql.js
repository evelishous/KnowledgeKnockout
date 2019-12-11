"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mysql = require("mysql");
const MySQLStore = require("express-mysql-session");
class MySQL {
    static initialize() {
        if (MySQL.initialized)
            return;
        MySQL.connection = mysql.createConnection(MySQL.connectionConfig);
        MySQL.connection.connect();
        MySQL.sessionStore = new MySQLStore(MySQL.connectionConfig);
        MySQL.initialized = true;
    }
    static query(query, inserts) {
        return new Promise((resolve, reject) => {
            MySQL.initialize();
            MySQL.connection.query(query, inserts, (error, results, fields) => {
                if (error)
                    reject(error);
                resolve(results);
            });
        });
    }
}
exports.MySQL = MySQL;
MySQL.initialized = false;
MySQL.connectionConfig = {
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT),
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
};
//# sourceMappingURL=MySql.js.map