import {inject, TestBed} from '@angular/core/testing';
import {environment} from "@env/environment";
import {TaskService} from "@app/todo/task.service";
import {Task} from './task.model';
import {TaskPatchService} from "@app/todo/task-patch.service";
import {TaskRepository} from "@app/todo/task.repository";

let taskRepository;

describe('TaskService', () => {
    taskRepository = jasmine.createSpyObj("TaskRepository", ["create", "patch"]);

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                TaskService,
                TaskPatchService, // we use the actual task patch service
                {provide: TaskRepository, useValue: taskRepository},
            ]
        });
    });

    it('should be created', inject([TaskService], (service: TaskService) => {
        expect(service).toBeTruthy();
    }));

    it('should create a task and not change the context when it is already filled in', inject([TaskService], (service: TaskService) => {
        const task = new Task();
        task.id = "12";
        task.name = "test";
        task.context = "myContext";

        service.create(task);

        expect(taskRepository.create).toHaveBeenCalledWith(task);
        expect(task.context).toBe("myContext");
    }));

    it('should create a task and not change the context to a default value when it is not filled in', inject([TaskService], (service: TaskService) => {
        const task = new Task();
        task.id = "12";
        task.name = "test";

        service.create(task);

        expect(taskRepository.create).toHaveBeenCalledWith(task);
        expect(environment.defaultTaskContext).not.toBeNull();
        expect(task.context).toEqual(environment.defaultTaskContext);
    }));

    it('should create a task and not change the context to a default value when it is empty', inject([TaskService], (service: TaskService) => {
        const task = new Task();
        task.id = "12";
        task.name = "test";
        task.context = "";

        service.create(task);

        expect(taskRepository.create).toHaveBeenCalledWith(task);
        expect(environment.defaultTaskContext).not.toBeNull();
        expect(task.context).toEqual(environment.defaultTaskContext);
    }));

    it('should update a task and not change the context when it is already filled in', inject([TaskService], (service: TaskService) => {
        const originalTask = new Task();
        originalTask.id = "12";
        originalTask.name = 'test';
        originalTask.context = "testContext";

        const updatedTask = new Task();
        updatedTask.id = "12";
        updatedTask.name = 'test';
        updatedTask.context = 'newContext';

        service.update(updatedTask, originalTask);

        expect(taskRepository.patch).toHaveBeenCalled();
    }));

    it('should update a task and not change the context to a default value when it is not filled in', inject([TaskService], (service: TaskService) => {
        const originalTask = new Task();
        originalTask.id = "12";
        originalTask.name = 'test';
        originalTask.context = "testContext";

        const updatedTask = new Task();
        updatedTask.id = "12";
        updatedTask.name = "test";

        service.update(updatedTask, originalTask);

        expect(environment.defaultTaskContext).not.toBeNull();
        expect(updatedTask.context).toEqual(environment.defaultTaskContext);
        expect(taskRepository.patch).toHaveBeenCalled();
    }));

    it('should update a task and not change the context to a default value when it is empty', inject([TaskService], (service: TaskService) => {
        const originalTask = new Task();
        originalTask.id = "12";
        originalTask.name = 'test';
        originalTask.context = "testContext";

        const updatedTask = new Task();
        updatedTask.id = "12";
        updatedTask.name = 'test';
        updatedTask.context = "";

        service.update(updatedTask, originalTask);

        expect(environment.defaultTaskContext).not.toBeNull();
        expect(updatedTask.context).toEqual(environment.defaultTaskContext);
        expect(taskRepository.patch).toHaveBeenCalled();
    }));
});
