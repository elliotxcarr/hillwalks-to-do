import { Routes } from '@angular/router';
import { LoginPageComponent } from './login-page/login-page.component';
import { ItemListComponent } from './item-list/item-list.component';
import { NavContainerComponent } from './nav-container/nav-container.component';

export const routes: Routes = [
    {path: 'login', component: LoginPageComponent},
    {path:'home', component: NavContainerComponent}
];
