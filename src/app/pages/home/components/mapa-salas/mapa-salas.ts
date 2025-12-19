import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

// Modelo de dados da Sala
interface Sala {
  id: string;
  status: 'ok' | 'manutencao';
  pcs: number;
  detalhes: string;
}

@Component({
  selector: 'app-mapa-salas',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './mapa-salas.component.html',
  styleUrl: './mapa-salas.component.scss'
})
export class MapaSalasComponent {

  modalAberto = false;
  salaSelecionada: Sala | null = null;

  // AQUI ESTÁ A CONFIGURAÇÃO DAS 10 COLUNAS QUE VOCÊ PEDIU
  colunasMap: string[][] = [
    // Col 1
    ['A1', 'A2', 'A3', 'A4', 'A5', 'A6', 'A7', 'A8', 'A9', 'A10'],
    // Col 2
    ['B1', 'B2', 'Auditório'],
    // Col 3
    ['C1', 'C2', 'C3', 'C4', 'C5', 'Lab1'],
    // Col 4
    ['D1', 'D2', 'D3', 'Lab2'],
    // Col 5
    ['Supervisão', 'Suporte', 'Lab3', 'Sala Estudos', 'Lab4'],
    // Col 6
    ['F1', 'F2', 'F3', 'F4', 'F5'],
    // Col 7
    ['Lab5', 'G1', 'G2', 'G3', 'G4', 'Lab6'],
    // Col 8
    ['H1', 'H2', 'H3', 'H4'],
    // Col 9
    ['Admin', 'I1', 'I2', 'I3', 'I4', 'I5', 'I6', 'I7', 'I8', 'I9'],
    // Col 10
    ['I10', 'I11', 'I12', 'I13', 'I14', 'I15', 'I16', 'I17', 'I18', 'I19']
  ];

  // Simula os dados de cada sala baseado no nome
  getSalaDados(nome: string): Sala {
    // Regra rápida para status: C1 e Lab3 estão em manutenção (exemplo)
    const emManutencao = nome === 'C1' || nome === 'Lab3';
    
    // Regra para Qtd PCs: Labs têm 20, Auditório tem 0, Salas têm 2
    let qtdPcs = 2;
    if (nome.includes('Lab')) qtdPcs = 20;
    if (nome.includes('Auditório') || nome.includes('Admin')) qtdPcs = 1;

    return {
      id: nome,
      status: emManutencao ? 'manutencao' : 'ok',
      pcs: qtdPcs,
      detalhes: nome.includes('Lab') ? 'Laboratório de Informática' : 'Sala de Aula Padrão'
    };
  }

  abrirDetalhes(nomeSala: string) {
    this.salaSelecionada = this.getSalaDados(nomeSala);
    this.modalAberto = true;
  }

  fecharModal() {
    this.modalAberto = false;
    this.salaSelecionada = null;
  }
}