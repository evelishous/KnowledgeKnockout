import { MySQL } from "../mysql/MySql";
import { Avatar } from "./Avatar";

export class User {
    private _id: number = 0;
    private _name: string;
    private _email: string;
    public avatars: Avatar[] = [];
    public constructor(id: number, name: string, email: string) {
        this._name = name;
        this._email = email;

        MySQL.query('SELECT * FROM avatar WHERE userId').then(result => result.forEach((avatar: any) => this.avatars.push(new Avatar(avatar.id, avatar.level, avatar.topicBlockId))));
    }
    public set name(val: string) {
        MySQL.query('UPDATE user SET name=?', [val]);
        this._name = val;
    }
    public set email(val: string) {
        MySQL.query('UPDATE user SET name=?', [val]);
        this._email = val;
    }
    public get id(): number {
        return this._id;
    }
    public get name(): string {
        return this._name;
    }
    public get email(): string {
        return this._email;
    }
}