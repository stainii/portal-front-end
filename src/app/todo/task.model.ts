import {TaskPatch} from "@app/todo/task-patch.model";
import {TaskStatus} from "@app/todo/task-status.model";
import {Importance} from "@app/todo/importance.model";
import * as moment from "moment";

export class Task {
    public id: string;
    public name: string;
    public creationDateTime: Date;
    public startDateTime: Date;
    public dueDateTime: Date;
    public expectedDurationInHours: number;
    public context: string;
    public importance: Importance;
    public description: string;
    public status: TaskStatus;
    public history: TaskPatch[];

    public hasType(type: string) {
        switch (type) {
            case 'focus':
                return this.hasTypeFocus();
            case 'goals':
                return this.hasTypeGoals();
            case 'fit-in':
                return this.hasTypeFitIn();
            case 'back-burner':
                return this.hasTypeBackBurner();
            default:
                throw new Error("Could not determine if task has type " + type);
        }

    }

    public hasTypeFocus() {
        return (this.importance == Importance.IMPORTANT || this.importance == Importance.VERY_IMPORTANT)
                && (this.dueDateTime != null && this.dueDateIsGettingNear());
    }

    public hasTypeGoals() {
        return (this.importance == Importance.IMPORTANT || this.importance == Importance.VERY_IMPORTANT) && !this.hasTypeFocus();
    }

    public hasTypeFitIn() {
        return (!this.importance || this.importance == Importance.I_DO_NOT_REALLY_CARE || this.importance == Importance.NOT_SO_IMPORTANT) && this.dueDateTime != null && this.dueDateIsGettingNear();
    }

    public hasTypeBackBurner() {
        return !this.hasTypeFitIn() && (!this.importance || this.importance == Importance.I_DO_NOT_REALLY_CARE || this.importance == Importance.NOT_SO_IMPORTANT)
    }

    private dueDateIsGettingNear() {
        return moment(this.dueDateTime).diff(moment(), "days") < 7;
    }

    getRemainingTime() {
        if (!this.dueDateTime) {
            return "";
        }

        let remainingDays = moment(this.dueDateTime).diff(moment().startOf("day"), "days");
        if (remainingDays > 0) {
            return `${remainingDays} d`;
        } else {
            return "Due!";
        }
    }

    patch(patch: TaskPatch) {
        // first, add the patch to the history of the task
        if (this.history) {
            this.history.push(patch)
        } else {
            this.history = [patch];
        }

        // sort history
        this.history = this.history
            .sort((a, b) => a.dateTime.valueOf() - b.dateTime.valueOf())

        this._replayHistory();
    }

    rollback(patch: TaskPatch) {
        this.history = this.history.filter(p => p != patch);
        this._replayHistory();
    }

    private _replayHistory() {
        // clear all properties
        Object.keys(this)
            .filter(key => key != "history" && key != "id")
            .forEach(key => this[key] = null);

        // then, replay all history
        this.history
            .forEach(p => {
                Object.keys(p.changes)
                    .forEach(key => {
                        this[key] = p.changes[key];
                    });
            });
    }

    isActive() {
        return !this.startDateTime || moment(this.startDateTime).isBefore(moment().add(1, "day").startOf("day"));
    }

}
