# Guia Completo de Integração com Stripe para o Sistema Suna

## Visão Geral do Sistema

O Suna é uma plataforma de IA que utiliza um sistema de assinaturas e créditos para controlar o acesso aos recursos. O sistema tem diferentes níveis de assinatura que determinam:

1. Quantidade de minutos de uso mensal
2. Modelos de IA disponíveis
3. Limite de uso simultâneo
4. Acesso a recursos premium

## Estrutura de Planos e Preços

### Níveis de Assinatura

O sistema possui 7 níveis de assinatura principais:

1. **Free** - 60 minutos/mês, $5 limite de custo
2. **Tier 2 ($20)** - 120 minutos/mês, $25 limite de custo
3. **Tier 6 ($50)** - 360 minutos/mês, $55 limite de custo
4. **Tier 12 ($100)** - 720 minutos/mês, $105 limite de custo
5. **Tier 25 ($200)** - 1500 minutos/mês, $205 limite de custo
6. **Tier 50 ($400)** - 3000 minutos/mês, $405 limite de custo
7. **Tier 125 ($800)** - 7500 minutos/mês, $805 limite de custo
8. **Tier 200 ($1000)** - 12000 minutos/mês, $1005 limite de custo

### Modelos de Cobrança

1. **Mensal** - Pagamento mensal padrão
2. **Anual** - 15% de desconto sobre o valor mensal (pagamento único anual)
3. **Compromisso Anual** - 15% de desconto com pagamento mensal, mas com compromisso de 12 meses

### Sistema de Créditos

Além das assinaturas, usuários podem comprar créditos adicionais para uso além dos limites da assinatura:
- Pacote de $10 (10 créditos)
- Pacote de $25 (25 créditos)

## Estrutura Técnica

### Endpoints da API

#### Backend Endpoints (/api/billing/*)
1. `POST /checkout` - Cria sessão de checkout do Stripe
2. `POST /portal` - Cria sessão do portal do cliente Stripe
3. `GET /status` - Obtém status da assinatura atual
4. `GET /check-status` - Verifica se usuário pode executar agentes
5. `POST /webhook` - Recebe webhooks do Stripe
6. `GET /credit-balance` - Obtém saldo de créditos do usuário
7. `POST /purchase-credits` - Cria checkout para compra de créditos
8. `GET /available-models` - Obtém modelos disponíveis baseado na assinatura

#### Webhook do Stripe
- **Endpoint**: `[seu-domínio]/api/billing/webhook`
- **Eventos Necessários**:
  - `checkout.session.completed` (para compras de créditos)
  - `payment_intent.payment_failed` (para pagamentos falhos)
  - `customer.subscription.created` (para novas assinaturas)
  - `customer.subscription.updated` (para alterações de assinatura)
  - `customer.subscription.deleted` (para cancelamentos)

### Chaves Necessárias

1. **STRIPE_SECRET_KEY** - Chave secreta para chamadas à API do Stripe (começa com sk_)
2. **STRIPE_WEBHOOK_SECRET** - Segredo para verificação de webhooks (começa com whsec_)

A Public Key do Stripe é usada apenas no frontend e é obtida automaticamente quando criamos o checkout.

## Configuração no Stripe - Passo a Passo

### Passo 1: Criar o Produto Principal

1. Acesse o painel do Stripe Dashboard
2. Vá para "Products" > "Add product"
3. Crie um produto chamado "Suna Subscription"
4. Defina o tipo como "Recurring"
5. Salve o Product ID (será usado como STRIPE_PRODUCT_ID)

### Passo 2: Criar os Preços (Prices)

Para cada nível de assinatura, você precisará criar 3 preços diferentes:

#### Preços Mensais
1. Free Tier: $0/month (price_1RILb4G6l1KZGqIrK4QLrx9i)
2. Tier 2_20: $20/month (price_1RILb4G6l1KZGqIrhomjgDnO)
3. Tier 6_50: $50/month (price_1RILb4G6l1KZGqIr5q0sybWn)
4. Tier 12_100: $100/month (price_1RILb4G6l1KZGqIr5Y20ZLHm)
5. Tier 25_200: $200/month (price_1RILb4G6l1KZGqIrGAD8rNjb)
6. Tier 50_400: $400/month (price_1RILb4G6l1KZGqIruNBUMTF1)
7. Tier 125_800: $800/month (price_1RILb3G6l1KZGqIrbJA766tN)
8. Tier 200_1000: $1000/month (price_1RILb3G6l1KZGqIrmauYPOiN)

