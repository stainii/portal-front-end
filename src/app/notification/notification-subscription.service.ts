import {Injectable} from '@angular/core';
import { HttpClient } from "@angular/common/http";
import {NotificationSubscription} from "./notification-subscription.model";

@Injectable({
    providedIn: 'root'
})
export class NotificationSubscriptionService {

    constructor(private _http: HttpClient) {
    }

    findAll() {
        return this._http.get<NotificationSubscription[]>("/api/notifications/api/subscription/");
    }

    create(subscription: NotificationSubscription) {
        return this._http.post<NotificationSubscription>("/api/notifications/api/subscription/", subscription);
    }

    update(subscription: NotificationSubscription) {
        return this._http.put<NotificationSubscription>("/api/notifications/api/subscription/" + subscription.id + "/", subscription);
    }

}
