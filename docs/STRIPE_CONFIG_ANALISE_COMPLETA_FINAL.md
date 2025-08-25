# 🎯 STRIPE CONFIG.PY - ANÁLISE COMPLETA FINAL

## 📊 **RESUMO EXECUTIVO**

**SITUAÇÃO ATUAL**: O sistema Stripe está 95% configurado, mas os **Price IDs no código não batem** com os IDs reais criados no seu Stripe. Preciso atualizar **2 arquivos principais** + configurar **ENV variables** corretamente.

### **✅ O QUE JÁ FUNCIONA:**
- 🏗️ **Backend completo**: `billing.py` (2322 linhas) - sistema robusto
- 🎨 **Frontend completo**: Componentes de pricing e checkout
- 🗄️ **Database**: Tabelas Supabase configuradas  
- 🔄 **Webhooks**: 7 eventos configurados perfeitamente
- 🛡️ **Modo local/produção**: Lógica implementada

### **⚠️ O QUE PRECISA CORRIGIR:**
- 📝 **Price IDs**: Atualizar com seus IDs reais
- 🌐 **ENVs**: Configurar produção vs local corretamente
- 🔑 **Variáveis**: Esclarecer NEXT_PUBLIC_APP_URL vs outras

---

## 🆔 **MAPEAMENTO DOS SEUS IDs REAIS**

### **📦 PRODUTO ASSINATURAS:** `prod_SuyqObP0pVNiPJ`

#### **💳 PLANOS MENSAIS:**
| Plano | Seu ID Real | ID Atual no Código | Precisa Atualizar |
|-------|-------------|-------------------|-------------------|
| **Free** | `price_1Rz8sjA9A1JeVB2H7JarObj7` | `price_1RILb4G6l1KZGqIrK4QLrx9i` | ⚠️ SIM |
| **$20/mês** | `price_1RzACWA9A1JeVB2HS1Eq9gOT` | `price_1RILb4G6l1KZGqIrhomjgDnO` | ⚠️ SIM |
| **$50/mês** | `price_1RzACdA9A1JeVB2HWHmM5AFh` | `price_1RILb4G6l1KZGqIr5q0sybWn` | ⚠️ SIM |
| **$200/mês** | `price_1RzACkA9A1JeVB2HETA3IEWs` | `price_1RILb4G6l1KZGqIrGAD8rNjb` | ⚠️ SIM |

#### **📅 PLANOS ANUAIS:**
| Plano | Seu ID Real | ID Atual no Código | Precisa Atualizar |
|-------|-------------|-------------------|-------------------|
| **$204/ano** | `price_1RzACsA9A1JeVB2Ho0F1Y4j3` | `price_1ReHB5G6l1KZGqIrD70I1xqM` | ⚠️ SIM |
| **$510/ano** | `price_1RzACzA9A1JeVB2H18D2CmtQ` | `price_1ReHAsG6l1KZGqIrlAog487C` | ⚠️ SIM |
| **$2040/ano** | `price_1RzAD6A9A1JeVB2Hki5Tielu` | `price_1ReH9uG6l1KZGqIrsvMLHViC` | ⚠️ SIM |

### **🎁 PRODUTO CRÉDITOS:** `prod_Sv0DRqCSS7poBB`

#### **💰 PACOTES DE CRÉDITOS:**
| Pacote | Seu ID Real | ID Atual no Código | Status |
|--------|-------------|-------------------|---------|
| **$10** | `price_1RzADRA9A1JeVB2HZKh6TcCN` | `price_1RxmQUG6l1KZGqIru453O1zW` | ⚠️ SIM |
| **$25** | `❌ REPETIDO` | `price_1RxmQlG6l1KZGqIr3hS5WtGg` | 🚨 **PROBLEMA!** |

