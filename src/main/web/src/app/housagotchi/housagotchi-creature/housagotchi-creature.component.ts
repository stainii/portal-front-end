import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {ReportService} from "@app/housagotchi/report.service";
import {Report} from "@app/housagotchi/report.model";
import {RecurringTask} from "@app/housagotchi/recurring-task.model";

@Component({
    selector: 'app-housagotchi-creature',
    templateUrl: './housagotchi-creature.component.html',
    styleUrls: ['./housagotchi-creature.component.scss']
})
export class HousagotchiCreatureComponent implements OnInit, OnChanges {

    @Input()
    recurringTasks: RecurringTask[];

    report: Report;

    constructor(private _reportService: ReportService) {
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
