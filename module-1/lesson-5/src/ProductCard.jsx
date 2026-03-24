function ProductCard({ product }) {
  return (
    <li
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
  );
}
 
export default ProductCard;