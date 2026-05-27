import React from 'react';

const Loader = () => (
  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '180px' }}>
    <div style={{ width: '42px', height: '42px', border: '5px solid #ddd', borderTop: '5px solid #111', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
    <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
  </div>
);

export default Loader;
