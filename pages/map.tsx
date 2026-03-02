import { useEffect, useState } from 'react';

interface Location {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  address: string;
  category: string;
  image: string;
}

export default function Map() {
  const [locations, setLocations] = useState<Location[]>([]);
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);
  const [mapUrl, setMapUrl] = useState('');

  useEffect(() => {
    // Buscar bares
    fetch('/api/places')
      .then((res) => res.json())
      .then((data) => {
        const places = data.map((p: any) => ({
          id: p.id,
          name: p.name,
          latitude: p.latitude,
          longitude: p.longitude,
          address: p.address,
          category: p.category,
          image: p.image,
        }));
        setLocations(places);
      });
  }, []);

  const handleLocationClick = (location: Location) => {
    setSelectedLocation(location);
    // Gerar URL do Google Maps
    const googleMapsUrl = `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3770.5!2d${location.longitude}!3d${location.latitude}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2z${location.latitude},${location.longitude}!5e0!3m2!1spt-BR!2sbr!4v1234567890`;
    setMapUrl(googleMapsUrl);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-white mb-8">🗺️ Mapa de Jataí</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Lista de Locais */}
          <div className="lg:col-span-1">
            <div className="bg-slate-700 rounded-lg p-6 border border-slate-600 max-h-96 overflow-y-auto">
              <h2 className="text-2xl font-bold text-white mb-4">Estabelecimentos</h2>
              <div className="space-y-3">
                {locations.map((location) => (
                  <button
                    key={location.id}
                    onClick={() => handleLocationClick(location)}
                    className={`w-full text-left p-4 rounded-lg transition ${
                      selectedLocation?.id === location.id
                        ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                        : 'bg-slate-600 text-gray-300 hover:bg-slate-500'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">{location.image}</span>
                      <div>
                        <p className="font-bold">{location.name}</p>
                        <p className="text-sm opacity-80">{location.address}</p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Mapa e Detalhes */}
          <div className="lg:col-span-2">
            {selectedLocation ? (
              <div className="space-y-6">
                {/* Mapa Interativo */}
                <div className="bg-slate-700 rounded-lg overflow-hidden border border-slate-600">
                  <iframe
                    width="100%"
                    height="400"
                    style={{ border: 0 }}
                    loading="lazy"
                    allowFullScreen
                    referrerPolicy="no-referrer-when-downgrade"
                    src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyDummyKey&q=${selectedLocation.latitude},${selectedLocation.longitude}`}
                  ></iframe>
                </div>

                {/* Detalhes do Local */}
                <div className="bg-slate-700 rounded-lg p-6 border border-slate-600">
                  <div className="flex items-center gap-4 mb-4">
                    <span className="text-6xl">{selectedLocation.image}</span>
                    <div>
                      <h2 className="text-3xl font-bold text-white">{selectedLocation.name}</h2>
                      <p className="text-gray-300 capitalize">{selectedLocation.category}</p>
                    </div>
                  </div>

                  <div className="space-y-3 text-gray-300">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">📍</span>
                      <span>{selectedLocation.address}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">🧭</span>
                      <span>
                        Latitude: {selectedLocation.latitude}, Longitude: {selectedLocation.longitude}
                      </span>
                    </div>
                  </div>

                  <div className="mt-6 flex gap-4">
                    <a
                      href={`https://www.google.com/maps/search/${selectedLocation.latitude},${selectedLocation.longitude}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-lg font-bold hover:shadow-lg transition text-center"
                    >
                      🗺️ Abrir no Google Maps
                    </a>
                    <button className="flex-1 border border-purple-500 text-purple-300 px-6 py-3 rounded-lg font-bold hover:bg-slate-600 transition">
                      📞 Ligar
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-slate-700 rounded-lg p-12 border border-slate-600 text-center">
                <p className="text-gray-300 text-lg">Selecione um estabelecimento para ver no mapa</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
