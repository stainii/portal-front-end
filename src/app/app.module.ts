import {BrowserModule, HammerModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from '@app/app.component';
import {ServiceWorkerModule} from '@angular/service-worker';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {LayoutModule} from '@angular/cdk/layout';
import {AppRoutingModule} from "@app/app-routing.module";

import {MAT_DATE_LOCALE} from '@angular/material/core';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatToolbarModule} from '@angular/material/toolbar';
import {DashboardComponent} from "@app/dashboard/dashboard.component";
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AuthenticationHttpInterceptor} from "@app/user/authentication.interceptor";
import {MenuComponent} from './menu/menu.component';
import {NgProgressModule} from "ngx-progressbar";
import {NgProgressHttpModule} from "ngx-progressbar/http";
import {UserModule} from "@app/user/user.module";
import {RetryInterceptor} from "@app/retry.interceptor";
import {OfflineModule} from "@app/offline/offline.module";
import {ErrorModule} from "@app/error/error.module";
import {MAT_FORM_FIELD_DEFAULT_OPTIONS} from "@angular/material/form-field";

@NgModule({ declarations: [
        AppComponent,
        DashboardComponent,
        MenuComponent,
    ],
    bootstrap: [AppComponent], imports: [BrowserModule,
        BrowserAnimationsModule,
        UserModule,
        ServiceWorkerModule.register('/ngsw-worker.js'),
        AppRoutingModule,
        LayoutModule,
        FormsModule,
        MatButtonModule,
        MatToolbarModule,
        MatSidenavModule,
        MatIconModule,
        MatListModule,
        NgProgressModule,
        NgProgressHttpModule,
        OfflineModule,
        ErrorModule,
        HammerModule,
        ReactiveFormsModule], providers: [{
            provide: HTTP_INTERCEPTORS,
            useClass: AuthenticationHttpInterceptor,
            multi: true
        }, {
            provide: HTTP_INTERCEPTORS,
            useClass: RetryInterceptor,
            multi: true
        }, {
            provide: MAT_DATE_LOCALE, useValue: 'nl-BE'
        }, {
            provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: 'outline' }
        }, provideHttpClient(withInterceptorsFromDi())] })

export class AppModule {
}
