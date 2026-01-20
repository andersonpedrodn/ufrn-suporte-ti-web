import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, map, switchMap, of, throwError } from 'rxjs';
import { DataService, User } from './data.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
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
