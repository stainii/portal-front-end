import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {RecurringTask} from "@app/recurring-tasks/recurring-task.model";
import {Report} from "@app/health/report.model";
import {HealthReportService} from "@app/health/health-report.service";
import { NgIf, NgFor } from '@angular/common';
import { HealthBalloonComponent } from '../health-balloon/health-balloon.component';

@Component({
    selector: 'app-health-sporty-spice',
    templateUrl: './health-sporty-spice.component.html',
    styleUrls: ['./health-sporty-spice.component.scss'],
    imports: [NgIf, HealthBalloonComponent, NgFor]
})
export class HealthSportySpiceComponent implements OnInit, OnChanges {

    @Input()
    recurringTasks: RecurringTask[];

    report: Report;

    constructor(private _reportService: HealthReportService) {
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
