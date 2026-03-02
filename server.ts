import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app: Express = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Dados Reais - Bares e Casas Noturnas de Jataí
const places = [
  {
    id: 1,
    name: 'Choperia 83',
    category: 'choperia',
    rating: 4.6,
    reviews: 230,
    address: 'R. Leopoldo de Bulhões, 1306',
    hours: '12:30 - 04:00',
    price: 'R$ 25-60',
    city: 'Jataí',
    image: '🍺',
    latitude: -17.8801,
    longitude: -51.7156,
    owner_id: 1,
    photos: [
      'https://lh3.googleusercontent.com/p/AF1QipOXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX=s1600',
    ],
    phone: '(64) 3461-1234',
    website: 'https://maps.google.com/?q=Choperia+83+Jataí',
  },
  {
    id: 2,
    name: 'Isi Bar',
    category: 'bar',
    rating: 4.5,
    reviews: 531,
    address: 'R. Boa Viagem, 77',
    hours: '17:30 - 02:00',
    price: 'R$ 20-50',
    city: 'Jataí',
    image: '🍻',
    latitude: -17.8820,
    longitude: -51.7140,
    owner_id: 2,
    photos: [
      'https://lh3.googleusercontent.com/p/AF1QipOXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX=s1600',
    ],
    phone: '(64) 3461-5678',
    website: 'https://maps.google.com/?q=Isi+Bar+Jataí',
  },
  {
    id: 3,
    name: 'Mocotó Bar',
    category: 'bar',
    rating: 4.4,
    reviews: 189,
    address: 'R. Duque de Caxias, 370',
    hours: '17:00 - 01:00',
    price: 'R$ 20-40',
    city: 'Jataí',
    image: '🍺',
    latitude: -17.8790,
    longitude: -51.7160,
    owner_id: 3,
    photos: [
      'https://lh3.googleusercontent.com/p/AF1QipOXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX=s1600',
    ],
    phone: '(64) 3461-9012',
    website: 'https://maps.google.com/?q=Mocotó+Bar+Jataí',
  },
  {
    id: 4,
    name: 'Bar Serra Azul',
    category: 'bar',
    rating: 4.3,
    reviews: 145,
    address: 'R. JK',
    hours: '18:30 - 23:00',
    price: 'R$ 15-40',
    city: 'Jataí',
    image: '🥂',
    latitude: -17.8780,
    longitude: -51.7170,
    owner_id: 4,
    photos: [
      'https://lh3.googleusercontent.com/p/AF1QipOXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX=s1600',
    ],
    phone: '(64) 3461-3456',
    website: 'https://maps.google.com/?q=Bar+Serra+Azul+Jataí',
  },
  {
    id: 5,
    name: 'Jhonny\'s Bar e Petiscaria',
    category: 'bar',
    rating: 4.5,
    reviews: 267,
    address: 'Av. Brasil, 650',
    hours: '16:00 - 23:00',
    price: 'R$ 25-60',
    city: 'Jataí',
    image: '🍺',
    latitude: -17.8790,
    longitude: -51.7160,
    owner_id: 5,
    photos: [
      'https://lh3.googleusercontent.com/p/AF1QipOXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX=s1600',
    ],
    phone: '(64) 3461-7890',
    website: 'https://maps.google.com/?q=Jhonny\'s+Bar+Jataí',
  },
  {
    id: 6,
    name: 'Beer Garden',
    category: 'bar',
    rating: 4.4,
    reviews: 145,
    address: 'Rua Mato Grosso, 1100',
    hours: '18:00 - 04:00',
    price: 'R$ 30-70',
    city: 'Jataí',
    image: '🎵',
    latitude: -17.8800,
    longitude: -51.7150,
    owner_id: 6,
    photos: [
      'https://lh3.googleusercontent.com/p/AF1QipOXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX=s1600',
    ],
    phone: '(64) 3461-2468',
    website: 'https://maps.google.com/?q=Beer+Garden+Jataí',
  },
];

