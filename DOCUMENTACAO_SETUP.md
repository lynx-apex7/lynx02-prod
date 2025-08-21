# Documentação de Setup do Projeto Suna

## Visão Geral do Projeto

O Suna é um agente de IA generalista desenvolvido pela Kortix, uma plataforma open-source para criar, gerenciar e treinar agentes de IA autônomos. O Suna demonstra as capacidades da plataforma ao realizar tarefas como pesquisa, análise de dados, automação web, gerenciamento de arquivos e execução de workflows complexos.

### Arquitetura do Sistema

O Suna é composto por cinco componentes principais:

1. **Backend API** (Python/FastAPI)
2. **Backend Worker** (Python/Dramatiq)
3. **Frontend** (Next.js/React)
4. **Agent Docker** (ambiente isolado para agentes)
5. **Supabase Database** (persistência de dados e autenticação)

## Requisitos do Sistema

- Docker e Docker Compose
- Git
- Python 3.11
- Node.js & npm
- Supabase CLI

## Configuração Atual do Ambiente

O ambiente já possui as seguintes ferramentas instaladas:

- Python 3.11.11
- Docker version 28.1.1
- Docker Compose version v2.35.1-desktop.1
- Node.js v20.19.4
- npm
- Supabase CLI 2.34.3

## Estrutura do Projeto

```
suna/
├── backend/
│   ├── .env (arquivo de configuração criado)
│   ├── .env.example
│   └── ... (outros arquivos do backend)
├── frontend/
│   ├── .env.local (arquivo de configuração criado)
│   ├── .env.example
│   └── ... (outros arquivos do frontend)
├── docker-compose.yaml
├── setup.py
├── start.py
└── ... (outros arquivos)
```

## Arquivos de Configuração Criados

### 1. backend/.env

Arquivo de configuração do backend com as seguintes variáveis principais:

- ENV_MODE=local
- Configurações do Supabase (pendente de preenchimento)
- Configurações do Redis (já configuradas para o container Docker)
- Chaves de API de provedores LLM (pendente de preenchimento)
- Configurações de serviços opcionais (vazias por padrão)

### 2. frontend/.env.local

Arquivo de configuração do frontend com as seguintes variáveis:

- NEXT_PUBLIC_ENV_MODE="local"
- Configurações do Supabase (pendente de preenchimento)
- NEXT_PUBLIC_BACKEND_URL="http://localhost:8000/api"
- NEXT_PUBLIC_URL="http://localhost:3000"

## Próximos Passos

### 1. Criar Projeto no Supabase

Antes de iniciar os serviços, é necessário criar um projeto no Supabase:

1. Acesse [https://supabase.com/](https://supabase.com/)
2. Crie uma conta (se ainda não tiver)
3. Crie um novo projeto
4. Anote as seguintes informações:
   - Project URL
   - anon key
   - service_role key

### 2. Preencher Chaves de API

É necessário preencher pelo menos uma das seguintes chaves de API no arquivo `backend/.env`:

- ANTHROPIC_API_KEY
- OPENAI_API_KEY
- GROQ_API_KEY
- OPENROUTER_API_KEY
- GEMINI_API_KEY

### 3. Configurar Daytona (Opcional)

Para funcionalidades avançadas de execução segura de agentes:

1. Criar conta no Daytona
2. Gerar chave de API
3. Criar Snapshot com:
   - Nome: `kortix/suna:0.1.3.5`
   - Imagem: `kortix/suna:0.1.3.5`
   - Entrypoint: `/usr/bin/supervisord -n -c /etc/supervisor/conf.d/supervisord.conf`

### 4. Iniciar os Serviços

Após configurar as chaves necessárias, execute:

```bash
docker-compose up -d
```

Este comando iniciará todos os serviços em segundo plano:
- Redis (banco de dados em memória)
- Backend API (porta 8000)
- Worker (processamento em segundo plano)
- Frontend (porta 3000)

### 5. Acessar a Aplicação

Após iniciar os serviços, acesse:
- Frontend: http://localhost:3000
- Backend API: http://localhost:8000

### 6. Criar Conta de Usuário

1. Acesse http://localhost:3000
2. Crie uma conta via autenticação do Supabase
3. Faça login na aplicação

## Opções de Inicialização Alternativas

### Inicialização Manual (sem Docker)

Se preferir executar os serviços manualmente:

1. Iniciar Redis: `docker-compose up redis -d`
2. Frontend: `cd frontend && npm run dev`
3. Backend: `cd backend && python3.11 api.py`
4. Worker: `cd backend && python3.11 run_agent_background.py`

## Troubleshooting

### Problemas Comuns

1. **Portas ocupadas**: Verifique se as portas 3000, 6379 e 8000 estão livres
2. **Permissões do Docker**: Certifique-se de que o usuário tem permissões para executar comandos Docker
3. **Chaves de API inválidas**: Verifique se as chaves estão corretas e têm permissões adequadas

### Comandos Úteis

- Verificar logs: `docker-compose logs`
- Parar serviços: `docker-compose down`
- Verificar status: `docker-compose ps`

## Considerações Finais

O setup básico do projeto Suna está pronto para ser executado. Os próximos passos envolvem principalmente:

1. Configurar as credenciais do Supabase
2. Adicionar pelo menos uma chave de API de LLM
3. Iniciar os serviços com Docker Compose
4. Acessar a interface web e criar uma conta de usuário

Após esses passos, o Suna estará pronto para uso e você poderá começar a interagir com o agente de IA através da interface web.