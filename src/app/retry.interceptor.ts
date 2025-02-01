import {delay, mergeMap, retryWhen} from "rxjs/operators";
import {Observable, of, throwError} from "rxjs";
import { HttpErrorResponse, HttpInterceptor } from "@angular/common/http";
import {ErrorService} from "@app/error/error.service";
import {Injectable} from "@angular/core";
import {UserService} from "@app/user/user.service";

@Injectable()
export class RetryInterceptor implements HttpInterceptor {

    static DEFAULT_MAX_ATTEMPTS = 10;
    static DEFAULT_BACKOFF = 10000;

    constructor(private _errorService: ErrorService, private _userService: UserService) {
    }

    intercept(req, next) {
        return next.handle(req)
            .pipe(this.retryWithBackoff(RetryInterceptor.DEFAULT_BACKOFF, RetryInterceptor.DEFAULT_MAX_ATTEMPTS, RetryInterceptor.DEFAULT_BACKOFF));
    }

    retryWithBackoff(delayInMilliseconds: number, maxAttempts = RetryInterceptor.DEFAULT_MAX_ATTEMPTS, backoffInMilliseconds = RetryInterceptor.DEFAULT_BACKOFF) {
        let remainingAttempts = maxAttempts;

        return (src: Observable<any>) =>
            src.pipe(
                retryWhen((errors: Observable<any>) => errors.pipe(
                    mergeMap((error: HttpErrorResponse) => {
                        // check if the user token is still valid
                        if (this._userService.getLoggedInUser()?.token.hasExpired()) {
                            this._userService.logOutWhenTokenHasExpired();
                            return this.logAndThrowError("User token was expired.", error);
                        }

                        // check if we're trying to log in. Do not retry these calls
                        if (error.url.indexOf("auth-service/auth/") != -1) {
                            return this.logAndThrowError("Invalid username or password", error);
                        }

                        // something went wrong, let's retry
                        remainingAttempts--;
                        if (remainingAttempts > 0) {
                            this._errorService.notify(new Error(`Retrying failed HTTP call, ${remainingAttempts} remaining attempts.`));
                            const backoffTime = delayInMilliseconds + (maxAttempts - remainingAttempts) * backoffInMilliseconds;
                            return of(error).pipe(delay(backoffTime));
                        }

                        // we've tried enough times, let's give up
                        return this.logAndThrowError(`Giving up after ${maxAttempts} attempts due to error ${error.message}`, error);
                    })
                ))
            );
    }

    logAndThrowError(message: string, stack: Error) {
        let error = new Error(message);
        this._errorService.notify(error);
        console.error(message, stack);
        return throwError(error);
    }

}
