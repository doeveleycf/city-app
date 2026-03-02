import Link from 'next/link';

export default function Home() {
  const categories = [
    {
      id: 1,
      name: 'Bares',
      emoji: '🍺',
      description: 'Melhores bares de Jataí',
      color: 'from-amber-400 to-amber-600',
    },
    {
      id: 2,
      name: 'Casa Noturna',
      emoji: '🎉',
      description: 'Casas noturnas e discotecas',
      color: 'from-purple-400 to-purple-600',
    },
    {
      id: 3,
      name: 'Eventos',
      emoji: '🎭',
      description: 'Eventos noturnos em Jataí',
      color: 'from-pink-400 to-pink-600',
    },
  ];

  return (
    <div className="bg-gradient-to-b from-slate-900 to-slate-800">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-5xl font-bold text-white mb-4">
          🌙 City App Jataí
        </h1>
        <p className="text-xl text-gray-300 mb-8">
          Descubra os melhores bares, casas noturnas e eventos de Jataí
        </p>
        <Link
          href="/places"
          className="inline-block bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-4 rounded-lg font-bold hover:shadow-lg transition transform hover:scale-105"
        >
          🔍 Explorar Agora
        </Link>
      </section>

      {/* Categorias Section */}
      <section className="container mx-auto px-4 py-20">
        <h2 className="text-3xl font-bold text-center mb-12 text-white">Categorias</h2>
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

      {/* Bares em Destaque */}
      <section className="bg-slate-700 py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-white">🍺 Bares em Destaque</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: 'Boteco do Zé',
                category: 'Bar',
                rating: 4.7,
                reviews: 156,
                emoji: '🍺',
              },
              {
                name: 'Club Noturno Sunset',
                category: 'Casa Noturna',
                rating: 4.9,
                reviews: 312,
                emoji: '🎉',
              },
              {
                name: 'Lounge Bar Premium',
                category: 'Lounge',
                rating: 4.8,
                reviews: 234,
                emoji: '🥂',
              },
            ].map((place, idx) => (
              <div key={idx} className="bg-slate-600 rounded-lg shadow-md p-6 hover:shadow-lg transition border border-slate-500">
                <div className="bg-gradient-to-br from-purple-500 to-pink-500 h-48 rounded-lg mb-4 flex items-center justify-center text-6xl">
                  {place.emoji}
                </div>
                <h3 className="text-xl font-bold mb-2 text-white">{place.name}</h3>
                <p className="text-gray-300 mb-4">{place.category}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    <span className="text-yellow-400">⭐</span>
                    <span className="font-bold text-white">{place.rating}</span>
                    <span className="text-gray-400">({place.reviews})</span>
                  </div>
                  <button className="text-pink-400 font-bold hover:underline">
                    Ver mais →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Promoções Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-white">🎉 Promoções Especiais</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                title: 'Chopp com 30% OFF',
                bar: 'Choperia Jataí',
                discount: '30%',
                emoji: '🍺',
              },
              {
                title: 'Drinks 2x1',
                bar: 'Lounge Bar Premium',
                discount: '50%',
                emoji: '🍹',
              },
              {
                title: 'Entrada Grátis',
                bar: 'Club Noturno Sunset',
                discount: 'Grátis',
                emoji: '🎫',
              },
              {
                title: 'Petisco Grátis',
                bar: 'Boteco do Zé',
                discount: 'Grátis',
                emoji: '🍟',
              },
            ].map((promo, idx) => (
              <div key={idx} className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg p-6 text-white hover:shadow-lg transition">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-4xl">{promo.emoji}</span>
                  <span className="bg-white text-purple-600 px-3 py-1 rounded-full font-bold text-lg">{promo.discount}</span>
                </div>
                <h3 className="text-xl font-bold mb-2">{promo.title}</h3>
                <p className="text-white/80">{promo.bar}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Eventos Section */}
      <section className="bg-slate-700 py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-white">🎧 Eventos Noturnos</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                name: 'Festa Eletrônica - DJ Marcos',
                date: '01 de Março',
                time: '23:00',
                emoji: '🎧',
              },
              {
                name: 'Sertanejo ao Vivo',
                date: '02 de Março',
                time: '21:00',
                emoji: '🎸',
              },
              {
                name: 'Happy Hour Especial',
                date: '03 de Março',
                time: '18:00',
                emoji: '🥂',
              },
              {
                name: 'Noite de Karaokê',
                date: '04 de Março',
                time: '20:00',
                emoji: '🎤',
              },
            ].map((event, idx) => (
              <div key={idx} className="bg-slate-600 rounded-lg p-6 border border-slate-500 hover:shadow-lg transition">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-4xl">{event.emoji}</span>
                  <div>
                    <h3 className="text-lg font-bold text-white">{event.name}</h3>
                  </div>
                </div>
                <div className="flex items-center gap-4 text-gray-300">
                  <span>📅 {event.date}</span>
                  <span>🕐 {event.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-purple-600 to-pink-600 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Pronto para a noite?</h2>
          <p className="text-xl mb-8">Encontre os melhores bares, casas noturnas e eventos de Jataí</p>
          <Link
            href="/places"
            className="inline-block bg-white text-purple-600 px-8 py-4 rounded-lg font-bold hover:bg-gray-100 transition"
          >
            🔍 Começar Exploração
          </Link>
        </div>
      </section>
    </div>
  );
}
