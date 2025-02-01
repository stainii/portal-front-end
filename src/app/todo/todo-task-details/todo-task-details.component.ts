import {Component, Inject, OnInit} from '@angular/core';
import {Task} from '../task.model';
import {environment} from "@env/environment";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {RandomAdjectiveService} from "@app/funny-details/random-adjective.service";
import {DialogResult, DialogResultNextAction} from "@app/todo/dialog-result.model";
import {map} from "rxjs/operators";
import {TaskService} from "@app/todo/task.service";


@Component({
    selector: 'app-todo-task-details',
    templateUrl: './todo-task-details.component.html',
    styleUrls: ['./todo-task-details.component.scss'],
    standalone: false
})
export class TodoTaskDetailsComponent implements OnInit {

    DEFAULT_TASK_CONTEXT = environment.defaultTaskContext;
    task: Task;
    placeholderForTaskName: string;
    contexts$: any;

    constructor(public dialogRef: MatDialogRef<TodoTaskDetailsComponent, DialogResult>,
                private _randomAdjective: RandomAdjectiveService,
                private _taskService: TaskService,
                @Inject(MAT_DIALOG_DATA) data: Task) {
        this.task = Object.create(data);
        this.placeholderForTaskName = "My " + this._randomAdjective.lowercase() + " task";
    }

    ngOnInit(): void {
        this.contexts$ = this._taskService.watchTasks()
            .pipe(
                map(tasks => tasks.map(task => task.context)),
                map(contexts => Array.from(new Set(contexts))),
                map(contexts => contexts.filter(context => context?.length > 0)),
                map(contexts => contexts.sort())
            );
    }

    close() {
        this.dialogRef.close({
            nextAction: DialogResultNextAction.NO_ACTION,
            data: null
        });
    }

    saveAndClose() {
        if (this.task.name) {
            this.dialogRef.close({
                nextAction: DialogResultNextAction.SAVE_TASK,
                data: this.task
            });
        }
    }

    useATaskTemplateInstead() {
        this.dialogRef.close({
            nextAction: DialogResultNextAction.USE_A_TASK_TEMPLATE,
            data: null
        });
    }
}
