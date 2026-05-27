import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const { cart } = useCart();

  return (
    <header className="navbar" style={{ padding: '12px 24px', background: '#111', color: '#fff', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap' }}>
      <Link to="/" style={{ color: '#fff', textDecoration: 'none', fontSize: '1.4rem', fontWeight: 700 }}>ShopMate</Link>
      <nav style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
        <NavLink to="/" style={{ color: '#fff', textDecoration: 'none' }}>Home</NavLink>
        <NavLink to="/products" style={{ color: '#fff', textDecoration: 'none' }}>Products</NavLink>
        <NavLink to="/cart" style={{ color: '#fff', textDecoration: 'none' }}>Cart ({cart.length})</NavLink>
        {user ? (
          <>
            <NavLink to="/profile" style={{ color: '#fff', textDecoration: 'none' }}>{user.name}</NavLink>
            {user.isAdmin && <NavLink to="/admin" style={{ color: '#fff', textDecoration: 'none' }}>Admin</NavLink>}
            <button onClick={logout} style={{ border: 'none', background: '#ff4d4f', color: '#fff', padding: '8px 12px', borderRadius: '6px', cursor: 'pointer' }}>Logout</button>
          </>
        ) : (
          <NavLink to="/login" style={{ color: '#fff', textDecoration: 'none' }}>Login</NavLink>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
