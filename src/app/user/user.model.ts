import {Token} from "./token.model";

export class User {

    constructor(public username: string, public token: Token) {

    }

    static copy(user: User) {
        if (user) {
            const copyOfToken: Token = Token.copy(user.token);
            return new User(user.username, copyOfToken);
        } else {
            return null;
        }
    }

}
