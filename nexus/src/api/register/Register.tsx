/**
 * @file src/api/register/Register.ts
 * @description Este arquivo contém a lógica de simulação da API de cadastro.
 */

/**
 * Simula uma chamada de API de cadastro de usuário.
 * @param {string} name - O nome do usuário.
 * @param {string} email - O email do usuário.
 * @param {string} password - A senha do usuário.
 * @returns {Promise<string>} Uma promessa que resolve com uma mensagem de sucesso ou rejeita com um erro.
 */
export const registerUser = (name: string, email: string, password: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    // Simula um atraso de rede de 1.5 segundos
    setTimeout(() => {
      if (name && email && password) {
        // Em um cenário real, você faria uma requisição para o backend aqui.
        // e lidaria com possíveis erros, como email já cadastrado.
        console.log('Usuário cadastrado (simulação):', { name, email });
        resolve('Cadastro realizado com sucesso!');
      } else {
        reject(new Error('Todos os campos são obrigatórios.'));
      }
    }, 1500);
  });
};
