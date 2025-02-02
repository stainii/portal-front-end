import { Component, OnInit, SimpleChanges, inject, input, output } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, FormsModule, ReactiveFormsModule } from "@angular/forms";
import {Execution} from "@app/recurring-tasks/execution.model";
import {ActivatedRoute} from "@angular/router";
import moment from "moment";
import {Setlist} from "@app/setlist/setlist.model";
import {Song} from "@app/setlist/song.model";
import { MatFormField, MatLabel, MatSuffix } from '@angular/material/form-field';
import { MatSelect } from '@angular/material/select';

import { MatOption } from '@angular/material/core';
import { MatInput } from '@angular/material/input';
import { MatDatepickerInput, MatDatepickerToggle, MatDatepicker } from '@angular/material/datepicker';
import { MatButton } from '@angular/material/button';

@Component({
    selector: 'app-setlist-add-execution',
    templateUrl: './setlist-add-execution.component.html',
    styleUrls: ['./setlist-add-execution.component.scss'],
    imports: [FormsModule, ReactiveFormsModule, MatFormField, MatLabel, MatSelect, MatOption, MatInput, MatDatepickerInput, MatDatepickerToggle, MatSuffix, MatDatepicker, MatButton]
})
export class SetlistAddExecutionComponent implements OnInit {
    private _formBuilder = inject(UntypedFormBuilder);
    private _activatedRoute = inject(ActivatedRoute);


    addExecutionFormGroup: UntypedFormGroup;

    readonly setlist = input<Setlist>(undefined);

    readonly onAddExecution = output<Execution>();

    ngOnInit() {
        this.addExecutionFormGroup = this._formBuilder.group({
            selectedSong: '',
            selectedDate: moment()
        });

        const setlist = this.setlist();
        if (setlist) {
            this._selectSong(setlist.songs[0]);
        }
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (!this.addExecutionFormGroup) {
            return;
        }

        for (let propName in changes) {
            if (propName == "setlist") {
                this.setlist().songs.forEach(song => {
                    if (song.name == this.addExecutionFormGroup.value.selectedSong.name) {
                        this._selectSong(song);
                    }
                })
            }
        }
    }

    addExecution() {
        if (this.addExecutionFormGroup.valid) {
            this.onAddExecution.emit({
                recurringTaskId: this.addExecutionFormGroup.value.selectedSong.id,
                date: this.addExecutionFormGroup.value.selectedDate
            });
        }
    }

    private _selectSong(song: Song) {
        const setlist = this.setlist();
        if (setlist && setlist.songs && setlist.songs.length > 0) {
            this.addExecutionFormGroup.controls['selectedSong']
                .setValue(song);
        }
    }

}
