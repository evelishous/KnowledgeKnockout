import * as mysql from 'mysql';
import { Connection, ConnectionConfig, FieldInfo, MysqlError } from 'mysql';
import * as MySQLStore from 'express-mysql-session';

export class MySQL { // https://www.npmjs.com/package/mysql
    private static connection: Connection;
    private static initialized: boolean = false;
    public static sessionStore: MySQLStore;
    public static connectionConfig: ConnectionConfig = {
        host: process.env.DB_HOST,
        port: parseInt(process.env.DB_PORT),
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_NAME
    }
    private static initialize(): void {
        if (MySQL.initialized) return;

        MySQL.connection = mysql.createConnection(MySQL.connectionConfig);

        MySQL.connection.connect();

        MySQL.sessionStore = new MySQLStore(MySQL.connectionConfig, MySQL.connection);

        MySQL.initialized = true;
    }
    public static query(query: string, inserts: string[]): Promise<any> { // https://www.npmjs.com/package/mysql#preparing-queries
        return new Promise((resolve, reject) => {
            MySQL.initialize();
            MySQL.connection.query(query, inserts, (error: MysqlError, results: any, fields: FieldInfo[]) => {
                if (error) reject(error);
                resolve(results);
            });
        });
    }
}