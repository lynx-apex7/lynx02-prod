# 🚀 DEPLOY LYNX AI - VPS COM TRAEFIK

## 📋 **PRÉ-REQUISITOS**
- ✅ VPS com Docker + Traefik + Portainer
- ✅ Domínio `lynxai.com.br` apontando para VPS
- ✅ Certificados SSL automáticos (Let's Encrypt)

## 🔧 **CONFIGURAÇÃO ENV PRODUÇÃO**

Crie `/backend/.env` na VPS:
```env
# MODO PRODUÇÃO
ENV_MODE=production
NODE_ENV=production

# DOMÍNIO
NEXT_PUBLIC_APP_URL=https://lynxai.com.br

# SUPABASE (PRODUÇÃO)
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=your_production_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_production_service_key

# API KEYS
ANTHROPIC_API_KEY=your_anthropic_key
OPENAI_API_KEY=your_openai_key
OPENROUTER_API_KEY=your_openrouter_key
COMPOSIO_API_KEY=your_composio_key
MODEL_TO_USE=openrouter/anthropic/claude-3-7-sonnet-latest

# STRIPE PRODUÇÃO
STRIPE_SECRET_KEY=sk_live_your_live_key
STRIPE_PUBLISHABLE_KEY=pk_live_your_live_key
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret
```

## 🐳 **DEPLOY COMMANDS**

```bash
# 1. Clone na VPS
git clone https://github.com/lynx-apex7/lynx02.git
cd lynx02/suna

# 2. Configurar environment
cp .env.production.example backend/.env
# Editar backend/.env com suas chaves

# 3. Deploy produção
docker compose -f docker-compose.prod.yml up -d --build

# 4. Verificar status
docker compose -f docker-compose.prod.yml ps
docker compose -f docker-compose.prod.yml logs -f
```

## 🌐 **CONFIGURAÇÃO TRAEFIK**

O `docker-compose.prod.yml` já inclui labels para Traefik:

```yaml
labels:
  - "traefik.enable=true"
  - "traefik.http.routers.lynx-frontend.rule=Host(\`lynxai.com.br\`)"
  - "traefik.http.routers.lynx-frontend.entrypoints=websecure"
  - "traefik.http.routers.lynx-frontend.tls.certresolver=letsencrypt"
```

## 🔍 **VERIFICAÇÕES PÓS-DEPLOY**

### **1. Health Checks:**
```bash
# Backend health
curl https://lynxai.com.br/api/health

# Frontend
curl https://lynxai.com.br

# Redis
docker exec lynx-redis redis-cli ping
```

### **2. Logs importantes:**
```bash
# Backend logs
docker logs lynx-backend -f

# Worker logs  
docker logs lynx-worker -f

# Frontend logs
docker logs lynx-frontend -f
```

### **3. Recursos do sistema:**
```bash
# Uso de CPU/RAM
docker stats

# Espaço em disco
df -h
docker system df
```

## 🎯 **DIFERENÇAS PRODUÇÃO vs LOCAL**

| Aspecto | Local | Produção |
|---------|-------|----------|
| **ENV visíveis** | ✅ Sim (debug) | ❌ Não (seguro) |
| **Billing** | ❌ Desabilitado | ✅ Ativo |
| **Preços** | ❌ Ocultos | ✅ Visíveis |
| **SSL** | ❌ HTTP | ✅ HTTPS |
| **Domínio** | localhost:3000 | lynxai.com.br |
| **Performance** | Debug | Otimizado |

## 🛡️ **SEGURANÇA PRODUÇÃO**

### **Variáveis protegidas:**
- ✅ API keys não expostas no frontend
- ✅ Certificates SSL automáticos
- ✅ Headers de segurança
- ✅ CORS configurado

### **Backup recomendado:**
```bash
# Backup Redis
docker exec lynx-redis redis-cli BGSAVE

# Backup configs
tar -czf lynx-backup-$(date +%Y%m%d).tar.gz backend/.env docker-compose.prod.yml
```

## 📊 **MONITORAMENTO**

### **Recursos necessários (sua VPS é suficiente):**
- **RAM**: ~7GB usados de 8GB+ ✅
- **CPU**: 4+ cores de 8 vCPU ✅  
- **Disco**: ~10GB de 100GB ✅
- **Rede**: Banda suficiente ✅

### **Métricas importantes:**
```bash
# Container stats
docker stats --format "table {{.Container}}\t{{.CPUPerc}}\t{{.MemUsage}}"

# Disk usage
du -sh /var/lib/docker/
```

## 🚨 **TROUBLESHOOTING**

### **Problemas comuns:**

**1. Frontend não carrega:**
```bash
docker logs lynx-frontend
# Verificar se NEXT_PUBLIC_APP_URL está correto
```

**2. API 500 errors:**
```bash
docker logs lynx-backend
# Verificar SUPABASE_URL e API keys
```

**3. Worker não processa:**
```bash
docker logs lynx-worker
# Verificar REDIS_HOST connection
```

**4. Traefik não roteia:**
```bash
# Verificar se network 'traefik' existe
docker network ls | grep traefik
```

## ✅ **CHECKLIST FINAL**

- [ ] Domínio apontando para VPS
- [ ] Traefik configurado e funcionando
- [ ] SSL certificates válidos
- [ ] Todas as API keys configuradas
- [ ] Stripe em modo produção (se usando)
- [ ] Supabase em modo produção
- [ ] Backup strategy definida
- [ ] Monitoramento funcionando

---

**⚡ RESULTADO ESPERADO:**
- 🌐 `https://lynxai.com.br` → Frontend funcionando
- 🔗 `https://lynxai.com.br/api/health` → Backend OK
- 💳 Billing e preços visíveis
- 🔒 Ambiente variables protegidas
- 🚀 Performance otimizada
