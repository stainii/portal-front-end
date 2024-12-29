import {Task} from "@app/todo/task.model";
import {Importance} from "@app/todo/importance.model";
import * as moment from "moment";

describe('task', () => {

    it('should tell whether it has the type focus', () => {
        let task1 = new Task();
        task1.importance = Importance.VERY_IMPORTANT;
        task1.dueDateTime = moment().add(1, "day").toDate();
        expect(task1.hasType("focus")).toEqual(true);
        expect(task1.hasTypeFocus()).toEqual(true);

        let task2 = new Task();
        task2.importance = Importance.VERY_IMPORTANT;
        task2.dueDateTime = moment().add(10, "day").toDate();
        expect(task2.hasType("focus")).toEqual(false);
        expect(task2.hasTypeFocus()).toEqual(false);

        let task3 = new Task();
        task3.importance = Importance.VERY_IMPORTANT;
        task3.dueDateTime = null;
        expect(task3.hasType("focus")).toEqual(false);
        expect(task3.hasTypeFocus()).toEqual(false);

        let task4 = new Task();
        task4.importance = Importance.NOT_SO_IMPORTANT;
        task4.dueDateTime = moment().add(1, "day").toDate();
        expect(task4.hasType("focus")).toEqual(false);
        expect(task4.hasTypeFocus()).toEqual(false);

        let task5 = new Task();
        task5.importance = null;
        task5.dueDateTime = moment().add(1, "day").toDate();
        expect(task5.hasType("focus")).toEqual(false);
        expect(task5.hasTypeFocus()).toEqual(false);
    });

    it('should tell whether it has the type goals', () => {
        let task1 = new Task();
        task1.importance = Importance.VERY_IMPORTANT;
        task1.dueDateTime = moment().add(1, "day").toDate();
        expect(task1.hasType("goals")).toEqual(false);
        expect(task1.hasTypeGoals()).toEqual(false);

        let task2 = new Task();
        task2.importance = Importance.VERY_IMPORTANT;
        task2.dueDateTime = moment().add(10, "day").toDate();
        expect(task2.hasType("goals")).toEqual(true);
        expect(task2.hasTypeGoals()).toEqual(true);

        let task3 = new Task();
        task3.importance = Importance.VERY_IMPORTANT;
        task3.dueDateTime = null;
        expect(task3.hasType("goals")).toEqual(true);
        expect(task3.hasTypeGoals()).toEqual(true);

        let task4 = new Task();
        task4.importance = Importance.IMPORTANT;
        task4.dueDateTime = moment().add(1, "day").toDate();
        expect(task4.hasType("goals")).toEqual(false);
        expect(task4.hasTypeGoals()).toEqual(false);

        let task5 = new Task();
        task5.importance = Importance.IMPORTANT;
        task5.dueDateTime = moment().add(10, "day").toDate();
        expect(task5.hasType("goals")).toEqual(true);
        expect(task5.hasTypeGoals()).toEqual(true);

        let task6 = new Task();
        task6.importance = Importance.IMPORTANT;
        task6.dueDateTime = null;
        expect(task6.hasType("goals")).toEqual(true);
        expect(task6.hasTypeGoals()).toEqual(true);

        let task7 = new Task();
        task7.importance = Importance.NOT_SO_IMPORTANT;
        task7.dueDateTime = moment().add(1, "day").toDate();
        expect(task7.hasType("goals")).toEqual(false);
        expect(task7.hasTypeGoals()).toEqual(false);

        let task8 = new Task();
        task8.importance = null;
        task8.dueDateTime = moment().add(1, "day").toDate();
        expect(task8.hasType("goals")).toEqual(false);
        expect(task8.hasTypeGoals()).toEqual(false);
    });

    it('should tell whether it has the type fit-in', () => {
        let task1 = new Task();
        task1.importance = Importance.NOT_SO_IMPORTANT;
        task1.dueDateTime = moment().add(1, "day").toDate();
        expect(task1.hasType("fit-in")).toEqual(true);
        expect(task1.hasTypeFitIn()).toEqual(true);

        let task2 = new Task();
        task2.importance = Importance.NOT_SO_IMPORTANT;
        task2.dueDateTime = moment().add(10, "day").toDate();
        expect(task2.hasType("fit-in")).toEqual(false);
        expect(task2.hasTypeFitIn()).toEqual(false);

        let task3 = new Task();
        task3.importance = Importance.NOT_SO_IMPORTANT;
        task3.dueDateTime = null;
        expect(task3.hasType("fit-in")).toEqual(false);
        expect(task3.hasTypeFitIn()).toEqual(false);

        let task4 = new Task();
        task4.importance = Importance.VERY_IMPORTANT;
        task4.dueDateTime = moment().add(1, "day").toDate();
        expect(task4.hasType("fit-in")).toEqual(false);
        expect(task4.hasTypeFitIn()).toEqual(false);

        let task5 = new Task();
        task5.importance = Importance.IMPORTANT;
        task5.dueDateTime = moment().add(1, "day").toDate();
        expect(task5.hasType("fit-in")).toEqual(false);
        expect(task5.hasTypeFitIn()).toEqual(false);

        let task6 = new Task();
        task6.importance = Importance.I_DO_NOT_REALLY_CARE;
        task6.dueDateTime = moment().add(1, "day").toDate();
        expect(task6.hasType("fit-in")).toEqual(true);
        expect(task6.hasTypeFitIn()).toEqual(true);

        let task7 = new Task();
        task7.importance = Importance.I_DO_NOT_REALLY_CARE;
        task7.dueDateTime = moment().add(10, "day").toDate();
        expect(task7.hasType("fit-in")).toEqual(false);
        expect(task7.hasTypeFitIn()).toEqual(false);

        let task8 = new Task();
        task8.importance = null;
        task8.dueDateTime = moment().add(1, "day").toDate();
        expect(task8.hasType("fit-in")).toEqual(true);
        expect(task8.hasTypeFitIn()).toEqual(true);
    });

    it('should tell whether it has the type back-burner', () => {
        let task1 = new Task();
        task1.importance = Importance.I_DO_NOT_REALLY_CARE;
        task1.dueDateTime = moment().add(1, "day").toDate();
        expect(task1.hasType("back-burner")).toEqual(false);
        expect(task1.hasTypeBackBurner()).toEqual(false);

        let task2 = new Task();
        task2.importance = Importance.I_DO_NOT_REALLY_CARE;
        task2.dueDateTime = moment().add(10, "day").toDate();
        expect(task2.hasType("back-burner")).toEqual(true);
        expect(task2.hasTypeBackBurner()).toEqual(true);

        let task3 = new Task();
        task3.importance = Importance.I_DO_NOT_REALLY_CARE;
        task3.dueDateTime = moment().add(10, "day").toDate();
        expect(task3.hasType("back-burner")).toEqual(true);
        expect(task3.hasTypeBackBurner()).toEqual(true);

        let task4 = new Task();
        task4.importance = Importance.I_DO_NOT_REALLY_CARE;
        task4.dueDateTime = null;
        expect(task4.hasType("back-burner")).toEqual(true);
        expect(task4.hasTypeBackBurner()).toEqual(true);

        let task5 = new Task();
        task5.importance = Importance.VERY_IMPORTANT;
        task5.dueDateTime = moment().add(1, "day").toDate();
        expect(task5.hasType("back-burner")).toEqual(false);
        expect(task5.hasTypeBackBurner()).toEqual(false);

        let task6 = new Task();
        task6.importance = Importance.IMPORTANT;
        task6.dueDateTime = moment().add(1, "day").toDate();
        expect(task6.hasType("back-burner")).toEqual(false);
        expect(task6.hasTypeBackBurner()).toEqual(false);

        let task7 = new Task();
        task7.importance = Importance.NOT_SO_IMPORTANT;
        task7.dueDateTime = moment().add(10, "day").toDate();
        expect(task7.hasType("back-burner")).toEqual(true);
        expect(task7.hasTypeBackBurner()).toEqual(true);

        let task8 = new Task();
        task8.importance = Importance.NOT_SO_IMPORTANT;
        task8.dueDateTime = null;
        expect(task8.hasType("back-burner")).toEqual(true);
        expect(task8.hasTypeBackBurner()).toEqual(true);

        let task9 = new Task();
        task9.importance = null;
        task9.dueDateTime = moment().add(10, "day").toDate();
        expect(task9.hasType("back-burner")).toEqual(true);
        expect(task9.hasTypeBackBurner()).toEqual(true);
    });

    it('should return the remaining time', () => {
        let task = new Task();
        task.dueDateTime = moment().add(5, "day").toDate();
        expect(task.getRemainingTime()).toEqual("5 d");
    });

    it('should tell that the task is due when there is less than a day remaining time', () => {
        let task = new Task();
        task.dueDateTime = moment().toDate();
        expect(task.getRemainingTime()).toEqual("Due!");
    });

    it('should tell that the task is due when there is no more remaining time', () => {
        let task = new Task();
        task.dueDateTime = moment().subtract(5, "day").toDate();
        expect(task.getRemainingTime()).toEqual("Due!");
    });

    it("should tell that the task is active when it has no start datetime", () => {
       let task = new Task();
       expect(task.isActive()).toBe(true);
    });

    it("should tell that the task is active when its start date is in the past", () => {
        let task = new Task();
        task.startDateTime = moment().subtract(1, "day").toDate();
        expect(task.isActive()).toBe(true);
    });

    it("should tell that the task is active when its start date is today", () => {
        let task = new Task();
        task.startDateTime = moment().startOf("day").toDate();
        expect(task.isActive()).toBe(true);
    });

    it("should tell that the task is not active when its start date is tomorrow", () => {
        let task = new Task();
        task.startDateTime = moment().add(1, "day").toDate();
        expect(task.isActive()).toBe(false);
    });
});
