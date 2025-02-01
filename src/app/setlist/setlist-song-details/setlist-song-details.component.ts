import {Component, Inject, OnInit} from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, FormsModule, ReactiveFormsModule } from "@angular/forms";
import {RecurringTask} from "@app/recurring-tasks/recurring-task.model";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatButton } from '@angular/material/button';

@Component({
    selector: 'app-setlist-song-details',
    templateUrl: './setlist-song-details.component.html',
    styleUrls: ['./setlist-song-details.component.scss'],
    imports: [FormsModule, ReactiveFormsModule, MatFormField, MatLabel, MatInput, MatButton]
})
export class SetlistSongDetailsComponent implements OnInit {

    editorFormGroup: UntypedFormGroup;
    private readonly _song: RecurringTask;

    constructor(private _formBuilder: UntypedFormBuilder,
                public dialogRef: MatDialogRef<SetlistSongDetailsComponent>,
                @Inject(MAT_DIALOG_DATA) public data: any) {
        if (data) {
            this._song = data.song;
        }
    }

    ngOnInit() {
        this.editorFormGroup = this._formBuilder.group({
            name: this._song.name,
            minNumberOfDays: this._song.minNumberOfDaysBetweenExecutions,
            maxNumberOfDays: this._song.maxNumberOfDaysBetweenExecutions
        });
    }

    save() {
        this._song.name = this.editorFormGroup.value.name;
        this._song.minNumberOfDaysBetweenExecutions = this.editorFormGroup.value.minNumberOfDays;
        this._song.maxNumberOfDaysBetweenExecutions = this.editorFormGroup.value.maxNumberOfDays;
        if (this.editorFormGroup.valid) {
            this.dialogRef.close(this._song);
        }
    }
}
