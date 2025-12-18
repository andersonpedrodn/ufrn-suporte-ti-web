import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' }, // Redireciona a raiz para /login
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent }
];