import { Routes } from '@angular/router';
import { LoginPageComponent } from './login-page/login-page.component';
import { NavContainerComponent } from './nav-container/nav-container.component';
import { SignUpPageComponent } from './sign-up-page/sign-up-page.component';

export const routes: Routes = [
    {path: 'login', component: LoginPageComponent},
    {path: 'sign-up', component: SignUpPageComponent},
    {path:'home', component: NavContainerComponent}
];
