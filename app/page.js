'use client';
import { useState } from 'react';
import ProductForm from '../components/ProductForm';
import ProductList from '../components/ProductList';
import Button from '../components/Button';
import { useTheme } from '../context/ThemeContext';
import { Sun, Moon } from 'lucide-react';

export default function HomePage() {
  const [activeTab, setActiveTab] = useState('submit');
  const [newProduct, setNewProduct] = useState(null);
  const { theme, toggleTheme } = useTheme();

  return (
    <main className="min-h-screen bg-primary">
      <div className="max-w-7xl mx-auto px-2 md:px-4 pb-5">
        <div className="text-center my-8 px-2">
          <h1 className="text-4xl font-bold text-primary mb-2">E-Commerce Website</h1>
          <p className="text-primary mb-2">Manage your product inventory efficiently</p>
          <Button
            onClick={toggleTheme}
            variant={theme === 'dark' ? 'primary' : 'secondary'}
            className="mx-auto flex items-center gap-2 w-auto px-3"
          >
            {theme === 'dark' ? (
              <>
                <Sun size={18} />
              </>
            ) : (
              <>
                <Moon size={18} />
              </>
            )}
          </Button>
        </div>

        <div className="flex justify-center mb-4">
          <div className="md:w-xl flex flex-row gap-2 bg-secondary p-1 rounded-lg shadow-sm border border-primary w-full max-w-md">
            <Button
              onClick={() => setActiveTab('submit')}
              variant={activeTab === 'submit' ? 'primary' : 'secondary'}
              className="flex-1"
            >
              Add New Product
            </Button>
            <Button
              onClick={() => setActiveTab('view')}
              variant={activeTab === 'view' ? 'primary' : 'secondary'}
              className="flex-1"
            >
              View Products
            </Button>
          </div>
        </div>

        {activeTab === 'submit' ? (
          <ProductForm
            onAdd={(product) => {
              setNewProduct(product);
              setActiveTab('view');
            }}
          />
        ) : (
          <ProductList newProduct={newProduct} />
        )}
      </div>
    </main>
  );
}