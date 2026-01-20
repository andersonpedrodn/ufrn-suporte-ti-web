import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
<<<<<<< HEAD
import { RegisterComponent } from './pages/register/register.component';
import { HomeComponent } from './pages/home/home.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { 
    path: 'home', 
    component: HomeComponent,
    canActivate: [authGuard] // Protege a rota home
  },
  { path: '**', redirectTo: 'login' } // Rota wildcard para páginas não encontradas
=======
import { HomeComponent } from './pages/home/home.component'; // <--- 1. Importe o componente Home

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  
  // 2. Adicione essa linha mágica aqui:
  { path: 'home', component: HomeComponent },

  // Dica: Redirecionar o vazio para o login (opcional)
  { path: '', redirectTo: 'login', pathMatch: 'full' }
>>>>>>> 23ea293796985b6552b1354d60a3858b04eb076a
];