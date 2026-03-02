import { useState } from 'react';
import { useRouter } from 'next/router';

export default function OwnerLogin() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [isRegister, setIsRegister] = useState(false);
  const [registerData, setRegisterData] = useState({
    name: '',
    email: '',
    password: '',
    establishment_name: '',
    phone: '',
  });

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/owner/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error('Credenciais inválidas');
      }

      const owner = await response.json();
      localStorage.setItem('owner', JSON.stringify(owner));
      router.push(`/owner-dashboard/${owner.id}`);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/owner/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(registerData),
      });

      if (!response.ok) {
        throw new Error('Erro ao registrar');
      }

      const owner = await response.json();
      setError('');
      setIsRegister(false);
      setEmail(registerData.email);
      setPassword(registerData.password);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-md">
        <div className="bg-slate-700 rounded-lg p-8 border border-slate-600 shadow-lg">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-white mb-2">🏪 City App</h1>
            <p className="text-gray-300">Painel do Dono</p>
          </div>

          {error && (
            <div className="bg-red-500/20 border border-red-500 text-red-300 px-4 py-3 rounded-lg mb-6">
              {error}
            </div>
          )}

          {!isRegister ? (
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-gray-300 font-bold mb-2">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg bg-slate-600 text-white placeholder-gray-400 border border-slate-500 focus:outline-none focus:border-purple-500"
                  placeholder="seu@email.com"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-300 font-bold mb-2">Senha</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg bg-slate-600 text-white placeholder-gray-400 border border-slate-500 focus:outline-none focus:border-purple-500"
                  placeholder="••••••••"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold py-3 rounded-lg hover:shadow-lg transition disabled:opacity-50"
              >
                {loading ? 'Entrando...' : 'Entrar'}
              </button>

              <p className="text-center text-gray-300">
                Não tem conta?{' '}
                <button
                  type="button"
                  onClick={() => setIsRegister(true)}
                  className="text-purple-400 hover:text-pink-400 font-bold"
                >
                  Registre-se
                </button>
              </p>
            </form>
          ) : (
            <form onSubmit={handleRegister} className="space-y-4">
              <div>
                <label className="block text-gray-300 font-bold mb-2">Nome</label>
                <input
                  type="text"
                  value={registerData.name}
                  onChange={(e) => setRegisterData({ ...registerData, name: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg bg-slate-600 text-white placeholder-gray-400 border border-slate-500 focus:outline-none focus:border-purple-500"
                  placeholder="Seu nome"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-300 font-bold mb-2">Email</label>
                <input
                  type="email"
                  value={registerData.email}
                  onChange={(e) => setRegisterData({ ...registerData, email: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg bg-slate-600 text-white placeholder-gray-400 border border-slate-500 focus:outline-none focus:border-purple-500"
                  placeholder="seu@email.com"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-300 font-bold mb-2">Senha</label>
                <input
                  type="password"
                  value={registerData.password}
                  onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg bg-slate-600 text-white placeholder-gray-400 border border-slate-500 focus:outline-none focus:border-purple-500"
                  placeholder="••••••••"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-300 font-bold mb-2">Nome do Estabelecimento</label>
                <input
                  type="text"
                  value={registerData.establishment_name}
                  onChange={(e) => setRegisterData({ ...registerData, establishment_name: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg bg-slate-600 text-white placeholder-gray-400 border border-slate-500 focus:outline-none focus:border-purple-500"
                  placeholder="Seu bar/restaurante"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-300 font-bold mb-2">Telefone</label>
                <input
                  type="tel"
                  value={registerData.phone}
                  onChange={(e) => setRegisterData({ ...registerData, phone: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg bg-slate-600 text-white placeholder-gray-400 border border-slate-500 focus:outline-none focus:border-purple-500"
                  placeholder="(64) 99999-9999"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold py-3 rounded-lg hover:shadow-lg transition disabled:opacity-50"
              >
                {loading ? 'Registrando...' : 'Registrar'}
              </button>

              <p className="text-center text-gray-300">
                Já tem conta?{' '}
                <button
                  type="button"
                  onClick={() => setIsRegister(false)}
                  className="text-purple-400 hover:text-pink-400 font-bold"
                >
                  Faça login
                </button>
              </p>
            </form>
          )}

          <div className="mt-8 pt-8 border-t border-slate-600">
            <p className="text-gray-400 text-sm text-center">
              Dados de teste: jose@botecodoze.com / senha123
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
