import {Component, OnDestroy, OnInit} from '@angular/core';
import {ModuleService} from "@app/module/module.service";
import {Module} from "@app/module/module.model";
import {Subject} from "rxjs";
import {takeUntil} from "rxjs/operators";

@Component({
    selector: 'app-menu',
    templateUrl: './menu.component.html',
    styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit, OnDestroy {

    modules: Module[];
    private destroy$ = new Subject<void>();

    constructor(private _moduleService: ModuleService) {
        this.modules = [];
    }

    ngOnInit() {
        this._moduleService
            .findModulesForLoggedInUser()
            .pipe(takeUntil(this.destroy$))
            .subscribe(modules => this.modules = modules);
    }

    ngOnDestroy(): void {
        this.destroy$.next();
    }

}
