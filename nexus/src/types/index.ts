// src/types/index.ts

/**
 * Define a estrutura de dados para uma única solicitação.
 * Centralizar este tipo aqui permite que ele seja importado de forma consistente
 * por qualquer componente que precise dele.
 */
export interface Solicitacao {
  id: string;
  prazo: number;
  rua: string;
  bairro: string;
  descricao: string;
  status: 'Aguardando Agendamento' | 'Agendado Vistoria' | 'Em Rota';
  mapaUrl: string;
  anexos: File[]; // Adicionado para guardar as fotos ou PDFs
}
