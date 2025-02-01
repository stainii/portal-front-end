import {Component, Inject, OnInit} from '@angular/core';
import {Task} from '../task.model';
import {environment} from "@env/environment";
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogTitle, MatDialogContent } from "@angular/material/dialog";
import {RandomAdjectiveService} from "@app/funny-details/random-adjective.service";
import {DialogResult, DialogResultNextAction} from "@app/todo/dialog-result.model";
import {map} from "rxjs/operators";
import {TaskService} from "@app/todo/task.service";
import { CdkScrollable } from '@angular/cdk/scrolling';
import { MatStepper, MatStep, MatStepLabel } from '@angular/material/stepper';
import { MatFormField, MatSuffix } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { NgIf, NgFor, AsyncPipe } from '@angular/common';
import { MatButton } from '@angular/material/button';
import { MatAutocompleteTrigger, MatAutocomplete } from '@angular/material/autocomplete';
import { MatOption } from '@angular/material/core';
import { MatSelect } from '@angular/material/select';
import { MatDatepickerInput, MatDatepickerToggle, MatDatepicker } from '@angular/material/datepicker';


@Component({
    selector: 'app-todo-task-details',
    templateUrl: './todo-task-details.component.html',
    styleUrls: ['./todo-task-details.component.scss'],
    imports: [MatDialogTitle, CdkScrollable, MatDialogContent, MatStepper, MatStep, MatStepLabel, MatFormField, MatInput, FormsModule, NgIf, MatButton, MatAutocompleteTrigger, MatAutocomplete, NgFor, MatOption, MatSelect, MatDatepickerInput, MatDatepickerToggle, MatSuffix, MatDatepicker, AsyncPipe]
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
