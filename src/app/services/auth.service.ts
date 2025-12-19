import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

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