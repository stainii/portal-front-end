import { Component, OnChanges, OnDestroy, OnInit, SimpleChanges, inject, input, output } from '@angular/core';
import moment from "moment";
import { UntypedFormBuilder, UntypedFormGroup, FormsModule, ReactiveFormsModule } from "@angular/forms";
import {RecurringTask} from "@app/recurring-tasks/recurring-task.model";
import {Execution} from "@app/recurring-tasks/execution.model";
import {Subject} from "rxjs";
import { MatFormField, MatLabel, MatSuffix } from '@angular/material/form-field';
import { MatSelect } from '@angular/material/select';

import { MatOption } from '@angular/material/core';
import { MatInput } from '@angular/material/input';
import { MatDatepickerInput, MatDatepickerToggle, MatDatepicker } from '@angular/material/datepicker';
import { MatButton } from '@angular/material/button';

@Component({
    selector: 'app-housagotchi-add-execution',
    templateUrl: './housagotchi-add-execution.component.html',
    styleUrls: ['./housagotchi-add-execution.component.scss'],
    imports: [FormsModule, ReactiveFormsModule, MatFormField, MatLabel, MatSelect, MatOption, MatInput, MatDatepickerInput, MatDatepickerToggle, MatSuffix, MatDatepicker, MatButton]
})
export class HousagotchiAddExecutionComponent implements OnInit, OnChanges, OnDestroy {
    private _formBuilder = inject(UntypedFormBuilder);


    addExecutionFormGroup: UntypedFormGroup;

    readonly recurringTasks = input<RecurringTask[]>(undefined);

    readonly onAddExecution = output<Execution>();

    private destroy$ = new Subject<void>();

    ngOnInit() {
        this.addExecutionFormGroup = this._formBuilder.group({
            selectedRecurringTask: '',
            selectedDate: moment()
        });

        const recurringTasks = this.recurringTasks();
        if (Array.isArray(recurringTasks)) {
            this._selectRecurringTask(recurringTasks[0]);
        }
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (!this.addExecutionFormGroup) {
            return;
        }

        for (let propName in changes) {
            if (propName == "recurringTasks") {
                this.recurringTasks().forEach(newTask => {
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
        const recurringTasks = this.recurringTasks();
        if (Array.isArray(recurringTasks) && recurringTasks.length > 0) {
            this.addExecutionFormGroup.controls['selectedRecurringTask']
                .setValue(task);
        }
    }

}
