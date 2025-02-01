import {Component, Inject} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogTitle, MatDialogContent } from "@angular/material/dialog";
import {TaskTemplate} from "@app/todo/task-template.model";
import {Observable} from "rxjs";
import {BreakpointObserver, Breakpoints} from "@angular/cdk/layout";
import {map} from "rxjs/operators";
import { UntypedFormControl, FormsModule } from "@angular/forms";
import {RandomAdjectiveService} from "@app/funny-details/random-adjective.service";
import {TaskDefinition} from "@app/todo/task-definition.model";
import {ErrorService} from "@app/error/error.service";
import { CdkScrollable } from '@angular/cdk/scrolling';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatList, MatListItem } from '@angular/material/list';
import { NgFor, NgIf } from '@angular/common';
import { MatIcon } from '@angular/material/icon';
import { MatTabGroup, MatTab, MatTabLabel } from '@angular/material/tabs';
import { TodoTaskDefinitionDetailsComponent } from '../todo-task-definition-details/todo-task-definition-details.component';
import { MatButton } from '@angular/material/button';

@Component({
    selector: 'app-todo-task-template-details',
    templateUrl: './todo-task-template-details.component.html',
    styleUrls: ['./todo-task-template-details.component.scss'],
    imports: [MatDialogTitle, CdkScrollable, MatDialogContent, MatFormField, MatLabel, MatInput, FormsModule, MatList, NgFor, MatListItem, MatIcon, MatTabGroup, MatTab, MatTabLabel, NgIf, TodoTaskDefinitionDetailsComponent, MatButton]
})
export class TodoTaskTemplateDetailsComponent {

    taskTemplate: TaskTemplate;
    newVariableName: string;

    isHandset$: Observable<boolean> = this._breakpointObserver.observe(Breakpoints.Handset)
        .pipe(map(result => result.matches));
    selectedTaskDefinition = new UntypedFormControl(0);
    placeholderForTaskTemplateName: string;
    placeholderForVariableName: string;

    constructor(public dialogRef: MatDialogRef<TodoTaskTemplateDetailsComponent>,
                private _breakpointObserver: BreakpointObserver,
                private _randomAdjective: RandomAdjectiveService,
                private _errorService: ErrorService,
                @Inject(MAT_DIALOG_DATA) data: TaskTemplate) {
        this.taskTemplate = data;
        this.placeholderForTaskTemplateName = "My " + this._randomAdjective.lowercase() + " task template";
        this.placeholderForVariableName = "my" + this._randomAdjective.capitalized() + "Variable";
    }

    close() {
        this.dialogRef.close();
    }

    saveAndClose() {
        if (this.isValid(this.taskTemplate)) {
            this.dialogRef.close(this.taskTemplate);
        }
    }

    private isValid(taskTemplate: TaskTemplate) {
        for (let taskDefinition of taskTemplate.taskDefinitions) {
            if (!taskDefinition.name) {
                this._errorService.notify(new Error("Task definition has no name."));
                return false;
            }
        }
        if (!taskTemplate.name) {
            this._errorService.notify(new Error("Task template has no name."));
            return false;
        }

        return true;
    }

    addTab() {
        let newTaskDefinition = new TaskDefinition();

        if (this.taskTemplate.taskDefinitions) {
            this.taskTemplate.taskDefinitions.push(newTaskDefinition);
        } else {
            this.taskTemplate.taskDefinitions = [newTaskDefinition];
        }
        this.selectedTaskDefinition.setValue(this.taskTemplate.taskDefinitions.length - 1);
    }

    deleteTaskDefinition(index: number) {
        this.taskTemplate.taskDefinitions.splice(index, 1);
    }

    addVariableName() {
        if (!this.taskTemplate.variableNames) {
            this.taskTemplate.variableNames = [this.newVariableName];
        } else {
            this.taskTemplate.variableNames.push(this.newVariableName);
        }
        this.newVariableName = "";
    }

    deleteVariableName(variableName) {
        let index = this.taskTemplate.variableNames.indexOf(variableName);
        this.taskTemplate.variableNames.splice(index, 1);
    }
}
