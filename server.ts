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
    category: 'bar',
    rating: 4.7,
    reviews: 156,
    address: 'Rua Getulio Vargas, 450',
    hours: '18:00 - 02:00',
    price: 'R$ 20-50',
    city: 'Jataí',
    image: '🍺',
    latitude: -17.8801,
    longitude: -51.7156,
    owner_id: 1,
  },
  {
    id: 2,
    name: 'Club Noturno Sunset',
    category: 'casa noturna',
    rating: 4.9,
    reviews: 312,
    address: 'Avenida Goiás, 1200',
    hours: '22:00 - 04:00',
    price: 'R$ 30-80',
    city: 'Jataí',
    image: '🎉',
    latitude: -17.8750,
    longitude: -51.7200,
    owner_id: 2,
  },
  {
    id: 3,
    name: 'Bar do Gordo',
    category: 'bar',
    rating: 4.5,
    reviews: 89,
    address: 'Rua Tocantins, 320',
    hours: '17:00 - 01:00',
    price: 'R$ 15-40',
    city: 'Jataí',
    image: '🍻',
    latitude: -17.8820,
    longitude: -51.7140,
    owner_id: 3,
  },
  {
    id: 4,
    name: 'Lounge Bar Premium',
    category: 'lounge',
    rating: 4.8,
    reviews: 234,
    address: 'Rua Paranaiba, 890',
    hours: '19:00 - 03:00',
    price: 'R$ 40-100',
    city: 'Jataí',
    image: '🥂',
    latitude: -17.8780,
    longitude: -51.7170,
    owner_id: 4,
  },
  {
    id: 5,
    name: 'Choperia Jataí',
    category: 'choperia',
    rating: 4.6,
    reviews: 178,
    address: 'Avenida Brasil, 650',
    hours: '16:00 - 23:00',
    price: 'R$ 25-60',
    city: 'Jataí',
    image: '🍺',
    latitude: -17.8790,
    longitude: -51.7160,
    owner_id: 5,
  },
  {
    id: 6,
    name: 'Disco Club X',
    category: 'discoteca',
    rating: 4.4,
    reviews: 145,
    address: 'Rua Mato Grosso, 1100',
    hours: '23:00 - 05:00',
    price: 'R$ 35-70',
    city: 'Jataí',
    image: '🎵',
    latitude: -17.8810,
    longitude: -51.7130,
    owner_id: 6,
  },
];

