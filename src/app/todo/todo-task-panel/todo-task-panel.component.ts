import {Component, input, output} from '@angular/core';
import {Task} from '@app/todo/task.model';
import {animate, keyframes, style, transition, trigger} from "@angular/animations";

import { MatExpansionPanel, MatExpansionPanelHeader, MatExpansionPanelTitle, MatExpansionPanelContent, MatExpansionPanelActionRow } from '@angular/material/expansion';
import { MatCardAvatar } from '@angular/material/card';
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';


const taskDone = [
    style({opacity: 1, height: "48px", offset: 0}),
    style({opacity: 0, height: "48px", transform: 'translate3d(2000px, 0, 0)', offset: 0.8}),
    style({opacity: 0, height: "0px", offset: 1})
];

@Component({
    selector: 'app-todo-task-panel',
    templateUrl: './todo-task-panel.component.html',
    styleUrls: ['./todo-task-panel.component.scss'],
    animations: [
        trigger('cardAnimator', [
            transition(':leave', animate(1000, keyframes(taskDone))),
        ])
    ],
    imports: [MatExpansionPanel, MatExpansionPanelHeader, MatCardAvatar, MatExpansionPanelTitle, MatExpansionPanelContent, MatExpansionPanelActionRow, MatButton, MatIcon]
})
export class TodoTaskPanelComponent {

    private static MIN_FILL_SIZE = 10;
    private static MAX_FILL_SIZE = 400;

    readonly task = input<Task>(undefined);

    public readonly onEdit = output<Task>();

    public readonly onComplete = output<Task>();

    destroyed: boolean;
    fillSize: number = TodoTaskPanelComponent.MIN_FILL_SIZE;

    // id of intervals, keeping them to cancel the intervals when necessary
    private revertFillInterval: any;
    private fillCompletelyInterval: any;

    fill($event) {
        this._cancelRevertFillInterval();

        let element = this._getElementToCalculateFillSizeOn($event.target);
        let positionOfFinger = $event.center.x - element.getBoundingClientRect().left;

        if (positionOfFinger > TodoTaskPanelComponent.MIN_FILL_SIZE) {
            this.fillSize = positionOfFinger;
        } else {
            this.fillSize = TodoTaskPanelComponent.MIN_FILL_SIZE;
        }
    }

    fillCompletely(callback) {
        if (this.fillCompletelyInterval != null) {
            return;
        }

        this._cancelRevertFillInterval();

        this.fillCompletelyInterval = setInterval(() => {
            if (this.fillSize < TodoTaskPanelComponent.MAX_FILL_SIZE) {
                this.fillSize = this.fillSize + 5;
            } else {
                callback();
                clearInterval(this.fillCompletelyInterval);
                this.fillCompletelyInterval = null;
            }
        }, 1);
    }


    revertFill() {
        setTimeout(() => {
            if (this.revertFillInterval != null || this.fillCompletelyInterval != null) {
                return;
            }

            this.revertFillInterval = setInterval(() => {
                if (this.fillSize > TodoTaskPanelComponent.MIN_FILL_SIZE) {
                    this.fillSize = this.fillSize - 1;
                } else {
                    this.fillSize = TodoTaskPanelComponent.MIN_FILL_SIZE;
                    this._cancelRevertFillInterval();
                }

            }, 1);

        }, 100);

    }

    showDetails() {
        this.onEdit.emit(this.task());
    }

    complete() {
        this.fillCompletely(() => {
            this.destroyed = true;
            this.onComplete.emit(this.task())
        });
    }

    private _cancelRevertFillInterval() {
        if (this.revertFillInterval != null) {
            clearInterval(this.revertFillInterval);
            this.revertFillInterval = null;
        }
    }

    private _getElementToCalculateFillSizeOn(element) {
        if (element.tagName == "MAT-EXPANSION-PANEL") {
            return element;
        } else {
            return this._getElementToCalculateFillSizeOn(element.parentElement);
        }
    }

}
