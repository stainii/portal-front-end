import {Task} from "@app/todo/task.model";
import {Importance} from "@app/todo/importance.model";
import * as moment from "moment";

/**
 * Function that can be used to sort tasks based on their urgency and importance.
 * Morge Urgent/important tasks are put in the front of the list
 * @param task1 first task to compare
 * @param task2 second task to compare
 * @return number. If number < 0, task1 is more urgent/important than task2 and should be put before task 2 in the list.
 *                  0 means they are equally important.
 *                  Number > 1 means that task1 is less urgent/important than task2 and should be put after task 2 in the list.
 */
export const taskComparator = (task1: Task, task2: Task) => {
    let pointsForUrgency = (task: Task) => {
        if (!task.dueDateTime) {
            // non-important tasks without an end date can be done anytime. Important tasks though, are assumed to be urgent enough to be done within the month
            if (task.importance == Importance.IMPORTANT || task.importance == Importance.VERY_IMPORTANT) {
                return 20;
            } else {
                return 0;
            }
        }

        let today = moment();
        let dueDateOfTask = moment(task.dueDateTime);
        let numberOfDaysBetweenTasks = dueDateOfTask.diff(today.startOf("day"), "day");

        if (numberOfDaysBetweenTasks < 0) { // it should have been done already!
            return 50;
        }

        let points = 50 + (task.expectedDurationInHours ? task.expectedDurationInHours / 4 : 0) - numberOfDaysBetweenTasks;

        if (points < 0) {
            return 0;
        }
        if (points > 50) {
            return 50;
        }
        return points;

    }

    let pointsForImportance = (task: Task) => {
        switch (task.importance) {
            case Importance.I_DO_NOT_REALLY_CARE:
                return 0;
            case Importance.NOT_SO_IMPORTANT:
                return 15;
            case null:
                return 20;
            case Importance.IMPORTANT:
                return 30;
            case Importance.VERY_IMPORTANT:
                return 50;
        }
    }

    let pointsForExceptions = (task: Task) => {
        // if a task is overdue, assign more points
        let today = moment();
        if (task.dueDateTime && moment(task.dueDateTime).isBefore(today)) {
            switch (task.importance) {
                case Importance.I_DO_NOT_REALLY_CARE:
                    return 5;
                case Importance.NOT_SO_IMPORTANT:
                    return 10;
                case null:
                    return 25;
                case Importance.IMPORTANT:
                    return 25;
                case Importance.VERY_IMPORTANT:
                    return 30;
            }
        }

        return 0;
    }

    let calculatePointsForTask = (task: Task): number => {
        let points = 0;
        // max 50 points from urgency, max 50 points for urgency and extra points for special cases (overdue tasks, for example)
        points += pointsForUrgency(task);
        points += pointsForImportance(task);
        points += pointsForExceptions(task);

        return points;
    };

    let pointsForTask1 = calculatePointsForTask(task1);
    let pointsForTask2 = calculatePointsForTask(task2);

    // if the two tasks have the same amount of points, the earliest created task comes first
    if (pointsForTask1 == pointsForTask2) {
        if (moment(task1.creationDateTime).isBefore(moment(task2.creationDateTime))) {
            pointsForTask1++;
        } else if (moment(task2.creationDateTime).isBefore(moment(task1.creationDateTime))) {
            pointsForTask2++;
        }
    }

    return pointsForTask2 - pointsForTask1;
};
