import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Execution} from "@app/recurring-tasks/execution.model";

@Injectable({
    providedIn: 'root'
})
export class ExecutionService {

    constructor(private _http: HttpClient) {

    }

    addExecution(deploymentName: string, execution: Execution) {
        return this._http.post(`/${deploymentName}/api/recurring-task/${execution.recurringTaskId}/execution/`, {
            date: execution.date.format("YYYY-MM-DDT00:00:00"),
            source: 'USER'
        });
    }


}
