import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AngularFontAwesomeModule} from 'angular-font-awesome';

import {LoginComponent} from './login/login.component';
import {SigninComponent} from './signin/signin.component';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        AngularFontAwesomeModule
    ],
    declarations: [
        LoginComponent,
        SigninComponent,
    ],
    exports: [
        LoginComponent,
        SigninComponent,
    ]
})
export class LoginModule {
}
