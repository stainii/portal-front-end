import {Task} from './task.model';

describe('TaskService', () => {

    it('should apply patches in the correct order, when an newer patch is submitted', () => {
        const task = new Task();
        task.id = "12";
        task.name = 'test';
        task.context = 'myContext';
        task.history = [
            {
                id: "1",
                taskId: "12",
                dateTime: new Date("2019-12-20 10:00:00Z"),
                changes: {
                    name: "test"
                }
            },
            {
                id: "2",
                taskId: "12",
                dateTime: new Date("2019-12-24 10:00:00Z"),
                changes: {
                    context: "myContext"
                }
            }
        ];

        task.patch({
            id: "3",
            taskId: "12",
            dateTime: new Date("2019-12-26 10:00:00Z"),
            changes: {
                context: "new context"
            }
        });

        expect(task.history.length).toEqual(3);
        expect(task.id).toEqual("12");
        expect(task.name).toEqual("test");
        expect(task.context).toEqual("new context")
    });

    it('should apply patches in the correct order, even when an older patch is submitted', () => {
        const task = new Task();
        task.id = "12";
        task.name = 'test';
        task.context = 'myContext';
        task.history = [
            {
                id: "1",
                taskId: "12",
                dateTime: new Date("2019-12-20 10:00:00Z"),
                changes: {
                    name: "test"
                }
            },
            {
                id: "2",
                taskId: "12",
                dateTime: new Date("2019-12-26 10:00:00Z"),
                changes: {
                    context: "myContext"
                }
            }
        ];

        task.patch({
            id: "3",
            taskId: "12",
            dateTime: new Date("2019-12-24 10:00:00Z"),
            changes: {
                context: "new context"
            }
        });

        expect(task.history.length).toEqual(3);
        expect(task.id).toEqual("12");
        expect(task.name).toEqual("test");
        expect(task.context).toEqual("myContext")
    });


});
