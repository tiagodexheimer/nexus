export type Status =
  | 'Pendente'
  | 'Em Andamento'
  | 'Concluída'
  | 'Cancelada'
  | 'Sem rota'
  | 'Aguardando agendamento'
  | 'Agendado'
  | 'Em Rota';

export interface Solicitacao {
  id: string;
  status: Status;
  prazo: number;
  rua: string;
  bairro: string;
  descricao: string;
  mapaUrl: string;
  anexos: File[];
}

export interface NovaSolicitacaoData {
  rua: string;
  bairro: string;
  prazo: number;
  descricao: string;
  status: Status;
  anexos: File[];
}

export type UserRole = 'admin' | 'user';

export interface User {
    id: string;
    name: string;
    email: string;
    role: UserRole;
}
export interface CampoFormulario {
  id: string;
  nome: string;
  tipo: string;
  obrigatorio: boolean;
  ativo: boolean;
}

