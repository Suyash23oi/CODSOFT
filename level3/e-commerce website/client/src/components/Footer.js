import React from 'react';

const Footer = () => (
  <footer style={{ background: '#111', color: '#fff', padding: '20px 24px', textAlign: 'center', marginTop: '40px' }}>
    <p>© {new Date().getFullYear()} ShopMate. Built with React, Node, Express, and MongoDB.</p>
  </footer>
);

export default Footer;
