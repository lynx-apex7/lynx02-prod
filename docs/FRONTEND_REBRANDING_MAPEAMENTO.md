# 🎨 MAPEAMENTO FRONTEND - REBRANDING SUNA → LYNX AI

## 📋 STATUS ATUAL DAS CONFIGURAÇÕES

### ✅ BACKEND CONFIGURADO
- **ANTHROPIC_API_KEY**: Configurado ✅
- **OPENAI_API_KEY**: Configurado ✅  
- **MODEL_TO_USE**: claude-3-7-sonnet-latest ✅
- **GEMINI_API_KEY**: Configurado ✅
- **COMPOSIO_API_KEY**: Configurado ✅

### 🔄 PRÓXIMO PASSO
**Restart containers** via Docker Desktop para aplicar configurações

---

## 🎯 ARQUIVOS PRINCIPAIS PARA REBRANDING

### 📱 **1. CONFIGURAÇÕES DE SITE**

#### `/frontend/src/lib/site.ts`
```typescript
export const siteConfig = {
  name: 'Kortix Suna', // → 'Lynx AI'
  url: 'https://suna.so/', // → 'https://lynxai.com/' 
  description: 'Kortix AI', // → 'Lynx AI - Generalist AI Worker'
  links: {
    twitter: 'https://x.com/kortixai', // → '@lynxai'
    github: 'https://github.com/kortix-ai/', // → 'lynx-ai'
    linkedin: 'https://www.linkedin.com/company/kortix/', // → 'lynx-ai'
  },
};
```

#### `/frontend/src/lib/home.tsx`
```typescript
export const siteConfig = {
  name: 'Kortix Suna', // → 'Lynx AI'
  description: 'The Generalist AI Worker that can act on your behalf.',
  // → 'Lynx AI - Your intelligent assistant that works autonomously'
  
  hero: {
    title: 'Kortix – Build, manage and train your AI Workforce.',
    // → 'Lynx AI – Your Autonomous AI Assistant'
    
    inputPlaceholder: 'Ask Suna to...', // → 'Ask Lynx to...'
  },
  
  links: {
    github: 'https://github.com/Kortix-ai/Suna', // → 'lynx-ai/lynx'
  }
}
```

### 📄 **2. METADADOS E SEO**

#### `/frontend/src/app/layout.tsx`
```typescript
export const metadata: Metadata = {
  title: {
    default: siteConfig.name, // → 'Lynx AI'
    template: `%s - ${siteConfig.name}`, // → '%s - Lynx AI'
  },
  description: 'Kortix is a fully open source AI assistant...', 
  // → 'Lynx AI is your autonomous assistant that works intelligently...'
  
  applicationName: 'Suna', // → 'Lynx AI'
  
  openGraph: {
    title: 'Suna - Open Source Generalist AI Worker', 
    // → 'Lynx AI - Your Autonomous AI Assistant'
    
    description: 'Suna is a fully open source AI assistant...', 
    // → 'Lynx AI works autonomously to help you...'
    
    siteName: 'Suna', // → 'Lynx AI'
    images: [
      {
        url: '/banner.png', // → Novo banner Lynx AI
        alt: 'Suna - Open Source Generalist AI Worker', 
        // → 'Lynx AI - Autonomous Assistant'
      },
    ],
  },
  
  twitter: {
    title: 'Suna - Open Source Generalist AI Worker', 
    // → 'Lynx AI - Your Autonomous Assistant'
    
    description: 'Suna is a fully open source AI assistant...', 
    // → 'Lynx AI works autonomously...'
    
    creator: '@kortixai', // → '@lynxai'
    site: '@kortixai', // → '@lynxai'
  },
}
```

#### `/frontend/package.json`
```json
{
  "name": "Kortix", // → "lynx-ai"
  "version": "0.1.0",
  // Manter versão atual
}
```

### 🎨 **3. COMPONENTES DE UI**

