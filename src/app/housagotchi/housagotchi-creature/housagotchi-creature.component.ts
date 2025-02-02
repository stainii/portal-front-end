import { Component, Input, OnChanges, OnInit, SimpleChanges, inject } from '@angular/core';
import {HousagotchiReportService} from "@app/housagotchi/housagotchi-report.service";
import {Report} from "@app/housagotchi/report.model";
import {RecurringTask} from "@app/recurring-tasks/recurring-task.model";

import { HousagotchiBalloonComponent } from '../housagotchi-balloon/housagotchi-balloon.component';

@Component({
    selector: 'app-housagotchi-creature',
    templateUrl: './housagotchi-creature.component.html',
    styleUrls: ['./housagotchi-creature.component.scss'],
    imports: [HousagotchiBalloonComponent]
})
export class HousagotchiCreatureComponent implements OnInit, OnChanges {
    private _reportService = inject(HousagotchiReportService);


    @Input()
    recurringTasks: RecurringTask[];

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
        this.report = this._reportService.assemble(this.recurringTasks);
    }

}
