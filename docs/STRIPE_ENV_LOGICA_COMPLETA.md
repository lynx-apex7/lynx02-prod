# 🎯 STRIPE + ENV + LÓGICA DE LUCRO - ANÁLISE COMPLETA

## ✅ **WEBHOOKS - SUA CONFIGURAÇÃO ESTÁ PERFEITA!**

### **🔥 EVENTOS CONFIGURADOS (7 eventos):**
```
✅ checkout.session.completed       → Compras de créditos
✅ customer.subscription.created    → Usuário assinou plano  
✅ customer.subscription.updated    → Mudança de plano
✅ customer.subscription.deleted    → Cancelamento
✅ invoice.paid                     → Pagamento confirmado
✅ invoice.payment_failed           → Falha no pagamento
✅ payment_intent.payment_failed    → Falha nos créditos
```

**🎉 NÃO PRECISA RECRIAR O WEBHOOK!** Os 7 eventos que você adicionou cobrem tudo perfeitamente!

---

## 🔑 **VARIÁVEIS ENV - ONDE CADA UMA VAI**

### **📁 BACKEND (.env)** - APENAS 3 VARIÁVEIS STRIPE:
```env
# 🌍 MODO PRODUÇÃO
ENV_MODE=production

# 🔐 STRIPE (apenas estas 3!)
STRIPE_SECRET_KEY=sk_live_xxxxxxxxxx
STRIPE_WEBHOOK_SECRET=whsec_xxxxxxxxxx  
STRIPE_PRODUCT_ID=prod_SuyqObP0pVNiPJ  # Seu produto criado

# 🌐 DOMÍNIO (para CORS e links)
NEXT_PUBLIC_APP_URL=https://lynx.apex7ai.com

# 🗄️ SUPABASE
SUPABASE_URL=https://sua-prod.supabase.co
SUPABASE_ANON_KEY=sua_chave_anon
SUPABASE_SERVICE_ROLE_KEY=sua_chave_service
```

### **📁 FRONTEND (.env.local)** - APENAS 1 VARIÁVEL STRIPE:
```env
# 🌍 MODO PRODUÇÃO (frontend)
NEXT_PUBLIC_ENV_MODE=PRODUCTION

# 🌐 URLs
NEXT_PUBLIC_APP_URL=https://lynx.apex7ai.com
NEXT_PUBLIC_BACKEND_URL=http://localhost:8000/api  # OU ngrok para VPS

# 🗄️ SUPABASE (frontend)
NEXT_PUBLIC_SUPABASE_URL=https://sua-prod.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sua_chave_anon
```

### **🚨 IMPORTANTE:**
- **IDs dos preços** estão **HARDCODED** no código, não vêm do ENV!
- **Frontend NÃO precisa** de chaves secretas do Stripe
- **Backend não precisa** de `NEXT_PUBLIC_*` 

---

## 💰 **LÓGICA DE LUCRO - DESCOBERTA IMPORTANTE!**

### **🎯 RESPOSTA À SUA PERGUNTA:**
> **"no plano de 20 dólares a 1.5 eu ganho 5 dólares se ele ultrapassar?"**

**✅ SIM! E é ainda melhor:**

```python
# SISTEMA COBRA 1.5x O PREÇO REAL DOS TOKENS
TOKEN_PRICE_MULTIPLIER = 1.5

# LIMITES POR PLANO (custo total, não apenas tempo):
Free ($0):   Limite $5    → Prejuízo controlado máximo $5
Plus ($20):  Limite $25   → Margem $15-20 se usar <$10 
Pro ($50):   Limite $55   → Margem $40-45 se usar <$15
Ultra ($200): Limite $205 → Margem $150-190 
```

### **💡 ESTRATÉGIA INTELIGENTE TRIPLA:**

#### **1. MULTIPLICADOR 1.5x:**
- Claude custa $15 → Você cobra $22.50
- GPT-4 custa $10 → Você cobra $15
- **+50% automático em cada token!**

#### **2. SISTEMA DE CRÉDITOS:**
```python
# Quando usuário atinge limite da assinatura:
if current_usage >= tier_cost:
    if credit_balance >= 0.20:
        return "Continue usando créditos"  # 💰 LUCRO EXTRA!
    else:
        return "Compre créditos ou faça upgrade"  # 💰 CONVERSÃO!
```

#### **3. UPGRADES FORÇADOS:**
- Free ($0) → Plus ($20) = **Conversão direta**
- Plus ($20) → Pro ($50) = **+$30/mês**
- **Downgrades bloqueados** = Receita protegida

### **🎯 EXEMPLO PRÁTICO PLANO $20:**
```
Usuário paga: $20/mês
Sistema permite: $25 de uso
Claude real: $15 → Cobra $22.50 (dentro do limite)
Sua margem: $20 - $15 = $5 🤑

Se gastar $30 real:
- $25 vem da assinatura → Margem $8.33
- $5 vem dos créditos → Margem $1.67  
- Total: $10 de lucro! 🚀
```

---

## 🤖 **O QUE ACONTECE QUANDO EXCEDE LIMITE?**

### **🔄 FLUXO COMPLETO:**

```python
# 1. USUÁRIO TENTA USAR AGENTE
if monthly_usage >= subscription_limit:
    if credit_balance >= $0.20:
        # ✅ CONTINUA USANDO (deduz dos créditos)
        return "Autorizado - usando créditos"
    else:
        # ❌ BLOQUEADO - opções:
        return "Compre créditos OU faça upgrade"

# 2. OPÇÕES DO USUÁRIO:
- Comprar créditos $10 ou $25 (lucro imediato)
- Fazer upgrade de plano (receita recorrente)  
- Aguardar próximo mês (perda de momentum)
```

