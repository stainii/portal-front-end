import {Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class LocalStorageService {

    constructor() {
    }

    remove(key) {
        localStorage.removeItem(key);
    }

    store(key, value) {
        localStorage.setItem(key, JSON.stringify(value));
    }

    retrieve(key) {
        return JSON.parse(localStorage.getItem(key));
    }
}
