import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function Places() {
  const router = useRouter();
  const [category, setCategory] = useState<string | undefined>(undefined);

  useEffect(() => {
    if (router.isReady) {
      setCategory(router.query.category as string | undefined);
    }
  }, [router.isReady, router.query.category]);

  const places = [
    {
      id: 1,
      name: 'Museu de Arte Moderna',
      category: 'Museu',
      emoji: '🏛️',
      rating: 4.8,
      reviews: 245,
      address: 'Avenida Paulista, 1000',
      hours: '10:00 - 18:00',
      price: 'R$ 30',
    },
    {
      id: 2,
      name: 'Museu de História Natural',
      category: 'Museu',
      emoji: '🏛️',
      rating: 4.6,
      reviews: 189,
      address: 'Rua da História, 500',
      hours: '09:00 - 17:00',
      price: 'R$ 25',
    },
    {
      id: 3,
      name: 'Restaurante Gourmet',
      category: 'Restaurante',
      emoji: '🍽️',
      rating: 4.9,
      reviews: 312,
      address: 'Rua Gourmet, 250',
      hours: '12:00 - 23:00',
      price: 'R$ 80-150',
    },
    {
      id: 4,
      name: 'Pizzaria Tradicional',
      category: 'Restaurante',
      emoji: '🍽️',
      rating: 4.7,
      reviews: 428,
      address: 'Rua da Pizza, 100',
      hours: '11:00 - 22:00',
      price: 'R$ 40-80',
    },
    {
      id: 5,
      name: 'Festival de Música',
      category: 'Evento',
      emoji: '🎭',
      rating: 4.7,
      reviews: 156,
      address: 'Parque Central',
      hours: '19:00 - 23:00',
      price: 'R$ 50',
    },
    {
      id: 6,
      name: 'Exposição de Arte',
      category: 'Evento',
      emoji: '🎭',
      rating: 4.5,
      reviews: 98,
      address: 'Galeria de Arte',
      hours: '10:00 - 18:00',
      price: 'Gratuito',
    },
  ];

  const categoryStr = typeof category === 'string' ? category : '';
  const filteredPlaces = categoryStr
    ? places.filter((p) => p.category.toLowerCase() === categoryStr)
    : places;

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4">
          {categoryStr ? `${categoryStr.charAt(0).toUpperCase() + categoryStr.slice(1)}s` : 'Todos os Lugares'}
        </h1>
        <p className="text-gray-600">
          Encontre os melhores {categoryStr || 'lugares'} da sua cidade
        </p>
      </div>

      {filteredPlaces.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-xl text-gray-600">Nenhum lugar encontrado nesta categoria</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPlaces.map((place) => (
            <div
              key={place.id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition"
            >
              <div className="bg-gradient-to-br from-blue-400 to-blue-600 h-40 flex items-center justify-center text-6xl">
                {place.emoji}
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">{place.name}</h3>
                <p className="text-gray-600 mb-4">{place.category}</p>

                <div className="space-y-3 mb-6 text-sm text-gray-700">
                  <div className="flex items-center gap-2">
                    <span>📍</span>
                    <span>{place.address}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span>🕐</span>
                    <span>{place.hours}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span>💰</span>
                    <span>{place.price}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between border-t pt-4">
                  <div className="flex items-center gap-1">
                    <span className="text-yellow-400">⭐</span>
                    <span className="font-bold">{place.rating}</span>
                    <span className="text-gray-500">({place.reviews})</span>
                  </div>
                  <button className="bg-primary text-white px-4 py-2 rounded hover:bg-blue-700 transition">
                    Detalhes
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
