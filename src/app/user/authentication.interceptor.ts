import {Injectable} from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import {UserService} from "@app/user/user.service";
import {Observable, of} from "rxjs";
import {catchError} from "rxjs/operators";

@Injectable()
export class AuthenticationHttpInterceptor implements HttpInterceptor {

    constructor(private _userService: UserService) {
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add authorization header
        if (this._userService.isLoggedIn()) {
            request = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${this._userService.getLoggedInUser().token.value}`
                }
            });
        }

        if (this._userService.isLoggedIn()) {
            //if response code is "unauthorized", assume that the token has expired and log out
            return next.handle(request).pipe(catchError((error: HttpResponse<string>) => {
                if (error.status == 401) {
                    this._userService.logOut();
                }
                return of(error);
            }));
        } else {
            return next.handle(request);
        }

    }

}
