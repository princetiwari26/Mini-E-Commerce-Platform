'use client';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { RefreshCw } from 'lucide-react';
import ProductCard from './ProductCard';
import Preloader from './Preloader';
import Button from './Button';

export default function ProductList({ newProduct }) {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await axios.get('/api/products');
      setProducts(res.data);
      setError(null);
    } catch (err) {
      setError(err?.response?.data?.message || err.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    if (newProduct) {
      setProducts(prev => [newProduct, ...prev]);
    }
  }, [newProduct]);

  const filtered = products.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.description.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="relative">
      {loading && <Preloader />}

      <div className="bg-secondary p-2 rounded-xl shadow-sm border border-primary">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-6">
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <h2 className="text-2xl font-bold text-primary">Product Inventory</h2>
              <button
                onClick={fetchProducts}
                className="p-2 rounded-full hover:bg-primary/10 text-primary cursor-pointer"
                title="Refresh"
              >
                <RefreshCw className="w-5 h-5" />
              </button>
            </div>
            <p className="text-sm text-primary mt-1">
              Showing {filtered.length} {products.length === 1 ? 'product' : 'products'}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
            <input
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full px-4 py-2 border border-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-secondary text-primary"
            />
          </div>
        </div>

        {error ? (
          <div className="text-center py-8">
            <p className="text-red-500 mb-2">Error: {error}</p>
            <Button onClick={fetchProducts}>Retry</Button>
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-secondary text-lg">
              {search ? 'No matching products found.' : 'No products available.'}
            </p>
            {search && (
              <Button onClick={() => setSearch('')} variant="secondary" className="mt-3">
                Clear Search
              </Button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map(p => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}