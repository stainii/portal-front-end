import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {SocialRoutingModule} from './social-routing.module';
import {SocialManagePeopleComponent} from './social-manage-people/social-manage-people.component';
import {
    SocialMenuBarForManagePeopleComponent
} from './social-menu-bar-for-manage-people/social-menu-bar-for-manage-people.component';
import {SocialMenuBarForOverviewComponent} from './social-menu-bar-for-overview/social-menu-bar-for-overview.component';
import {MatIconModule} from "@angular/material/icon";
import {library} from "@fortawesome/fontawesome-svg-core";
import {faUserCog} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {SocialManagePeopleListComponent} from './social-manage-people-list/social-manage-people-list.component';
import {MatCardModule} from "@angular/material/card";
import {MatButtonModule} from "@angular/material/button";
import {MatInputModule} from "@angular/material/input";
import {MatListModule} from "@angular/material/list";
import {MatSelectModule} from "@angular/material/select";
import {SocialPersonSettingsEditComponent} from './social-person-settings-edit/social-person-settings-edit.component';
import {MatDialogModule} from "@angular/material/dialog";
import {FormsModule} from "@angular/forms";
import {SocialPolaroidComponent} from './social-polaroid/social-polaroid.component';
import {SocialOverviewComponent} from './social-overview/social-overview.component';
import {SocialPersonSettingsComponent} from './social-person-settings/social-person-settings.component';
import {SocialAddContactComponent} from './social-add-contact/social-add-contact.component';
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatMomentDateModule} from "@angular/material-moment-adapter";

library.add(faUserCog);

@NgModule({
    declarations: [SocialManagePeopleComponent, SocialMenuBarForManagePeopleComponent, SocialMenuBarForOverviewComponent, SocialManagePeopleListComponent, SocialPersonSettingsEditComponent, SocialPolaroidComponent, SocialOverviewComponent, SocialPersonSettingsComponent, SocialAddContactComponent],
    imports: [
        CommonModule,
        SocialRoutingModule,
        MatIconModule,
        FontAwesomeModule,
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
