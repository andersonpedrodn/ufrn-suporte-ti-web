import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
<<<<<<< HEAD
import { Router, RouterLink, ActivatedRoute } from '@angular/router';
=======
import { Router, RouterLink } from '@angular/router';

// 1. IMPORTAR O SERVIÇO QUE CRIAMOS
>>>>>>> 23ea293796985b6552b1354d60a3858b04eb076a
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
  loading = false;
  errorMessage = '';
  returnUrl: string;

  constructor(
    private fb: FormBuilder,
    private router: Router,
<<<<<<< HEAD
    private route: ActivatedRoute,
    private authService: AuthService
  ) {
    // Redireciona se já estiver logado
    if (this.authService.isAuthenticated) {
      this.router.navigate(['/home']);
    }

    // Pega a URL de retorno ou usa /home como padrão
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/home';

    // Configuração das regras do formulário
=======
    private authService: AuthService // 2. INJETAR O SERVIÇO AQUI
  ) {
>>>>>>> 23ea293796985b6552b1354d60a3858b04eb076a
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit() {
<<<<<<< HEAD
    if (this.loginForm.invalid) {
=======
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
>>>>>>> 23ea293796985b6552b1354d60a3858b04eb076a
      this.loginForm.markAllAsTouched();
      return;
    }

    this.loading = true;
    this.errorMessage = '';

    const { email, password } = this.loginForm.value;

    this.authService.login(email, password).subscribe({
      next: (success) => {
        if (success) {
          console.log('Login realizado com sucesso!');
          this.router.navigate([this.returnUrl]);
        }
      },
      error: (error) => {
        this.errorMessage = error || 'Erro ao fazer login. Tente novamente.';
        this.loading = false;
      },
      complete: () => {
        this.loading = false;
      }
    });
  }
}