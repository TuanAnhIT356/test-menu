import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {BrowserModule} from '@angular/platform-browser';
import {AngularFontAwesomeModule} from 'angular-font-awesome';

import {PageNotFoundComponent} from './page-not-found/page-not-found.component';
import {LeftSidebarComponent} from './left-sidebar/left-sidebar.component';
import {TopHeaderComponent} from './top-header/top-header.component';
import {BreadcrumbComponent} from './breadcrumb/breadcrumb.component';
import {PagingComponent} from './paging/paging.component';
import {ItemSidebarComponent} from './item-sidebar/item-sidebar.component';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        BrowserModule,
        AngularFontAwesomeModule
    ],
    declarations: [
        PageNotFoundComponent,
        LeftSidebarComponent,
        TopHeaderComponent,
        BreadcrumbComponent,
        PagingComponent,
        ItemSidebarComponent
    ],
    exports: [
        PageNotFoundComponent,
        LeftSidebarComponent,
        TopHeaderComponent,
        BreadcrumbComponent,
        PagingComponent,
        ItemSidebarComponent
    ]
})
export class ComponentsModule {
}
