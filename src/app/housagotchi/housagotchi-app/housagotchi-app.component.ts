import {Component, OnDestroy, OnInit} from '@angular/core';
import {ExecutionService} from "@app/recurring-tasks/execution.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {RecurringTaskService} from "@app/recurring-tasks/recurring-task.service";
import {Execution} from "@app/recurring-tasks/execution.model";
import {RecurringTask} from "@app/recurring-tasks/recurring-task.model";
import {DEPLOYMENT_NAME} from "@app/housagotchi/housagotchi-constants";
import {takeUntil} from "rxjs/operators";
import {Subject} from "rxjs";

@Component({
    selector: 'app-housagotchi-app',
    templateUrl: './housagotchi-app.component.html',
    styleUrls: ['./housagotchi-app.component.scss'],
    standalone: false
})
export class HousagotchiAppComponent implements OnInit, OnDestroy {

    recurringTasks: RecurringTask[];

    private destroy$ = new Subject<void>();

    constructor(private _executionService: ExecutionService,
                private _snackBar: MatSnackBar,
                private _recurringTaskService: RecurringTaskService) {
    }

    ngOnInit() {
        this._findAllRecurringTasks();
    }

    ngOnDestroy(): void {
        this.destroy$.next();
    }

    addExecution(execution: Execution) {
        this._executionService.addExecution(DEPLOYMENT_NAME, execution)
            .pipe(takeUntil(this.destroy$))
            .subscribe(() => {
                this._snackBar.open("Done!", "Thank you!", {
                    duration: 2000,
                });
                this._findAllRecurringTasks();
            });
    }

    _findAllRecurringTasks() {
        this._recurringTaskService
            .findAll(DEPLOYMENT_NAME)
            .pipe(takeUntil(this.destroy$))
            .subscribe(recurringTasks => this.recurringTasks = recurringTasks);
    }

}
