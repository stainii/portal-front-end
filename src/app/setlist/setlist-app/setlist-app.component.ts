import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import {RecurringTaskService} from "@app/recurring-tasks/recurring-task.service";
import {SetlistService} from "@app/setlist/setlist.service";
import {DEPLOYMENT_NAME} from "@app/setlist/setlist-constants";
import {map, takeUntil} from "rxjs/operators";
import {Setlist} from "@app/setlist/setlist.model";
import {Execution} from "@app/recurring-tasks/execution.model";
import {ExecutionService} from "@app/recurring-tasks/execution.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Subject} from "rxjs";
import { SetlistListComponent } from '../setlist-list/setlist-list.component';
import { SetlistAddExecutionComponent } from '../setlist-add-execution/setlist-add-execution.component';

@Component({
    selector: 'app-setlist-app',
    templateUrl: './setlist-app.component.html',
    styleUrls: ['./setlist-app.component.scss'],
    imports: [SetlistListComponent, SetlistAddExecutionComponent]
})
export class SetlistAppComponent implements OnInit, OnDestroy {
    private _recurringTaskService = inject(RecurringTaskService);
    private _setlistService = inject(SetlistService);
    private _executionService = inject(ExecutionService);
    private _snackBar = inject(MatSnackBar);


    public setlist: Setlist;
    private destroy$ = new Subject<void>();

    ngOnInit(): void {
        this._findSetlist();
    }

    ngOnDestroy(): void {
        this.destroy$.next();
    }

    private _findSetlist() {
        this._recurringTaskService.findAll(DEPLOYMENT_NAME)
            .pipe(
                takeUntil(this.destroy$),
                map(recurringTasks => this._setlistService.assemble(recurringTasks))
            )
            .subscribe(setlist => this.setlist = setlist);
    }

    addExecution(execution: Execution) {
        this._executionService.addExecution(DEPLOYMENT_NAME, execution)
            .pipe(takeUntil(this.destroy$))
            .subscribe(() => {
                this._snackBar.open("Done!", "Thank you!", {
                    duration: 2000,
                });
                this._findSetlist();
            });
    }

}
