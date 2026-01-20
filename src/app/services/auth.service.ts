import { Injectable } from '@angular/core';
<<<<<<< HEAD
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, map, switchMap, of, throwError } from 'rxjs';
import { DataService, User } from './data.service';
=======
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
>>>>>>> 23ea293796985b6552b1354d60a3858b04eb076a

@Injectable({
  providedIn: 'root'
})
export class AuthService {
<<<<<<< HEAD
  private currentUserSubject: BehaviorSubject<User | null>;
  public currentUser: Observable<User | null>;
  private readonly TOKEN_KEY = 'auth_token';
  private readonly USER_KEY = 'current_user';

  constructor(
    private router: Router,
    private dataService: DataService
  ) {
    const storedUser = localStorage.getItem(this.USER_KEY);
    this.currentUserSubject = new BehaviorSubject<User | null>(
      storedUser ? JSON.parse(storedUser) : null
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User | null {
    return this.currentUserSubject.value;
  }

  public get isAuthenticated(): boolean {
    return !!this.currentUserSubject.value && !!localStorage.getItem(this.TOKEN_KEY);
  }

  login(email: string, password: string): Observable<boolean> {
    return this.dataService.validateCredentials(email, password).pipe(
      switchMap(user => {
        if (user) {
          // Usuário validado com sucesso
          const fakeToken = btoa(`${email}:${Date.now()}`);
          
          localStorage.setItem(this.TOKEN_KEY, fakeToken);
          localStorage.setItem(this.USER_KEY, JSON.stringify(user));
          this.currentUserSubject.next(user);
          
          return of(true);
        } else {
          // Credenciais inválidas
          return throwError(() => 'Email ou senha inválidos');
        }
      })
    );
  }

  logout(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.USER_KEY);
    this.currentUserSubject.next(null);
    this.router.navigate(['/login']);
  }

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }
}
=======

  // Pega a URL definida no environment
  private apiUrl = environment.apiUrl + '/usuario';

  constructor(private http: HttpClient) { }

  login(dados: any) {
    /*
     ⚠️ ATENÇÃO: TRADUÇÃO DE CAMPOS
     O seu formulário usa 'email' e 'password'.
     O Backend dele (pelo README) espera 'login' e 'senha'.
     Precisamos converter aqui antes de enviar.
    */
    const payload = {
      login: dados.email,    // Mapeia seu email para o 'login' dele
      senha: dados.password  // Mapeia sua password para a 'senha' dele
    };

    return this.http.post(`${this.apiUrl}/login`, payload);
  }

  cadastrar(dados: any) {
    // Mesma lógica para o cadastro, ajuste conforme o JSON que ele espera
    return this.http.post(`${this.apiUrl}/cadastrar`, dados);
  }
}
>>>>>>> 23ea293796985b6552b1354d60a3858b04eb076a
