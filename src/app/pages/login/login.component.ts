import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router'; // Adicionei RouterLink caso queira linkar o cadastro depois

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink], // Importante para o formulário funcionar
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router
  ) {
    // Configuração das regras do formulário
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]], // Email obrigatório e válido
      password: ['', [Validators.required, Validators.minLength(6)]] // Senha min 6 caracteres
    });
  }

  onSubmit() {
    // Só prossegue se estiver válido
    if (this.loginForm.valid) {
      console.log('Dados do Login:', this.loginForm.value);
      
      // Simula o login e manda para a Home
      this.router.navigate(['/home']);
    } else {
      // Se tiver erro, marca os campos em vermelho
      this.loginForm.markAllAsTouched();
    }
  }
}