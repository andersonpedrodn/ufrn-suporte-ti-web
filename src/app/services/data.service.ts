import { Injectable } from '@angular/core';
import { Observable, of, delay } from 'rxjs';

export interface User {
  id: number;
  email: string;
  name: string;
  cpf?: string;
  role: 'usuario' | 'tecnico' | 'admin';
  departamento?: string;
}

export interface Chamado {
  id: number;
  titulo: string;
  descricao: string;
  status: 'aberto' | 'em_andamento' | 'fechado';
  prioridade: 'baixa' | 'media' | 'alta';
  dataCriacao: Date;
}

export interface Categoria {
  id: number;
  nome: string;
  descricao: string;
}

@Injectable({
  providedIn: 'root'
})
export class DataService {
  
  // Mock de usuários para teste
  private mockUsers: User[] = [
    {
      id: 1,
      email: 'anderson@ufrn.edu.br',
      name: 'Anderson Silva',
      cpf: '123.456.789-00',
      role: 'usuario',
      departamento: 'Desenvolvimento'
    },
    {
      id: 2,
      email: 'tecnico@ufrn.edu.br',
      name: 'João Técnico',
      cpf: '987.654.321-00',
      role: 'tecnico',
      departamento: 'Suporte'
    },
    {
      id: 3,
      email: 'admin@ufrn.edu.br',
      name: 'Admin UFRN',
      cpf: '555.666.777-88',
      role: 'admin',
      departamento: 'TI'
    }
  ];

  // Mock de chamados
  private mockChamados: Chamado[] = [
    {
      id: 1,
      titulo: 'Problema com impressora',
      descricao: 'Impressora não está funcionando no lab 3',
      status: 'aberto',
      prioridade: 'alta',
      dataCriacao: new Date('2024-01-15')
    },
    {
      id: 2,
      titulo: 'Acesso ao sistema',
      descricao: 'Não consigo acessar o SIGAA',
      status: 'em_andamento',
      prioridade: 'media',
      dataCriacao: new Date('2024-01-18')
    },
    {
      id: 3,
      titulo: 'Instalação de software',
      descricao: 'Preciso instalar MATLAB na minha máquina',
      status: 'fechado',
      prioridade: 'baixa',
      dataCriacao: new Date('2024-01-10')
    }
  ];

  private mockCategorias: Categoria[] = [
    { id: 1, nome: 'Hardware', descricao: 'Problemas com equipamentos' },
    { id: 2, nome: 'Software', descricao: 'Problemas com sistemas' },
    { id: 3, nome: 'Rede', descricao: 'Problemas de conectividade' },
    { id: 4, nome: 'Acesso', descricao: 'Problemas de acesso a sistemas' }
  ];

  constructor() {}

  // ==================== USUÁRIOS ====================
  
  /**
   * Valida credenciais do usuário (mock)
   * Aceita qualquer email que esteja na lista ou email genérico
   */
  validateCredentials(email: string, password: string): Observable<User | null> {
    const user = this.mockUsers.find(u => u.email === email);
    
    if (user && password.length >= 6) {
      return of(user).pipe(delay(800)); // Simula delay de autenticação
    }
    
    return of(null).pipe(delay(800));
  }

  getUserByEmail(email: string): Observable<User | null> {
    const user = this.mockUsers.find(u => u.email === email);
    return of(user || null).pipe(delay(300));
  }

  // ==================== CHAMADOS ====================

  getChamados(): Observable<Chamado[]> {
    return of(this.mockChamados).pipe(delay(500));
  }

  getChamadoById(id: number): Observable<Chamado | undefined> {
    const chamado = this.mockChamados.find(c => c.id === id);
    return of(chamado).pipe(delay(300));
  }

  criarChamado(chamado: Omit<Chamado, 'id'>): Observable<Chamado> {
    const novoChamado: Chamado = {
      ...chamado,
      id: this.mockChamados.length + 1
    };
    this.mockChamados.push(novoChamado);
    return of(novoChamado).pipe(delay(500));
  }

  // ==================== CATEGORIAS ====================

  getCategorias(): Observable<Categoria[]> {
    return of(this.mockCategorias).pipe(delay(300));
  }
}
