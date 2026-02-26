export default function Events() {
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
    {
      id: 3,
      name: 'Mercado de Artesanato',
      date: '22 de Março',
      time: '09:00',
      location: 'Praça Principal',
      emoji: '🛍️',
      attendees: 1500,
    },
    {
      id: 4,
      name: 'Cinema ao Ar Livre',
      date: '25 de Março',
      time: '20:00',
      location: 'Parque da Cidade',
      emoji: '🎬',
      attendees: 1200,
    },
    {
      id: 5,
      name: 'Corrida Beneficente',
      date: '28 de Março',
      time: '07:00',
      location: 'Avenida Principal',
      emoji: '🏃',
      attendees: 3000,
    },
    {
      id: 6,
      name: 'Workshop de Culinária',
      date: '30 de Março',
      time: '14:00',
      location: 'Centro Culinário',
      emoji: '👨‍🍳',
      attendees: 400,
    },
  ];

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4">Eventos da Cidade</h1>
        <p className="text-gray-600">
          Descubra os eventos mais interessantes acontecendo agora
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {events.map((event) => (
          <div
            key={event.id}
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition"
          >
            <div className="bg-gradient-to-r from-purple-400 to-pink-400 p-6 text-white">
              <div className="text-5xl mb-4">{event.emoji}</div>
              <h3 className="text-2xl font-bold">{event.name}</h3>
            </div>
            <div className="p-6">
              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">📅</span>
                  <div>
                    <p className="font-bold">{event.date}</p>
                    <p className="text-gray-600">{event.time}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-2xl">📍</span>
                  <p>{event.location}</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-2xl">👥</span>
                  <p>{event.attendees.toLocaleString()} pessoas interessadas</p>
                </div>
              </div>

              <div className="flex gap-4">
                <button className="flex-1 bg-primary text-white px-4 py-2 rounded hover:bg-blue-700 transition">
                  Participar
                </button>
                <button className="flex-1 border border-primary text-primary px-4 py-2 rounded hover:bg-blue-50 transition">
                  Compartilhar
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
