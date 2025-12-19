import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component'; // <--- 1. Importe o componente Home

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  
  // 2. Adicione essa linha mágica aqui:
  { path: 'home', component: HomeComponent },

  // Dica: Redirecionar o vazio para o login (opcional)
  { path: '', redirectTo: 'login', pathMatch: 'full' }
];