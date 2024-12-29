import {Component, Input, OnInit} from '@angular/core';
import {TaskDefinition} from "@app/todo/task-definition.model";
import {environment} from "@env/environment";

@Component({
    selector: 'app-todo-task-definition-details',
    templateUrl: './todo-task-definition-details.component.html',
    styleUrls: ['./todo-task-definition-details.component.scss']
})
export class TodoTaskDefinitionDetailsComponent implements OnInit {

    DEFAULT_TASK_CONTEXT = environment.defaultTaskContext;

    @Input()
    taskDefinition: TaskDefinition;

    constructor() {
    }

    ngOnInit() {
    }

}
