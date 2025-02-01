import {Component} from '@angular/core';
import {TaskTemplate} from "@app/todo/task-template.model";
import {TaskTemplateEntry} from "@app/todo/task-template-entry.model";
import {TaskTemplateService} from "@app/todo/task-template.service";
import {Observable} from "rxjs";
import {DialogResult, DialogResultNextAction} from "@app/todo/dialog-result.model";
import { MatDialogRef, MatDialogTitle, MatDialogContent } from "@angular/material/dialog";
import { CdkScrollable } from '@angular/cdk/scrolling';
import { MatStepper, MatStep, MatStepLabel } from '@angular/material/stepper';
import { MatFormField, MatLabel, MatSuffix } from '@angular/material/form-field';
import { MatSelect } from '@angular/material/select';
import { NgFor, NgIf, AsyncPipe } from '@angular/common';
import { MatOption } from '@angular/material/core';
import { MatInput } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatDatepickerInput, MatDatepickerToggle, MatDatepicker } from '@angular/material/datepicker';
import { MatButton } from '@angular/material/button';

@Component({
    selector: 'app-todo-task-template-entry-details',
    templateUrl: './todo-task-template-entry-details.component.html',
    styleUrls: ['./todo-task-template-entry-details.component.scss'],
    imports: [MatDialogTitle, CdkScrollable, MatDialogContent, MatStepper, MatStep, MatStepLabel, MatFormField, MatSelect, NgFor, MatOption, NgIf, MatLabel, MatInput, FormsModule, MatDatepickerInput, MatDatepickerToggle, MatSuffix, MatDatepicker, MatButton, AsyncPipe]
})
export class TodoTaskTemplateEntryDetailsComponent {

    taskTemplateEntry = new TaskTemplateEntry();
    taskTemplates$: Observable<TaskTemplate[]>;

    constructor(private _taskTemplateService: TaskTemplateService,
                public dialogRef: MatDialogRef<TodoTaskTemplateEntryDetailsComponent, DialogResult>) {
        this.taskTemplates$ = this._taskTemplateService.findAll()
    }

    close() {
        this.dialogRef.close({
            nextAction: DialogResultNextAction.NO_ACTION,
            data: null
        });
    }

    saveAndClose() {
        this.dialogRef.close({
            nextAction: DialogResultNextAction.SAVE_TASK_TEMPLATE_ENTRY,
            data: this.taskTemplateEntry
        });
    }

}
