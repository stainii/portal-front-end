import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

/**
 * Module providing services to use any deployment of a recurring task backend.
 * Contains no components since every deployment can have its own look-and-feel and front-end rules.
 */
@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class RecurringTasksModule { }
