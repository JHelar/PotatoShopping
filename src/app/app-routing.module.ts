import { RouterModule, Routes } from '@angular/router';
import { TodoListComponent } from './todo-list.component';
import { HomeComponent } from './home.component';
import { LoginComponent } from './login.component';
import { RegisterComponent } from './register.component';

const routes: Routes = [
    {
        path: '',
        component: HomeComponent
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'register',
        component: RegisterComponent
    }
]

export const AppRoutingModule = RouterModule.forRoot(routes)