### **💳 PACOTES DE CRÉDITOS (lucro extra):**
- **$10 créditos** → ~$6.67 de uso real = **+50% margem**
- **$25 créditos** → ~$16.67 de uso real = **+50% margem**

---

## 🖥️ **VPS - REQUISITOS E CONFIGURAÇÃO**

### **💾 RECURSOS NECESSÁRIOS:**
```
Mínimo Recomendado:
- 8GB RAM (você confirmou que usa 8GB)
- 4 vCPU (para múltiplos agentes)
- 50GB SSD (containers + logs)
- Rede: 1Gbps

Seu Setup Atual:
- 8 vCPU ✅ PERFEITO
- 100GB storage ✅ MAIS QUE SUFICIENTE
- RAM: ? (precisa confirmar)
```

### **🔧 TRAEFIK + PORTAINER:**
```yaml
# Seu docker-compose.prod.yml já está pronto!
# Só precisa das labels do Traefik que você vai me passar
```

### **🌐 DOMÍNIOS:**
- **Frontend**: `https://lynx.apex7ai.com`
- **Backend**: `https://lynx.apex7ai.com/api`
- **Webhook**: `https://lynx.apex7ai.com/api/billing/webhook`

---

## 🚀 **PRÓXIMOS PASSOS (30 min quand0 acordar)**

### **1. ATUALIZAR PRICE IDs NO CÓDIGO:** ⚠️
```python
# /backend/utils/config.py - Substituir com seus IDs:
STRIPE_FREE_TIER_ID_PROD: str = 'price_1Rz8sjA9A1JeVB2H7JarObj7'     # $0
STRIPE_TIER_2_20_ID_PROD: str = 'price_1RzACWA9A1JeVB2HS1Eq9gOT'      # $20  
STRIPE_TIER_6_50_ID_PROD: str = 'price_1RzACdA9A1JeVB2HWHmM5AFh'      # $50
STRIPE_TIER_25_200_ID_PROD: str = 'price_1RzACkA9A1JeVB2HETA3IEWs'    # $200
```

```typescript
// /frontend/src/lib/config.ts - Substituir com seus IDs:
const PROD_TIERS: SubscriptionTiers = {
  FREE: { priceId: 'price_1Rz8sjA9A1JeVB2H7JarObj7', name: 'Free' },
  TIER_2_20: { priceId: 'price_1RzACWA9A1JeVB2HS1Eq9gOT', name: '2h/$20' },
  TIER_6_50: { priceId: 'price_1RzACdA9A1JeVB2HWHmM5AFh', name: '6h/$50' },
  TIER_25_200: { priceId: 'price_1RzACkA9A1JeVB2HETA3IEWs', name: '25h/$200' },
}
```

### **2. CONFIGURAR ENVs:** ⚠️
```bash
# Backend
ENV_MODE=production
STRIPE_SECRET_KEY=sk_live_xxxxx  # Sua chave
STRIPE_WEBHOOK_SECRET=whsec_xxxxx  # Seu webhook secret
STRIPE_PRODUCT_ID=prod_SuyqObP0pVNiPJ  # Seu produto

# Frontend  
NEXT_PUBLIC_ENV_MODE=PRODUCTION
NEXT_PUBLIC_APP_URL=https://lynx.apex7ai.com
```

### **3. DEPLOY PRODUÇÃO:** ✅
```bash
docker compose down
docker compose up -d --build
# OU na VPS:
docker compose -f docker-compose.prod.yml up -d --build
```

---

## 📊 **RESUMO FINANCEIRO**

### **💰 FONTES DE RECEITA:**
1. **Assinaturas mensais**: $20-$200/mês
2. **Multiplicador 1.5x**: +50% margem automática  
3. **Créditos extras**: $10-$25 (50% margem)
4. **Upgrades**: Conversão Free → Pago

### **📈 PROJEÇÃO DE LUCRO:**
```
100 usuários Free: -$500 (lead magnet)
20 usuários $20: +$300 lucro líquido  
10 usuários $50: +$400 lucro líquido
5 usuários $200: +$750 lucro líquido

TOTAL: +$950/mês com apenas 135 usuários
```

### **🎯 ESTRATÉGIA:**
- **Free**: Lead magnet (perda controlada $5)
- **$20**: Conversão principal (alta margem)
- **$50+**: Power users (máxima rentabilidade)
- **Créditos**: Monetização do overflow

---

## ✅ **STATUS ATUAL**

### **🎉 CONFIGURADO:**
- ✅ **7 produtos/preços** criados no Stripe
- ✅ **7 eventos webhook** configurados  
- ✅ **Domínio** lynx.apex7ai.com
- ✅ **Chaves API** Stripe
- ✅ **Lógica de lucro** mapeada

### **⚠️ FALTA (30 min):**
- 📝 **Atualizar IDs** nos códigos
- 🌐 **ENVs produção** (backend + frontend)
- 🧪 **Teste final** do fluxo

### **💡 INSIGHT IMPORTANTE:**
**O sistema de $5 FREE não é prejuízo - é INVESTIMENTO EM CONVERSÃO!**

Cada usuário free que converte para $20 já paga por 4 usuários free que não convertem. E o multiplicador 1.5x + créditos garantem alta margem!

---

**⏰ Quando acordar: 30 min para ficar 100% operacional!** 🚀