// Restaurantes de Jataí
const restaurants = [
  {
    id: 1,
    name: 'Restaurante Gourmet Jataí',
    category: 'restaurante',
    rating: 4.9,
    reviews: 312,
    address: 'Rua Gourmet, 250',
    hours: '11:00 - 23:00',
    price: 'R$ 80-150',
    city: 'Jataí',
    image: '🍽️',
    latitude: -17.8805,
    longitude: -51.7165,
    owner_id: 7,
    cuisine: 'Brasileira',
  },
  {
    id: 2,
    name: 'Pizzaria Tradição',
    category: 'restaurante',
    rating: 4.7,
    reviews: 428,
    address: 'Rua da Pizza, 100',
    hours: '11:00 - 22:00',
    price: 'R$ 40-80',
    city: 'Jataí',
    image: '🍕',
    latitude: -17.8815,
    longitude: -51.7150,
    owner_id: 8,
    cuisine: 'Italiana',
  },
  {
    id: 3,
    name: 'Churrascaria Premium',
    category: 'restaurante',
    rating: 4.8,
    reviews: 267,
    address: 'Avenida Paranaiba, 500',
    hours: '11:30 - 23:30',
    price: 'R$ 100-200',
    city: 'Jataí',
    image: '🥩',
    latitude: -17.8795,
    longitude: -51.7175,
    owner_id: 9,
    cuisine: 'Churrasco',
  },
  {
    id: 4,
    name: 'Sushi Express',
    category: 'restaurante',
    rating: 4.6,
    reviews: 189,
    address: 'Rua Tocantins, 600',
    hours: '12:00 - 22:00',
    price: 'R$ 60-120',
    city: 'Jataí',
    image: '🍣',
    latitude: -17.8825,
    longitude: -51.7145,
    owner_id: 10,
    cuisine: 'Japonesa',
  },
  {
    id: 5,
    name: 'Comida Caseira da Vó',
    category: 'restaurante',
    rating: 4.5,
    reviews: 156,
    address: 'Rua Brasil, 300',
    hours: '10:30 - 20:00',
    price: 'R$ 30-60',
    city: 'Jataí',
    image: '🍲',
    latitude: -17.8800,
    longitude: -51.7155,
    owner_id: 11,
    cuisine: 'Caseira',
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

// Donos de estabelecimentos (Mock)
interface Owner {
  id: number;
  name: string;
  email: string;
  password: string;
  establishment_name: string;
  establishment_id: number;
  phone: string;
  subscription_active: boolean;
  subscription_expires: string;
  payment_method: string | null;
}

const owners: Owner[] = [
  {
    id: 1,
    name: 'José Silva',
    email: 'jose@botecodoze.com',
    password: 'senha123', // Em produção, usar bcrypt
    establishment_name: 'Boteco do Zé',
    establishment_id: 1,
    phone: '(64) 99999-0001',
    subscription_active: true,
    subscription_expires: '2026-04-01',
    payment_method: 'credit_card',
  },
  {
    id: 2,
    name: 'Maria Santos',
    email: 'maria@sunsetclub.com',
    password: 'senha123',
    establishment_name: 'Club Noturno Sunset',
    establishment_id: 2,
    phone: '(64) 99999-0002',
    subscription_active: true,
    subscription_expires: '2026-04-01',
    payment_method: 'credit_card',
  },
];

// Produtos do estabelecimento
const products = [
  {
    id: 1,
    owner_id: 1,
    name: 'Chopp Premium',
    description: 'Chopp gelado de primeira qualidade',
    price: 15.00,
    category: 'Bebidas',
    available: true,
  },
  {
    id: 2,
    owner_id: 1,
    name: 'Petisco Misto',
    description: 'Seleção de petiscos variados',
    price: 35.00,
    category: 'Petiscos',
    available: true,
  },
  {
    id: 3,
    owner_id: 2,
    name: 'Drink da Casa',
    description: 'Drink especial da casa',
    price: 25.00,
    category: 'Bebidas',
    available: true,
  },
];

// Promoções do dia (por estabelecimento)
const dailyPromotions = [
  {
    id: 1,
    owner_id: 1,
    title: 'Chopp com 30% OFF',
    description: 'Válido de segunda a quinta',
    discount_percent: 30,
    discount_value: 0,
    valid_from: '18:00',
    valid_until: '23:00',
    active: true,
  },
  {
    id: 2,
    owner_id: 2,
    title: 'Drinks 2x1',
    description: 'Compre um drink e ganhe outro',
    discount_percent: 50,
    discount_value: 0,
    valid_from: '20:00',
    valid_until: '02:00',
    active: true,
  },
];

// Routes - Health Check
app.get('/api/health', (req: Request, res: Response) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Routes - Places (Bares)
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

// Routes - Restaurants
app.get('/api/restaurants', (req: Request, res: Response) => {
  const { cuisine } = req.query;
  
  if (cuisine) {
    const filtered = restaurants.filter(
      (r) => r.cuisine.toLowerCase() === String(cuisine).toLowerCase()
    );
    return res.json(filtered);
  }
  
  res.json(restaurants);
});

app.get('/api/restaurants/:id', (req: Request, res: Response) => {
  const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
  const restaurant = restaurants.find((r) => r.id === parseInt(id));
  
  if (!restaurant) {
    return res.status(404).json({ error: 'Restaurant not found' });
  }
  
  res.json(restaurant);
});

// Routes - Events
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

// Routes - Promotions
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

// Routes - Owner Authentication
app.post('/api/owner/login', (req: Request, res: Response) => {
  const { email, password } = req.body;
  
  const owner = owners.find((o) => o.email === email && o.password === password);
  
  if (!owner) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }
  
  res.json({
    id: owner.id,
    name: owner.name,
    email: owner.email,
    establishment_name: owner.establishment_name,
    establishment_id: owner.establishment_id,
    subscription_active: owner.subscription_active,
    subscription_expires: owner.subscription_expires,
  });
});

app.post('/api/owner/register', (req: Request, res: Response) => {
  const { name, email, password, establishment_name, phone } = req.body;
  
  const exists = owners.find((o) => o.email === email);
  if (exists) {
    return res.status(400).json({ error: 'Email already registered' });
  }
  
  const newOwner = {
    id: owners.length + 1,
    name,
    email,
    password,
    establishment_name,
    establishment_id: places.length + restaurants.length + 1,
    phone,
    subscription_active: false,
    subscription_expires: '',
    payment_method: '',
  };
  
  owners.push(newOwner);
  
  res.status(201).json({
    id: newOwner.id,
    name: newOwner.name,
    email: newOwner.email,
    establishment_name: newOwner.establishment_name,
  });
});

// Routes - Owner Dashboard
app.get('/api/owner/:id/dashboard', (req: Request, res: Response) => {
  const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
  const owner = owners.find((o) => o.id === parseInt(id));
  
  if (!owner) {
    return res.status(404).json({ error: 'Owner not found' });
  }
  
  const ownerProducts = products.filter((p) => p.owner_id === owner.id);
  const ownerPromotions = dailyPromotions.filter((p) => p.owner_id === owner.id);
  
  res.json({
    owner,
    products: ownerProducts,
    promotions: ownerPromotions,
    subscription: {
      active: owner.subscription_active,
      expires: owner.subscription_expires,
      price: 99.90,
      currency: 'BRL',
    },
  });
});

// Routes - Products
app.get('/api/owner/:id/products', (req: Request, res: Response) => {
  const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
  const ownerProducts = products.filter((p) => p.owner_id === parseInt(id));
  
  res.json(ownerProducts);
});

app.post('/api/owner/:id/products', (req: Request, res: Response) => {
  const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
  const { name, description, price, category } = req.body;
  
  const newProduct = {
    id: products.length + 1,
    owner_id: parseInt(id),
    name,
    description,
    price,
    category,
    available: true,
  };
  
  products.push(newProduct);
  res.status(201).json(newProduct);
});

// Routes - Daily Promotions
app.get('/api/owner/:id/promotions', (req: Request, res: Response) => {
  const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
  const ownerPromotions = dailyPromotions.filter((p) => p.owner_id === parseInt(id));
  
  res.json(ownerPromotions);
});

app.post('/api/owner/:id/promotions', (req: Request, res: Response) => {
  const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
  const { title, description, discount_percent, valid_from, valid_until } = req.body;
  
  const newPromotion = {
    id: dailyPromotions.length + 1,
    owner_id: parseInt(id),
    title,
    description,
    discount_percent,
    discount_value: 0,
    valid_from,
    valid_until,
    active: true,
  };
  
  dailyPromotions.push(newPromotion);
  res.status(201).json(newPromotion);
});

// Routes - Payment
app.post('/api/payment/subscribe', (req: Request, res: Response) => {
  const { owner_id, payment_method } = req.body;
  
  const owner = owners.find((o) => o.id === owner_id);
  if (!owner) {
    return res.status(404).json({ error: 'Owner not found' });
  }
  
  // Simular pagamento bem-sucedido
  owner.subscription_active = true;
  owner.subscription_expires = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
  owner.payment_method = payment_method;
  
  res.json({
    success: true,
    message: 'Subscription activated',
    subscription_expires: owner.subscription_expires,
  });
});

app.get('/api/payment/status/:owner_id', (req: Request, res: Response) => {
  const owner_id = Array.isArray(req.params.owner_id) ? req.params.owner_id[0] : req.params.owner_id;
  const owner = owners.find((o) => o.id === parseInt(owner_id));
  
  if (!owner) {
    return res.status(404).json({ error: 'Owner not found' });
  }
  
  res.json({
    subscription_active: owner.subscription_active,
    subscription_expires: owner.subscription_expires,
    payment_method: owner.payment_method,
  });
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
  console.log(`🍽️ Restaurants: http://localhost:${PORT}/api/restaurants`);
  console.log(`🏠 Owner Dashboard: http://localhost:${PORT}/api/owner/1/dashboard`);
});
