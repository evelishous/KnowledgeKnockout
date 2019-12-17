import * as MySQLStore from 'express-mysql-session';
import * as mysql from 'mysql';
import { Connection, ConnectionConfig, FieldInfo, MysqlError } from 'mysql';

export class MySQL { // https://www.npmjs.com/package/mysql
    private static connection: Connection;
    private static initialized: boolean = false;
    public static _sessionStore: MySQLStore;
    private static connectionConfig: ConnectionConfig = {
        host: process.env.DB_HOST,
        port: parseInt(process.env.DB_PORT + ''),
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_NAME
    }
    private static connectionConfigSessionStore: any = {
        clearExpired: true,
        checkExpirationInterval: 900000,
        expiration: 86400000,
        createDatabaseTable: true
    }
    private static initialize(): void {
        if (MySQL.initialized) return;

        MySQL.connection = mysql.createConnection(MySQL.connectionConfig);

        MySQL.connection.connect();

        MySQL._sessionStore = new MySQLStore(MySQL.connectionConfigSessionStore, MySQL.connection);

        MySQL.initialized = true;
    }
    public static get sessionStore(): MySQLStore {
        if (!MySQL.initialized) MySQL.initialize();
        return MySQL.sessionStore;
    }
    public static query(query: string, inserts: string[]): Promise<any> { // https://www.npmjs.com/package/mysql#preparing-queries
        MySQL.initialize();
        return new Promise((resolve, reject) => MySQL.connection.query(query, inserts, (error: MysqlError | null, results?: any, fields?: FieldInfo[]) => error ? reject(error) : resolve(results)));
    }
}