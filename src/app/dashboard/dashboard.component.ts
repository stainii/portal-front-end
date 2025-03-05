import {Component, inject} from '@angular/core';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {MatSidenav, MatSidenavContainer, MatSidenavContent} from '@angular/material/sidenav';
import {MatToolbar} from '@angular/material/toolbar';
import {AsyncPipe} from '@angular/common';
import {MenuComponent} from '../menu/menu.component';
import {MatIconButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import {OfflineIndicatorComponent} from '../offline/offline-indicator/offline-indicator.component';
import {RouterOutlet} from '@angular/router';
import {LogoutComponent} from '../user/logout/logout.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  imports: [MatSidenavContainer, MatSidenav, MatToolbar, MenuComponent, MatSidenavContent, MatIconButton, MatIcon, OfflineIndicatorComponent, RouterOutlet, LogoutComponent, AsyncPipe]
})
export class DashboardComponent {
  private _breakpointObserver = inject(BreakpointObserver);

  isHandset$: Observable<boolean> = this._breakpointObserver.observe(Breakpoints.Handset)
    .pipe(map(result => result.matches));

}
