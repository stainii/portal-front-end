import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LoginComponent} from "@app/user/login/login.component";
import {LogoutComponent} from "@app/user/logout/logout.component";
import {FormsModule} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatCardModule} from "@angular/material/card";
import {MatListModule} from "@angular/material/list";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";


@NgModule({
    declarations: [
        LoginComponent,
        LogoutComponent,
    ],
    imports: [
        CommonModule,
        FormsModule,
        MatListModule,
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        MatIconModule,
        MatButtonModule,
    ], exports: [
        LoginComponent,
        LogoutComponent
    ]
})
export class UserModule {
}
