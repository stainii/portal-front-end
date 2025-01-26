import {Component, Inject, OnInit} from '@angular/core';
import {UntypedFormBuilder, UntypedFormGroup} from "@angular/forms";
import {RecurringTask} from "@app/recurring-tasks/recurring-task.model";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-setlist-song-details',
  templateUrl: './setlist-song-details.component.html',
  styleUrls: ['./setlist-song-details.component.scss']
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
