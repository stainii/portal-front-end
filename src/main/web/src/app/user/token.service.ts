import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Token} from "./token.model";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";
import {environment} from "@env/environment";

@Injectable({
    providedIn: 'root'
})
export class TokenService {

    public API_ROOT = environment.apiBaseUrl;

    constructor(private _httpClient: HttpClient) {
    }

    logIn(username: string, password: string): Observable<Token> {
        return this._httpClient.post<Token>(this.API_ROOT + "auth-service/auth/", {
            username: username,
            password: password
        }, {observe: 'response'})
            .pipe(map(response => {
                let auth = response.headers.get("Authorization");
                if (auth) {
                    return new Token(auth.replace("Bearer ", ""))
                } else {
                    throw new Error("Response did not contain an Authorization header");
                }
            }));
    }

}
