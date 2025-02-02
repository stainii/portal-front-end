import { Component, ElementRef, OnDestroy, OnInit, inject, input, viewChild } from '@angular/core';
import {Observable, Subject} from "rxjs";
import {LabelService} from "@app/activity/label.service";
import { MatChipInputEvent, MatChipGrid, MatChipRow, MatChipRemove, MatChipInput } from "@angular/material/chips";
import { MatAutocomplete, MatAutocompleteSelectedEvent, MatAutocompleteTrigger } from "@angular/material/autocomplete";
import {map, startWith, takeUntil} from "rxjs/operators";
import { UntypedFormControl, FormsModule, ReactiveFormsModule } from "@angular/forms";
import {COMMA, ENTER} from "@angular/cdk/keycodes";
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { AsyncPipe } from '@angular/common';
import { MatIcon } from '@angular/material/icon';
import { MatOption } from '@angular/material/core';

@Component({
    selector: 'app-activity-manage-labels',
    templateUrl: './activity-manage-labels.component.html',
    styleUrls: ['./activity-manage-labels.component.scss'],
    imports: [MatFormField, MatLabel, MatChipGrid, MatChipRow, MatIcon, MatChipRemove, FormsModule, MatAutocompleteTrigger, MatChipInput, ReactiveFormsModule, MatAutocomplete, MatOption, AsyncPipe]
})
export class ActivityManageLabelsComponent implements OnInit, OnDestroy {
    private labelService = inject(LabelService);


    existingLabels: string[] = [];
    filteredLabels: Observable<string[]>;

    readonly labels = input<string[]>(undefined);

    labelCtrl = new UntypedFormControl();
    separatorKeysCodes: number[] = [ENTER, COMMA];

    readonly labelInput = viewChild<ElementRef<HTMLInputElement>>('labelInput');

    readonly matAutocomplete = viewChild<MatAutocomplete>('auto');

    private destroy$ = new Subject<void>();

    constructor() {
        this.filteredLabels = this.labelCtrl.valueChanges.pipe(
            startWith(null),
            map((label: string | null) => label ? this._filter(label) : this.existingLabels.slice()));
    }

    ngOnInit(): void {
        this.labelService.findAllLabels()
            .pipe(takeUntil(this.destroy$))
            .subscribe(labels =>
                this.existingLabels = labels
            );
    }

    ngOnDestroy(): void {
        this.destroy$.next();
    }

    add(event: MatChipInputEvent): void {
        const input = event.input;
        const value = event.value;

        if ((value || '').trim()) {
            this.labels().push(value.trim());
        }

        // Reset the input value
        if (input) {
            input.value = '';
        }

        this.labelCtrl.setValue(null);
    }

    remove(label: string): void {
        const index = this.labels().indexOf(label);

        if (index >= 0) {
            this.labels().splice(index, 1);
        }
    }

    selected(event: MatAutocompleteSelectedEvent): void {
        this.labels().push(event.option.viewValue);
        this.labelInput().nativeElement.value = '';
        this.labelCtrl.setValue(null);
    }

    private _filter(value: string): string[] {
        const filterValue = value.toLowerCase();
        return this.existingLabels.filter(label => label.toLowerCase().indexOf(filterValue) === 0);
    }
}
