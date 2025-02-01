import {inject, TestBed} from '@angular/core/testing';

import { provideHttpClient, withInterceptorsFromDi } from "@angular/common/http";
import { HttpTestingController, provideHttpClientTesting } from "@angular/common/http/testing";
import {environment} from "@env/environment";
import {TaskTemplateService} from "@app/todo/task-template.service";
import {TaskTemplate} from "@app/todo/task-template.model";
import {TaskDefinition} from "@app/todo/task-definition.model";

describe('TaskTemplateService', () => {

    beforeEach(() => {
        TestBed.configureTestingModule({
    imports: [],
    providers: [
        TaskTemplateService,
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting()
    ]
});
    });

    it('should be created', inject([TaskTemplateService], (service: TaskTemplateService) => {
        expect(service).toBeTruthy();
    }));

    it('should create a task template and not change the context when it is already filled in', inject([TaskTemplateService, HttpTestingController], (service: TaskTemplateService, backend: HttpTestingController) => {
        const taskDefinition1 = new TaskDefinition();
        taskDefinition1.name = "task definition 1";
        taskDefinition1.context = 'myContext';

        const taskDefinition2 = new TaskDefinition();
        taskDefinition2.name = "task definition 2";
        taskDefinition2.context = 'myContext';

        const taskTemplate = new TaskTemplate();
        taskTemplate.id = "12";
        taskTemplate.name = 'test';
        taskTemplate.taskDefinitions = [taskDefinition1, taskDefinition2];

        service.create(taskTemplate).subscribe();

        let request = backend.expectOne({
            url: "/api/todo/api/template/",
            method: 'POST'
        });
        request.flush(taskTemplate);
    }));

    it('should create a task and not change the context to a default value when it is not filled in', inject([TaskTemplateService, HttpTestingController], (service: TaskTemplateService, backend: HttpTestingController) => {
        const taskDefinition1 = new TaskDefinition();
        taskDefinition1.name = "task definition 1";
        taskDefinition1.context = 'myContext';

        const taskDefinition2 = new TaskDefinition();
        taskDefinition2.name = "task definition 2";

        const taskTemplate = new TaskTemplate();
        taskTemplate.id = "12";
        taskTemplate.name = 'test';
        taskTemplate.taskDefinitions = [taskDefinition1, taskDefinition2];

        service.create(taskTemplate).subscribe();

        let request = backend.expectOne({
            url: "/api/todo/api/template/",
            method: 'POST'
        });
        request.flush(taskTemplate);

        expect(taskTemplate.taskDefinitions[0].context).toEqual("myContext");

        expect(environment.defaultTaskContext).not.toBeNull();
        expect(taskTemplate.taskDefinitions[1].context).toEqual(environment.defaultTaskContext);
    }));

    it('should create a task and not change the context to a default value when it is empty', inject([TaskTemplateService, HttpTestingController], (service: TaskTemplateService, backend: HttpTestingController) => {
        const taskDefinition1 = new TaskDefinition();
        taskDefinition1.name = "task definition 1";
        taskDefinition1.context = 'myContext';

        const taskDefinition2 = new TaskDefinition();
        taskDefinition2.name = "task definition 2";
        taskDefinition2.context = "";

        const taskTemplate = new TaskTemplate();
        taskTemplate.id = "12";
        taskTemplate.name = 'test';
        taskTemplate.taskDefinitions = [taskDefinition1, taskDefinition2];

        service.create(taskTemplate).subscribe();

        let request = backend.expectOne({
            url: "/api/todo/api/template/",
            method: 'POST'
        });
        request.flush(taskTemplate);

        expect(taskTemplate.taskDefinitions[0].context).toEqual("myContext");

        expect(environment.defaultTaskContext).not.toBeNull();
        expect(taskTemplate.taskDefinitions[1].context).toEqual(environment.defaultTaskContext);
    }));

    it('should update a task template and not change the context when it is already filled in', inject([TaskTemplateService, HttpTestingController], (service: TaskTemplateService, backend: HttpTestingController) => {
        const taskDefinition1 = new TaskDefinition();
        taskDefinition1.name = "task definition 1";
        taskDefinition1.context = 'myContext';

        const taskDefinition2 = new TaskDefinition();
        taskDefinition2.name = "task definition 2";
        taskDefinition2.context = 'myContext';

        const taskTemplate = new TaskTemplate();
        taskTemplate.id = "12";
        taskTemplate.name = 'test';
        taskTemplate.taskDefinitions = [taskDefinition1, taskDefinition2];

        service.update(taskTemplate).subscribe();

        let request = backend.expectOne({
            url: "/api/todo/api/template/12",
            method: 'PUT'
        });
        request.flush(taskTemplate);
    }));

    it('should update a task and not change the context to a default value when it is not filled in', inject([TaskTemplateService, HttpTestingController], (service: TaskTemplateService, backend: HttpTestingController) => {
        const taskDefinition1 = new TaskDefinition();
        taskDefinition1.name = "task definition 1";
        taskDefinition1.context = 'myContext';

        const taskDefinition2 = new TaskDefinition();
        taskDefinition2.name = "task definition 2";

        const taskTemplate = new TaskTemplate();
        taskTemplate.id = "12";
        taskTemplate.name = 'test';
        taskTemplate.taskDefinitions = [taskDefinition1, taskDefinition2];

        service.update(taskTemplate).subscribe();

        let request = backend.expectOne({
            url: "/api/todo/api/template/12",
            method: 'PUT'
        });
        request.flush(taskTemplate);

        expect(taskTemplate.taskDefinitions[0].context).toEqual("myContext");

        expect(environment.defaultTaskContext).not.toBeNull();
        expect(taskTemplate.taskDefinitions[1].context).toEqual(environment.defaultTaskContext);
    }));

    it('should update a task and not change the context to a default value when it is empty', inject([TaskTemplateService, HttpTestingController], (service: TaskTemplateService, backend: HttpTestingController) => {
        const taskDefinition1 = new TaskDefinition();
        taskDefinition1.name = "task definition 1";
        taskDefinition1.context = 'myContext';

        const taskDefinition2 = new TaskDefinition();
        taskDefinition2.name = "task definition 2";
        taskDefinition2.context = "";

        const taskTemplate = new TaskTemplate();
        taskTemplate.id = "12";
        taskTemplate.name = 'test';
        taskTemplate.taskDefinitions = [taskDefinition1, taskDefinition2];

        service.update(taskTemplate).subscribe();

        let request = backend.expectOne({
            url: "/api/todo/api/template/12",
            method: 'PUT'
        });
        request.flush(taskTemplate);

        expect(taskTemplate.taskDefinitions[0].context).toEqual("myContext");

        expect(environment.defaultTaskContext).not.toBeNull();
        expect(taskTemplate.taskDefinitions[1].context).toEqual(environment.defaultTaskContext);
    }));

});
