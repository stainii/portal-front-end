import {Component} from '@angular/core';
import {TaskTemplate} from "@app/todo/task-template.model";
import {TaskTemplateEntry} from "@app/todo/task-template-entry.model";
import {TaskTemplateService} from "@app/todo/task-template.service";
import {Observable} from "rxjs";
import {DialogResult, DialogResultNextAction} from "@app/todo/dialog-result.model";
import {MatDialogRef} from "@angular/material/dialog";

@Component({
    selector: 'app-todo-task-template-entry-details',
    templateUrl: './todo-task-template-entry-details.component.html',
    styleUrls: ['./todo-task-template-entry-details.component.scss'],
    standalone: false
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
