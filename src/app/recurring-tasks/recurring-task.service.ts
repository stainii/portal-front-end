import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {RecurringTask} from "@app/recurring-tasks/recurring-task.model";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";

@Injectable({
    providedIn: 'root'
})
export class RecurringTaskService {

    constructor(private _http: HttpClient) {
    }

    findAll(deploymentName: string): Observable<RecurringTask[]> {
        return this._http.get<RecurringTask[]>(`/api/${deploymentName}/api/recurring-task/`)
            .pipe(map(recurringTasks => recurringTasks.sort((recurringTask1, recurringTask2) => recurringTask1.name > recurringTask2.name ? 1 : -1)));
    }

    create(deploymentName: string, recurringTask: RecurringTask) {
        return this._http.post<RecurringTask[]>(`/api/${deploymentName}/api/recurring-task/`, recurringTask);
    }

    update(deploymentName: string, recurringTask: RecurringTask) {
        return this._http.put<RecurringTask[]>(`/api/${deploymentName}/api/recurring-task/${recurringTask.id}/`, recurringTask);
    }

    delete(deploymentName: string, recurringTask: RecurringTask) {
        return this._http.delete<RecurringTask[]>(`/api/${deploymentName}/api/recurring-task/${recurringTask.id}/`);
    }
}
