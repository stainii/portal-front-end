import {inject, Injectable} from "@angular/core";
// @ts-ignore
import Keycloak from "keycloak-js";

@Injectable({providedIn: "root"})
export class UserService {
    private readonly keycloak: Keycloak = inject(Keycloak);

    login = () => this.keycloak.login();
    logout = () => this.keycloak.logout({redirectUri: "/"});
    isTokenExpired = () => this.keycloak.isTokenExpired();
    token = () => this.keycloak.token;

}
