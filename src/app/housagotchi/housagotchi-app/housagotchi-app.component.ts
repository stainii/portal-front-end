import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import {ExecutionService} from "@app/recurring-tasks/execution.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {RecurringTaskService} from "@app/recurring-tasks/recurring-task.service";
import {Execution} from "@app/recurring-tasks/execution.model";
import {RecurringTask} from "@app/recurring-tasks/recurring-task.model";
import {DEPLOYMENT_NAME} from "@app/housagotchi/housagotchi-constants";
import {takeUntil} from "rxjs/operators";
import {Subject} from "rxjs";

import { HousagotchiCreatureComponent } from '../housagotchi-creature/housagotchi-creature.component';
import { HousagotchiAddExecutionComponent } from '../housagotchi-add-execution/housagotchi-add-execution.component';

@Component({
    selector: 'app-housagotchi-app',
    templateUrl: './housagotchi-app.component.html',
    styleUrls: ['./housagotchi-app.component.scss'],
    imports: [HousagotchiCreatureComponent, HousagotchiAddExecutionComponent]
})
export class HousagotchiAppComponent implements OnInit, OnDestroy {
    private _executionService = inject(ExecutionService);
    private _snackBar = inject(MatSnackBar);
    private _recurringTaskService = inject(RecurringTaskService);


    recurringTasks: RecurringTask[];

    private destroy$ = new Subject<void>();

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
