import { Component, OnInit, inject } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, FormsModule, ReactiveFormsModule } from "@angular/forms";
import {RecurringTask} from "@app/recurring-tasks/recurring-task.model";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatButton } from '@angular/material/button';

@Component({
    selector: 'app-health-recurring-task-details',
    templateUrl: './health-recurring-task-details.component.html',
    styleUrls: ['./health-recurring-task-details.component.scss'],
    imports: [FormsModule, ReactiveFormsModule, MatFormField, MatLabel, MatInput, MatButton]
})
export class HealthRecurringTaskDetailsComponent implements OnInit {
    private _formBuilder = inject(UntypedFormBuilder);
    dialogRef = inject<MatDialogRef<HealthRecurringTaskDetailsComponent>>(MatDialogRef);
    data = inject(MAT_DIALOG_DATA);


    editorFormGroup: UntypedFormGroup;
    private readonly _recurringTask: RecurringTask;

    constructor() {
        const data = this.data;

        if (data) {
            this._recurringTask = data.recurringTask;
        }
    }

    ngOnInit() {
        this.editorFormGroup = this._formBuilder.group({
            activity: this._recurringTask.name,
            restDays: this._recurringTask.minNumberOfDaysBetweenExecutions - 1, // x rest days = x + 1 min days between executions
        });
    }

    save() {
        this._recurringTask.name = this.editorFormGroup.value.activity;
        this._recurringTask.minNumberOfDaysBetweenExecutions = this.editorFormGroup.value.restDays + 1; // x rest days = x + 1 min days between executions
        this._recurringTask.maxNumberOfDaysBetweenExecutions = this.editorFormGroup.value.restDays + 1;
        if (this.editorFormGroup.valid) {
            this.dialogRef.close(this._recurringTask);
        }
    }

}
