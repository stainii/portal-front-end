import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {SearchActivitiesService} from "@app/activity/search-activities.service";
import {fromEvent, Subject} from "rxjs";
import {distinctUntilChanged, map, takeUntil} from "rxjs/operators";
import {RandomAdjectiveService} from "@app/funny-details/random-adjective.service";

@Component({
    selector: 'app-activity-location',
    templateUrl: './activity-location.component.html',
    styleUrls: ['./activity-location.component.scss'],
    standalone: false
})
export class ActivityLocationComponent implements OnInit, OnDestroy {

    location: string;
    placeholder: string;

    private destroy$ = new Subject<void>();

    @ViewChild('locationElement')
    locationElement: ElementRef;

    constructor(private searchActivitiesService: SearchActivitiesService, private randomAdjectiveService: RandomAdjectiveService) {
    }

    ngOnInit(): void {
        this.location = this.searchActivitiesService.getLocation();
        this.placeholder = `My ${this.randomAdjectiveService.lowercase()} location`;
    }

    ngAfterViewInit(): void {
        fromEvent(this.locationElement.nativeElement, 'input')
            .pipe(
                takeUntil(this.destroy$),
                map((event: Event) => (event.target as HTMLInputElement).value),
                distinctUntilChanged()
            )
            .subscribe(data => this.updateLocation(data));
    }

    ngOnDestroy(): void {
        this.destroy$.next();
    }

    updateLocation(location: string) {
        this.searchActivitiesService.updateLocation(location);
    }

}
