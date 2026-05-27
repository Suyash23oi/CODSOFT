import React from 'react';
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => (
  <div style={{ border: '1px solid #ddd', borderRadius: '10px', padding: '16px', flex: '1 1 280px', minWidth: '260px', margin: '12px', background: '#fff' }}>
    <Link to={`/products/${product._id}`} style={{ textDecoration: 'none', color: '#000' }}>
      <img src={product.image} alt={product.name} style={{ width: '100%', height: '180px', objectFit: 'cover', borderRadius: '8px' }} />
      <h3 style={{ marginTop: '14px' }}>{product.name}</h3>
    </Link>
    <p style={{ margin: '8px 0', color: '#555' }}>${product.price.toFixed(2)}</p>
    <p style={{ margin: '0', color: '#888' }}>{product.category}</p>
  </div>
);

export default ProductCard;
