import {Component, EventEmitter, Input, OnInit, Output, SimpleChanges} from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, FormsModule, ReactiveFormsModule } from "@angular/forms";
import {Execution} from "@app/recurring-tasks/execution.model";
import {ActivatedRoute} from "@angular/router";
import moment from "moment";
import {Setlist} from "@app/setlist/setlist.model";
import {Song} from "@app/setlist/song.model";
import { MatFormField, MatLabel, MatSuffix } from '@angular/material/form-field';
import { MatSelect } from '@angular/material/select';
import { NgFor } from '@angular/common';
import { MatOption } from '@angular/material/core';
import { MatInput } from '@angular/material/input';
import { MatDatepickerInput, MatDatepickerToggle, MatDatepicker } from '@angular/material/datepicker';
import { MatButton } from '@angular/material/button';

@Component({
    selector: 'app-setlist-add-execution',
    templateUrl: './setlist-add-execution.component.html',
    styleUrls: ['./setlist-add-execution.component.scss'],
    imports: [FormsModule, ReactiveFormsModule, MatFormField, MatLabel, MatSelect, NgFor, MatOption, MatInput, MatDatepickerInput, MatDatepickerToggle, MatSuffix, MatDatepicker, MatButton]
})
export class SetlistAddExecutionComponent implements OnInit {

    addExecutionFormGroup: UntypedFormGroup;

    @Input()
    setlist: Setlist;

    @Output()
    onAddExecution = new EventEmitter<Execution>();

    constructor(private _formBuilder: UntypedFormBuilder,
                private _activatedRoute: ActivatedRoute) {
    }

    ngOnInit() {
        this.addExecutionFormGroup = this._formBuilder.group({
            selectedSong: '',
            selectedDate: moment()
        });

        if (this.setlist) {
            this._selectSong(this.setlist.songs[0]);
        }
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (!this.addExecutionFormGroup) {
            return;
        }

        for (let propName in changes) {
            if (propName == "setlist") {
                this.setlist.songs.forEach(song => {
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
        if (this.setlist && this.setlist.songs && this.setlist.songs.length > 0) {
            this.addExecutionFormGroup.controls['selectedSong']
                .setValue(song);
        }
    }

}
