import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, RouterLink, ActivatedRoute } from '@angular/router';
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
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit() {
    if (this.loginForm.invalid) {
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