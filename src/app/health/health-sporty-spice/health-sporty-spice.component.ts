import { Component, OnChanges, OnInit, SimpleChanges, inject, input } from '@angular/core';
import {RecurringTask} from "@app/recurring-tasks/recurring-task.model";
import {Report} from "@app/health/report.model";
import {HealthReportService} from "@app/health/health-report.service";

import { HealthBalloonComponent } from '../health-balloon/health-balloon.component';

@Component({
    selector: 'app-health-sporty-spice',
    templateUrl: './health-sporty-spice.component.html',
    styleUrls: ['./health-sporty-spice.component.scss'],
    imports: [HealthBalloonComponent]
})
export class HealthSportySpiceComponent implements OnInit, OnChanges {
    private _reportService = inject(HealthReportService);


    readonly recurringTasks = input<RecurringTask[]>(undefined);

    report: Report;

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
        this.report = this._reportService.assemble(this.recurringTasks());
    }


}
