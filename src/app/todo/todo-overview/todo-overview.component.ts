import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {Task} from "@app/todo/task.model";
import {ActivatedRoute} from "@angular/router";
import {taskComparator} from "@app/todo/task.comparator";
import {takeUntil} from "rxjs/operators";
import {Subject} from "rxjs";

@Component({
    selector: 'app-todo-overview',
    templateUrl: './todo-overview.component.html',
    styleUrls: ['./todo-overview.component.scss'],
})
export class TodoOverviewComponent implements OnInit, OnDestroy {

    mostImportantTasks: Task[];
    lessImportantTasks: Task[];
    lessImportantTasksVisible: boolean;
    futureTasks: Task[];
    futureTasksVisible: boolean;

    private _allTasks: Task[];
    private context: string;
    private destroy$ = new Subject<void>();

    @Input()
    set tasks(tasks: Task[]) {
        this._allTasks = tasks;
        this.watchTasks();
        this.refreshTasksWhenPageRegainsFocus();
    };

    @Output()
    public onEdit: EventEmitter<Task> = new EventEmitter<Task>();

    @Output()
    public onComplete: EventEmitter<Task> = new EventEmitter<Task>();

    constructor(private _route: ActivatedRoute) {
    }

    ngOnInit() {
        this._route
            .queryParams
            .pipe(takeUntil(this.destroy$))
            .subscribe(params => {
                this.context = params.context;
                this.watchTasks();
            });
        this.lessImportantTasksVisible = false;
    }

    ngOnDestroy(): void {
        this.destroy$.next();
    }

    makeLessImportantTasksVisible() {
        this.lessImportantTasksVisible = true;
    }

    makeFutureTasksVisible() {
        this.futureTasksVisible = true;
    }

    edit(task: Task) {
        this.onEdit.emit(task);
    }

    complete(task: Task) {
        this.onComplete.emit(task);
    }

    private watchTasks() {
        let sortedTasks = this._allTasks
            .filter(task => task.status != "COMPLETED")
            .filter(task => !this.context || this.context == 'all' || task.context == this.context)
            .sort(taskComparator);

        let activeTasks = sortedTasks.filter(task => task.isActive());
        this.mostImportantTasks = activeTasks.slice(0,5);
        this.lessImportantTasks = activeTasks.slice(5);

        this.futureTasks = sortedTasks.filter(task => !task.isActive());
    }

    private refreshTasksWhenPageRegainsFocus() {
        document.addEventListener("visibilitychange", () => {
            if (document.visibilityState === "visible") {
                console.info("The page lost focus and regained it, recalculating filter on tasks.");
                this.watchTasks();
            }
        });
    }
}
