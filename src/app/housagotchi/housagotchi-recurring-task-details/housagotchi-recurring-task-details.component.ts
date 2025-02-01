import {Component, Inject, OnInit} from '@angular/core';
import {UntypedFormBuilder, UntypedFormGroup} from "@angular/forms";
import {MAT_DIALOG_DATA as MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {RecurringTask} from "@app/recurring-tasks/recurring-task.model";

@Component({
    selector: 'app-housagotchi-recurring-task-details',
    templateUrl: './housagotchi-recurring-task-details.component.html',
    styleUrls: ['./housagotchi-recurring-task-details.component.scss'],
    standalone: false
})
export class HousagotchiRecurringTaskDetailsComponent implements OnInit {

    editorFormGroup: UntypedFormGroup;
    private readonly _recurringTask: RecurringTask;

    constructor(private _formBuilder: UntypedFormBuilder,
                public dialogRef: MatDialogRef<HousagotchiRecurringTaskDetailsComponent>,
                @Inject(MAT_DIALOG_DATA) public data: any) {
        if (data) {
            this._recurringTask = data.recurringTask;
        }
    }

    ngOnInit() {
        this.editorFormGroup = this._formBuilder.group({
            name: this._recurringTask.name,
            minNumberOfDays: this._recurringTask.minNumberOfDaysBetweenExecutions,
            maxNumberOfDays: this._recurringTask.maxNumberOfDaysBetweenExecutions
        });
    }

    save() {
        this._recurringTask.name = this.editorFormGroup.value.name;
        this._recurringTask.minNumberOfDaysBetweenExecutions = this.editorFormGroup.value.minNumberOfDays;
        this._recurringTask.maxNumberOfDaysBetweenExecutions = this.editorFormGroup.value.maxNumberOfDays;
        if (this.editorFormGroup.valid) {
            this.dialogRef.close(this._recurringTask);
        }
    }
}
