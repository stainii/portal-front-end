import {Injectable} from '@angular/core';
import { HttpClient } from "@angular/common/http";
import {environment} from "@env/environment";
import {TaskTemplate} from "@app/todo/task-template.model";

@Injectable({
    providedIn: 'root'
})
export class TaskTemplateService {

    constructor(private _http: HttpClient) {
    }

    findAll() {
        return this._http.get<TaskTemplate[]>("/api/todo/api/template/");
    }

    create(taskTemplate: TaskTemplate) {
        for (let taskDefinition of taskTemplate.taskDefinitions) {
            if (!taskDefinition.context) {
                taskDefinition.context = environment.defaultTaskContext;
            }
        }
        return this._http.post<TaskTemplate>("/api/todo/api/template/", taskTemplate);
    }

    update(taskTemplate: TaskTemplate) {
        for (let taskDefinition of taskTemplate.taskDefinitions) {
            if (!taskDefinition.context) {
                taskDefinition.context = environment.defaultTaskContext;
            }
        }
        return this._http.put<TaskTemplate>("/api/todo/api/template/" + taskTemplate.id, taskTemplate);
    }

    delete(taskTemplate: TaskTemplate) {
        return this._http.delete<TaskTemplate>("/api/todo/api/template/" + taskTemplate.id);
    }
}
