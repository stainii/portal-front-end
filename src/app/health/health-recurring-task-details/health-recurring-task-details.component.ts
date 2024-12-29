import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {RecurringTask} from "@app/recurring-tasks/recurring-task.model";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-health-recurring-task-details',
  templateUrl: './health-recurring-task-details.component.html',
  styleUrls: ['./health-recurring-task-details.component.scss']
})
export class HealthRecurringTaskDetailsComponent implements OnInit {

    editorFormGroup: FormGroup;
    private readonly _recurringTask: RecurringTask;

    constructor(private _formBuilder: FormBuilder,
                public dialogRef: MatDialogRef<HealthRecurringTaskDetailsComponent>,
                @Inject(MAT_DIALOG_DATA) public data: any) {
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
