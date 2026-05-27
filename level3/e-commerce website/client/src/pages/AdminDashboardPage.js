import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { toast } from 'react-toastify';

const AdminDashboardPage = () => {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({ name: '', description: '', category: '', price: '', countInStock: '', image: '' });
  const [loading, setLoading] = useState(false);

  const loadProducts = async () => {
    const { data } = await api.get('/products');
    setProducts(data);
  };

  useEffect(() => { loadProducts(); }, []);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      await api.post('/admin/products', { ...form, price: Number(form.price), countInStock: Number(form.countInStock) });
      toast.success('Product created');
      setForm({ name: '', description: '', category: '', price: '', countInStock: '', image: '' });
      loadProducts();
    } catch (error) {
      toast.error('Failed to create product');
    }
  };

  const handleDelete = async (id) => {
    await api.delete(`/admin/products/${id}`);
    toast.success('Product deleted');
    loadProducts();
  };

  return (
    <section style={{ padding: '24px', maxWidth: '1000px', margin: '0 auto' }}>
      <h1>Admin Dashboard</h1>
      <div style={{ display: 'grid', gap: '24px' }}>
        <form onSubmit={handleAdd} style={{ display: 'grid', gap: '12px', border: '1px solid #ddd', borderRadius: '12px', padding: '20px' }}>
          <h2>Add Product</h2>
          <input name="name" value={form.name} onChange={handleChange} placeholder="Name" required style={{ padding: '12px', borderRadius: '8px', border: '1px solid #ccc' }} />
          <input name="description" value={form.description} onChange={handleChange} placeholder="Description" required style={{ padding: '12px', borderRadius: '8px', border: '1px solid #ccc' }} />
          <input name="category" value={form.category} onChange={handleChange} placeholder="Category" required style={{ padding: '12px', borderRadius: '8px', border: '1px solid #ccc' }} />
          <input name="price" type="number" value={form.price} onChange={handleChange} placeholder="Price" required style={{ padding: '12px', borderRadius: '8px', border: '1px solid #ccc' }} />
          <input name="countInStock" type="number" value={form.countInStock} onChange={handleChange} placeholder="Stock count" required style={{ padding: '12px', borderRadius: '8px', border: '1px solid #ccc' }} />
          <input name="image" value={form.image} onChange={handleChange} placeholder="Image URL" required style={{ padding: '12px', borderRadius: '8px', border: '1px solid #ccc' }} />
          <button type="submit" style={{ padding: '12px', borderRadius: '8px', background: '#111', color: '#fff', border: 'none' }}>Create Product</button>
        </form>
        <div style={{ border: '1px solid #ddd', borderRadius: '12px', padding: '20px' }}>
          <h2>Product Management</h2>
          {products.length ? products.map((product) => (
            <div key={product._id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0', borderBottom: '1px solid #eee' }}>
              <span>{product.name}</span>
              <button onClick={() => handleDelete(product._id)} style={{ border: 'none', background: '#ff4d4f', color: '#fff', borderRadius: '8px', padding: '8px 12px', cursor: 'pointer' }}>Delete</button>
            </div>
          )) : <p>No products found.</p>}
        </div>
      </div>
    </section>
  );
};

export default AdminDashboardPage;