#### Preços Anuais (15% de desconto)
1. Tier 2_20_yearly: $204/year (price_1ReHB5G6l1KZGqIrD70I1xqM)
2. Tier 6_50_yearly: $510/year (price_1ReHAsG6l1KZGqIrlAog487C)
3. Tier 12_100_yearly: $1020/year (price_1ReHAWG6l1KZGqIrBHer2PQc)
4. Tier 25_200_yearly: $2040/year (price_1ReH9uG6l1KZGqIrsvMLHViC)
5. Tier 50_400_yearly: $4080/year (price_1ReH9fG6l1KZGqIrsPtu5KIA)
6. Tier 125_800_yearly: $8160/year (price_1ReH9GG6l1KZGqIrfgqaJyat)
7. Tier 200_1000_yearly: $10200/year (price_1ReH8qG6l1KZGqIrK1akY90q)

#### Preços de Compromisso Anual (15% de desconto)
1. Tier 2_17_yearly_commitment: $17/month (price_1RqtqiG6l1KZGqIrhjVPtE1s)
2. Tier 6_42_yearly_commitment: $42.50/month (price_1Rqtr8G6l1KZGqIrQ0ql0qHi)
3. Tier 25_170_yearly_commitment: $170/month (price_1RqtrUG6l1KZGqIrEb8hLsk3)

### Passo 3: Criar Preços para Créditos

1. Credits_10: $10 (price_1RxmQUG6l1KZGqIru453O1zW)
2. Credits_25: $25 (price_1RxmQlG6l1KZGqIr3hS5WtGg)

### Passo 4: Configurar Webhooks

1. Acesse "Developers" > "Webhooks" no Stripe Dashboard
2. Clique em "Add endpoint"
3. Insira a URL: `[seu-domínio]/api/billing/webhook`
4. Selecione os seguintes eventos:
   - `checkout.session.completed`
   - `payment_intent.payment_failed`
   - `customer.subscription.created`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
5. Clique em "Add endpoint"
6. Copie o "Signing secret" (começa com whsec_)

## Configuração de Variáveis de Ambiente

### Backend (.env)
```
ENV_MODE=production
STRIPE_SECRET_KEY=sk_live_XXXXXXXXXXXXXXXXXXXXXXXX
STRIPE_WEBHOOK_SECRET=whsec_XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
STRIPE_PRODUCT_ID_PROD=prod_XXXXXXXXXXXXXXXXXXXXXXXX
```

### Frontend (.env.local)
```
NEXT_PUBLIC_ENV_MODE=production
```

## Funcionamento do Sistema de Cobrança

### Limites de Uso

Cada nível de assinatura tem um limite de minutos por mês. Quando esse limite é atingido:

1. O sistema verifica o saldo de créditos
2. Se houver créditos suficientes ($0.20 ou mais), permite continuar com débito de créditos
3. Se não houver créditos suficientes, bloqueia novas execuções

### Modelos de IA Disponíveis

- Assinantes free têm acesso a modelos básicos
- Assinantes pagos têm acesso a modelos premium
- Assinantes de níveis mais altos têm acesso a todos os modelos

### Créditos

- Créditos podem ser comprados como pacotes adicionais
- São usados quando o limite mensal da assinatura é excedido
- Não expiram mensalmente, mas são consumidos conforme o uso

## Considerações Técnicas

### Cache

O sistema utiliza Redis para cache de informações de assinatura por 1 minuto para melhorar performance.

### Banco de Dados

O sistema utiliza Supabase com tabelas específicas para:
- billing_customers - informações de clientes
- credit_purchases - histórico de compras de créditos
- credit_usage - uso de créditos

### Segurança

- Todos os webhooks são verificados com segredo de assinatura
- Informações sensíveis são armazenadas de forma segura
- Comunicação com Stripe utiliza HTTPS

## Teste e Validação

Antes de ir para produção:

1. Teste com Stripe em modo de teste
2. Verifique todos os webhooks funcionam corretamente
3. Teste os fluxos de upgrade/downgrade
4. Valide o cálculo de uso e limites
5. Teste os fluxos de compra de créditos

## Troubleshooting

### Problemas Comuns

1. **Webhooks não chegando**: Verifique se a URL está publicamente acessível
2. **Assinaturas não atualizando**: Verifique o cache do Redis
3. **Preços incorretos**: Verifique se os IDs de preço correspondem ao Stripe
4. **Falhas no checkout**: Verifique as chaves da API do Stripe

### Logs

O sistema gera logs detalhados para debugging:
- Eventos de webhook recebidos
- Erros de processamento
- Operações de assinatura
- Transações de créditos

## Manutenção

### Atualizações de Preços

Para alterar preços:
1. Crie novos preços no Stripe
2. Atualize os IDs de preço no código
3. Teste completamente antes de atualizar produção

### Adicionar Novos Níveis

Para adicionar novos níveis:
1. Crie novos preços no Stripe
2. Adicione IDs ao arquivo de configuração
3. Atualize as interfaces do frontend
4. Teste o novo nível

## Contato e Suporte

Para suporte adicional com a integração, consulte:
- Documentação oficial do Stripe
- Equipe de desenvolvimento do Suna
- Logs do sistema para debugging