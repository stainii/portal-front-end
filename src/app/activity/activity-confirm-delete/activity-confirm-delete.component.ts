import {Component, OnInit} from '@angular/core';
import { CdkScrollable } from '@angular/cdk/scrolling';
import { MatDialogContent, MatDialogActions, MatDialogClose } from '@angular/material/dialog';
import { MatButton } from '@angular/material/button';

@Component({
    selector: 'app-activity-confirm-delete',
    templateUrl: './activity-confirm-delete.component.html',
    styleUrls: ['./activity-confirm-delete.component.scss'],
    imports: [CdkScrollable, MatDialogContent, MatDialogActions, MatButton, MatDialogClose]
})
export class ActivityConfirmDeleteComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
