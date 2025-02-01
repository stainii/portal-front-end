import {Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges} from '@angular/core';
import {UntypedFormBuilder, UntypedFormGroup} from "@angular/forms";
import {RecurringTask} from "@app/recurring-tasks/recurring-task.model";
import {Execution} from "@app/recurring-tasks/execution.model";
import moment from "moment";
import {Subject} from "rxjs";

@Component({
    selector: 'app-health-add-execution',
    templateUrl: './health-add-execution.component.html',
    styleUrls: ['./health-add-execution.component.scss']
})
export class HealthAddExecutionComponent implements OnInit, OnChanges, OnDestroy {

    addExecutionFormGroup: UntypedFormGroup;

    @Input()
    recurringTasks: RecurringTask[];

    @Output()
    onAddExecution = new EventEmitter<Execution>();

    private destroy$ = new Subject<void>();

    constructor(private _formBuilder: UntypedFormBuilder) {
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
