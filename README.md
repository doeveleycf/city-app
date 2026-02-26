# 🏙️ City App - Descubra Sua Cidade

Uma plataforma web moderna para descobrir os melhores lugares, eventos e experiências da sua cidade.

## 🚀 Características

- ✅ **Interface Responsiva** - Funciona em desktop, tablet e celular
- ✅ **Categorias** - Museus, Restaurantes, Eventos
- ✅ **Sistema de Avaliações** - Veja o que outras pessoas acham
- ✅ **API REST** - Backend escalável com Express.js
- ✅ **Autenticação JWT** - Login seguro
- ✅ **Banco de Dados** - PostgreSQL com dados persistentes
- ✅ **Docker** - Deploy fácil em qualquer servidor
- ✅ **CI/CD** - GitHub Actions para testes e deploy automático

## 🛠️ Tech Stack

**Frontend:**
- React 18
- Next.js 14
- Tailwind CSS
- TypeScript

**Backend:**
- Express.js
- PostgreSQL
- JWT Authentication
- Redis (cache)

**DevOps:**
- Docker & Docker Compose
- GitHub Actions
- CI/CD Pipeline

## 📋 Pré-requisitos

- Node.js 18+
- pnpm 10+
- Docker & Docker Compose (opcional)
- PostgreSQL 15+ (se não usar Docker)

## 🚀 Quick Start

### 1. Clone o repositório

```bash
git clone https://github.com/seu-usuario/city-app.git
cd city-app
```

### 2. Instale as dependências

```bash
pnpm install
```

### 3. Configure as variáveis de ambiente

```bash
cp .env.example .env.local
# Edite .env.local com suas configurações
```

### 4. Inicie o banco de dados (com Docker)

```bash
docker-compose up -d postgres redis
```

### 5. Inicie o servidor de desenvolvimento

```bash
# Terminal 1: Frontend (Next.js)
pnpm dev

# Terminal 2: Backend (Express)
node server.ts
```

Acesse:
- Frontend: http://localhost:3000
- Backend: http://localhost:5000/api/health

## 📁 Estrutura do Projeto

```
city-app/
├── pages/              # Páginas Next.js
│   ├── index.tsx      # Home
│   ├── places.tsx     # Lugares
│   ├── events.tsx     # Eventos
│   └── about.tsx      # Sobre
├── components/        # Componentes React
│   ├── Header.tsx
│   └── Footer.tsx
├── styles/           # CSS global
├── server.ts         # API Express
├── docker-compose.yml # Orquestração
├── Dockerfile        # Containerização
└── .github/workflows # CI/CD
```

## 🔐 Autenticação

### Fazer Login

```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com","password":"password"}'
```

### Usar Token

```bash
curl http://localhost:5000/api/places \
  -H "Authorization: Bearer YOUR_TOKEN"
```

## 📦 API Endpoints

### Lugares

- `GET /api/places` - Listar todos os lugares
- `GET /api/places?category=museu` - Filtrar por categoria
- `GET /api/places/:id` - Detalhes de um lugar

### Eventos

- `GET /api/events` - Listar todos os eventos
- `GET /api/events/:id` - Detalhes de um evento

### Health Check

- `GET /api/health` - Status do servidor

## 🐳 Docker

### Build

```bash
docker build -t city-app:latest .
```

### Run

```bash
docker-compose up -d
```

Acesse: http://localhost:3000

## 🚀 Deploy

### Heroku

```bash
heroku create city-app
git push heroku main
```

### DigitalOcean App Platform

1. Conecte seu repositório GitHub
2. Configure variáveis de ambiente
3. Deploy automático em cada push

### AWS EC2

```bash
# SSH para seu servidor
ssh -i key.pem ubuntu@your-server.com

# Clone e inicie
git clone https://github.com/seu-usuario/city-app.git
cd city-app
docker-compose up -d
```

## 🧪 Testes

```bash
# Lint
pnpm lint

# Type check
pnpm tsc --noEmit

# Build
pnpm build
```

## 📊 Monitoramento

### Logs

```bash
docker-compose logs -f app
```

### Métricas

```bash
curl http://localhost:5000/api/health
```

## 🤝 Contribuindo

1. Fork o projeto
2. Crie uma branch (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo LICENSE para mais detalhes.

## 📧 Contato

- Email: info@cityapp.com
- Website: https://city-app.example.com
- GitHub: https://github.com/seu-usuario/city-app

## 🙏 Agradecimentos

- React & Next.js
- Tailwind CSS
- Express.js
- PostgreSQL

---

**Desenvolvido com ❤️ por Manus**
