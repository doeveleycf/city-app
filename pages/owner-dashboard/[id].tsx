import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

interface Owner {
  id: number;
  name: string;
  email: string;
  establishment_name: string;
  subscription_active: boolean;
  subscription_expires: string;
}

interface Product {
  id: number;
  owner_id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  available: boolean;
}

interface Promotion {
  id: number;
  owner_id: number;
  title: string;
  description: string;
  discount_percent: number;
  valid_from: string;
  valid_until: string;
  active: boolean;
}

interface DashboardData {
  owner: Owner;
  products: Product[];
  promotions: Promotion[];
  subscription: {
    active: boolean;
    expires: string;
    price: number;
    currency: string;
  };
}

export default function OwnerDashboard() {
  const router = useRouter();
  const { id } = router.query;
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
  const [activeTab, setActiveTab] = useState<'overview' | 'products' | 'promotions' | 'payment'>('overview');
  const [newProduct, setNewProduct] = useState({ name: '', description: '', price: '', category: '' });
  const [newPromotion, setNewPromotion] = useState({
    title: '',
    description: '',
    discount_percent: '',
    valid_from: '',
    valid_until: '',
  });

  useEffect(() => {
    if (!id) return;

    fetch(`/api/owner/${id}/dashboard`)
      .then((res) => res.json())
      .then((data) => setDashboardData(data))
      .catch((err) => console.error(err));
  }, [id]);

  const handleAddProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!id) return;

    try {
      const response = await fetch(`/api/owner/${id}/products`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...newProduct,
          price: parseFloat(newProduct.price),
        }),
      });

      if (response.ok) {
        const product = await response.json();
        setDashboardData((prev) => {
          if (!prev) return null;
          return {
            ...prev,
            products: [...prev.products, product],
          };
        });
        setNewProduct({ name: '', description: '', price: '', category: '' });
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleAddPromotion = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!id) return;

    try {
      const response = await fetch(`/api/owner/${id}/promotions`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...newPromotion,
          discount_percent: parseInt(newPromotion.discount_percent),
        }),
      });

      if (response.ok) {
        const promotion = await response.json();
        setDashboardData((prev) => {
          if (!prev) return null;
          return {
            ...prev,
            promotions: [...prev.promotions, promotion],
          };
        });
        setNewPromotion({
          title: '',
          description: '',
          discount_percent: '',
          valid_from: '',
          valid_until: '',
        });
      }
    } catch (err) {
      console.error(err);
    }
  };

  if (!dashboardData) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 flex items-center justify-center">
        <p className="text-white text-xl">Carregando...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-4xl font-bold text-white mb-2">🏪 {dashboardData.owner.establishment_name}</h1>
              <p className="text-gray-300">Bem-vindo, {dashboardData.owner.name}!</p>
            </div>
            <button
              onClick={() => {
                localStorage.removeItem('owner');
                router.push('/owner-login');
              }}
              className="bg-red-500/20 text-red-300 px-6 py-2 rounded-lg font-bold hover:bg-red-500/30 transition"
            >
              Sair
            </button>
          </div>

          {/* Subscription Status */}
          <div className={`p-4 rounded-lg ${dashboardData.subscription.active ? 'bg-green-500/20 border border-green-500' : 'bg-red-500/20 border border-red-500'}`}>
            <p className={`font-bold ${dashboardData.subscription.active ? 'text-green-300' : 'text-red-300'}`}>
              {dashboardData.subscription.active
                ? `✅ Assinatura ativa até ${dashboardData.subscription.expires}`
                : '❌ Assinatura inativa'}
            </p>
          </div>
        </div>

        {/* Tabs */}
        <div className="mb-8 flex gap-4 border-b border-slate-600">
          {(['overview', 'products', 'promotions', 'payment'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-4 font-bold transition ${
                activeTab === tab
                  ? 'text-purple-400 border-b-2 border-purple-500'
                  : 'text-gray-400 hover:text-gray-300'
              }`}
            >
              {tab === 'overview' && '📊 Visão Geral'}
              {tab === 'products' && '📦 Produtos'}
              {tab === 'promotions' && '🎉 Promoções'}
              {tab === 'payment' && '💳 Pagamento'}
            </button>
          ))}
        </div>

        {/* Content */}
        <div>
          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-slate-700 rounded-lg p-6 border border-slate-600">
                <p className="text-gray-400 mb-2">Produtos</p>
                <p className="text-4xl font-bold text-purple-400">{dashboardData.products.length}</p>
              </div>
              <div className="bg-slate-700 rounded-lg p-6 border border-slate-600">
                <p className="text-gray-400 mb-2">Promoções Ativas</p>
                <p className="text-4xl font-bold text-pink-400">{dashboardData.promotions.filter((p) => p.active).length}</p>
              </div>
              <div className="bg-slate-700 rounded-lg p-6 border border-slate-600">
                <p className="text-gray-400 mb-2">Assinatura</p>
                <p className="text-2xl font-bold text-green-400">
                  {dashboardData.subscription.active ? 'Ativa' : 'Inativa'}
                </p>
              </div>
            </div>
          )}

          {/* Products Tab */}
          {activeTab === 'products' && (
            <div className="space-y-8">
              {/* Add Product Form */}
              <div className="bg-slate-700 rounded-lg p-6 border border-slate-600">
                <h2 className="text-2xl font-bold text-white mb-4">Adicionar Produto</h2>
                <form onSubmit={handleAddProduct} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                      type="text"
                      placeholder="Nome do produto"
                      value={newProduct.name}
                      onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                      className="px-4 py-2 rounded-lg bg-slate-600 text-white placeholder-gray-400 border border-slate-500 focus:outline-none focus:border-purple-500"
                      required
                    />
                    <input
                      type="text"
                      placeholder="Categoria"
                      value={newProduct.category}
                      onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
                      className="px-4 py-2 rounded-lg bg-slate-600 text-white placeholder-gray-400 border border-slate-500 focus:outline-none focus:border-purple-500"
                      required
                    />
                  </div>
                  <textarea
                    placeholder="Descrição"
                    value={newProduct.description}
                    onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                    className="w-full px-4 py-2 rounded-lg bg-slate-600 text-white placeholder-gray-400 border border-slate-500 focus:outline-none focus:border-purple-500"
                    required
                  ></textarea>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                      type="number"
                      placeholder="Preço (R$)"
                      value={newProduct.price}
                      onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                      className="px-4 py-2 rounded-lg bg-slate-600 text-white placeholder-gray-400 border border-slate-500 focus:outline-none focus:border-purple-500"
                      step="0.01"
                      required
                    />
                    <button
                      type="submit"
                      className="bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold py-2 rounded-lg hover:shadow-lg transition"
                    >
                      Adicionar Produto
                    </button>
                  </div>
                </form>
              </div>

              {/* Products List */}
              <div>
                <h2 className="text-2xl font-bold text-white mb-4">Produtos Cadastrados</h2>
                <div className="space-y-4">
                  {dashboardData.products.map((product) => (
                    <div key={product.id} className="bg-slate-700 rounded-lg p-6 border border-slate-600">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-xl font-bold text-white">{product.name}</h3>
                          <p className="text-gray-400">{product.description}</p>
                          <p className="text-gray-400 text-sm mt-2">{product.category}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-3xl font-bold text-green-400">R$ {product.price.toFixed(2)}</p>
                          <p className={`text-sm font-bold ${product.available ? 'text-green-400' : 'text-red-400'}`}>
                            {product.available ? '✅ Disponível' : '❌ Indisponível'}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Promotions Tab */}
          {activeTab === 'promotions' && (
            <div className="space-y-8">
              {/* Add Promotion Form */}
              <div className="bg-slate-700 rounded-lg p-6 border border-slate-600">
                <h2 className="text-2xl font-bold text-white mb-4">Adicionar Promoção do Dia</h2>
                <form onSubmit={handleAddPromotion} className="space-y-4">
                  <input
                    type="text"
                    placeholder="Título da promoção"
                    value={newPromotion.title}
                    onChange={(e) => setNewPromotion({ ...newPromotion, title: e.target.value })}
                    className="w-full px-4 py-2 rounded-lg bg-slate-600 text-white placeholder-gray-400 border border-slate-500 focus:outline-none focus:border-purple-500"
                    required
                  />
                  <textarea
                    placeholder="Descrição"
                    value={newPromotion.description}
                    onChange={(e) => setNewPromotion({ ...newPromotion, description: e.target.value })}
                    className="w-full px-4 py-2 rounded-lg bg-slate-600 text-white placeholder-gray-400 border border-slate-500 focus:outline-none focus:border-purple-500"
                    required
                  ></textarea>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                      type="number"
                      placeholder="Desconto (%)"
                      value={newPromotion.discount_percent}
                      onChange={(e) => setNewPromotion({ ...newPromotion, discount_percent: e.target.value })}
                      className="px-4 py-2 rounded-lg bg-slate-600 text-white placeholder-gray-400 border border-slate-500 focus:outline-none focus:border-purple-500"
                      max="100"
                      required
                    />
                    <input
                      type="time"
                      value={newPromotion.valid_from}
                      onChange={(e) => setNewPromotion({ ...newPromotion, valid_from: e.target.value })}
                      className="px-4 py-2 rounded-lg bg-slate-600 text-white placeholder-gray-400 border border-slate-500 focus:outline-none focus:border-purple-500"
                      required
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                      type="time"
                      value={newPromotion.valid_until}
                      onChange={(e) => setNewPromotion({ ...newPromotion, valid_until: e.target.value })}
                      className="px-4 py-2 rounded-lg bg-slate-600 text-white placeholder-gray-400 border border-slate-500 focus:outline-none focus:border-purple-500"
                      required
                    />
                    <button
                      type="submit"
                      className="bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold py-2 rounded-lg hover:shadow-lg transition"
                    >
                      Adicionar Promoção
                    </button>
                  </div>
                </form>
              </div>

              {/* Promotions List */}
              <div>
                <h2 className="text-2xl font-bold text-white mb-4">Promoções Cadastradas</h2>
                <div className="space-y-4">
                  {dashboardData.promotions.map((promotion) => (
                    <div key={promotion.id} className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-xl font-bold text-white">{promotion.title}</h3>
                          <p className="text-white/80">{promotion.description}</p>
                          <p className="text-white/60 text-sm mt-2">
                            De {promotion.valid_from} até {promotion.valid_until}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-4xl font-bold text-white">{promotion.discount_percent}%</p>
                          <p className={`text-sm font-bold ${promotion.active ? 'text-green-300' : 'text-red-300'}`}>
                            {promotion.active ? '✅ Ativa' : '❌ Inativa'}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Payment Tab */}
          {activeTab === 'payment' && (
            <div className="space-y-6">
              <div className="bg-slate-700 rounded-lg p-8 border border-slate-600 text-center">
                <h2 className="text-3xl font-bold text-white mb-4">💳 Plano de Assinatura</h2>
                <p className="text-gray-300 mb-6">Acesso completo ao painel do dono</p>

                <div className="bg-slate-600 rounded-lg p-6 mb-6">
                  <p className="text-gray-400 mb-2">Preço Mensal</p>
                  <p className="text-5xl font-bold text-green-400">
                    R$ {dashboardData.subscription.price.toFixed(2)}
                  </p>
                  <p className="text-gray-400 text-sm mt-2">por mês</p>
                </div>

                <div className="text-left bg-slate-600 rounded-lg p-6 mb-6">
                  <h3 className="font-bold text-white mb-4">Inclui:</h3>
                  <ul className="space-y-2 text-gray-300">
                    <li>✅ Cadastro de produtos ilimitado</li>
                    <li>✅ Promoções do dia</li>
                    <li>✅ Gerenciamento de preços</li>
                    <li>✅ Visibilidade no mapa</li>
                    <li>✅ Suporte prioritário</li>
                  </ul>
                </div>

                {dashboardData.subscription.active ? (
                  <div className="bg-green-500/20 border border-green-500 rounded-lg p-4">
                    <p className="text-green-300 font-bold">✅ Assinatura ativa até {dashboardData.subscription.expires}</p>
                  </div>
                ) : (
                  <button
                    onClick={() => {
                      if (id) {
                        fetch(`/api/payment/subscribe`, {
                          method: 'POST',
                          headers: { 'Content-Type': 'application/json' },
                          body: JSON.stringify({
                            owner_id: id,
                            payment_method: 'credit_card',
                          }),
                        })
                          .then((res) => res.json())
                          .then((data) => {
                            if (data.success) {
                              window.location.reload();
                            }
                          });
                      }
                    }}
                    className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold py-4 rounded-lg hover:shadow-lg transition text-lg"
                  >
                    Ativar Assinatura Agora
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
