function Message({ message }) {
  return (
    <div style={{ padding: '1rem', border: '1px solid #ccc', borderRadius: '8px', marginTop: '1rem' }}>
      <p>{message}</p>
    </div>
  );
}
 
export default function App() {
  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h1>React Props Demo</h1>
      <Message message="Welcome to FTS!" />
      <Message message="This is an example of passing props to components." />
      <Message message="The message changes based on the prop passed." />
    </div>
  );
}
 