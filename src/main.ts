import {enableProdMode, importProvidersFrom} from '@angular/core';


import "hammerjs";
import {HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi} from '@angular/common/http';
import {AuthenticationHttpInterceptor} from '@app/user/authentication.interceptor';
import {RetryInterceptor} from '@app/retry.interceptor';
import {MAT_DATE_LOCALE} from '@angular/material/core';
import {MAT_FORM_FIELD_DEFAULT_OPTIONS} from '@angular/material/form-field';
import {bootstrapApplication, BrowserModule, HammerModule} from '@angular/platform-browser';
import {provideAnimations} from '@angular/platform-browser/animations';
import {ServiceWorkerModule} from '@angular/service-worker';
import {AppRoutingModule} from '@app/app-routing.module';
import {LayoutModule} from '@angular/cdk/layout';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatIconModule} from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
import {NgProgressModule} from 'ngx-progressbar';
import {NgProgressHttpModule} from 'ngx-progressbar/http';
import {AppComponent} from '@app/app.component';

enableProdMode();

bootstrapApplication(AppComponent, {
    providers: [
        importProvidersFrom(BrowserModule, ServiceWorkerModule.register('/ngsw-worker.js'), AppRoutingModule, LayoutModule, FormsModule, MatButtonModule, MatToolbarModule, MatSidenavModule, MatIconModule, MatListModule, NgProgressModule, NgProgressHttpModule, HammerModule, ReactiveFormsModule),
        {
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
            provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: {appearance: 'outline'}
        }, provideHttpClient(withInterceptorsFromDi()),
        provideAnimations()
    ]
})
    .catch(err => console.log(err));