#### `/frontend/src/components/thread/chat-input/chat-dropdown.tsx`
```tsx
// Linha 37-38
<Image src="/kortix-symbol.svg" alt="Suna" width={16} height={16} />
<span>Suna</span>

// → Alterar para:
<Image src="/lynx-symbol.svg" alt="Lynx AI" width={16} height={16} />
<span>Lynx</span>
```

---

## 🖼️ ASSETS VISUAIS PARA SUBSTITUIR

### 📁 **LOGOS E ÍCONES** (`/frontend/public/`)

#### **Arquivos SVG atuais:**
- `kortix-logo.svg` → `lynx-logo.svg`
- `kortix-logo-white.svg` → `lynx-logo-white.svg`  
- `kortix-symbol.svg` → `lynx-symbol.svg`
- `Frame 50.svg` → `lynx-frame.svg` (se relevante)

#### **Arquivos PNG atuais:**
- `banner.png` → `lynx-banner.png`
- `favicon.png` → `lynx-favicon.png`
- `thumbnail-dark.png` → `lynx-thumbnail-dark.png`
- `thumbnail-light.png` → `lynx-thumbnail-light.png`
- `share-page/og-fallback.png` → `lynx-og-fallback.png`

#### **Assets novos necessários:**
- Logo Lynx AI (formato SVG + PNG)
- Ícone/símbolo da marca (SVG)
- Favicon (16x16, 32x32, 180x180)
- Banner para hero section (1200x630)
- Thumbnails para compartilhamento social
- OpenGraph image para SEO

---

## 🎨 ESPECIFICAÇÕES DE DESIGN LYNX AI

### 🎯 **IDENTIDADE VISUAL**

