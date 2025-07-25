/**
 * @file src/api/login/Login.ts
 * @description Este arquivo contém a lógica de simulação da API de autenticação.
 * Ele é responsável por verificar as credenciais do usuário.
 */

/**
 * Simula uma chamada de API de login.
 * Em um cenário real, esta função faria uma requisição HTTP para um backend.
 * @param {string} userEmail - O email do usuário.
 * @param {string} userPassword - A senha do usuário.
 * @returns {Promise<string>} Uma promessa que resolve com uma mensagem de sucesso ou rejeita com um erro.
 */
export const Login = (userEmail: string, userPassword: string): Promise<string> => {
    return new Promise((resolve, reject) => {
      // Simula um atraso de rede de 1.5 segundos
      setTimeout(() => {
        // Credenciais "corretas" para a simulação
        if (userEmail === 'email' && userPassword === '123') {
          // Se o login estiver correto, a Promise é "resolvida" com sucesso
          resolve('Login realizado com sucesso!');
        } else {
          // Se estiver incorreto, a Promise é "rejeitada" com um erro
          reject(new Error('Email ou senha inválidos.'));
        }
      }, 1500);
    });
  };
  