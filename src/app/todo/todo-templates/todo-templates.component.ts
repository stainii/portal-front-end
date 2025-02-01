import {Component, OnDestroy} from '@angular/core';
import {TaskTemplate} from "@app/todo/task-template.model";
import {MatDialog} from "@angular/material/dialog";
import {
    TodoTaskTemplateDetailsComponent
} from "@app/todo/todo-task-template-details/todo-task-template-details.component";
import {TaskTemplateService} from "@app/todo/task-template.service";
import {Observable, Subject} from "rxjs";
import {takeUntil} from "rxjs/operators";

@Component({
    selector: 'app-todo-templates',
    templateUrl: './todo-templates.component.html',
    styleUrls: ['./todo-templates.component.scss'],
    standalone: false
})
export class TodoTemplatesComponent implements OnDestroy {

    allTaskTemplates$: Observable<TaskTemplate[]>;
    private destroy$ = new Subject<void>();

    constructor(public dialog: MatDialog,
                private _taskTemplateService: TaskTemplateService) {
        this.allTaskTemplates$ = _taskTemplateService.findAll();
    }

    ngOnDestroy(): void {
        this.destroy$.next();
    }

    showCreateDialog() {
        setTimeout(() => {
            let dialogConfig = {
                data: new TaskTemplate()
            };

            let dialogRef = this.dialog.open(TodoTaskTemplateDetailsComponent, dialogConfig);

            dialogRef.afterClosed()
                .pipe(takeUntil(this.destroy$))
                .subscribe(result => {
                    if (result) {
                        this._taskTemplateService.create(result)
                            .pipe(takeUntil(this.destroy$))
                            .subscribe(() => this.allTaskTemplates$ = this._taskTemplateService.findAll());
                    }
                });
        }, 1);
    }

    showEditDialog(taskTemplate: TaskTemplate) {
        setTimeout(() => {
            let dialogConfig = {
                data: taskTemplate
            };

            let dialogRef = this.dialog.open(TodoTaskTemplateDetailsComponent, dialogConfig);

            dialogRef.afterClosed()
                .pipe(takeUntil(this.destroy$))
                .subscribe(result => {
                    if (result) {
                        this._taskTemplateService.update(taskTemplate)
                            .pipe(takeUntil(this.destroy$))
                            .subscribe(() => this.allTaskTemplates$ = this._taskTemplateService.findAll());
                    }
                });
        }, 1);

    }

    delete(taskTemplate: TaskTemplate) {
        // no dialog shown here, just delete
        this._taskTemplateService.delete(taskTemplate)
            .pipe(takeUntil(this.destroy$))
            .subscribe(() => this.allTaskTemplates$ = this._taskTemplateService.findAll());
    }


}
