import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';
import Loader from '../components/Loader';

const ProfilePage = () => {
  const { user, setUser } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadOrders = async () => {
      setLoading(true);
      const { data } = await api.get('/orders/my');
      setOrders(data);
      setLoading(false);
    };
    loadOrders();
  }, []);

  return (
    <section style={{ padding: '24px', maxWidth: '1000px', margin: '0 auto' }}>
      <h1>Profile</h1>
      <div style={{ display: 'grid', gap: '24px' }}>
        <div style={{ border: '1px solid #ddd', borderRadius: '12px', padding: '20px' }}>
          <h2>Account details</h2>
          <p><strong>Name:</strong> {user?.name}</p>
          <p><strong>Email:</strong> {user?.email}</p>
          <p><strong>Address:</strong> {user?.address || 'Not set'}</p>
        </div>
        <div style={{ border: '1px solid #ddd', borderRadius: '12px', padding: '20px' }}>
          <h2>Order history</h2>
          {loading ? <Loader /> : orders.length ? (
            orders.map((order) => (
              <div key={order._id} style={{ padding: '14px 0', borderBottom: '1px solid #eee' }}>
                <p><strong>Order ID:</strong> {order._id}</p>
                <p><strong>Total:</strong> ${order.totalPrice.toFixed(2)}</p>
                <p><strong>Status:</strong> {order.isPaid ? 'Paid' : 'Pending'}</p>
              </div>
            ))
          ) : <p>No orders yet.</p>}
        </div>
      </div>
    </section>
  );
};

export default ProfilePage;
