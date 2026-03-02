import { useEffect, useState } from 'react';

interface Restaurant {
  id: number;
  name: string;
  category: string;
  rating: number;
  reviews: number;
  address: string;
  hours: string;
  price: string;
  image: string;
  cuisine: string;
  latitude: number;
  longitude: number;
}

export default function Restaurants() {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [filteredRestaurants, setFilteredRestaurants] = useState<Restaurant[]>([]);
  const [selectedCuisine, setSelectedCuisine] = useState<string>('');

  useEffect(() => {
    fetch('/api/restaurants')
      .then((res) => res.json())
      .then((data) => {
        setRestaurants(data);
        setFilteredRestaurants(data);
      });
  }, []);

  const cuisines = Array.from(new Set(restaurants.map((r) => r.cuisine)));

  const handleCuisineFilter = (cuisine: string) => {
    setSelectedCuisine(cuisine);
    if (cuisine === '') {
      setFilteredRestaurants(restaurants);
    } else {
      setFilteredRestaurants(restaurants.filter((r) => r.cuisine === cuisine));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 py-12">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">🍽️ Restaurantes de Jataí</h1>
          <p className="text-gray-300">Descubra os melhores restaurantes da cidade</p>
        </div>

        {/* Filtro de Culinária */}
        <div className="mb-8 flex flex-wrap gap-3">
          <button
            onClick={() => handleCuisineFilter('')}
            className={`px-6 py-2 rounded-full font-bold transition ${
              selectedCuisine === ''
                ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                : 'bg-slate-700 text-gray-300 hover:bg-slate-600 border border-slate-600'
            }`}
          >
            Todos
          </button>
          {cuisines.map((cuisine) => (
            <button
              key={cuisine}
              onClick={() => handleCuisineFilter(cuisine)}
              className={`px-6 py-2 rounded-full font-bold transition ${
                selectedCuisine === cuisine
                  ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                  : 'bg-slate-700 text-gray-300 hover:bg-slate-600 border border-slate-600'
              }`}
            >
              {cuisine}
            </button>
          ))}
        </div>

        {/* Grid de Restaurantes */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredRestaurants.map((restaurant) => (
            <div
              key={restaurant.id}
              className="bg-slate-700 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition border border-slate-600"
            >
              <div className="bg-gradient-to-br from-purple-500 to-pink-500 h-40 flex items-center justify-center text-6xl">
                {restaurant.image}
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 text-white">{restaurant.name}</h3>
                <p className="text-gray-300 mb-4">{restaurant.cuisine}</p>

                <div className="space-y-3 mb-6 text-sm text-gray-300">
                  <div className="flex items-center gap-2">
                    <span>📍</span>
                    <span>{restaurant.address}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span>🕐</span>
                    <span>{restaurant.hours}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span>💰</span>
                    <span>{restaurant.price}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between border-t border-slate-600 pt-4">
                  <div className="flex items-center gap-1">
                    <span className="text-yellow-400">⭐</span>
                    <span className="font-bold text-white">{restaurant.rating}</span>
                    <span className="text-gray-400">({restaurant.reviews})</span>
                  </div>
                  <a
                    href={`/map?lat=${restaurant.latitude}&lng=${restaurant.longitude}`}
                    className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded hover:shadow-lg transition font-bold text-sm"
                  >
                    Ver Mapa
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredRestaurants.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-300 text-lg">Nenhum restaurante encontrado nesta categoria</p>
          </div>
        )}
      </div>
    </div>
  );
}