#### **Conceito: Lynx (Lince)**
- **Simbolismo**: Visão aguçada, inteligência, agilidade
- **Características**: Predador eficiente, movimento preciso
- **Cores sugeridas**: 
  - Primary: Deep Blue/Purple (#1E293B, #3B82F6)
  - Secondary: Electric Blue/Cyan (#06B6D4, #0EA5E9)
  - Accent: Golden/Amber (#F59E0B, #D97706)

#### **Logo Elements:**
- Silhueta estilizada de lince
- Olhos brilhantes (representando IA)
- Linhas geométricas/tech
- Typography: Modern, clean, sans-serif

### 🎨 **COMPONENTES DE COR**

#### **CSS Variables para atualizar:**
```css
:root {
  /* Cores primárias Lynx AI */
  --lynx-primary: #1E293B;
  --lynx-secondary: #06B6D4;
  --lynx-accent: #F59E0B;
  
  /* Background gradients */
  --lynx-gradient: linear-gradient(135deg, #1E293B 0%, #3B82F6 100%);
  --lynx-glow: 0 0 20px rgba(6, 182, 212, 0.3);
}
```

---

## 📝 TEXTO E COPY PARA ATUALIZAR

### 🎯 **MESSAGING PRINCIPAL**

#### **Taglines atuais:**
- "The Generalist AI Worker that can act on your behalf"
- "Kortix – Build, manage and train your AI Workforce"

#### **Taglines Lynx AI propostas:**
- "Lynx AI - Your Autonomous Assistant"
- "Lynx AI - Intelligence that Works for You"
- "See Further, Work Smarter with Lynx AI"

#### **Descrições:**
```
Atual: "Kortix is a fully open source AI assistant that helps you accomplish real-world tasks with ease."

Lynx AI: "Lynx AI is your autonomous assistant with sharp intelligence and precise execution. Get things done effortlessly while you focus on what matters most."
```

### 💬 **PLACEHOLDERS E TEXTO DE UI**

#### **Chat Input:**
- `"Ask Suna to..."` → `"What can Lynx help you with?"`
- `"Describe what you need Suna to do"` → `"Tell Lynx what you need"`

#### **Botões e CTAs:**
- `"Start with Suna"` → `"Get Started with Lynx"`
- `"Try Suna Free"` → `"Try Lynx AI Free"`

---

## 🔧 PROCESSO DE IMPLEMENTAÇÃO

### 📋 **FASE 1: PREPARAÇÃO (1-2 dias)**
- [ ] **Criar assets visuais**: Logo, ícones, banners
- [ ] **Definir color scheme**: CSS variables, Tailwind config
- [ ] **Preparar copy**: Todos os textos novos
- [ ] **Backup atual**: Git commit antes das mudanças

### 📋 **FASE 2: SUBSTITUIÇÃO SISTEMÁTICA (1 dia)**
- [ ] **Configurações**: `site.ts`, `home.tsx`, `layout.tsx`
- [ ] **Assets**: Substituir todos os SVG/PNG
- [ ] **Componentes**: Chat, dropdowns, botões
- [ ] **Metadados**: SEO, OpenGraph, Twitter Cards

### 📋 **FASE 3: TESTES E REFINAMENTO (1 dia)**
- [ ] **Visual testing**: Todas as páginas e componentes
- [ ] **SEO testing**: Meta tags, social sharing
- [ ] **Mobile responsive**: Todos os breakpoints
- [ ] **Performance**: Bundle size, loading times

### 📋 **FASE 4: POLIMENTO (1 dia)**
- [ ] **Animations**: Micro-interactions com tema Lynx
- [ ] **Error states**: Mensagens com novo branding
- [ ] **Loading states**: Spinners, skeletons com novo design
- [ ] **404/Empty states**: Páginas de erro com nova identidade

---

## ⚠️ ANÁLISE DE IMPACTO - REBRANDING FRONTEND

### 🟢 **BAIXO RISCO**
- Substituição de assets (SVG, PNG)
- Alteração de strings/copy
- Mudanças de CSS/cores
- Metadados SEO

### 🟡 **MÉDIO RISCO**  
- Componentes que referenciam "Suna" em código
- URLs e routing (se houver paths com "suna")
- Local storage keys com "suna"
- API endpoints que retornam "suna" 

### 🔴 **ALTO RISCO**
- Database references (agent names, configs)
- Backend configurations referencing "Suna"
- External integrations expecting "Suna"

### 🛡️ **MITIGAÇÃO**
- **Git branch** separada para rebranding
- **Search & replace** cuidadoso com regex
- **Testes visuais** em cada mudança
- **Rollback plan** documentado

---

## 🚀 CRONOGRAMA PROPOSTO

### 📅 **DIA 1: RESTART + VALIDAÇÃO**
- ✅ Restart containers Docker
- ✅ Testar Claude 3.7 Sonnet funcionando
- ✅ Validar resolução erros HTTP 500
- ✅ Confirmar Composio API funcionando

### 📅 **DIA 2-3: DESIGN ASSETS**
- 🎨 Criar logo e identidade Lynx AI
- 🎨 Preparar todos os assets visuais
- 📝 Definir copy e messaging final
- 🔧 Setup color scheme e variables

### 📅 **DIA 4: IMPLEMENTAÇÃO FRONTEND**
- 🔄 Substituição sistemática de assets
- 📝 Atualização de todos os textos
- 🎨 Aplicação do novo design system
- 🧪 Testes visuais

### 📅 **DIA 5: REFINAMENTO**
- 🐛 Bug fixes e ajustes
- 📱 Mobile optimization
- ⚡ Performance optimization  
- ✅ Testes finais

---

## 📞 PRÓXIMOS PASSOS IMEDIATOS

### 🔥 **AGORA (Após restart containers):**
1. **Testar Claude 3.7 Sonnet**: Criar novo chat e verificar funcionamento
2. **Confirmar resolução HTTP 500**: Verificar logs limpos
3. **Validar Composio**: Verificar se ícones carregam sem erro

### 🎯 **AMANHÃ:**
1. **Review deste mapeamento** e aprovação do plano
2. **Criar/receber assets** de logo Lynx AI
3. **Iniciar implementação** seguindo processo sistemático

### ⚡ **ESTA SEMANA:**
1. **Completar rebranding frontend** 
2. **Testes completos** em todas as funcionalidades
3. **Preparar backend** para mudanças necessárias
4. **Git commits** organizados para rastreabilidade

---

*Documento criado: $(date)*  
*Projeto: Frontend Rebranding Suna → Lynx AI*  
*Status: Aguardando restart containers + validação*
