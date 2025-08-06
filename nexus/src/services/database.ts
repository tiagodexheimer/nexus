import { Client } from 'pg';
import dotenv from 'dotenv';

// Carrega as variáveis de ambiente do arquivo .env
dotenv.config();

// Script SQL completo para criar as tabelas e dados iniciais
const ddlScript = `
-- Ativa a extensão PostGIS, necessária para dados geoespaciais.
-- Deve ser executado uma vez por banco de dados.
CREATE EXTENSION IF NOT EXISTS postgis;

-- Tabela de Perfis de Usuário
CREATE TABLE perfis (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(50) NOT NULL UNIQUE,
    descricao TEXT
);

-- Tabela de Usuários
CREATE TABLE usuarios (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    senha_hash VARCHAR(255) NOT NULL,
    perfil_id INTEGER NOT NULL REFERENCES perfis(id),
    ativo BOOLEAN NOT NULL DEFAULT true,
    data_criacao TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de Templates de Formulário
CREATE TABLE formulario_templates (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    descricao TEXT,
    ativo BOOLEAN NOT NULL DEFAULT true
);

-- Tabela de Campos dos Formulários
CREATE TABLE formulario_campos (
    id SERIAL PRIMARY KEY,
    template_id INTEGER NOT NULL REFERENCES formulario_templates(id) ON DELETE CASCADE,
    label VARCHAR(255) NOT NULL,
    tipo_campo VARCHAR(50) NOT NULL, -- Ex: 'TEXTO', 'NUMERO', 'DATA', 'SELECAO_UNICA', 'SELECAO_MULTIPLA', 'FOTO', 'ASSINATURA'
    opcoes JSONB, -- Para campos de seleção
    ordem INTEGER NOT NULL,
    obrigatorio BOOLEAN NOT NULL DEFAULT false
);

-- Tabela de Tipos de Demanda
CREATE TABLE tipos_demanda (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(255) NOT NULL UNIQUE,
    descricao TEXT,
    formulario_template_id INTEGER REFERENCES formulario_templates(id)
);

-- Tabela de Solicitações
CREATE TABLE solicitacoes (
    id SERIAL PRIMARY KEY,
    protocolo VARCHAR(50) NOT NULL UNIQUE,
    nome_solicitante VARCHAR(255) NOT NULL,
    contato_solicitante VARCHAR(255),
    endereco_completo TEXT NOT NULL,
    localizacao GEOMETRY(Point, 4326), -- Armazena Latitude e Longitude
    tipo_demanda_id INTEGER NOT NULL REFERENCES tipos_demanda(id),
    status VARCHAR(50) NOT NULL DEFAULT 'PENDENTE',
    observacoes_iniciais TEXT,
    data_criacao TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    atendente_id INTEGER REFERENCES usuarios(id)
);

-- Tabela de Roteiros de Trabalho
CREATE TABLE roteiros (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    supervisor_id INTEGER NOT NULL REFERENCES usuarios(id),
    data_planejada DATE NOT NULL,
    status VARCHAR(50) NOT NULL DEFAULT 'PLANEJADO',
    data_criacao TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de Vistorias
CREATE TABLE vistorias (
    id SERIAL PRIMARY KEY,
    solicitacao_id INTEGER NOT NULL REFERENCES solicitacoes(id),
    roteiro_id INTEGER REFERENCES roteiros(id),
    agente_id INTEGER REFERENCES usuarios(id),
    ordem_no_roteiro INTEGER,
    status VARCHAR(50) NOT NULL DEFAULT 'PENDENTE',
    data_inicio TIMESTAMP WITH TIME ZONE,
    data_conclusao TIMESTAMP WITH TIME ZONE,
    sincronizado BOOLEAN NOT NULL DEFAULT false,
    data_ultima_sincronizacao TIMESTAMP WITH TIME ZONE
);

-- Tabela de Laudos
CREATE TABLE laudos (
    id SERIAL PRIMARY KEY,
    vistoria_id INTEGER NOT NULL UNIQUE REFERENCES vistorias(id),
    observacoes_gerais TEXT,
    data_emissao TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    link_documento_gerado VARCHAR(512)
);

-- Tabela de Respostas dos Laudos
CREATE TABLE laudo_respostas (
    id SERIAL PRIMARY KEY,
    laudo_id INTEGER NOT NULL REFERENCES laudos(id) ON DELETE CASCADE,
    campo_id INTEGER NOT NULL REFERENCES formulario_campos(id),
    valor_resposta TEXT,
    UNIQUE(laudo_id, campo_id)
);

-- Tabela de Mídias (Fotos, Assinaturas)
CREATE TABLE midias (
    id SERIAL PRIMARY KEY,
    laudo_id INTEGER NOT NULL REFERENCES laudos(id) ON DELETE CASCADE,
    tipo_midia VARCHAR(50) NOT NULL, -- 'FOTO' ou 'ASSINATURA'
    url_armazenamento VARCHAR(512) NOT NULL,
    metadados_json JSONB, -- Armazena marca d'água, coordenadas, etc.
    data_captura TIMESTAMP WITH TIME ZONE
);

-- Tabela da Biblioteca de Espécies
CREATE TABLE especies_arboreas (
    id SERIAL PRIMARY KEY,
    nome_comum VARCHAR(255),
    nome_cientifico VARCHAR(255) NOT NULL UNIQUE,
    descricao TEXT,
    url_foto_referencia VARCHAR(512)
);

-- Inserção de dados iniciais para Perfis
INSERT INTO perfis (nome, descricao) VALUES
    ('ADMINISTRADOR', 'Acesso total ao sistema, incluindo configurações e gerenciamento de usuários.'),
    ('SUPERVISOR', 'Planeja roteiros, atribui vistorias e visualiza dashboards.'),
    ('AGENTE_DE_CAMPO', 'Utiliza o aplicativo móvel para executar vistorias em campo.'),
    ('ATENDENTE', 'Cadastra novas solicitações no sistema.');

-- Criação de Índices para otimização de consultas
CREATE INDEX idx_solicitacoes_status ON solicitacoes(status);
CREATE INDEX idx_solicitacoes_localizacao ON solicitacoes USING GIST (localizacao);
CREATE INDEX idx_vistorias_status ON vistorias(status);
CREATE INDEX idx_vistorias_agente_id ON vistorias(agente_id);
CREATE INDEX idx_vistorias_sincronizado ON vistorias(sincronizado);
CREATE INDEX idx_laudo_respostas_laudo_id ON laudo_respostas(laudo_id);
CREATE INDEX idx_midias_laudo_id ON midias(laudo_id);
CREATE INDEX idx_especies_nome_comum ON especies_arboreas(nome_comum);
`;

export async function initializeDatabase() {
  const client = new Client({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: parseInt(process.env.DB_PORT || '5432', 10),
  });

  try {
    await client.connect();
    console.log('Conexão com o banco de dados estabelecida.');

    // Verifica se as tabelas já existem antes de criar
    const checkTableQuery = `
      SELECT EXISTS (
        SELECT FROM information_schema.tables 
        WHERE  table_name = 'perfis'
      );
    `;
    const res = await client.query(checkTableQuery);
    if (res.rows[0].exists) {
      console.log('As tabelas já existem. Não é necessário inicializar.');
      return;
    }

    console.log('Executando o script DDL...');
    await client.query(ddlScript);
    console.log('Banco de dados inicializado com sucesso.');
  } catch (error) {
    console.error('Erro ao inicializar o banco de dados:', error);
    throw error;
  } finally {
    await client.end();
    console.log('Conexão com o banco de dados encerrada.');
  }
}

// Exemplo de como chamar a função
// initializeDatabase().catch(err => {
//   console.error('Falha na inicialização da base de dados.', err);
// });

