# Sistema de Autenticação - UFRN Suporte TI

## 📋 Estrutura Implementada

### 1. **Serviço de Autenticação** ([services/auth.service.ts](src/app/services/auth.service.ts))
Gerencia todo o fluxo de autenticação do usuário:
- **login()**: Autentica o usuário e armazena token no localStorage
- **logout()**: Remove token e redireciona para login
- **isAuthenticated**: Propriedade que verifica se usuário está logado
- **currentUser**: Observable para acompanhar estado do usuário

### 2. **Guard de Rota** ([guards/auth.guard.ts](src/app/guards/auth.guard.ts))
Protege rotas que exigem autenticação:
- Verifica se o usuário está autenticado antes de permitir acesso
- Redireciona para login se não estiver autenticado
- Salva a URL de retorno para redirecionar após login

### 3. **Componente de Login** ([pages/login](src/app/pages/login))
- Formulário reativo com validações
- Feedback visual de loading e erros
- Redireciona automaticamente se usuário já estiver logado
- Integrado com AuthService

### 4. **Componente Home** ([pages/home](src/app/pages/home))
- Página protegida por authGuard
- Exibe informações do usuário logado
- Botão de logout
- Cards de exemplo para futuras funcionalidades

### 5. **Rotas Configuradas** ([app.routes.ts](src/app/app.routes.ts))
```typescript
/           → redireciona para /login
/login      → tela de login (pública)
/register   → tela de registro (pública)
/home       → dashboard principal (protegida)
/**         → redireciona para /login
```

## 🚀 Como Funciona

### Fluxo de Login:
1. Usuário acessa `/login`
2. Preenche email e senha (mínimo 6 caracteres)
3. Click em "ENTRAR"
4. AuthService valida credenciais
5. Se válido: salva token e dados do usuário
6. Redireciona para `/home`

### Fluxo de Proteção de Rota:
1. Usuário tenta acessar `/home` diretamente
2. authGuard verifica se está autenticado
3. Se não: redireciona para `/login?returnUrl=/home`
4. Após login bem-sucedido: redireciona de volta para `/home`

### Fluxo de Logout:
1. Usuário clica em "Sair" na home
2. AuthService limpa localStorage
3. Atualiza estado do currentUser para null
4. Redireciona para `/login`

## 🔧 Próximos Passos

### Para Integrar com API Real:
1. Edite o método `login()` no [auth.service.ts](src/app/services/auth.service.ts)
2. Substitua a simulação por uma chamada HTTP:

```typescript
import { HttpClient } from '@angular/common/http';

login(email: string, password: string): Observable<boolean> {
  return this.http.post<{token: string, user: User}>('/api/auth/login', { email, password })
    .pipe(
      map(response => {
        localStorage.setItem(this.TOKEN_KEY, response.token);
        localStorage.setItem(this.USER_KEY, JSON.stringify(response.user));
        this.currentUserSubject.next(response.user);
        return true;
      }),
      catchError(error => {
        return throwError(() => 'Credenciais inválidas');
      })
    );
}
```

### Adicionar Interceptor para Token:
Crie um interceptor para incluir o token em todas as requisições HTTP automáticamente.

### Melhorias Sugeridas:
- [ ] Adicionar refresh token
- [ ] Implementar "Lembrar-me" funcional
- [ ] Adicionar recuperação de senha
- [ ] Implementar registro de usuário
- [ ] Adicionar timeout de sessão
- [ ] Implementar permissões/roles de usuário

## 🧪 Testando o Sistema

1. **Inicie o servidor**:
```bash
npm start
```

2. **Acesse** `http://localhost:4200`

3. **Teste o login** com qualquer email válido e senha com 6+ caracteres

4. **Tente acessar** `/home` diretamente sem login (será redirecionado)

5. **Faça logout** e verifique o redirecionamento

## 📝 Observações

- **Atualmente em modo simulação**: O login aceita qualquer email/senha válidos
- **LocalStorage**: Dados são armazenados localmente no navegador
- **Guard funcional**: Rotas estão protegidas e redirecionamento funciona
- **Pronto para produção**: Apenas substitua a lógica de autenticação pela API real
