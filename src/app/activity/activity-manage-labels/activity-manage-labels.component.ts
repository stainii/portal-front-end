import {Component, ElementRef, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Observable, Subject} from "rxjs";
import {LabelService} from "@app/activity/label.service";
import {MatChipInputEvent} from "@angular/material/chips";
import {MatAutocomplete, MatAutocompleteSelectedEvent} from "@angular/material/autocomplete";
import {map, startWith, takeUntil} from "rxjs/operators";
import {UntypedFormControl} from "@angular/forms";
import {COMMA, ENTER} from "@angular/cdk/keycodes";

@Component({
    selector: 'app-activity-manage-labels',
    templateUrl: './activity-manage-labels.component.html',
    styleUrls: ['./activity-manage-labels.component.scss']
})
export class ActivityManageLabelsComponent implements OnInit, OnDestroy {

    existingLabels: string[] = [];
    filteredLabels: Observable<string[]>;

    @Input()
    labels: string[];

    labelCtrl = new UntypedFormControl();
    separatorKeysCodes: number[] = [ENTER, COMMA];

    @ViewChild('labelInput')
    labelInput: ElementRef<HTMLInputElement>;

    @ViewChild('auto')
    matAutocomplete: MatAutocomplete;

    private destroy$ = new Subject<void>();

    constructor(private labelService: LabelService) {
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
            this.labels.push(value.trim());
        }

        // Reset the input value
        if (input) {
            input.value = '';
        }

        this.labelCtrl.setValue(null);
    }

    remove(label: string): void {
        const index = this.labels.indexOf(label);

        if (index >= 0) {
            this.labels.splice(index, 1);
        }
    }

    selected(event: MatAutocompleteSelectedEvent): void {
        this.labels.push(event.option.viewValue);
        this.labelInput.nativeElement.value = '';
        this.labelCtrl.setValue(null);
    }

    private _filter(value: string): string[] {
        const filterValue = value.toLowerCase();
        return this.existingLabels.filter(label => label.toLowerCase().indexOf(filterValue) === 0);
    }
}
