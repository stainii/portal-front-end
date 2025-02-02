import { Injectable, inject } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import {TodoSubscription} from "./todo-subscription.model";

@Injectable({
    providedIn: 'root'
})
export class TodoSubscriptionService {
    private _http = inject(HttpClient);


    findAll() {
        return this._http.get<TodoSubscription[]>("/api/todo/api/subscription/");
    }

    create(subscription: TodoSubscription) {
        return this._http.post<TodoSubscription>("/api/todo/api/subscription/", subscription);
    }

    update(subscription: TodoSubscription) {
        return this._http.put<TodoSubscription>("/api/todo/api/subscription/" + subscription.id + "/", subscription);
    }

}