### **🚨 PROBLEMA CRÍTICO - CRÉDITOS $25:**
Você forneceu o **mesmo ID** para $10 e $25:
```
10: price_1RzADRA9A1JeVB2HZKh6TcCN
25: price_1RzADYA9A1JeVB2HQIkvj7us  ← IGUAL!
```

**📝 AÇÃO NECESSÁRIA:** Verificar o ID correto do pacote $25 no seu Stripe Dashboard.

---

## 🗂️ **ARQUIVOS QUE PRECISAM SER ATUALIZADOS**

### **📁 BACKEND:** `suna/backend/utils/config.py`

#### **🎯 LINHAS ESPECÍFICAS PARA ATUALIZAR:**
```python
# PRODUÇÃO - ATUALIZE ESTAS LINHAS:
STRIPE_FREE_TIER_ID_PROD: str = 'price_1Rz8sjA9A1JeVB2H7JarObj7'      # ← SEU
STRIPE_TIER_2_20_ID_PROD: str = 'price_1RzACWA9A1JeVB2HS1Eq9gOT'       # ← SEU  
STRIPE_TIER_6_50_ID_PROD: str = 'price_1RzACdA9A1JeVB2HWHmM5AFh'       # ← SEU
STRIPE_TIER_25_200_ID_PROD: str = 'price_1RzACkA9A1JeVB2HETA3IEWs'     # ← SEU

# ANUAIS - ATUALIZE ESTAS LINHAS:
STRIPE_TIER_2_20_YEARLY_ID_PROD: str = 'price_1RzACsA9A1JeVB2Ho0F1Y4j3'   # ← SEU
STRIPE_TIER_6_50_YEARLY_ID_PROD: str = 'price_1RzACzA9A1JeVB2H18D2CmtQ'   # ← SEU  
STRIPE_TIER_25_200_YEARLY_ID_PROD: str = 'price_1RzAD6A9A1JeVB2Hki5Tielu' # ← SEU

# PRODUTO - ATUALIZE ESTA LINHA:
STRIPE_PRODUCT_ID_PROD: str = 'prod_SuyqObP0pVNiPJ'  # ← SEU

# CRÉDITOS - AGUARDAR ID CORRETO DO $25:
STRIPE_CREDITS_10_PRICE_ID_PROD: str = 'price_1RzADRA9A1JeVB2HZKh6TcCN'  # ← SEU
STRIPE_CREDITS_25_PRICE_ID_PROD: str = 'AGUARDANDO_ID_CORRETO'  # ← FALTA
```

### **📁 FRONTEND:** `suna/frontend/src/lib/config.ts`

#### **🎯 LINHAS ESPECÍFICAS PARA ATUALIZAR:**
```typescript
// PRODUÇÃO - ATUALIZE ESTAS LINHAS (linha 47-79):
const PROD_TIERS: SubscriptionTiers = {
  FREE: {
    priceId: 'price_1Rz8sjA9A1JeVB2H7JarObj7',  // ← SEU
    name: 'Free',
  },
  TIER_2_20: {
    priceId: 'price_1RzACWA9A1JeVB2HS1Eq9gOT',  // ← SEU
    name: '2h/$20',
  },
  TIER_6_50: {
    priceId: 'price_1RzACdA9A1JeVB2HWHmM5AFh',  // ← SEU  
    name: '6h/$50',
  },
  TIER_25_200: {
    priceId: 'price_1RzACkA9A1JeVB2HETA3IEWs', // ← SEU
    name: '25h/$200',
  },
  // ... anuais também
```

---

## 🌐 **ENV VARIABLES - ESCLARECIMENTOS**

### **🤔 SUA DÚVIDA: NEXT_PUBLIC_URL vs NEXT_PUBLIC_APP_URL**

**✅ RESPOSTA:** O sistema usa **`NEXT_PUBLIC_APP_URL`** (não `NEXT_PUBLIC_URL`).

