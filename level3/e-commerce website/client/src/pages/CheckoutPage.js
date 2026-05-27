import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);

const CheckoutForm = () => {
  const { cart, setCart } = useCart();
  const { user } = useAuth();
  const stripe = useStripe();
  const elements = useElements();
  const [shipping, setShipping] = useState({ address: '', city: '', postalCode: '', country: '' });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  const handleChange = (e) => setShipping({ ...shipping, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;
    if (!cart.length) {
      toast.error('Cart is empty');
      return;
    }

    setLoading(true);
    try {
      const { data } = await api.post('/payments/intent', { amount: subtotal });
      const cardElement = elements.getElement(CardElement);
      const result = await stripe.confirmCardPayment(data.clientSecret, {
        payment_method: {
          card: cardElement,
          billing_details: {
            name: user?.name || 'Guest',
            email: user?.email,
          },
        },
      });

      if (result.error) {
        toast.error(result.error.message || 'Payment failed');
        setLoading(false);
        return;
      }

      if (result.paymentIntent.status === 'succeeded') {
        const orderPayload = {
          orderItems: cart,
          shippingAddress: shipping,
          paymentMethod: 'Stripe',
          totalPrice: subtotal,
        };
        const { data: order } = await api.post('/orders', orderPayload);
        await api.post('/payments/record', {
          orderId: order._id,
          paymentId: result.paymentIntent.id,
          amount: subtotal,
          status: result.paymentIntent.status,
          currency: result.paymentIntent.currency,
        });
        setCart([]);
        localStorage.removeItem('cart');
        toast.success('Payment successful and order created');
        navigate('/profile');
      }
    } catch (error) {
      toast.error('Checkout failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section style={{ padding: '24px', maxWidth: '900px', margin: '0 auto' }}>
      <h1>Checkout</h1>
      <div style={{ display: 'grid', gap: '24px', gridTemplateColumns: '1fr 1fr' }}>
        <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '16px' }}>
          <input name="address" value={shipping.address} onChange={handleChange} placeholder="Address" required style={{ padding: '12px', borderRadius: '8px', border: '1px solid #ccc' }} />
          <input name="city" value={shipping.city} onChange={handleChange} placeholder="City" required style={{ padding: '12px', borderRadius: '8px', border: '1px solid #ccc' }} />
          <input name="postalCode" value={shipping.postalCode} onChange={handleChange} placeholder="Postal Code" required style={{ padding: '12px', borderRadius: '8px', border: '1px solid #ccc' }} />
          <input name="country" value={shipping.country} onChange={handleChange} placeholder="Country" required style={{ padding: '12px', borderRadius: '8px', border: '1px solid #ccc' }} />
          <div style={{ padding: '14px', border: '1px solid #ccc', borderRadius: '8px' }}>
            <CardElement options={{ style: { base: { fontSize: '16px', color: '#111', '::placeholder': { color: '#aab7c4' } } } }} />
          </div>
          <button disabled={loading || !stripe} type="submit" style={{ padding: '12px', background: '#111', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>{loading ? 'Processing...' : 'Pay Now'}</button>
        </form>
        <div style={{ border: '1px solid #ddd', borderRadius: '12px', padding: '20px' }}>
          <h2>Order Summary</h2>
          {cart.map((item) => (
            <div key={item.product} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
              <span>{item.name} x {item.qty}</span>
              <strong>${(item.price * item.qty).toFixed(2)}</strong>
            </div>
          ))}
          <hr />
          <h3>Total: ${subtotal.toFixed(2)}</h3>
        </div>
      </div>
    </section>
  );
};

const CheckoutPage = () => (
  <Elements stripe={stripePromise}>
    <CheckoutForm />
  </Elements>
);

export default CheckoutPage;
