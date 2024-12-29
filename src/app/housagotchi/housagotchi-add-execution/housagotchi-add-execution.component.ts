import {Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges} from '@angular/core';
import * as moment from "moment";
import {UntypedFormBuilder, UntypedFormGroup} from "@angular/forms";
import {RecurringTask} from "@app/recurring-tasks/recurring-task.model";
import {Execution} from "@app/recurring-tasks/execution.model";
import {ActivatedRoute} from "@angular/router";
import {Subject} from "rxjs";
import {takeUntil} from "rxjs/operators";

@Component({
    selector: 'app-housagotchi-add-execution',
    templateUrl: './housagotchi-add-execution.component.html',
    styleUrls: ['./housagotchi-add-execution.component.scss']
})
export class HousagotchiAddExecutionComponent implements OnInit, OnChanges, OnDestroy {

    addExecutionFormGroup: UntypedFormGroup;

    @Input()
    recurringTasks: RecurringTask[];

    @Output()
    onAddExecution = new EventEmitter<Execution>();

    private destroy$ = new Subject<void>();

    constructor(private _formBuilder: UntypedFormBuilder,
                private _activatedRoute: ActivatedRoute) {
        this._activatedRoute.queryParams
            .pipe(takeUntil(this.destroy$))
            .subscribe(params => {
                let task = params['task'];
            });
    }

    ngOnInit() {
        this.addExecutionFormGroup = this._formBuilder.group({
            selectedRecurringTask: '',
            selectedDate: moment()
        });

        if (Array.isArray(this.recurringTasks)) {
            this._selectRecurringTask(this.recurringTasks[0]);
        }
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (!this.addExecutionFormGroup) {
            return;
        }

        for (let propName in changes) {
            if (propName == "recurringTasks") {
                this.recurringTasks.forEach(newTask => {
                    if (newTask.name == this.addExecutionFormGroup.value.selectedRecurringTask.name) {
                        this._selectRecurringTask(newTask);
                    }
                })
            }
        }
    }

    ngOnDestroy(): void {
        this.destroy$.next();
    }

    addExecution() {
        if (this.addExecutionFormGroup.valid) {
            this.onAddExecution.emit({
                recurringTaskId: this.addExecutionFormGroup.value.selectedRecurringTask.id,
                date: this.addExecutionFormGroup.value.selectedDate
            });
        }
    }

    private _selectRecurringTask(task: RecurringTask) {
        if (Array.isArray(this.recurringTasks) && this.recurringTasks.length > 0) {
            this.addExecutionFormGroup.controls['selectedRecurringTask']
                .setValue(task);
        }
    }

}
