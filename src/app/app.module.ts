import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {HttpModule} from '@angular/http';

import {AppRoutingModule} from './app-routing.module';

import {AppComponent} from './app.component';

import {ComponentsModule} from './components/components.module';
import {DashboardModule} from './dashboard/dashboard.module';
import {LoginModule} from './login/login.module';
import {MenuModule} from './menu/menu.module';

//Guard
import {AuthGuard} from "./guard/auth.guard";
import {NotAuthGuard} from "./guard/not-auth.guard";

@NgModule({
    declarations: [
        AppComponent,
    ],
    imports: [
        BrowserModule,
        RouterModule,
        HttpModule,
        AppRoutingModule,

        ComponentsModule,
        DashboardModule,
        LoginModule,
        MenuModule
    ],
    providers: [
        ComponentsModule,
        DashboardModule,
        LoginModule,
        MenuModule,

        AuthGuard,
        NotAuthGuard
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
