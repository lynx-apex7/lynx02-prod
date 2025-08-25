# 🚀 LYNX AI - DEPLOY PRODUÇÃO VPS

## 📋 **SETUP RÁPIDO**

### **1. PREPARAR VPS (5 min)**
```bash
# Na VPS - criar diretório
mkdir -p /opt/docker-stack/lynx-ai
cd /opt/docker-stack/lynx-ai

# Clonar repositório
git clone https://github.com/SEU_USER/lynx02-prod.git .
```

### **2. CONFIGURAR ENVs (10 min)**
```bash
# Copiar e editar ENVs
cp .env.backend.production backend/.env
cp .env.frontend.production frontend/.env.local

# Editar com suas chaves reais
nano backend/.env      # Adicionar todas as chaves
nano frontend/.env.local  # Configurar URLs
```

### **3. CRIAR LOGS DIRECTORY**
```bash
mkdir -p logs/{backend,worker,frontend}
chmod 755 logs/
```

### **4. DEPLOY (2 min)**
```bash
# Build e up
docker compose -f docker-compose.prod.yml up -d --build

# Verificar
docker compose -f docker-compose.prod.yml ps
docker compose -f docker-compose.prod.yml logs -f
```

---

## 🌐 **DOMÍNIOS CONFIGURADOS**

- **Frontend**: `https://lynx.apex7ai.com`
- **Backend API**: `https://lynx.apex7ai.com/api`
- **Webhook Stripe**: `https://lynx.apex7ai.com/api/billing/webhook`

---

## 🔧 **COMANDOS ÚTEIS**

```bash
# Ver logs
docker compose -f docker-compose.prod.yml logs -f [serviço]

# Restart serviço
docker compose -f docker-compose.prod.yml restart [serviço]

# Update code
git pull
docker compose -f docker-compose.prod.yml up -d --build

# Backup volumes
docker run --rm -v lynx-ai_redis_data:/data -v $(pwd):/backup alpine tar czf /backup/redis-backup.tar.gz -C /data .
```

---

## ⚠️ **IMPORTANTE - SUBSTITUIR CHAVES**

Antes do deploy, **OBRIGATÓRIO** substituir em `.env` files:

1. **Supabase**: URLs e chaves de produção
2. **Stripe**: Secret key e webhook secret  
3. **LLM APIs**: Anthropic, OpenAI, Gemini
4. **Outros**: Tavily, Firecrawl, Composio

---

## 📊 **MONITORAMENTO**

- **Traefik**: `https://traefik.apex7ai.com`
- **Portainer**: `https://portainer.apex7ai.com`
- **Logs**: `tail -f logs/backend/api.log`

---

**🎯 SISTEMA PRONTO PARA PRODUÇÃO!** 🚀
