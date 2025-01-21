import {AfterViewInit, Component, ElementRef, OnDestroy, ViewChild} from '@angular/core';
import {MatLegacyPaginator as MatPaginator} from '@angular/material/legacy-paginator';
import {MatSort} from '@angular/material/sort';
import {ManageActivitiesService} from "@app/activity/manage-activities.service";
import {fromEvent, merge, Observable, of, Subject} from "rxjs";
import {catchError, debounceTime, map, startWith, switchMap, takeUntil} from "rxjs/operators";
import {Activity} from "@app/activity/activity.model";
import {BreakpointObserver, Breakpoints} from "@angular/cdk/layout";
import {MatLegacyDialog as MatDialog} from "@angular/material/legacy-dialog";
import {ActivityConfirmDeleteComponent} from "@app/activity/activity-confirm-delete/activity-confirm-delete.component";
import {MatLegacyTable as MatTable} from "@angular/material/legacy-table";


@Component({
    selector: 'app-activity-manage-list',
    templateUrl: './activity-manage-list.component.html',
    styleUrls: ['./activity-manage-list.component.scss']
})
export class ActivityManageListComponent implements AfterViewInit, OnDestroy {

    displayedColumns: string[] = ['name', 'location', 'description', 'actions'];
    isLoadingResults = false;
    data: Activity[] = [];

    isHandset$: Observable<boolean>;

    @ViewChild(MatPaginator)
    paginator: MatPaginator;

    @ViewChild(MatTable)
    table: MatTable<Activity>;

    @ViewChild(MatSort)
    sort: MatSort;

    @ViewChild("input")
    filter: ElementRef;

    private destroy$ = new Subject<void>();

    constructor(private manageActivitiesService: ManageActivitiesService, private breakpointObserver: BreakpointObserver,
                public dialog: MatDialog) {
        this.isHandset$ = this.breakpointObserver.observe(Breakpoints.Handset)
            .pipe(takeUntil(this.destroy$))
            .pipe(map(result => result.matches));
        this.isHandset$
            .pipe(takeUntil(this.destroy$))
            .subscribe(isHandSet => this.changeDisplayedColumns(isHandSet));
    }

    ngAfterViewInit() {
        let sortChangeEvent = this.sort.sortChange;
        let pageChangeEvent = this.paginator.page;
        let filterKeyUpEvent = fromEvent(this.filter.nativeElement, "keyup").pipe(debounceTime(1000));

        merge(sortChangeEvent, pageChangeEvent, filterKeyUpEvent)
            .pipe(
                takeUntil(this.destroy$),
                startWith({}),
                switchMap(() => {
                    this.isLoadingResults = true;
                    return this.manageActivitiesService!.find(
                        this.sort.active, this.sort.direction, this.paginator.pageIndex, this.paginator.pageSize, this.filter.nativeElement.value);
                }),
                map(data => {
                    // Flip flag to show that loading has finished.
                    this.isLoadingResults = false;
                    this.paginator.length = data.totalElements;
                    return data.content;
                }),
                catchError((error) => {
                    console.error(error);
                    this.isLoadingResults = false;
                    return of([]);
                })
            ).subscribe(data => this.data = data);

        sortChangeEvent
            .pipe(takeUntil(this.destroy$))
            .subscribe(() => this.paginator.pageIndex = 0);
    }

    ngOnDestroy(): void {
        this.destroy$.next();
    }

    deleteWhenConfirmed(activity: Activity) {
        const deleteDialog = this.dialog.open(ActivityConfirmDeleteComponent);

        deleteDialog.afterClosed()
            .pipe(takeUntil(this.destroy$))
            .subscribe(deleteConfirmed => {
            if (deleteConfirmed) {
                this.manageActivitiesService.delete(activity)
                    .pipe(takeUntil(this.destroy$))
                    .subscribe(() => {
                        this.data.splice(this.data.indexOf(activity), 1);
                        this.table.renderRows()
                    });
            }
        });
    }

    private changeDisplayedColumns(isHandSet: boolean) {
        if (isHandSet) {
            this.displayedColumns = ['name', 'actions'];
        } else {
            this.displayedColumns = ['name', 'location', 'description', 'actions'];
        }
    }

    formattedLocation(activity) {
        if (activity.location) {
            let parts = [activity.location.city, activity.location.province, activity.location.country];
            let formattedLocation = "";
            for (let part of parts) {
                if (part) {
                    if (formattedLocation != "") {
                        formattedLocation += ", ";
                    }
                    formattedLocation += part;
                }
            }
            return formattedLocation;
        }
        return "";
    }
}
