import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {HousagotchiReportService} from "@app/housagotchi/housagotchi-report.service";
import {Report} from "@app/housagotchi/report.model";
import {RecurringTask} from "@app/recurring-tasks/recurring-task.model";
import { NgIf, NgFor } from '@angular/common';
import { HousagotchiBalloonComponent } from '../housagotchi-balloon/housagotchi-balloon.component';

@Component({
    selector: 'app-housagotchi-creature',
    templateUrl: './housagotchi-creature.component.html',
    styleUrls: ['./housagotchi-creature.component.scss'],
    imports: [NgIf, HousagotchiBalloonComponent, NgFor]
})
export class HousagotchiCreatureComponent implements OnInit, OnChanges {

    @Input()
    recurringTasks: RecurringTask[];

    report: Report;

    constructor(private _reportService: HousagotchiReportService) {
    }

    ngOnInit() {
        this.updateReport();
    }

    ngOnChanges(changes: SimpleChanges): void {
        for (let propName in changes) {
            if (propName == "recurringTasks") {
                this.updateReport();
            }
        }
    }

    updateReport() {
        this.report = this._reportService.assemble(this.recurringTasks);
    }

}
