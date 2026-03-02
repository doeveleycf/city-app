import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app: Express = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Mock data
const places = [
  {
    id: 1,
    name: 'Museu de Arte Moderna',
    category: 'Museu',
    rating: 4.8,
    reviews: 245,
    address: 'Avenida Paulista, 1000',
    hours: '10:00 - 18:00',
    price: 'R$ 30',
  },
  {
    id: 2,
    name: 'Restaurante Gourmet',
    category: 'Restaurante',
    rating: 4.9,
    reviews: 312,
    address: 'Rua Gourmet, 250',
    hours: '12:00 - 23:00',
    price: 'R$ 80-150',
  },
];

const events = [
  {
    id: 1,
    name: 'Festival de Música',
    date: '15 de Março',
    time: '19:00',
    location: 'Parque Central',
    emoji: '🎵',
    attendees: 2500,
  },
  {
    id: 2,
    name: 'Exposição de Arte',
    date: '20 de Março',
    time: '10:00',
    location: 'Galeria de Arte',
    emoji: '🎨',
    attendees: 800,
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
