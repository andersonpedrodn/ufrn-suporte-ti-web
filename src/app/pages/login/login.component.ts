import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

// 1. IMPORTAR O SERVIÇO QUE CRIAMOS
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService // 2. INJETAR O SERVIÇO AQUI
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      console.log('Tentando logar com:', this.loginForm.value);

      // 3. AQUI ESTÁ A MÁGICA: CHAMAR O BACKEND
      this.authService.login(this.loginForm.value).subscribe({
        
        // CENÁRIO FELIZ (Backend disse SIM) 🟢
        next: (resposta) => {
          console.log('Sucesso! Token recebido:', resposta);
          // O comando de entrar SÓ acontece aqui dentro agora
          this.router.navigate(['/home']);
        },

        // CENÁRIO TRISTE (Backend disse NÃO ou Erro de Conexão) 🔴
        error: (erro) => {
          console.error('Erro no login:', erro);
          
          if (erro.status === 401 || erro.status === 403) {
             alert('Email ou senha incorretos!');
          } else {
             alert('Erro ao conectar no servidor. O Java está rodando?');
          }
        }
      });

    } else {
      this.loginForm.markAllAsTouched();
    }
  }
}