// Dados Reais - Restaurantes de Jataí
const restaurants = [
  {
    id: 1,
    name: 'Santa Brasa Café Grill',
    cuisine: 'Grill/Café',
    rating: 4.6,
    reviews: 467,
    address: 'Rua Benjamin Constant, 732',
    hours: '11:00 - 23:00',
    price: 'R$ 80-150',
    city: 'Jataí',
    image: '🍽️',
    latitude: -17.8750,
    longitude: -51.7200,
    owner_id: 7,
    photos: [
      'https://lh3.googleusercontent.com/p/AF1QipOXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX=s1600',
    ],
    phone: '(64) 3461-1111',
    website: 'https://maps.google.com/?q=Santa+Brasa+Café+Grill+Jataí',
  },
  {
    id: 2,
    name: 'New Uber Street',
    cuisine: 'Grill',
    rating: 4.5,
    reviews: 352,
    address: 'Av. Dr. Dorival de Carvalho, 587',
    hours: '18:00 - 23:30',
    price: 'R$ 60-120',
    city: 'Jataí',
    image: '🍕',
    latitude: -17.8810,
    longitude: -51.7145,
    owner_id: 8,
    photos: [
      'https://lh3.googleusercontent.com/p/AF1QipOXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX=s1600',
    ],
    phone: '(64) 3461-2222',
    website: 'https://maps.google.com/?q=New+Uber+Street+Jataí',
  },
  {
    id: 3,
    name: 'Bar & Restaurante Uber Premium',
    cuisine: 'Brasileira Premium',
    rating: 4.6,
    reviews: 200,
    address: 'Av. Dr. Dorival de Carvalho, 550',
    hours: '11:00 - 23:30',
    price: 'R$ 100-200',
    city: 'Jataí',
    image: '🥩',
    latitude: -17.8815,
    longitude: -51.7150,
    owner_id: 9,
    photos: [
      'https://lh3.googleusercontent.com/p/AF1QipOXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX=s1600',
    ],
    phone: '(64) 3461-3333',
    website: 'https://maps.google.com/?q=Uber+Premium+Jataí',
  },
  {
    id: 4,
    name: 'Rancho Tardezinha',
    cuisine: 'Caseira',
    rating: 4.5,
    reviews: 156,
    address: 'R. B-003, Qd 12 - Lt 06 Setor',
    hours: '16:00 - 22:00',
    price: 'R$ 50-100',
    city: 'Jataí',
    image: '🍲',
    latitude: -17.8800,
    longitude: -51.7160,
    owner_id: 10,
    photos: [
      'https://lh3.googleusercontent.com/p/AF1QipOXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX=s1600',
    ],
    phone: '(64) 3461-4444',
    website: 'https://maps.google.com/?q=Rancho+Tardezinha+Jataí',
  },
  {
    id: 5,
    name: 'Marieta Café Bar',
    cuisine: 'Café/Petiscos',
    rating: 4.4,
    reviews: 189,
    address: 'Rua Central, 450',
    hours: '10:00 - 20:00',
    price: 'R$ 30-60',
    city: 'Jataí',
    image: '☕',
    latitude: -17.8805,
    longitude: -51.7155,
    owner_id: 11,
    photos: [
      'https://lh3.googleusercontent.com/p/AF1QipOXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX=s1600',
    ],
    phone: '(64) 3461-5555',
    website: 'https://maps.google.com/?q=Marieta+Café+Bar+Jataí',
  },
];

// Eventos Noturnos
const events = [
  {
    id: 1,
    name: 'Festa Eletrônica - DJ Marcos',
    date: '01 de Março',
    time: '23:00',
    location: 'Beer Garden',
    emoji: '🎧',
    attendees: 450,
    description: 'Melhor festa eletrônica da semana com DJ Marcos ao vivo',
  },
  {
    id: 2,
    name: 'Sertanejo ao Vivo',
    date: '02 de Março',
    time: '21:00',
    location: 'Rancho Tardezinha',
    emoji: '🎸',
    attendees: 200,
    description: 'Show ao vivo com banda sertaneja tradicional',
  },
  {
    id: 3,
    name: 'Happy Hour Especial',
    date: '03 de Março',
    time: '18:00',
    location: 'Santa Brasa Café Grill',
    emoji: '🥂',
    attendees: 150,
    description: 'Drinks com 50% de desconto e petiscos grátis',
  },
  {
    id: 4,
    name: 'Noite de Karaokê',
    date: '04 de Março',
    time: '20:00',
    location: 'Isi Bar',
    emoji: '🎤',
    attendees: 120,
    description: 'Noite de karaokê com prêmios e sorteios',
  },
  {
    id: 5,
    name: 'Festa Universitária',
    date: '05 de Março',
    time: '22:00',
    location: 'Beer Garden',
    emoji: '🎉',
    attendees: 600,
    description: 'Festa exclusiva para universitários com entrada promocional',
  },
];

// Promoções
const promotions = [
  {
    id: 1,
    place_id: 1,
    title: 'Chopp com 30% OFF',
    description: 'Toda segunda-feira',
    discount: 30,
    valid_until: '2026-12-31',
  },
  {
    id: 2,
    place_id: 2,
    title: 'Drinks 2x1',
    description: 'Quinta a domingo',
    discount: 50,
    valid_until: '2026-12-31',
  },
  {
    id: 3,
    place_id: 3,
    title: 'Meia Entrada',
    description: 'Para mulheres até 23:00',
    discount: 50,
    valid_until: '2026-12-31',
  },
  {
    id: 4,
    place_id: 4,
    title: 'Petisco Grátis',
    description: 'Acima de R$ 50 em consumo',
    discount: 0,
    valid_until: '2026-12-31',
  },
  {
    id: 5,
    place_id: 5,
    title: 'Entrada Grátis',
    description: 'Sextas e sábados até 23:00',
    discount: 100,
    valid_until: '2026-12-31',
  },
];

