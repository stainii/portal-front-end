import {Component, EventEmitter, Input, Output} from '@angular/core';
import {NestedTreeControl} from "@angular/cdk/tree";
import {TaskTemplate} from "@app/todo/task-template.model";
import {MatTreeNestedDataSource} from "@angular/material/tree";

@Component({
    selector: 'app-todo-task-templates',
    templateUrl: './todo-task-templates.component.html',
    styleUrls: ['./todo-task-templates.component.scss']
})
export class TodoTaskTemplatesComponent {

    treeControl = new NestedTreeControl<any>(node => node.taskDefinitions);
    dataSource = new MatTreeNestedDataSource<TaskTemplate>();

    @Input()
    public set taskTemplates(taskTemplates: TaskTemplate[]) {
        this.dataSource.data = taskTemplates;
    }

    @Output()
    onEdit: EventEmitter<TaskTemplate> = new EventEmitter<TaskTemplate>();

    @Output()
    onDelete: EventEmitter<TaskTemplate> = new EventEmitter<TaskTemplate>();

    hasChild = (_: number, node: TaskTemplate) => !!node.taskDefinitions && node.taskDefinitions.length > 0;

    deleteTaskTemplate(taskTemplate: TaskTemplate) {
        this.onDelete.emit(taskTemplate);
    }

    editTaskTemplate(taskTemplate: TaskTemplate) {
        this.onEdit.emit(taskTemplate);
    }
}
