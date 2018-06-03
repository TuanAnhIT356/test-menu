import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {BrowserModule} from '@angular/platform-browser';
import {AngularFontAwesomeModule} from 'angular-font-awesome';

import {ComponentsModule} from '../components/components.module';

import {HomeComponent} from './home/home.component';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        BrowserModule,
        AngularFontAwesomeModule,

        ComponentsModule
    ],
    declarations: [
        HomeComponent
    ],
    exports: [
        HomeComponent
    ]
})
export class DashboardModule {
}
