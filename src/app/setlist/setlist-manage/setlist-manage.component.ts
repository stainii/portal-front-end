import {Component, OnDestroy, OnInit} from '@angular/core';
import {RecurringTask} from "@app/recurring-tasks/recurring-task.model";
import {RecurringTaskService} from "@app/recurring-tasks/recurring-task.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MatDialog} from "@angular/material/dialog";
import {DEPLOYMENT_NAME} from "@app/setlist/setlist-constants";
import {SetlistSongDetailsComponent} from "@app/setlist/setlist-song-details/setlist-song-details.component";
import {takeUntil} from "rxjs/operators";
import {Subject} from "rxjs";

import { MatTable, MatColumnDef, MatHeaderCellDef, MatHeaderCell, MatCellDef, MatCell, MatHeaderRowDef, MatHeaderRow, MatRowDef, MatRow } from '@angular/material/table';
import { MatIcon } from '@angular/material/icon';
import { MatFabButton } from '@angular/material/button';

@Component({
    selector: 'app-setlist-manage',
    templateUrl: './setlist-manage.component.html',
    styleUrls: ['./setlist-manage.component.scss'],
    imports: [MatTable, MatColumnDef, MatHeaderCellDef, MatHeaderCell, MatCellDef, MatCell, MatIcon, MatHeaderRowDef, MatHeaderRow, MatRowDef, MatRow, MatFabButton]
})
export class SetlistManageComponent implements OnInit, OnDestroy {

    displayedColumns: string[] = ['name', 'minNumberOfDaysBetweenExecutions', 'maxNumberOfDaysBetweenExecutions', 'edit', 'delete',];
    setlist: RecurringTask[];
    private destroy$ = new Subject<void>();

    constructor(private _recurringTaskService: RecurringTaskService,
                private _snackBar: MatSnackBar,
                private _dialog: MatDialog) {
    }

    ngOnInit() {
        this._loadSetlist();
    }

    ngOnDestroy(): void {
        this.destroy$.next();
    }

    edit(song: RecurringTask): void {
        this._showDialog(song);
    }

    create() {
        this._showDialog(new RecurringTask());
    }

    delete(song: RecurringTask) {
        this._recurringTaskService
            .delete(DEPLOYMENT_NAME, song)
            .pipe(takeUntil(this.destroy$))
            .subscribe(() => {
                this._loadSetlist();
                this._snackBar.open(`${song.name} deleted`, "Ok!", {
                    duration: 2000,
                });
            });
    }

    private _loadSetlist() {
        this._recurringTaskService
            .findAll(DEPLOYMENT_NAME)
            .subscribe(setlist => this.setlist = setlist);
    }

    private _showDialog(song: RecurringTask) {
        const dialogRef = this._dialog.open(SetlistSongDetailsComponent, {
            width: '250px',
            data: {song: song}
        });

        dialogRef.afterClosed()
            .pipe(takeUntil(this.destroy$))
            .subscribe(result => {
                let isNew = !result.id;
                if (isNew) {
                    this._recurringTaskService.create(DEPLOYMENT_NAME, result)
                        .pipe(takeUntil(this.destroy$))
                        .subscribe(() => {
                            this._loadSetlist();
                        });
                    this._snackBar.open(`${result.name} created!`, "Ok!", {
                        duration: 2000,
                    });
                } else {
                    this._recurringTaskService.update(DEPLOYMENT_NAME, result)
                        .pipe(takeUntil(this.destroy$))
                        .subscribe(() => {
                            this._loadSetlist();
                            this._snackBar.open(`${result.name} updated!`, "Ok!", {
                                duration: 2000,
                            });
                        });
                }
            });
    }

}
