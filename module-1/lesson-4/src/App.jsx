import { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = 'https://bedos-jip-ca-servers.onrender.com/products';

function ProductList({ products }) {
  return (
    <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
      {products.map((product) => (
        <li
          key={product.id}
          style={{
            padding: '1rem 1.25rem',
            marginBottom: '0.75rem',
            border: '1px solid #e0e0e0',
            borderRadius: '8px',
            background: '#fafafa',
          }}
        >
          <h3 style={{ margin: '0 0 0.25rem' }}>{product.name}</h3>
          {product.price !== undefined && (
            <p style={{ margin: 0, color: '#555' }}>
              ${Number(product.price).toFixed(2)}
            </p>
          )}
          {product.description && (
            <p style={{ margin: '0.25rem 0 0', color: '#777', fontSize: '0.9rem' }}>
              {product.description}
            </p>
          )}
        </li>
      ))}
    </ul>
  );
}

export default function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get(API_URL)
      .then((response) => {
        setProducts(response.data);
      })
      .catch((err) => {
        setError(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <div style={{ maxWidth: '640px', margin: '2rem auto', padding: '0 1rem', fontFamily: 'sans-serif' }}>
      <h1>Products</h1>

      {loading && <p>Loading products...</p>}

      {error && (
        <p style={{ color: 'red' }}>Error: {error}</p>
      )}

      {!loading && !error && products.length === 0 && (
        <p>No products found.</p>
      )}

      {!loading && !error && products.length > 0 && (
        <ProductList products={products} />
      )}
    </div>
  );
}