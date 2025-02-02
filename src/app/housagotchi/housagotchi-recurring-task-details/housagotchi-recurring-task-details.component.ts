import { Component, OnInit, inject } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, FormsModule, ReactiveFormsModule } from "@angular/forms";
import {MAT_DIALOG_DATA as MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {RecurringTask} from "@app/recurring-tasks/recurring-task.model";
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatButton } from '@angular/material/button';

@Component({
    selector: 'app-housagotchi-recurring-task-details',
    templateUrl: './housagotchi-recurring-task-details.component.html',
    styleUrls: ['./housagotchi-recurring-task-details.component.scss'],
    imports: [FormsModule, ReactiveFormsModule, MatFormField, MatLabel, MatInput, MatButton]
})
export class HousagotchiRecurringTaskDetailsComponent implements OnInit {
    private _formBuilder = inject(UntypedFormBuilder);
    dialogRef = inject<MatDialogRef<HousagotchiRecurringTaskDetailsComponent>>(MatDialogRef);
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
