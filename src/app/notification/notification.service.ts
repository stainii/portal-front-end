import { Injectable, inject } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import {Notification} from "./notification.model";

@Injectable({
    providedIn: 'root'
})
export class NotificationService {
    private _http = inject(HttpClient);


    findActiveNotifications() {
        return this._http.get<Notification[]>("/api/notifications/api/notification/?onlyUnread=true");
    }

    markAsRead(id: number) {
        return this._http.put("/api/notifications/api/notification/" + id + "/read/", {
            id: id,
            read: true
        });
    }

}