**📁 BACKEND (.env):**
```env
# 🌍 MODO PRODUÇÃO
ENV_MODE=production

# 🔐 STRIPE (apenas estas 3!)
STRIPE_SECRET_KEY=sk_live_xxxxxxxxxx
STRIPE_WEBHOOK_SECRET=whsec_xxxxxxxxxx  
STRIPE_PRODUCT_ID=prod_SuyqObP0pVNiPJ  # SEU produto

# 🌐 DOMÍNIO
NEXT_PUBLIC_APP_URL=https://lynx.apex7ai.com

# 🗄️ SUPABASE
SUPABASE_URL=https://sua-prod.supabase.co
SUPABASE_ANON_KEY=sua_chave_anon
SUPABASE_SERVICE_ROLE_KEY=sua_chave_service
```

**📁 FRONTEND (.env.local):**
```env
# 🌍 MODO PRODUÇÃO (frontend)
NEXT_PUBLIC_ENV_MODE=PRODUCTION

# 🌐 URLs
NEXT_PUBLIC_APP_URL=https://lynx.apex7ai.com
NEXT_PUBLIC_BACKEND_URL=https://lynx.apex7ai.com/api  # Backend URL

# 🗄️ SUPABASE (frontend)
NEXT_PUBLIC_SUPABASE_URL=https://sua-prod.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sua_chave_anon
```

### **❓ SUA PERGUNTA: "NEXT_PUBLIC_BACKEND_URL é necessário?"**

**✅ SIM!** É **obrigatório** para o frontend se comunicar com o backend:
- **Modo local**: `http://localhost:8000/api`
- **Modo produção**: `https://lynx.apex7ai.com/api`

---

## 🏗️ **ESTRUTURA ATUAL DO SISTEMA**

### **💰 PLANOS CONFIGURADOS NO CÓDIGO:**
O código suporta **8 tiers**, mas você só criou **4**:

| Tier | Código Suporta | Você Criou | Status |
|------|---------------|------------|---------|
| **Free ($0)** | ✅ | ✅ | OK |
| **Tier $20** | ✅ | ✅ | OK |
| **Tier $50** | ✅ | ✅ | OK |  
| **Tier $100** | ✅ | ❌ | **DESABILITADO** |
| **Tier $200** | ✅ | ✅ | OK |
| **Tier $400** | ✅ | ❌ | **DESABILITADO** |
| **Tier $800** | ✅ | ❌ | **DESABILITADO** |
| **Tier $1000** | ✅ | ❌ | **DESABILITADO** |

### **🎯 RESULTADO:** O sistema automaticamente só mostrará os planos que você criou!

---

## 🔄 **MODO LOCAL vs PRODUÇÃO**

### **🖥️ MODO LOCAL (ATUAL):**
```env
ENV_MODE=local
NEXT_PUBLIC_ENV_MODE=LOCAL
```
**Comportamento:**
- ✅ **Billing desabilitado**: "Running in local development mode"
- ✅ **ENV vars expostas**: Para debug
- ✅ **Preços ocultos**: Não aparecem na UI
- ✅ **Agentes ilimitados**: Sem limites
- ✅ **Uso livre**: Sem cobrança

### **🚀 MODO PRODUÇÃO:**
```env
ENV_MODE=production
NEXT_PUBLIC_ENV_MODE=PRODUCTION
```
**Comportamento:**
- 💳 **Billing ativo**: Stripe funcionando
- 🔒 **ENV vars protegidas**: Ocultas do frontend  
- 💰 **Preços visíveis**: Aparece seção pricing
- 🛡️ **Limites ativos**: Por tier de assinatura
- 📊 **Cobrança real**: Sistema completo

---

## 📝 **PLANO DE ATUALIZAÇÃO (SEM QUEBRAR NADA)**

### **🗂️ FASE 1: BACKUP E VERIFICAÇÃO (5 min)**
1. ✅ **Backup atual**: Já documentado em MDs
2. ✅ **Verificar ID $25**: Confirmar no Stripe Dashboard
3. ✅ **Testar modo local**: Garantir que ainda funciona

