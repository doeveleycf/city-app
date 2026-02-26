export default function About() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Sobre o City App</h1>

        <div className="bg-blue-50 rounded-lg p-8 mb-8">
          <p className="text-lg text-gray-700 leading-relaxed">
            City App é uma plataforma inovadora criada para ajudar você a descobrir os melhores
            lugares, eventos e experiências da sua cidade. Nosso objetivo é conectar pessoas com
            as melhores atrações locais.
          </p>
        </div>

        <h2 className="text-2xl font-bold mb-4">Nossa Missão</h2>
        <p className="text-gray-700 mb-8">
          Facilitar a descoberta de lugares incríveis e eventos interessantes, tornando a
          exploração da cidade mais fácil e divertida para todos.
        </p>

        <h2 className="text-2xl font-bold mb-4">O que oferecemos</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg p-6 shadow-md">
            <div className="text-4xl mb-4">🏛️</div>
            <h3 className="font-bold mb-2">Museus e Cultura</h3>
            <p className="text-gray-600">Descubra os melhores museus e espaços culturais</p>
          </div>
          <div className="bg-white rounded-lg p-6 shadow-md">
            <div className="text-4xl mb-4">🍽️</div>
            <h3 className="font-bold mb-2">Restaurantes</h3>
            <p className="text-gray-600">Encontre os melhores lugares para comer</p>
          </div>
          <div className="bg-white rounded-lg p-6 shadow-md">
            <div className="text-4xl mb-4">🎭</div>
            <h3 className="font-bold mb-2">Eventos</h3>
            <p className="text-gray-600">Fique por dentro dos eventos acontecendo agora</p>
          </div>
        </div>

        <h2 className="text-2xl font-bold mb-4">Por que usar City App?</h2>
        <ul className="space-y-3 mb-8">
          <li className="flex items-center gap-3">
            <span className="text-green-500 text-2xl">✓</span>
            <span>Recomendações personalizadas baseadas em seus interesses</span>
          </li>
          <li className="flex items-center gap-3">
            <span className="text-green-500 text-2xl">✓</span>
            <span>Avaliações e comentários de outros usuários</span>
          </li>
          <li className="flex items-center gap-3">
            <span className="text-green-500 text-2xl">✓</span>
            <span>Informações atualizadas sobre horários e preços</span>
          </li>
          <li className="flex items-center gap-3">
            <span className="text-green-500 text-2xl">✓</span>
            <span>Mapa interativo com localização dos lugares</span>
          </li>
          <li className="flex items-center gap-3">
            <span className="text-green-500 text-2xl">✓</span>
            <span>Notificações sobre novos eventos</span>
          </li>
        </ul>

        <h2 className="text-2xl font-bold mb-4">Contato</h2>
        <div className="bg-gray-50 rounded-lg p-6">
          <p className="mb-2"><strong>Email:</strong> info@cityapp.com</p>
          <p className="mb-2"><strong>Telefone:</strong> (11) 9999-9999</p>
          <p><strong>Endereço:</strong> São Paulo, SP - Brasil</p>
        </div>
      </div>
    </div>
  );
}
