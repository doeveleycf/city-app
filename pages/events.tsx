export default function Events() {
  const events = [
    {
      id: 1,
      name: 'Festa Eletrônica - DJ Marcos',
      date: '01 de Março',
      time: '23:00',
      location: 'Club Noturno Sunset',
      emoji: '🎧',
      attendees: 450,
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
      description: 'Festa exclusiva para universitários com entrada especial',
    },
    {
      id: 6,
      name: 'Noite de Samba',
      date: '06 de Março',
      time: '21:30',
      location: 'Choperia Jataí',
      emoji: '🎺',
      attendees: 300,
      description: 'Samba ao vivo com as melhores bandas da região',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800">
      <div className="container mx-auto px-4 py-12">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4 text-white">🎉 Eventos Noturnos de Jataí</h1>
          <p className="text-gray-300">
            Descubra os melhores eventos noturnos acontecendo agora em Jataí
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {events.map((event) => (
            <div
              key={event.id}
              className="bg-slate-700 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition border border-slate-600"
            >
              <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-6 text-white">
                <div className="text-5xl mb-4">{event.emoji}</div>
                <h3 className="text-2xl font-bold">{event.name}</h3>
              </div>
              <div className="p-6">
                <p className="text-gray-300 mb-4">{event.description}</p>
                
                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">📅</span>
                    <div>
                      <p className="font-bold text-white">{event.date}</p>
                      <p className="text-gray-400">{event.time}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">📍</span>
                    <p className="text-gray-300">{event.location}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">👥</span>
                    <p className="text-gray-300">{event.attendees.toLocaleString()} pessoas interessadas</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <button className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded hover:shadow-lg transition font-bold">
                    Participar
                  </button>
                  <button className="flex-1 border border-purple-500 text-purple-300 px-4 py-2 rounded hover:bg-slate-600 transition font-bold">
                    Compartilhar
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
