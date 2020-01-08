import { User } from "./User";
import { MySQL } from "../mysql/MySql";
import { BCrypt } from "../views/BCrypt";

export class Authentication {
    public static async register(name: string, password: string, email: string): Promise<User | undefined> {
        if (await Authentication.userExists(name, email)) return Authentication.login(name, password);

        await MySQL.query('INSERT INTO user(name, email, password) VALUES(?, ?, ?)', [name, email, await BCrypt.hash(password)]);

        return Authentication.login(name, password);
    }
    public static async login(name: string, password: string): Promise<User | undefined> {
        const result = await MySQL.query('SELECT * FROM user WHERE name=?', [name]);

        if (await BCrypt.match(password, result.password)) return new User(result.id, result.name, result.email);
    }
    public static async userExists(name: string, email: string): Promise<boolean> {
        const result = await MySQL.query('SELECT * FROM user WHERE name=? OR email=?', [name, email]);
        return result.length !== 0;
    }
}