import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../services/api';
import Loader from '../components/Loader';
import { useCart } from '../context/CartContext';
import { toast } from 'react-toastify';

const ProductDetailsPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [qty, setQty] = useState(1);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      const { data } = await api.get(`/products/${id}`);
      setProduct(data);
      setLoading(false);
    };
    fetchProduct();
  }, [id]);

  const handleAdd = async () => {
    try {
      await addToCart(product._id, qty);
      toast.success('Added to cart');
      navigate('/cart');
    } catch (error) {
      toast.error('Unable to add item');
    }
  };

  if (loading) return <Loader />;
  if (!product) return <p>Product not found.</p>;

  return (
    <section style={{ padding: '24px', maxWidth: '1000px', margin: '0 auto', display: 'grid', gap: '24px', gridTemplateColumns: '1fr 1fr' }}>
      <div>
        <img src={product.image} alt={product.name} style={{ width: '100%', borderRadius: '14px' }} />
      </div>
      <div>
        <h1>{product.name}</h1>
        <p style={{ color: '#555' }}>{product.description}</p>
        <p style={{ fontWeight: 700, marginTop: '12px' }}>${product.price.toFixed(2)}</p>
        <p>Category: {product.category}</p>
        <p>Stock: {product.countInStock}</p>
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center', marginTop: '16px' }}>
          <label>Qty</label>
          <input type="number" min="1" max={product.countInStock} value={qty} onChange={(e) => setQty(Number(e.target.value))} style={{ width: '80px', padding: '10px', borderRadius: '8px', border: '1px solid #ccc' }} />
        </div>
        <button onClick={handleAdd} style={{ marginTop: '18px', padding: '12px 18px', background: '#111', color: '#fff', borderRadius: '8px', border: 'none' }}>Add to Cart</button>
      </div>
    </section>
  );
};

export default ProductDetailsPage;
