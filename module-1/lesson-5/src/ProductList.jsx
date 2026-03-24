import { useEffect } from 'react';
import useProductStore from './store';
import ProductCard from './ProductCard';
 
function ProductList() {
  const { products, loading, error, fetchProducts } = useProductStore();
 
  useEffect(() => {
    fetchProducts();
  }, []);
 
  if (loading) return <p>Loading products...</p>;
  if (error)   return <p style={{ color: 'red' }}>Error: {error}</p>;
  if (!products.length) return <p>No products found.</p>;
 
  return (
    <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </ul>
  );
}
 
export default ProductList;
