import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import {TaskService} from "@app/todo/task.service";
import {map, takeUntil} from "rxjs/operators";
import {Observable, Subject} from "rxjs";
import {BreakpointObserver, Breakpoints} from "@angular/cdk/layout";
import { ActivatedRoute, Router, RouterLink } from "@angular/router";
import { AsyncPipe } from '@angular/common';
import { MatFormField } from '@angular/material/form-field';
import { MatSelect } from '@angular/material/select';
import { MatOption } from '@angular/material/core';
import { MatIcon } from '@angular/material/icon';

@Component({
    selector: 'app-todo-menu-bar-for-overview',
    templateUrl: './todo-menu-bar-for-overview.component.html',
    styleUrls: ['./todo-menu-bar-for-overview.component.scss'],
    imports: [MatFormField, MatSelect, MatOption, MatIcon, RouterLink, AsyncPipe]
})
export class TodoMenuBarForOverviewComponent implements OnInit, OnDestroy {
    private _taskService = inject(TaskService);
    private _breakpointObserver = inject(BreakpointObserver);
    private _route = inject(ActivatedRoute);
    private _router = inject(Router);


    contexts$: Observable<string[]>;
    selectedContext: string;

    isHandset$: Observable<boolean> = this._breakpointObserver.observe(Breakpoints.Handset)
        .pipe(map(result => result.matches));

    private destroy$ = new Subject<void>();

    ngOnInit() {
        this.contexts$ = this._taskService.watchTasks()
            .pipe(
                map(tasks => tasks.map(task => task.context)),
                map(contexts => Array.from(new Set(contexts))),
                map(contexts => contexts.filter(context => context?.length > 0)),
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
