# Guia de Personalização e Branding do Sistema Suna/Lynx

## Visão Geral

Este guia descreve como personalizar o nome, logos e identidade visual do sistema Suna/Lynx para sua marca. A personalização é segura e não afeta a lógica do sistema.

## Estrutura de Arquivos para Personalização

### Pasta de Assets (`frontend/public/`)
Esta pasta contém todos os logos e imagens que podem ser substituídos:

- `kortix-logo.svg` - Logo principal (versão escura)
- `kortix-logo-white.svg` - Logo principal (versão clara)
- `kortix-symbol.svg` - Ícone/favicon
- `lynx-logo.png` - Logo alternativo do Lynx
- `banner.png` - Banner principal do site
- Outros assets visuais

### Componentes de Interface
Os textos e nomes estão distribuídos em vários componentes React que podem ser modificados.

## Elementos Personalizáveis

### 1. Nome da Aplicação
**Referências principais ao "Suna":**
- Títulos e metadados do site
- Nomes em dropdowns e menus
- Textos de descrição
- Mensagens de sistema

**Arquivos principais para modificação:**
- `frontend/src/app/metadata.ts` - Metadados e keywords
- `frontend/src/components/thread/chat-input/chat-dropdown.tsx` - Nome no dropdown
- `frontend/src/components/home/sections/bento-section.tsx` - Descrições
- `frontend/src/app/(dashboard)/projects/[projectId]/thread/[threadId]/page.tsx` - Títulos

### 2. Logos e Ícones
**Arquivos para substituição direta:**
1. `kortix-logo.svg` - Logo principal (300x80px recomendado)
2. `kortix-logo-white.svg` - Logo para fundos escuros
3. `kortix-symbol.svg` - Ícone/favicon (32x32px)
4. `lynx-logo.png` - Logo alternativo
5. `favicon.ico` - Favicon padrão

### 3. Cores e Temas
As cores principais estão definidas em arquivos de tema e CSS. A modificação avançada de cores requer conhecimento de Tailwind CSS.

## Processo de Personalização Passo a Passo

### Passo 1: Backup dos Arquivos Originais
```bash
# Criar pasta de backup
mkdir -p frontend/public/backup

# Backup dos logos originais
cp frontend/public/kortix-logo.svg frontend/public/backup/
cp frontend/public/kortix-logo-white.svg frontend/public/backup/
cp frontend/public/kortix-symbol.svg frontend/public/backup/
cp frontend/public/lynx-logo.png frontend/public/backup/
```

### Passo 2: Substituir Logos
1. Prepare seus logos nos mesmos formatos e tamanhos
2. Substitua os arquivos na pasta `public/`:
   ```bash
   cp seus-assets/seu-logo.svg frontend/public/kortix-logo.svg
   cp seus-assets/seu-logo-white.svg frontend/public/kortix-logo-white.svg
   cp seus-assets/seu-icone.svg frontend/public/kortix-symbol.svg
   ```

### Passo 3: Modificar Nomes e Textos
1. **Metadados do site** (`frontend/src/app/metadata.ts`):
   ```typescript
   export const siteConfig = {
     title: 'SeuNome AI',
     description: 'Sua plataforma de agentes de IA',
     keywords: ['SeuNome', 'AI', 'Agentes', 'Automação'],
   };
   ```

2. **Títulos e descrições** em componentes específicos:
   - Localizar referências a "Suna" nos componentes
   - Substituir por seu nome de marca

### Passo 4: Testar em Ambiente de Desenvolvimento
```bash
# Frontend
cd frontend && npm run dev

# Backend
cd backend && python api.py
```

Verifique:
- Logos carregando corretamente
- Nomes atualizados
- Nenhuma quebra de layout

## Nível de Risco e Considerações

### Risco: MUITO BAIXO ⚡
A personalização afeta apenas:
- Interface do usuário (frontend)
- Textos e descrições
- Imagens e logos

### O Que NÃO é Afetado:
- Lógica de negócio
- Sistema de pagamentos
- Funcionalidades do agente
- Banco de dados
- Sistema de autenticação

## Boas Práticas

### 1. Trabalhe com Cópias
Sempre mantenha backups dos arquivos originais antes de modificar.

### 2. Mantenha Consistência Visual
- Use a mesma paleta de cores
- Mantenha proporções similares nos logos
- Considere acessibilidade (contraste de cores)

### 3. Teste em Diferentes Dispositivos
- Verifique logos em modo claro e escuro
- Teste responsividade
- Confirme carregamento em diferentes navegadores

### 4. Documente as Alterações
Mantenha registro do que foi modificado para futuras atualizações.

## Problemas Comuns e Soluções

### 1. Logos Não Carregando
**Solução:** Verifique extensões de arquivo e permissões:
```bash
# Verificar se arquivos existem
ls -la frontend/public/*.svg

# Verificar permissões
chmod 644 frontend/public/*.svg
```

### 2. Quebra de Layout
**Solução:** Verifique proporções e tamanhos:
- Logos principais: 300x80px recomendado
- Ícones: 32x32px
- Mantenha SVG para melhor qualidade

### 3. Cache de Navegador
**Solução:** Limpe cache ou force reload:
- Ctrl+F5 (Windows/Linux)
- Cmd+Shift+R (Mac)

## Escalabilidade para 50-100 Usuários

### Recomendações:
1. **Personalização é essencial** para criar identidade da marca
2. **Teste com grupo pequeno** antes de lançar para todos
3. **Mantenha versão de backup** para rollbacks rápidos
4. **Considere CDN** para melhor performance de imagens

### Próximos Passos:
1. Implementar personalização básica (logos e nomes)
2. Testar com alguns usuários beta
3. Coletar feedback
4. Ajustar conforme necessário
5. Lançar para todos os usuários

## Contato para Suporte

Para suporte com personalização:
- Verificar console do navegador por erros
- Confirmar que todos os arquivos foram substituídos corretamente
- Garantir que formato e tamanhos estão corretos