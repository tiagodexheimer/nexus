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
  // Unificando e corrigindo os status para evitar erros de tipo
  status: 'Sem rota' | 'Aguardando agendamento' | 'Agendado' | 'Em Rota' | 'Concluído';
  mapaUrl: string;
  anexos: File[]; // Adicionado para guardar as fotos ou PDFs
}