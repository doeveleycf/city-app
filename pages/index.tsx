import Link from 'next/link';

export default function Home() {
  const categories = [
    {
      id: 1,
      name: 'Museus',
      emoji: '🏛️',
      description: 'Explore a cultura local',
      color: 'from-blue-400 to-blue-600',
    },
    {
      id: 2,
      name: 'Restaurantes',
      emoji: '🍽️',
      description: 'Melhores comidas da cidade',
      color: 'from-orange-400 to-orange-600',
    },
    {
      id: 3,
      name: 'Eventos',
      emoji: '🎭',
      description: 'O que está acontecendo',
      color: 'from-purple-400 to-purple-600',
    },
  ];

  return (
    <div className="bg-gradient-to-b from-blue-50 to-white">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-5xl font-bold text-gray-900 mb-4">
          🏙️ Bem-vindo ao City App
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          Descubra os melhores lugares, eventos e experiências da sua cidade
        </p>
        <Link
          href="/places"
          className="inline-block bg-primary text-white px-8 py-4 rounded-lg font-bold hover:bg-blue-700 transition transform hover:scale-105"
        >
          Explorar Agora
        </Link>
      </section>

      {/* Categories Section */}
      <section className="container mx-auto px-4 py-20">
        <h2 className="text-3xl font-bold text-center mb-12">Categorias</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/places?category=${category.name.toLowerCase()}`}
            >
              <div className={`bg-gradient-to-br ${category.color} rounded-lg p-8 text-white cursor-pointer hover:shadow-lg transition transform hover:scale-105`}>
                <div className="text-5xl mb-4">{category.emoji}</div>
                <h3 className="text-2xl font-bold mb-2">{category.name}</h3>
                <p className="text-white/90">{category.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Places Section */}
      <section className="bg-gray-100 py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Lugares em Destaque</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: 'Museu de Arte Moderna',
                category: 'Museu',
                rating: 4.8,
                reviews: 245,
              },
              {
                name: 'Restaurante Gourmet',
                category: 'Restaurante',
                rating: 4.9,
                reviews: 189,
              },
              {
                name: 'Festival de Música',
                category: 'Evento',
                rating: 4.7,
                reviews: 312,
              },
            ].map((place, idx) => (
              <div key={idx} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition">
                <div className="bg-gray-300 h-48 rounded-lg mb-4 flex items-center justify-center text-4xl">
                  📍
                </div>
                <h3 className="text-xl font-bold mb-2">{place.name}</h3>
                <p className="text-gray-600 mb-4">{place.category}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    <span className="text-yellow-400">⭐</span>
                    <span className="font-bold">{place.rating}</span>
                    <span className="text-gray-500">({place.reviews})</span>
                  </div>
                  <button className="text-primary font-bold hover:underline">
                    Ver mais →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Pronto para explorar?</h2>
          <p className="text-xl mb-8">Encontre os melhores lugares e eventos da sua cidade</p>
          <Link
            href="/places"
            className="inline-block bg-white text-primary px-8 py-4 rounded-lg font-bold hover:bg-gray-100 transition"
          >
            Começar Exploração
          </Link>
        </div>
      </section>
    </div>
  );
}
