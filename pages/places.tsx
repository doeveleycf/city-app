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
      name: 'Boteco do Zé',
      category: 'bar',
      emoji: '🍺',
      rating: 4.7,
      reviews: 156,
      address: 'Rua Getulio Vargas, 450',
      hours: '18:00 - 02:00',
      price: 'R$ 20-50',
    },
    {
      id: 2,
      name: 'Club Noturno Sunset',
      category: 'casa noturna',
      emoji: '🎉',
      rating: 4.9,
      reviews: 312,
      address: 'Avenida Goiás, 1200',
      hours: '22:00 - 04:00',
      price: 'R$ 30-80',
    },
    {
      id: 3,
      name: 'Bar do Gordo',
      category: 'bar',
      emoji: '🍻',
      rating: 4.5,
      reviews: 89,
      address: 'Rua Tocantins, 320',
      hours: '17:00 - 01:00',
      price: 'R$ 15-40',
    },
    {
      id: 4,
      name: 'Lounge Bar Premium',
      category: 'lounge',
      emoji: '🥂',
      rating: 4.8,
      reviews: 234,
      address: 'Rua Paranaiba, 890',
      hours: '19:00 - 03:00',
      price: 'R$ 40-100',
    },
    {
      id: 5,
      name: 'Choperia Jataí',
      category: 'choperia',
      emoji: '🍺',
      rating: 4.6,
      reviews: 178,
      address: 'Avenida Brasil, 650',
      hours: '16:00 - 23:00',
      price: 'R$ 25-60',
    },
    {
      id: 6,
      name: 'Disco Club X',
      category: 'discoteca',
      emoji: '🎵',
      rating: 4.4,
      reviews: 145,
      address: 'Rua Mato Grosso, 1100',
      hours: '23:00 - 05:00',
      price: 'R$ 35-70',
    },
  ];

  const categoryStr = typeof category === 'string' ? category.toLowerCase() : '';
  const filteredPlaces = categoryStr
    ? places.filter((p) => p.category.toLowerCase() === categoryStr)
    : places;

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800">
      <div className="container mx-auto px-4 py-12">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4 text-white">
            {categoryStr 
              ? `${categoryStr.charAt(0).toUpperCase() + categoryStr.slice(1)}s de Jataí` 
              : '🌙 Todos os Lugares de Jataí'}
          </h1>
          <p className="text-gray-300">
            Encontre os melhores {categoryStr || 'bares e casas noturnas'} da sua cidade
          </p>
        </div>

        {filteredPlaces.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-xl text-gray-300">Nenhum lugar encontrado nesta categoria</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPlaces.map((place) => (
              <div
                key={place.id}
                className="bg-slate-700 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition border border-slate-600"
              >
                <div className="bg-gradient-to-br from-purple-500 to-pink-500 h-40 flex items-center justify-center text-6xl">
                  {place.emoji}
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2 text-white">{place.name}</h3>
                  <p className="text-gray-300 mb-4 capitalize">{place.category}</p>

                  <div className="space-y-3 mb-6 text-sm text-gray-300">
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

                  <div className="flex items-center justify-between border-t border-slate-600 pt-4">
                    <div className="flex items-center gap-1">
                      <span className="text-yellow-400">⭐</span>
                      <span className="font-bold text-white">{place.rating}</span>
                      <span className="text-gray-400">({place.reviews})</span>
                    </div>
                    <button className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded hover:shadow-lg transition">
                      Detalhes
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
