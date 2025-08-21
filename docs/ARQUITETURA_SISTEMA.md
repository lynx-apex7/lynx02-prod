# Arquitetura do Sistema Suna

## Visão Geral

O Suna é uma plataforma de agentes de IA open-source que permite criar, gerenciar e treinar agentes de IA autônomos. A plataforma é composta por vários componentes que trabalham juntos para fornecer uma solução completa de automação e inteligência artificial.

## Componentes Principais

### 1. Backend API
- **Tecnologia**: Python/FastAPI
- **Porta**: 8000
- **Função**: Fornece endpoints REST para gerenciamento de agentes, threads e integração com LLMs
- **Imagem Docker**: ghcr.io/suna-ai/suna-backend:latest

### 2. Worker (Backend)
- **Tecnologia**: Python/Dramatiq
- **Função**: Processa tarefas em segundo plano para os agentes
- **Imagem Docker**: ghcr.io/suna-ai/suna-backend:latest

### 3. Frontend
- **Tecnologia**: Next.js/React
- **Porta**: 3000
- **Função**: Interface de usuário para gerenciar agentes e interagir com a plataforma

### 4. Redis
- **Tecnologia**: Redis 7 Alpine
- **Porta**: 6379
- **Função**: Banco de dados em memória para caching e gerenciamento de sessões

### 5. Supabase
- **Função**: Banco de dados e autenticação
- **URL**: https://qfzluxjudlvsoljnswyo.supabase.co
- **Schemas expostos**: public, graphql_public, basejump

## Configurações do Sistema

### Variáveis de Ambiente (Backend)

O sistema está configurado com as seguintes variáveis de ambiente no arquivo `backend/.env`:

- **Modo de ambiente**: local
- **Supabase**:
  - URL: https://qfzluxjudlvsoljnswyo.supabase.co
  - Chave anônima e chave de serviço configuradas
- **Redis**:
  - Host: redis (serviço interno do Docker)
  - Porta: 6379
- **Provedores de LLM**:
  - OpenRouter API Key configurada
  - Morph API Key configurada
- **Ferramentas de busca e scraping**:
  - Tavily API Key configurada
  - Firecrawl API Key configurada
  - URL do Firecrawl configurada
- **Sandboxing**:
  - Daytona API Key configurada
  - URL do servidor Daytona: https://app.daytona.io/api
  - Target: us
- **Webhooks**:
  - URL base configurada (via ngrok): https://742d5d0ee3f0.ngrok-free.app
  - Secret para webhooks configurado
- **Criptografia**:
  - Chave de criptografia MCP configurada
- **Admin**:
  - Kortix Admin API Key configurada

### Variáveis de Ambiente (Frontend)

O sistema está configurado com as seguintes variáveis no arquivo `frontend/.env.local`:

- **Modo de ambiente**: LOCAL
- **Supabase**:
  - URL: https://qfzluxjudlvsoljnswyo.supabase.co
  - Chave anônima configurada
- **Backend URL**: http://localhost:8000/api
- **URL da aplicação**: http://localhost:3000
- **Admin API Key**: Configurada

## Arquitetura de Contêineres Docker

### Serviços Docker

1. **redis**:
   - Imagem: redis:7-alpine
   - Porta: 6379
   - Volume para persistência de dados
   - Configuração personalizada via redis.conf

2. **backend**:
   - Imagem: ghcr.io/suna-ai/suna-backend:latest
   - Porta: 8000
   - Monta o arquivo .env como volume
   - Dependências: redis (healthy), worker (started)

3. **worker**:
   - Imagem: ghcr.io/suna-ai/suna-backend:latest
   - Comando personalizado para executar dramatiq
   - Monta o arquivo .env como volume somente leitura
   - Dependências: redis (healthy)

4. **frontend**:
   - Build a partir do Dockerfile na pasta frontend
   - Porta: 3000
   - Monta o arquivo .env.local como volume somente leitura
   - Dependências: backend

## Banco de Dados

### Supabase

O sistema utiliza o Supabase como banco de dados e serviço de autenticação. As migrações foram aplicadas ao banco de dados e incluem:

- Configuração do Basejump
- Schemas para contas, convites e billing
- Schemas para o AgentPress
- Schemas para workflows
- Schemas para agentes e conhecimento
- Configurações para credenciais seguras
- Configurações para triggers e integrações
- Configurações para cron jobs

O schema `basejump` foi exposto conforme necessário para o funcionamento do sistema.

## Integrações Externas

### LLM Providers
- **OpenRouter**: Configurado com API key
- **Morph**: Configurado com API key (para edição de código)

### Ferramentas de Busca e Scraping
- **Tavily**: Configurado com API key
- **Firecrawl**: Configurado com API key e URL

### Webhooks
- **ngrok**: Configurado para expor o serviço local à internet
  - URL: https://742d5d0ee3f0.ngrok-free.app

### Sandbox
- **Daytona**: Configurado para execução segura de agentes
  - API Key configurada
  - URL do servidor: https://app.daytona.io/api
  - Target: us

## Status do Sistema

### Contêineres
Todos os contêineres estão em execução:
- redis: Healthy
- backend: Started
- worker: Started
- frontend: Started

### Serviços
- **Frontend**: Respondendo corretamente (HTTP 200)
- **Backend**: Respondendo corretamente no endpoint /api/health
- **Redis**: Respondendo corretamente ao comando PING
- **Worker**: Iniciado com alguns avisos sobre chaves de API ausentes para alguns provedores

### Avisos no Worker
O worker está emitindo avisos sobre chaves de API ausentes para:
- Anthropic
- Groq
- XAI
- Gemini
- AWS Bedrock
- OpenAI

Esses avisos são esperados, pois apenas o OpenRouter e Morph estão configurados.

## Acesso à Aplicação

A aplicação pode ser acessada em:
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:8000
- **Redis**: localhost:6379 (acesso interno via contêineres)

## Comandos Úteis

### Gerenciamento de Serviços
```bash
# Verificar status dos serviços
docker-compose ps

# Verificar logs
docker-compose logs -f

# Parar todos os serviços
docker-compose down

# Iniciar todos os serviços
docker-compose up -d
```

### Scripts de Gerenciamento
- `setup.py`: Script de configuração inicial
- `start.py`: Script para iniciar/parar serviços

## Considerações Finais

O sistema está configurado e funcionando corretamente com todos os componentes principais em execução. A integração com o Supabase está configurada e as migrações foram aplicadas. O sistema está pronto para uso com o OpenRouter como provedor de LLM principal e o Morph para edição de código.

Para funcionalidade completa com outros provedores de LLM, seria necessário adicionar as respectivas chaves de API ao arquivo de configuração.