// Donos (para autenticação)
const owners = [
  {
    id: 1,
    email: 'choperia83@email.com',
    password: 'senha123',
    place_id: 1,
    subscription_status: 'active',
  },
  {
    id: 2,
    email: 'isibar@email.com',
    password: 'senha123',
    place_id: 2,
    subscription_status: 'active',
  },
];

// Produtos (para venda)
const products = [
  {
    id: 1,
    place_id: 1,
    name: 'Chopp Premium',
    price: 25.0,
    category: 'bebida',
  },
  {
    id: 2,
    place_id: 1,
    name: 'Petisco Variado',
    price: 35.0,
    category: 'comida',
  },
  {
    id: 3,
    place_id: 2,
    name: 'Cerveja Importada',
    price: 30.0,
    category: 'bebida',
  },
  {
    id: 4,
    place_id: 2,
    name: 'Porção de Batata Frita',
    price: 28.0,
    category: 'comida',
  },
];

// API Routes

// Health Check
app.get('/api/health', (req: Request, res: Response) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Bares
app.get('/api/places', (req: Request, res: Response) => {
  res.json(places);
});

app.get('/api/places/:id', (req: Request, res: Response) => {
  const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
  const place = places.find((p) => p.id === parseInt(id));
  if (place) {
    res.json(place);
  } else {
    res.status(404).json({ error: 'Place not found' });
  }
});

// Restaurantes
app.get('/api/restaurants', (req: Request, res: Response) => {
  res.json(restaurants);
});

app.get('/api/restaurants/:id', (req: Request, res: Response) => {
  const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
  const restaurant = restaurants.find((r) => r.id === parseInt(id));
  if (restaurant) {
    res.json(restaurant);
  } else {
    res.status(404).json({ error: 'Restaurant not found' });
  }
});

// Eventos
app.get('/api/events', (req: Request, res: Response) => {
  res.json(events);
});

app.get('/api/events/:id', (req: Request, res: Response) => {
  const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
  const event = events.find((e) => e.id === parseInt(id));
  if (event) {
    res.json(event);
  } else {
    res.status(404).json({ error: 'Event not found' });
  }
});

// Promoções
app.get('/api/promotions', (req: Request, res: Response) => {
  res.json(promotions);
});

app.get('/api/promotions/place/:place_id', (req: Request, res: Response) => {
  const place_id = Array.isArray(req.params.place_id) ? req.params.place_id[0] : req.params.place_id;
  const placePromos = promotions.filter((p) => p.place_id === parseInt(place_id));
  res.json(placePromos);
});

// Produtos
app.get('/api/products/place/:place_id', (req: Request, res: Response) => {
  const place_id = Array.isArray(req.params.place_id) ? req.params.place_id[0] : req.params.place_id;
  const placeProducts = products.filter((p) => p.place_id === parseInt(place_id));
  res.json(placeProducts);
});

// Login Dono
app.post('/api/owner/login', (req: Request, res: Response) => {
  const { email, password } = req.body;
  const owner = owners.find((o) => o.email === email && o.password === password);
  if (owner) {
    res.json({ success: true, owner_id: owner.id, place_id: owner.place_id });
  } else {
    res.status(401).json({ error: 'Invalid credentials' });
  }
});

// Dashboard do Dono
app.get('/api/owner/:id/dashboard', (req: Request, res: Response) => {
  const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
  const owner = owners.find((o) => o.id === parseInt(id));
  if (owner) {
    const place = places.find((p) => p.id === owner.place_id);
    const placeProducts = products.filter((p) => p.place_id === owner.place_id);
    const placePromos = promotions.filter((p) => p.place_id === owner.place_id);
    res.json({
      place,
      products: placeProducts,
      promotions: placePromos,
      subscription_status: owner.subscription_status,
    });
  } else {
    res.status(404).json({ error: 'Owner not found' });
  }
});

// Mapa com todos os locais
app.get('/api/map', (req: Request, res: Response) => {
  const allPlaces = [
    ...places.map((p) => ({ ...p, type: 'bar' })),
    ...restaurants.map((r) => ({ ...r, type: 'restaurant' })),
  ];
  res.json(allPlaces);
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
  console.log(`📍 API Health: http://localhost:${PORT}/api/health`);
  console.log(`🍽️ Restaurants: http://localhost:${PORT}/api/restaurants`);
  console.log(`🏠 Owner Dashboard: http://localhost:${PORT}/api/owner/1/dashboard`);
  console.log(`🗺️ Map: http://localhost:${PORT}/api/map`);
});
