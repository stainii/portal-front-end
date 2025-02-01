import {Component, OnDestroy} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {Task} from "@app/todo/task.model";
import {TaskService} from "@app/todo/task.service";
import {Observable, Subject} from "rxjs";
import {ActivatedRoute} from "@angular/router";
import {TodoTaskDetailsComponent} from "@app/todo/todo-task-details/todo-task-details.component";
import {TaskTemplateEntry} from "@app/todo/task-template-entry.model";
import {
    TodoTaskTemplateEntryDetailsComponent
} from "@app/todo/todo-task-template-entry-details/todo-task-template-entry-details.component";
import {DialogResultNextAction} from "@app/todo/dialog-result.model";
import {ErrorService} from "@app/error/error.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {takeUntil} from "rxjs/operators";
import { TodoOverviewComponent } from '../todo-overview/todo-overview.component';
import { MatFabButton } from '@angular/material/button';
import { AsyncPipe } from '@angular/common';

@Component({
    selector: 'app-todo-app',
    templateUrl: './todo-app.component.html',
    styleUrls: ['./todo-app.component.scss'],
    imports: [TodoOverviewComponent, MatFabButton, AsyncPipe]
})
export class TodoAppComponent implements OnDestroy {

    tasks$: Observable<Task[]>;
    private destroy$ = new Subject<void>();

    constructor(private _taskService: TaskService,
                private _route: ActivatedRoute,
                public dialog: MatDialog,
                private _errorService: ErrorService,
                private _snackBar: MatSnackBar) {
        this.tasks$ = this._taskService.watchTasks();
    }

    ngOnDestroy(): void {
        this.destroy$.next();
    }

    complete(task: Task) {
        this._taskService.complete(task)
            .pipe(takeUntil(this.destroy$))
            .subscribe(
                taskPatchResult => {
                    this._snackBar.open("Task completed", "Undo", {
                        duration: 5000,
                    }).onAction()
                        .pipe(takeUntil(this.destroy$))
                        .subscribe(() => this._taskService.undo(taskPatchResult.taskPatch)
                            .pipe(takeUntil(this.destroy$))
                            .subscribe(() => console.info("Task patch reverted")));
                    console.log("Task " + task.id + " completed!");
                }, error => this._errorService.notify(error));
    }

    showDetails(task: Task) {
        setTimeout(() => {
            let dialogConfig = {
                data: task
            };

            let dialogRef = this.dialog.open(TodoTaskDetailsComponent, dialogConfig);

            dialogRef.afterClosed()
                .pipe(takeUntil(this.destroy$))
                .subscribe(result => {
                    if (result.nextAction == DialogResultNextAction.SAVE_TASK) {
                        this._taskService.update(result.data, task)
                            .pipe(takeUntil(this.destroy$))
                            .subscribe(taskPatchResult => {
                                this._snackBar.open("Task updated", "Undo", {
                                    duration: 5000,
                                }).onAction()
                                    .pipe(takeUntil(this.destroy$))
                                    .subscribe(() => this._taskService.undo(taskPatchResult.taskPatch)
                                        .pipe(takeUntil(this.destroy$))
                                        .subscribe(() => console.info("Task patch reverted")));
                                console.log("Task updated", result);
                            }, error => this._errorService.notify(error));
                    }
                });
        }, 1);
    }

    create() {
        setTimeout(() => {
            let dialogConfig = {
                data: new Task()
            };

            let dialogRef = this.dialog.open(TodoTaskDetailsComponent, dialogConfig);

            dialogRef.afterClosed()
                .pipe(takeUntil(this.destroy$))
                .subscribe(result => {
                    if (result.nextAction == DialogResultNextAction.SAVE_TASK) {
                        this._taskService.create(result.data)
                            .pipe(takeUntil(this.destroy$))
                            .subscribe(
                                task => {
                                    this._snackBar.open("Task created", "Undo", {
                                        duration: 5000,
                                    }).onAction()
                                        .pipe(takeUntil(this.destroy$))
                                        .subscribe(() => this._taskService.undo(task.history[0])
                                            .pipe(takeUntil(this.destroy$))
                                            .subscribe(() => console.info("Task patch reverted")));
                                    console.log("Task created", task)
                                }, error => this._errorService.notify(error));
                    } else if (result.nextAction == DialogResultNextAction.USE_A_TASK_TEMPLATE) {
                        this.createTaskWithTaskTemplate();
                    }
                });
        }, 1);
    }

    createTaskWithTaskTemplate() {
        console.log("create task with task template");

        setTimeout(() => {
            let dialogConfig = {
                data: new TaskTemplateEntry()
            };

            let dialogRef = this.dialog.open(TodoTaskTemplateEntryDetailsComponent, dialogConfig);

            dialogRef.afterClosed()
                .pipe(takeUntil(this.destroy$))
                .subscribe(result => {
                    if (result.nextAction == DialogResultNextAction.SAVE_TASK_TEMPLATE_ENTRY) {
                        this._taskService.createTasksBasedOn(result.data)
                            .pipe(takeUntil(this.destroy$))
                            .subscribe(
                                _ => console.log("Tasks created!"),
                                error => this._errorService.notify(error));
                    }
                });
        }, 1);
    }

}
