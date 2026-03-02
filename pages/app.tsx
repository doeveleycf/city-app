import React, { useEffect, useState } from 'react';
import styles from '../styles/App.module.css';

interface Place {
  id: number;
  name: string;
  category: string;
  rating: number;
  reviews: number;
  address: string;
  hours: string;
  price: string;
  image: string;
  latitude: number;
  longitude: number;
}

interface Restaurant {
  id: number;
  name: string;
  cuisine: string;
  rating: number;
  reviews: number;
  address: string;
  hours: string;
  price: string;
  image: string;
}

interface Event {
  id: number;
  name: string;
  date: string;
  time: string;
  location: string;
  emoji: string;
  attendees: number;
  description: string;
}

type TabType = 'home' | 'bars' | 'restaurants' | 'events' | 'owner';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

export default function App() {
  const [activeTab, setActiveTab] = useState<TabType>('home');
  const [places, setPlaces] = useState<Place[]>([]);
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [placesRes, restaurantsRes, eventsRes] = await Promise.all([
          fetch(`${API_URL}/api/places`),
          fetch(`${API_URL}/api/restaurants`),
          fetch(`${API_URL}/api/events`),
        ]);

        if (placesRes.ok) setPlaces(await placesRes.json());
        if (restaurantsRes.ok) setRestaurants(await restaurantsRes.json());
        if (eventsRes.ok) setEvents(await eventsRes.json());
      } catch (error) {
        console.error('Erro ao carregar dados:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const renderHome = () => (
    <div className={styles.screen}>
      <div className={styles.header}>
        <h1>🌙 City App</h1>
        <p>Descubra eventos e bares noturnos de Jataí</p>
      </div>

      <div className={styles.categories}>
        <div className={styles.categoryCard} onClick={() => setActiveTab('bars')}>
          <div className={styles.categoryEmoji}>🍺</div>
          <div className={styles.categoryName}>Bares</div>
          <div className={styles.categoryCount}>{places.length} locais</div>
        </div>
        <div className={styles.categoryCard} onClick={() => setActiveTab('restaurants')}>
          <div className={styles.categoryEmoji}>🍽️</div>
          <div className={styles.categoryName}>Restaurantes</div>
          <div className={styles.categoryCount}>{restaurants.length} locais</div>
        </div>
        <div className={styles.categoryCard} onClick={() => setActiveTab('events')}>
          <div className={styles.categoryEmoji}>🎉</div>
          <div className={styles.categoryName}>Eventos</div>
          <div className={styles.categoryCount}>{events.length} eventos</div>
        </div>
      </div>

      <div className={styles.section}>
        <div className={styles.sectionTitle}>📍 Próximos Eventos</div>
        {events.slice(0, 3).map((event) => (
          <div key={event.id} className={styles.card}>
            <div className={styles.cardEmoji}>{event.emoji}</div>
            <div className={styles.cardContent}>
              <div className={styles.cardName}>{event.name}</div>
              <div className={styles.cardCategory}>{event.date} às {event.time}</div>
              <div className={styles.cardAddress}>{event.location}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderBars = () => (
    <div className={styles.screen}>
      <div className={styles.pageTitle}>🍺 Bares de Jataí</div>
      {places.map((place) => (
        <div key={place.id} className={styles.card}>
          <div className={styles.cardEmoji}>{place.image}</div>
          <div className={styles.cardContent}>
            <div className={styles.cardName}>{place.name}</div>
            <div className={styles.cardCategory}>{place.category}</div>
            <div className={styles.cardAddress}>{place.address}</div>
            <div className={styles.cardFooter}>
              <span className={styles.cardRating}>⭐ {place.rating}</span>
              <span className={styles.cardPrice}>{place.price}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  const renderRestaurants = () => (
    <div className={styles.screen}>
      <div className={styles.pageTitle}>🍽️ Restaurantes de Jataí</div>
      {restaurants.map((restaurant) => (
        <div key={restaurant.id} className={styles.card}>
          <div className={styles.cardEmoji}>{restaurant.image}</div>
          <div className={styles.cardContent}>
            <div className={styles.cardName}>{restaurant.name}</div>
            <div className={styles.cardCategory}>{restaurant.cuisine}</div>
            <div className={styles.cardAddress}>{restaurant.address}</div>
            <div className={styles.cardFooter}>
              <span className={styles.cardRating}>⭐ {restaurant.rating}</span>
              <span className={styles.cardPrice}>{restaurant.price}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  const renderEvents = () => (
    <div className={styles.screen}>
      <div className={styles.pageTitle}>🎉 Eventos Noturnos</div>
      {events.map((event) => (
        <div key={event.id} className={styles.eventCardLarge}>
          <div className={styles.eventEmojiLarge}>{event.emoji}</div>
          <div className={styles.eventContentLarge}>
            <div className={styles.eventNameLarge}>{event.name}</div>
            <div className={styles.eventDescription}>{event.description}</div>
            <div className={styles.eventDetails}>📅 {event.date} às {event.time}</div>
            <div className={styles.eventDetails}>📍 {event.location}</div>
            <div className={styles.eventDetails}>👥 {event.attendees} pessoas interessadas</div>
          </div>
        </div>
      ))}
    </div>
  );

  const renderOwner = () => (
    <div className={styles.screen}>
      <div className={styles.ownerContainer}>
        <div className={styles.ownerTitle}>🏪 Painel do Dono</div>
        <div className={styles.ownerSubtitle}>Gerencie seu estabelecimento</div>

        <button className={styles.ownerButton}>🔐 Fazer Login</button>
        <button className={styles.ownerButton}>📝 Registrar Novo Estabelecimento</button>

        <div className={styles.ownerFeatures}>
          <div className={styles.ownerFeaturesTitle}>Recursos Disponíveis:</div>
          <div className={styles.ownerFeature}>✅ Cadastro de produtos</div>
          <div className={styles.ownerFeature}>✅ Promoções do dia</div>
          <div className={styles.ownerFeature}>✅ Gerenciamento de preços</div>
          <div className={styles.ownerFeature}>✅ Assinatura mensal (R$ 99,90)</div>
        </div>
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.spinner}>⏳ Carregando...</div>
      </div>
    );
  }

  return (
    <div className={styles.app}>
      {activeTab === 'home' && renderHome()}
      {activeTab === 'bars' && renderBars()}
      {activeTab === 'restaurants' && renderRestaurants()}
      {activeTab === 'events' && renderEvents()}
      {activeTab === 'owner' && renderOwner()}

      <div className={styles.tabBar}>
        <div
          className={`${styles.tabButton} ${activeTab === 'home' ? styles.tabButtonActive : ''}`}
          onClick={() => setActiveTab('home')}
        >
          🏠
        </div>
        <div
          className={`${styles.tabButton} ${activeTab === 'bars' ? styles.tabButtonActive : ''}`}
          onClick={() => setActiveTab('bars')}
        >
          🍺
        </div>
        <div
          className={`${styles.tabButton} ${activeTab === 'restaurants' ? styles.tabButtonActive : ''}`}
          onClick={() => setActiveTab('restaurants')}
        >
          🍽️
        </div>
        <div
          className={`${styles.tabButton} ${activeTab === 'events' ? styles.tabButtonActive : ''}`}
          onClick={() => setActiveTab('events')}
        >
          🎉
        </div>
        <div
          className={`${styles.tabButton} ${activeTab === 'owner' ? styles.tabButtonActive : ''}`}
          onClick={() => setActiveTab('owner')}
        >
          🏪
        </div>
      </div>
    </div>
  );
}
