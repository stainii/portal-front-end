import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {SocialRoutingModule} from './social-routing.module';
import {SocialManagePeopleComponent} from './social-manage-people/social-manage-people.component';
import {
    SocialMenuBarForManagePeopleComponent
} from './social-menu-bar-for-manage-people/social-menu-bar-for-manage-people.component';
import {SocialMenuBarForOverviewComponent} from './social-menu-bar-for-overview/social-menu-bar-for-overview.component';
import {MatIconModule} from "@angular/material/icon";
import {SocialManagePeopleListComponent} from './social-manage-people-list/social-manage-people-list.component';
import {MatLegacyCardModule as MatCardModule} from "@angular/material/legacy-card";
import {MatLegacyButtonModule as MatButtonModule} from "@angular/material/legacy-button";
import {MatLegacyInputModule as MatInputModule} from "@angular/material/legacy-input";
import {MatLegacyListModule as MatListModule} from "@angular/material/legacy-list";
import {MatLegacySelectModule as MatSelectModule} from "@angular/material/legacy-select";
import {SocialPersonSettingsEditComponent} from './social-person-settings-edit/social-person-settings-edit.component';
import {MatLegacyDialogModule as MatDialogModule} from "@angular/material/legacy-dialog";
import {FormsModule} from "@angular/forms";
import {SocialPolaroidComponent} from './social-polaroid/social-polaroid.component';
import {SocialOverviewComponent} from './social-overview/social-overview.component';
import {SocialPersonSettingsComponent} from './social-person-settings/social-person-settings.component';
import {SocialAddContactComponent} from './social-add-contact/social-add-contact.component';
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatMomentDateModule} from "@angular/material-moment-adapter";

@NgModule({
    declarations: [SocialManagePeopleComponent, SocialMenuBarForManagePeopleComponent, SocialMenuBarForOverviewComponent, SocialManagePeopleListComponent, SocialPersonSettingsEditComponent, SocialPolaroidComponent, SocialOverviewComponent, SocialPersonSettingsComponent, SocialAddContactComponent],
    imports: [
        CommonModule,
        SocialRoutingModule,
        MatIconModule,
        MatCardModule,
        MatButtonModule,
        MatInputModule,
        MatListModule,
        MatSelectModule,
        MatDialogModule,
        FormsModule,
        MatDatepickerModule,
        MatMomentDateModule,
    ]
})
export class SocialModule {
}
