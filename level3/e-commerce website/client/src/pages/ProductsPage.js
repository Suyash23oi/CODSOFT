import React, { useEffect, useState } from 'react';
import api from '../services/api';
import Loader from '../components/Loader';
import ProductCard from '../components/ProductCard';

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [keyword, setKeyword] = useState('');
  const [category, setCategory] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchProducts = async () => {
    setLoading(true);
    const query = `?keyword=${encodeURIComponent(keyword)}&category=${encodeURIComponent(category)}`;
    const { data } = await api.get(`/products${query}`);
    setProducts(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchProducts();
  };

  return (
    <section style={{ padding: '24px', maxWidth: '1200px', margin: '0 auto' }}>
      <h1>Products</h1>
      <form onSubmit={handleSearch} style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginBottom: '20px' }}>
        <input value={keyword} onChange={(e) => setKeyword(e.target.value)} placeholder="Search products" style={{ flex: '1 1 220px', padding: '10px', borderRadius: '8px', border: '1px solid #ccc' }} />
        <select value={category} onChange={(e) => setCategory(e.target.value)} style={{ padding: '10px', borderRadius: '8px', border: '1px solid #ccc' }}>
          <option value="">All categories</option>
          <option value="electronics">Electronics</option>
          <option value="fashion">Fashion</option>
          <option value="home">Home</option>
          <option value="books">Books</option>
        </select>
        <button type="submit" style={{ padding: '10px 18px', borderRadius: '8px', background: '#111', color: '#fff' }}>Filter</button>
      </form>
      {loading ? <Loader /> : (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
          {products.length ? products.map((product) => <ProductCard key={product._id} product={product} />) : <p>No products found.</p>}
        </div>
      )}
    </section>
  );
};

export default ProductsPage;
