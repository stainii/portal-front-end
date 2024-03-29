import {Component, OnDestroy, OnInit} from '@angular/core';
import {TaskService} from "@app/todo/task.service";
import {map, takeUntil} from "rxjs/operators";
import {Observable, Subject} from "rxjs";
import {BreakpointObserver, Breakpoints} from "@angular/cdk/layout";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
    selector: 'app-todo-menu-bar-for-overview',
    templateUrl: './todo-menu-bar-for-overview.component.html',
    styleUrls: ['./todo-menu-bar-for-overview.component.scss']
})
export class TodoMenuBarForOverviewComponent implements OnInit, OnDestroy {

    contexts$: Observable<string[]>;
    selectedContext: string;

    isHandset$: Observable<boolean> = this._breakpointObserver.observe(Breakpoints.Handset)
        .pipe(map(result => result.matches));

    private destroy$ = new Subject<void>();

    constructor(private _taskService: TaskService, private _breakpointObserver: BreakpointObserver,
                private _route: ActivatedRoute, private _router: Router) {
    }

    ngOnInit() {
        this.contexts$ = this._taskService.watchTasks()
            .pipe(
                map(tasks => tasks.filter(task => task.isActive())),
                map(tasks => tasks.map(task => task.context)),
                map(contexts => Array.from(new Set(contexts))),
                map(contexts => contexts.sort())
            );

        this._route
            .queryParams
            .pipe(takeUntil(this.destroy$))
            .subscribe(params => this.selectedContext = params.context || 'all');
    }

    ngOnDestroy(): void {
        this.destroy$.next();
    }

    refreshTasks() {
        this._taskService.refreshTasks();
    }

    selectContext(context: string) {
        this._router.navigate([
                '/todo',
                {outlets: {primary: ['overview'], menuBar: ['overview']}}
            ], {queryParams: {context: context}});
    }
}
