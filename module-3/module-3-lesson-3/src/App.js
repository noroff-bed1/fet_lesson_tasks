import './App.css';
import Button from './components/Button';
import Counter from './components/Counter';

function App() {
  return (
    <div className="page-wrapper">
      <div className="component-wrapper">
        <Button
          label="Hello world"
          onClick={() => console.log('Hello world')}
        />
      </div>
      <div className="component-wrapper">
        <Counter />
      </div>
    </div>
  );
}

export default App;
