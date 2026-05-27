import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import Loader from '../components/Loader';
import ProductCard from '../components/ProductCard';

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      const { data } = await api.get('/products?keyword=');
      setProducts(data.slice(0, 6));
      setLoading(false);
    };
    fetchProducts();
  }, []);

  return (
    <section style={{ padding: '24px', maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '24px', marginBottom: '24px' }}>
        <div style={{ flex: '1 1 320px', background: '#f5f5f5', padding: '24px', borderRadius: '16px' }}>
          <h1>Welcome to ShopMate</h1>
          <p>Discover trending products, manage your cart, and complete checkout securely.</p>
          <Link to="/products" style={{ display: 'inline-block', marginTop: '16px', padding: '10px 18px', background: '#111', color: '#fff', borderRadius: '8px' }}>Shop Now</Link>
        </div>
        <div style={{ flex: '1 1 320px', minHeight: '220px', borderRadius: '16px', background: 'linear-gradient(135deg,#4e54c8,#8f94fb)', color: '#fff', padding: '24px' }}>
          <h2>Fast checkout</h2>
          <p>Login, add items to cart and pay with Stripe integration for a smooth shopping experience.</p>
        </div>
      </div>
      <h2>Featured Products</h2>
      {loading ? <Loader /> : (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
          {products.map((product) => <ProductCard key={product._id} product={product} />)}
        </div>
      )}
    </section>
  );
};

export default HomePage;
