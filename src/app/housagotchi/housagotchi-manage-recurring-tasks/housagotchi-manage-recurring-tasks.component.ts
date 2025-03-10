import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import {RecurringTaskService} from "@app/recurring-tasks/recurring-task.service";
import {RecurringTask} from "@app/recurring-tasks/recurring-task.model";
import {MatDialog} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";
import {
    HousagotchiRecurringTaskDetailsComponent
} from "@app/housagotchi/housagotchi-recurring-task-details/housagotchi-recurring-task-details.component";
import {DEPLOYMENT_NAME} from "@app/housagotchi/housagotchi-constants";
import {takeUntil} from "rxjs/operators";
import {Subject} from "rxjs";

import { MatTable, MatColumnDef, MatHeaderCellDef, MatHeaderCell, MatCellDef, MatCell, MatHeaderRowDef, MatHeaderRow, MatRowDef, MatRow } from '@angular/material/table';
import { MatIcon } from '@angular/material/icon';
import { MatFabButton } from '@angular/material/button';

@Component({
    selector: 'app-housagotchi-manage-recurring-tasks',
    templateUrl: './housagotchi-manage-recurring-tasks.component.html',
    styleUrls: ['./housagotchi-manage-recurring-tasks.component.scss'],
    imports: [MatTable, MatColumnDef, MatHeaderCellDef, MatHeaderCell, MatCellDef, MatCell, MatIcon, MatHeaderRowDef, MatHeaderRow, MatRowDef, MatRow, MatFabButton]
})
export class HousagotchiManageRecurringTasksComponent implements OnInit, OnDestroy {
    private _recurringTaskService = inject(RecurringTaskService);
    private _snackBar = inject(MatSnackBar);
    private _dialog = inject(MatDialog);


    displayedColumns: string[] = ['name', 'minNumberOfDaysBetweenExecutions', 'maxNumberOfDaysBetweenExecutions', 'edit', 'delete',];
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
        const dialogRef = this._dialog.open(HousagotchiRecurringTaskDetailsComponent, {
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
