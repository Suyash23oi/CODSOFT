import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAuth } from '../context/AuthContext';

const LoginRegisterPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const { login, register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isLogin) {
        await login({ email: form.email, password: form.password });
        toast.success('Logged in successfully');
      } else {
        await register({ name: form.name, email: form.email, password: form.password });
        toast.success('Account created');
      }
      navigate('/');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error while authenticating');
    }
  };

  return (
    <section style={{ padding: '24px', maxWidth: '420px', margin: '0 auto' }}>
      <h1>{isLogin ? 'Login' : 'Register'}</h1>
      <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '16px' }}>
        {!isLogin && (
          <input name="name" value={form.name} onChange={handleChange} placeholder="Name" required style={{ padding: '12px', borderRadius: '8px', border: '1px solid #ccc' }} />
        )}
        <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="Email" required style={{ padding: '12px', borderRadius: '8px', border: '1px solid #ccc' }} />
        <input name="password" type="password" value={form.password} onChange={handleChange} placeholder="Password" required style={{ padding: '12px', borderRadius: '8px', border: '1px solid #ccc' }} />
        <button type="submit" style={{ padding: '12px', background: '#111', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>{isLogin ? 'Login' : 'Register'}</button>
      </form>
      <button onClick={() => setIsLogin(!isLogin)} style={{ marginTop: '16px', background: 'transparent', border: 'none', color: '#111', cursor: 'pointer' }}>
        {isLogin ? 'Create an account' : 'Already have an account? Login'}
      </button>
    </section>
  );
};

export default LoginRegisterPage;
