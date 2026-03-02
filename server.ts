import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app: Express = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Mock data - Bares e Casas Noturnas de Jataí
const places = [
  {
    id: 1,
    name: 'Boteco do Zé',
    category: 'Bar',
    rating: 4.7,
    reviews: 156,
    address: 'Rua Getulio Vargas, 450',
    hours: '18:00 - 02:00',
    price: 'R$ 20-50',
    city: 'Jataí',
    image: '🍺',
  },
  {
    id: 2,
    name: 'Club Noturno Sunset',
    category: 'Casa Noturna',
    rating: 4.9,
    reviews: 312,
    address: 'Avenida Goiás, 1200',
    hours: '22:00 - 04:00',
    price: 'R$ 30-80',
    city: 'Jataí',
    image: '🎉',
  },
  {
    id: 3,
    name: 'Bar do Gordo',
    category: 'Bar',
    rating: 4.5,
    reviews: 89,
    address: 'Rua Tocantins, 320',
    hours: '17:00 - 01:00',
    price: 'R$ 15-40',
    city: 'Jataí',
    image: '🍻',
  },
  {
    id: 4,
    name: 'Lounge Bar Premium',
    category: 'Lounge',
    rating: 4.8,
    reviews: 234,
    address: 'Rua Paranaiba, 890',
    hours: '19:00 - 03:00',
    price: 'R$ 40-100',
    city: 'Jataí',
    image: '🥂',
  },
  {
    id: 5,
    name: 'Choperia Jataí',
    category: 'Choperia',
    rating: 4.6,
    reviews: 178,
    address: 'Avenida Brasil, 650',
    hours: '16:00 - 23:00',
    price: 'R$ 25-60',
    city: 'Jataí',
    image: '🍺',
  },
  {
    id: 6,
    name: 'Disco Club X',
    category: 'Discoteca',
    rating: 4.4,
    reviews: 145,
    address: 'Rua Mato Grosso, 1100',
    hours: '23:00 - 05:00',
    price: 'R$ 35-70',
    city: 'Jataí',
    image: '🎵',
  },
];

// Eventos noturnos de Jataí
const events = [
  {
    id: 1,
    name: 'Festa Eletrônica - DJ Marcos',
    date: '01 de Março',
    time: '23:00',
    location: 'Club Noturno Sunset',
    emoji: '🎧',
    attendees: 450,
    city: 'Jataí',
    description: 'Melhor festa eletrônica da semana com DJ convidado',
  },
  {
    id: 2,
    name: 'Sertanejo ao Vivo',
    date: '02 de Março',
    time: '21:00',
    location: 'Boteco do Zé',
    emoji: '🎸',
    attendees: 200,
    city: 'Jataí',
    description: 'Show ao vivo com banda sertaneja local',
  },
  {
    id: 3,
    name: 'Happy Hour Especial',
    date: '03 de Março',
    time: '18:00',
    location: 'Lounge Bar Premium',
    emoji: '🥂',
    attendees: 150,
    city: 'Jataí',
    description: 'Drinks com 50% de desconto até 20:00',
  },
  {
    id: 4,
    name: 'Noite de Karaokê',
    date: '04 de Março',
    time: '20:00',
    location: 'Bar do Gordo',
    emoji: '🎤',
    attendees: 120,
    city: 'Jataí',
    description: 'Noite de karaokê com prêmios para os melhores',
  },
  {
    id: 5,
    name: 'Festa Universitária',
    date: '05 de Março',
    time: '22:00',
    location: 'Disco Club X',
    emoji: '🎉',
    attendees: 600,
    city: 'Jataí',
    description: 'Festa exclusiva para universitários com entrada especial',
  },
];

// Promoções especiais
const promotions = [
  {
    id: 1,
    title: 'Chopp com 30% OFF',
    bar: 'Choperia Jataí',
    discount: '30%',
    validUntil: '10 de Março',
    emoji: '🍺',
    description: 'Válido de segunda a quinta',
  },
  {
    id: 2,
    title: 'Drinks 2x1',
    bar: 'Lounge Bar Premium',
    discount: '50%',
    validUntil: '15 de Março',
    emoji: '🍹',
    description: 'Compre um drink e ganhe outro',
  },
  {
    id: 3,
    title: 'Entrada Grátis',
    bar: 'Club Noturno Sunset',
    discount: 'Grátis',
    validUntil: '08 de Março',
    emoji: '🎫',
    description: 'Entrada grátis até 23:00 para mulheres',
  },
  {
    id: 4,
    title: 'Meia Entrada',
    bar: 'Disco Club X',
    discount: '50%',
    validUntil: '12 de Março',
    emoji: '🎟️',
    description: 'Meia entrada para estudantes com carteirinha',
  },
  {
    id: 5,
    title: 'Petisco Grátis',
    bar: 'Boteco do Zé',
    discount: 'Grátis',
    validUntil: '20 de Março',
    emoji: '🍟',
    description: 'Petisco grátis em toda bebida',
  },
];

// Routes
app.get('/api/health', (req: Request, res: Response) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

app.get('/api/places', (req: Request, res: Response) => {
  const { category } = req.query;
  
  if (category) {
    const filtered = places.filter(
      (p) => p.category.toLowerCase() === String(category).toLowerCase()
    );
    return res.json(filtered);
  }
  
  res.json(places);
});

app.get('/api/places/:id', (req: Request, res: Response) => {
  const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
  const place = places.find((p) => p.id === parseInt(id));
  
  if (!place) {
    return res.status(404).json({ error: 'Place not found' });
  }
  
  res.json(place);
});

app.get('/api/events', (req: Request, res: Response) => {
  res.json(events);
});

app.get('/api/events/:id', (req: Request, res: Response) => {
  const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
  const event = events.find((e) => e.id === parseInt(id));
  
  if (!event) {
    return res.status(404).json({ error: 'Event not found' });
  }
  
  res.json(event);
});

app.get('/api/promotions', (req: Request, res: Response) => {
  res.json(promotions);
});

app.get('/api/promotions/:id', (req: Request, res: Response) => {
  const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
  const promotion = promotions.find((p) => p.id === parseInt(id));
  
  if (!promotion) {
    return res.status(404).json({ error: 'Promotion not found' });
  }
  
  res.json(promotion);
});

// Error handling
app.use((err: any, req: Request, res: Response) => {
  console.error(err);
  res.status(500).json({ error: 'Internal server error' });
});

// Start server
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
  console.log(`📍 API Health: http://localhost:${PORT}/api/health`);
});
