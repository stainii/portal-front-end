import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import {RecurringTask} from "@app/recurring-tasks/recurring-task.model";
import {RecurringTaskService} from "@app/recurring-tasks/recurring-task.service";
import {DEPLOYMENT_NAME} from "@app/health/health-constants";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MatDialog} from "@angular/material/dialog";
import {
    HealthRecurringTaskDetailsComponent
} from "@app/health/health-recurring-task-details/health-recurring-task-details.component";
import {takeUntil} from "rxjs/operators";
import {Subject} from "rxjs";

import { MatTable, MatColumnDef, MatHeaderCellDef, MatHeaderCell, MatCellDef, MatCell, MatHeaderRowDef, MatHeaderRow, MatRowDef, MatRow } from '@angular/material/table';
import { MatIcon } from '@angular/material/icon';
import { MatFabButton } from '@angular/material/button';

@Component({
    selector: 'app-health-manage-recurring-tasks',
    templateUrl: './health-manage-recurring-tasks.component.html',
    styleUrls: ['./health-manage-recurring-tasks.component.scss'],
    imports: [MatTable, MatColumnDef, MatHeaderCellDef, MatHeaderCell, MatCellDef, MatCell, MatIcon, MatHeaderRowDef, MatHeaderRow, MatRowDef, MatRow, MatFabButton]
})
export class HealthManageRecurringTasksComponent implements OnInit, OnDestroy {
    private _recurringTaskService = inject(RecurringTaskService);
    private _snackBar = inject(MatSnackBar);
    private _dialog = inject(MatDialog);


    displayedColumns: string[] = ['activity', 'restDays', 'edit', 'delete',];
    recurringTasks: RecurringTask[];
    private destroy$ = new Subject<void>();

    ngOnInit() {
        this._loadRecurringTasks();
    }

    ngOnDestroy(): void {
        this.destroy$.next();
    }

    edit(recurringTask: RecurringTask): void {
        this._showDialog(recurringTask);
    }

    create() {
        this._showDialog(new RecurringTask());
    }

    delete(recurringTask: RecurringTask) {
        this._recurringTaskService
            .delete(DEPLOYMENT_NAME, recurringTask)
            .pipe(takeUntil(this.destroy$))
            .subscribe(() => {
                this._loadRecurringTasks();
                this._snackBar.open(`${recurringTask.name} deleted`, "Ok!", {
                    duration: 2000,
                });
            });
    }

    private _loadRecurringTasks() {
        this._recurringTaskService
            .findAll(DEPLOYMENT_NAME)
            .pipe(takeUntil(this.destroy$))
            .subscribe(recurringTasks => this.recurringTasks = recurringTasks);
    }

    private _showDialog(recurringTask: RecurringTask) {
        const dialogRef = this._dialog.open(HealthRecurringTaskDetailsComponent, {
            width: '250px',
            data: {recurringTask: recurringTask}
        });

        dialogRef.afterClosed()
            .pipe(takeUntil(this.destroy$))
            .subscribe(result => {
                let isNew = !result.id;
                if (isNew) {
                    this._recurringTaskService.create(DEPLOYMENT_NAME, result)
                        .pipe(takeUntil(this.destroy$))
                        .subscribe(() => {
                            this._loadRecurringTasks();
                        });
                    this._snackBar.open(`${result.name} created!`, "Ok!", {
                        duration: 2000,
                    });
                } else {
                    this._recurringTaskService.update(DEPLOYMENT_NAME, result)
                        .pipe(takeUntil(this.destroy$))
                        .subscribe(() => {
                            this._loadRecurringTasks();
                            this._snackBar.open(`${result.name} updated!`, "Ok!", {
                                duration: 2000,
                            });
                        });
                }
            });
    }

}
