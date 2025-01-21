import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LoginComponent} from "@app/user/login/login.component";
import {LogoutComponent} from "@app/user/logout/logout.component";
import {FormsModule} from "@angular/forms";
import {MatLegacyInputModule as MatInputModule} from "@angular/material/legacy-input";
import {MatLegacyFormFieldModule as MatFormFieldModule} from "@angular/material/legacy-form-field";
import {MatLegacyCardModule as MatCardModule} from "@angular/material/legacy-card";
import {MatLegacyListModule as MatListModule} from "@angular/material/legacy-list";
import {MatIconModule} from "@angular/material/icon";
import {MatLegacyButtonModule as MatButtonModule} from "@angular/material/legacy-button";


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
