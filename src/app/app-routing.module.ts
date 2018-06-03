import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

// Component
import {LoginComponent} from './login/login/login.component';
import {SigninComponent} from './login/signin/signin.component';

import {PageNotFoundComponent} from './components/page-not-found/page-not-found.component';

import {HomeComponent} from './dashboard/home/home.component';
import {MenuComponent} from './menu/menu/menu.component';
import {CreateMenuComponent} from './menu/create-menu/create-menu.component';
import {UpdateMenuComponent} from './menu/update-menu/update-menu.component';

// Auth
import {AuthGuard} from './guard/auth.guard';
import {NotAuthGuard} from './guard/not-auth.guard';


const routes: Routes = [
    {path: 'login', canActivate: [NotAuthGuard], component: LoginComponent},
    {path: 'sign-in', canActivate: [NotAuthGuard], component: SigninComponent},
    {path: 'page-not-found', component: PageNotFoundComponent},

    {path: 'home', canActivate: [AuthGuard], component: HomeComponent},
    {path: 'home/:page', canActivate: [AuthGuard], component: HomeComponent},
    {path: 'menu', canActivate: [AuthGuard], component: MenuComponent},
    {path: 'create-menu', canActivate: [AuthGuard], component: CreateMenuComponent},
    {path: 'update-menu/:id', canActivate: [AuthGuard], component: UpdateMenuComponent},

    {path: '', redirectTo: 'login', pathMatch: 'full'},
    {path: '**', redirectTo: 'page-not-found'}
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes)
    ],
    exports: [],
})
export class AppRoutingModule {
}
