# Sistema de Pagamento - City App

## 📋 Visão Geral

O City App inclui um sistema de pagamento mensal para donos de estabelecimentos. O valor da assinatura é **R$ 99,90 por mês**.

## 💳 Opções de Pagamento

### 1. Mercado Pago (Recomendado)
- Suporta cartão de crédito, débito e Pix
- Webhook para confirmação automática
- Melhor taxa de conversão

### 2. Stripe
- Cartão de crédito internacional
- Suporte a múltiplas moedas
- Dashboard detalhado

### 3. PayPal
- Cartão de crédito e saldo PayPal
- Integração simples
- Suporte global

## 🔧 Implementação

### Passo 1: Instalar Dependências

```bash
pnpm add stripe @stripe/react-stripe-js @stripe/stripe-js
# ou
pnpm add mercadopago
```

### Passo 2: Configurar Variáveis de Ambiente

```env
# .env.local
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_...
STRIPE_SECRET_KEY=sk_live_...

# ou para Mercado Pago
NEXT_PUBLIC_MERCADOPAGO_PUBLIC_KEY=APP_USR-...
MERCADOPAGO_ACCESS_TOKEN=APP_USR-...
```

### Passo 3: Criar Endpoint de Pagamento

```typescript
// pages/api/payment/create-checkout.ts
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { owner_id } = req.body;

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'brl',
            product_data: {
              name: 'Assinatura City App',
              description: 'Acesso ao painel do dono por 1 mês',
            },
            unit_amount: 9990, // R$ 99,90 em centavos
          },
          quantity: 1,
        },
      ],
      mode: 'subscription',
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/payment/success?owner_id=${owner_id}`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/payment/cancel`,
      metadata: {
        owner_id,
      },
    });

    res.json({ sessionId: session.id });
  }
}
```

### Passo 4: Atualizar Dashboard do Dono

```typescript
// pages/owner-dashboard/[id].tsx
import { loadStripe } from '@stripe/stripe-js';

const handlePayment = async () => {
  const response = await fetch('/api/payment/create-checkout', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ owner_id: id }),
  });

  const { sessionId } = await response.json();
  const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);
  
  await stripe?.redirectToCheckout({ sessionId });
};
```

## 📊 Fluxo de Pagamento

```
1. Dono clica em "Ativar Assinatura"
   ↓
2. Redireciona para página de checkout
   ↓
3. Dono insere dados do cartão
   ↓
4. Pagamento processado
   ↓
5. Webhook confirma pagamento
   ↓
6. Assinatura ativada no banco de dados
   ↓
7. Dono redireciona para dashboard
```

## 🔔 Webhooks

### Configurar Webhook Stripe

```bash
stripe listen --forward-to localhost:3000/api/webhooks/stripe
```

### Endpoint do Webhook

```typescript
// pages/api/webhooks/stripe.ts
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export default async function handler(req, res) {
  const sig = req.headers['stripe-signature'];
  const body = req.body;

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err) {
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  switch (event.type) {
    case 'checkout.session.completed':
      const session = event.data.object;
      // Ativar assinatura no banco de dados
      await activateSubscription(session.metadata.owner_id, session.id);
      break;
    
    case 'invoice.payment_succeeded':
      // Renovar assinatura
      break;
    
    case 'invoice.payment_failed':
      // Notificar dono sobre falha
      break;
  }

  res.json({ received: true });
}
```

## 💰 Preços e Planos

| Plano | Preço | Recursos |
|-------|-------|----------|
| **Básico** | R$ 99,90/mês | Até 50 produtos, 5 promoções |
| **Profissional** | R$ 199,90/mês | Até 500 produtos, 20 promoções, Analytics |
| **Enterprise** | Customizado | Recursos ilimitados, Suporte dedicado |

## 🔐 Segurança

- Nunca armazene dados de cartão no servidor
- Use tokens Stripe/Mercado Pago
- Implemente rate limiting
- Valide assinaturas no backend
- Use HTTPS em produção

## 📱 Testes

### Cartões de Teste Stripe

- **Sucesso**: 4242 4242 4242 4242
- **Falha**: 4000 0000 0000 0002
- **Expiração**: 12/25
- **CVC**: 123

## 📞 Suporte

Para integração com Stripe, Mercado Pago ou PayPal, entre em contato com o time de desenvolvimento.

---

**Última atualização**: Março de 2026
