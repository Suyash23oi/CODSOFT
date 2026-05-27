import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { toast } from 'react-toastify';

const CartPage = () => {
  const { cart, updateCart, removeFromCart } = useCart();
  const navigate = useNavigate();

  const handleQty = (productId, qty) => {
    const updated = cart.map((item) => item.product === productId ? { ...item, qty } : item);
    updateCart(updated);
  };

  const handleRemove = async (id) => {
    await removeFromCart(id);
    toast.info('Removed from cart');
  };

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  return (
    <section style={{ padding: '24px', maxWidth: '1000px', margin: '0 auto' }}>
      <h1>Shopping Cart</h1>
      {cart.length === 0 ? (
        <div>
          <p>Your cart is empty.</p>
          <Link to="/products" style={{ color: '#111', textDecoration: 'underline' }}>Browse products</Link>
        </div>
      ) : (
        <>
          <div style={{ display: 'grid', gap: '20px' }}>
            {cart.map((item) => (
              <div key={item.product} style={{ display: 'flex', gap: '16px', alignItems: 'center', border: '1px solid #ddd', padding: '16px', borderRadius: '10px' }}>
                <img src={item.image} alt={item.name} style={{ width: '120px', height: '120px', objectFit: 'cover', borderRadius: '10px' }} />
                <div style={{ flex: 1 }}>
                  <h3>{item.name}</h3>
                  <p>${item.price.toFixed(2)}</p>
                  <input type="number" min="1" value={item.qty} onChange={(e) => handleQty(item.product, Number(e.target.value))} style={{ width: '80px', padding: '8px', borderRadius: '6px' }} />
                </div>
                <button onClick={() => handleRemove(item.product)} style={{ border: 'none', background: '#ff4d4f', color: '#fff', padding: '10px 14px', borderRadius: '8px', cursor: 'pointer' }}>Remove</button>
              </div>
            ))}
          </div>
          <div style={{ marginTop: '24px', textAlign: 'right' }}>
            <p style={{ fontSize: '1.2rem', fontWeight: 700 }}>Subtotal: ${subtotal.toFixed(2)}</p>
            <button onClick={() => navigate('/checkout')} style={{ padding: '12px 20px', background: '#111', color: '#fff', borderRadius: '8px', border: 'none', cursor: 'pointer' }}>Proceed to Checkout</button>
          </div>
        </>
      )}
    </section>
  );
};

export default CartPage;
