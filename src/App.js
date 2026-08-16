import RouterApp from './router';
import './App.css';
 import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <div className="App">
      <ToastContainer autoClose={3000} />
      <RouterApp/>
    </div>
  );
}

export default App;
