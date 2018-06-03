import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AngularFontAwesomeModule} from 'angular-font-awesome';

import {ComponentsModule} from '../components/components.module';

import {MenuComponent} from './menu/menu.component';
import {CreateMenuComponent} from './create-menu/create-menu.component';
import {UpdateMenuComponent} from './update-menu/update-menu.component';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        AngularFontAwesomeModule,

        ComponentsModule
    ],
    declarations: [
        MenuComponent,
        CreateMenuComponent,
        UpdateMenuComponent
    ],
    exports: [
        MenuComponent,
        CreateMenuComponent,
        UpdateMenuComponent
    ]
})
export class MenuModule {
}
