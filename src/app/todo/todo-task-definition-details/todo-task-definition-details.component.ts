import {Component, OnInit, input} from '@angular/core';
import {TaskDefinition} from "@app/todo/task-definition.model";
import {environment} from "@env/environment";
import { MatStepper, MatStep, MatStepLabel } from '@angular/material/stepper';
import { MatFormField } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatTooltip } from '@angular/material/tooltip';
import { MatSelect } from '@angular/material/select';
import { MatOption } from '@angular/material/core';

@Component({
    selector: 'app-todo-task-definition-details',
    templateUrl: './todo-task-definition-details.component.html',
    styleUrls: ['./todo-task-definition-details.component.scss'],
    imports: [MatStepper, MatStep, MatStepLabel, MatFormField, MatInput, FormsModule, MatTooltip, MatSelect, MatOption]
})
export class TodoTaskDefinitionDetailsComponent implements OnInit {

    DEFAULT_TASK_CONTEXT = environment.defaultTaskContext;

    readonly taskDefinition = input<TaskDefinition>(undefined);

    constructor() {
    }

    ngOnInit() {
    }

}
