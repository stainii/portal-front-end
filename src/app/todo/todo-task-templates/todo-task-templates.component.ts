import {Component, EventEmitter, Input, Output} from '@angular/core';
import {NestedTreeControl} from "@angular/cdk/tree";
import {TaskTemplate} from "@app/todo/task-template.model";
import { MatTreeNestedDataSource, MatTree, MatTreeNodeDef, MatNestedTreeNode, MatTreeNodeToggle, MatTreeNodeOutlet, MatTreeNode } from "@angular/material/tree";
import { MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';

@Component({
    selector: 'app-todo-task-templates',
    templateUrl: './todo-task-templates.component.html',
    styleUrls: ['./todo-task-templates.component.scss'],
    imports: [MatTree, MatTreeNodeDef, MatNestedTreeNode, MatTreeNodeToggle, MatIconButton, MatIcon, MatTreeNodeOutlet, MatTreeNode]
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
