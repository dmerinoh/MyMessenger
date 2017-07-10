export class Contact{
    private _id: string;
    private _nickname: string;
    private _fullName: string;
    private _email: string;

    constructor(){
    }

    get id(): string {
        return this._id;
    }

    set id(value: string) {
        this._id = value;
    }

    get nickname(): string {
        return this._nickname;
    }

    set nickname(value: string) {
        this._nickname = value;
    }

    get fullName(): string {
        return this._fullName;
    }

    set fullName(value: string) {
        this._fullName = value;
    }

    get email(): string {
        return this._email;
    }

    set email(value: string) {
        this._email = value;
    }

    public toString = () : string => {
        return this.nickname + ': ' + this.email;
    }
}
