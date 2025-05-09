'use client';
import { useState } from 'react';
import axios from 'axios';
import Button from './Button';
import Preloader from './Preloader';

export default function ProductForm({ onAdd }) {
  const [form, setForm] = useState({
    name: '',
    price: '',
    description: '',
    imageFile: null
  });
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState('');

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setForm({ ...form, imageFile: file });

    const reader = new FileReader();
    reader.onloadend = () => setPreview(reader.result);
    reader.readAsDataURL(file);
  };

  const uploadImageToCloudinary = async (file) => {
    const reader = new FileReader();

    return new Promise((resolve, reject) => {
      reader.onloadend = async () => {
        try {
          const base64 = reader.result;

          const { data } = await axios.post('/api/upload', { image: base64 });

          resolve(data.url);
        } catch (err) {
          reject(err.response?.data?.message || err.message);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      let imageUrl = '';
      if (form.imageFile) {
        imageUrl = await uploadImageToCloudinary(form.imageFile);
      }
      const { name, price, description } = form;
      const { data: productData } = await axios.post('/api/products', {
        name,
        price: parseFloat(price),
        description,
        imageUrl
      });

      onAdd(productData);
      setForm({ name: '', price: '', description: '', imageFile: null });
      setPreview('');
    } catch (err) {
      alert(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex justify-center">
      {loading && <Preloader />}
      <form onSubmit={handleSubmit} className="md:w-3xl space-y-4 bg-secondary p-6 rounded-lg shadow border border-primary">
        <h2 className="text-xl font-semibold text-primary">Add Product</h2>

        <input
          type="text"
          placeholder="Product Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
          className="w-full px-3 py-2 border border-primary rounded bg-secondary text-primary"
        />

        <input
          type="number"
          placeholder="Price (₹)"
          value={form.price}
          onChange={(e) => setForm({ ...form, price: e.target.value })}
          required
          className="w-full px-3 py-2 border border-primary rounded bg-secondary text-primary"
        />


        <textarea
          rows="3"
          placeholder="Description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          required
          className="w-full px-3 py-2 border border-primary rounded bg-secondary text-primary"
        />

        <div>
          <label className="block mb-1 text-sm font-medium text-primary">Image</label>
          <div className="flex items-center gap-4">
            <div className="w-32 h-32 border border-primary rounded flex items-center justify-center bg-secondary">
              {preview ? (
                <img
                  src={preview}
                  alt="Preview"
                  className="max-w-full max-h-full object-contain"
                />
              ) : (
                <span className="text-primary text-sm">No Image</span>
              )}
            </div>
            <label className="cursor-pointer text-sm text-indigo-600 dark:text-indigo-400">
              Choose Image
              <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
            </label>
          </div>
        </div>

        <Button type="submit" variant="primary" fullWidth disabled={loading}>
          {loading ? 'Submitting...' : 'Submit Product'}
        </Button>
      </form>
    </div>
  );
}