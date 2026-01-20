<<<<<<< HEAD
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { User } from '../../services/data.service';
=======
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

// Criamos um "modelo" simples para saber o que tem numa sala
interface Sala {
  id: string;      // Ex: 'A1', 'B2'
  status: 'ok' | 'manutencao'; // O estado da sala
  pcs: number;     // Quantidade de computadores
  detalhes?: string; // Texto extra para o modal
}
>>>>>>> 23ea293796985b6552b1354d60a3858b04eb076a

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  currentUser: User | null = null;

<<<<<<< HEAD
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.authService.currentUser.subscribe(user => {
      this.currentUser = user;
    });
  }

  logout() {
    this.authService.logout();
  }
}
=======
  // Variáveis para controlar o Modal
  modalAberto = false;
  salaSelecionada: Sala | null = null;

  // Nossa lista de salas (baseada na sua imagem)
  salas: Sala[] = [
    { id: 'A1', status: 'ok', pcs: 2, detalhes: 'Laboratório de Redes' },
    { id: 'A2', status: 'ok', pcs: 3, detalhes: 'Laboratório de Hardware' },
    { id: 'A3', status: 'ok', pcs: 1, detalhes: 'Sala de Aula Teórica' },
    { id: 'A4', status: 'ok', pcs: 1, detalhes: 'Sala de Aula Teórica' },
    { id: 'A5', status: 'ok', pcs: 1, detalhes: 'Sala de Aula Teórica' },
    { id: 'A6', status: 'ok', pcs: 1, detalhes: 'Sala de Aula Teórica' },
    { id: 'A7', status: 'ok', pcs: 1, detalhes: 'Sala de Aula Teórica' },
    { id: 'A8', status: 'ok', pcs: 1, detalhes: 'Sala de Aula Teórica' },
    { id: 'A9', status: 'ok', pcs: 1, detalhes: 'Sala de Aula Teórica' },
    { id: 'A10', status: 'ok', pcs: 1, detalhes: 'Sala de Aula Teórica' },
    { id: 'B1', status: 'ok', pcs: 2, detalhes: 'Laboratório de Software' },
    { id: 'B2', status: 'ok', pcs: 2, detalhes: 'Laboratório de Software' },
    { id: 'Auditório', status: 'ok', pcs: 2, detalhes: 'Laboratório de Software' },
    { id: 'C1', status: 'manutencao', pcs: 0, detalhes: 'Ar condicionado quebrado' }, // Exemplo de sala com problema
    { id: 'C2', status: 'manutencao', pcs: 0, detalhes: 'Ar condicionado quebrado' }, // Exemplo de sala com problema
    { id: 'C3', status: 'manutencao', pcs: 0, detalhes: 'Ar condicionado quebrado' }, // Exemplo de sala com problema
    { id: 'C4', status: 'manutencao', pcs: 0, detalhes: 'Ar condicionado quebrado' }, // Exemplo de sala com problema
    { id: 'C5', status: 'manutencao', pcs: 0, detalhes: 'Ar condicionado quebrado' }, // Exemplo de sala com problema
    { id: 'Lab1', status: 'manutencao', pcs: 0, detalhes: 'Ar condicionado quebrado' }, // Exemplo de sala com problema
    { id: 'D1', status: 'ok', pcs: 5, detalhes: 'Lab. de Pesquisa' },
    { id: 'SUP', status: 'ok', pcs: 1, detalhes: 'Supervisão' },
    { id: 'F1', status: 'ok', pcs: 12, detalhes: 'Laboratório Principal' },
    // ... você pode adicionar quantas quiser aqui
  ];

  constructor(private router: Router) {}

  logout() {
    this.router.navigate(['/login']);
  }

  // Função para abrir o modal
  abrirDetalhes(sala: Sala) {
    this.salaSelecionada = sala;
    this.modalAberto = true;
  }

  // Função para fechar o modal
  fecharModal() {
    this.modalAberto = false;
    this.salaSelecionada = null;
  }
}
>>>>>>> 23ea293796985b6552b1354d60a3858b04eb076a