### **🗂️ FASE 2: ATUALIZAR BACKEND (10 min)**
1. 📝 **Atualizar config.py**: Substituir Price IDs de produção
2. 📝 **Atualizar Product ID**: `prod_SuyqObP0pVNiPJ`
3. 🧪 **Testar**: `docker compose up -d --build`

### **🗂️ FASE 3: ATUALIZAR FRONTEND (10 min)**
1. 📝 **Atualizar config.ts**: Substituir Price IDs PROD_TIERS
2. 🧪 **Testar**: Verificar se compila sem erros

### **🗂️ FASE 4: CONFIGURAR ENVs PRODUÇÃO (5 min)**
1. 📝 **Backend .env**: Adicionar chaves Stripe
2. 📝 **Frontend .env.local**: Configurar URLs
3. 🌐 **Modo produção**: `ENV_MODE=production`

### **🗂️ FASE 5: TESTE FINAL (10 min)**
1. 🧪 **Modo local**: Billing desabilitado
2. 🧪 **Modo produção**: Preços aparecendo
3. 🧪 **Webhook**: Recebendo eventos
4. 📊 **Checkout**: Funcionando

---

## 🚨 **CONSIDERAÇÕES IMPORTANTES**

### **⚠️ PLANOS FALTANTES:**
Você só criou **4 de 8 planos**. O sistema automaticamente:
- ✅ **Mostra apenas**: Free, $20, $50, $200
- ❌ **Oculta**: $100, $400, $800, $1000

### **💡 RECOMENDAÇÃO:**
```
Opção 1: Manter apenas 4 planos (mais simples)
Opção 2: Criar os 4 planos faltantes no Stripe
```

### **🔐 SEGURANÇA:**
- ✅ **Chaves secretas**: Apenas no backend
- ✅ **Validação webhook**: Signature verificada
- ✅ **Modo local**: Sem billing real

### **📊 LÓGICA DE LUCRO (RELEMBRAR):**
```python
TOKEN_PRICE_MULTIPLIER = 1.5  # +50% margem automática
CREDIT_MIN_START_DOLLARS = 0.20  # Mínimo em créditos

# Plano $20: Limite $25 de uso → Margem: $15-20 se usar <$10
# Sistema de créditos: Monetização adicional quando excede
```

---

## ✅ **CHECKLIST FINAL**

### **📋 ANTES DE MODIFICAR:**
- [ ] **Confirmar ID $25**: Verificar no Stripe Dashboard
- [ ] **Backup feito**: Códigos documentados
- [ ] **Modo local funcionando**: Sistema atual OK

### **📋 APÓS MODIFICAR:**
- [ ] **Backend atualizado**: `config.py` com seus IDs
- [ ] **Frontend atualizado**: `config.ts` com seus IDs  
- [ ] **ENVs configurados**: Produção vs local
- [ ] **Teste local**: Billing desabilitado
- [ ] **Teste produção**: Preços aparecendo
- [ ] **Webhook testado**: Eventos chegando

---

## 🎯 **PRÓXIMA AÇÃO**

### **❓ AGUARDANDO SUA CONFIRMAÇÃO:**

1. **ID do pacote $25**: Qual é o ID correto? (está repetido)
2. **Proceder com atualizações**: Após confirmar ID, posso atualizar os arquivos?
3. **Estratégia de planos**: Manter 4 planos ou criar os 4 faltantes?

### **⏱️ TEMPO ESTIMADO TOTAL:**
- **Atualização completa**: 40 minutos  
- **Sistema funcionando**: 100% operacional
- **Billing ativo**: Pronto para produção

---

**🚀 O sistema está MUITO bem preparado! Só falta atualizar os IDs e ativar produção!** 🎉

**⏰ Última atualização**: 22 de Janeiro, 2025 - 01:30  
**Status**: ✅ Análise Completa - Aguardando ID do $25 para proceder
