import 'dotenv/config'; // Usado para carregar o arquivo .env
import { neon } from '@neondatabase/serverless';
import http from 'http';

// Script DDL (Data Definition Language) para criar a estrutura do banco de dados
const ddlScript = `
-- Ativa a extensão PostGIS, necessária para dados geoespaciais.
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
    tipo_campo VARCHAR(50) NOT NULL,
    opcoes JSONB,
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
    localizacao GEOMETRY(Point, 4326),
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
    tipo_midia VARCHAR(50) NOT NULL,
    url_armazenamento VARCHAR(512) NOT NULL,
    metadados_json JSONB,
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

const sql = neon(process.env.DATABASE_URL!);

async function initializeDatabase() {
  try {
    console.log('Iniciando conexão com o banco de dados Neon.');

    // Verifica se a tabela 'perfis' já existe antes de criar
    const checkTableQuery = `
      SELECT EXISTS (
        SELECT FROM information_schema.tables 
        WHERE table_name = 'perfis'
      );
    `;
    const res = await sql(checkTableQuery);
    if (res[0].exists) {
      console.log('As tabelas já existem. Inicialização ignorada.');
      return;
    }

    console.log('Executando o script DDL para criar as tabelas...');
    await sql(ddlScript);
    console.log('Banco de dados inicializado com sucesso.');
  } catch (error) {
    console.error('Erro ao inicializar o banco de dados:', error);
    throw error;
  }
}

const requestHandler = async (req: http.IncomingMessage, res: http.ServerResponse) => {
  try {
    const result = await sql`SELECT version()`;
    const { version } = result[0];
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end(`Servidor está rodando e a versão do banco de dados é: ${version}`);
  } catch (error) {
    console.error('Erro na requisição:', error);
    res.writeHead(500, { 'Content-Type': 'text/plain' });
    res.end('Erro interno do servidor.');
  }
};

async function startServer() {
  await initializeDatabase();
  
  const server = http.createServer(requestHandler);
  
  server.listen(3000, () => {
    console.log("Servidor rodando em http://localhost:3000");
  });
}

startServer();
