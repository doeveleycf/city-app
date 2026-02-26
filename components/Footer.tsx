export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="text-xl font-bold mb-4">🏙️ City App</h3>
            <p className="text-gray-400">Descubra sua cidade</p>
          </div>
          <div>
            <h4 className="font-bold mb-4">Navegação</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="/" className="hover:text-white">Home</a></li>
              <li><a href="/places" className="hover:text-white">Lugares</a></li>
              <li><a href="/events" className="hover:text-white">Eventos</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">Categorias</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-white">Museus</a></li>
              <li><a href="#" className="hover:text-white">Restaurantes</a></li>
              <li><a href="#" className="hover:text-white">Eventos</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">Contato</h4>
            <p className="text-gray-400">Email: info@cityapp.com</p>
            <p className="text-gray-400">Tel: (11) 9999-9999</p>
          </div>
        </div>
        <div className="border-t border-gray-700 pt-8 text-center text-gray-400">
          <p>&copy; 2026 City App. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
