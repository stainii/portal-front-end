import {Component, inject} from '@angular/core';
import {MatIcon} from '@angular/material/icon';
import {UserService} from '../user.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss'],
  imports: [MatIcon]
})
export class LogoutComponent {
  private userService = inject(UserService);

  logOut() {
    this.userService.logout()
      .then(() => this.userService.login())
  }

}
