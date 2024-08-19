import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Home from './components/Home';
import Completed from './components/Completed';
import Proceeding from './components/Proceeding';
import Important from './components/Important';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/completed" element={<Completed />} />
          <Route path="/proceeding" element={<Proceeding />} />
          <Route path="/important" element={<Important />} />
        </Routes>

        <ToastContainer
          position="bottom-center"
          autoClose={1000}
          theme="light"
        />
      </div>
    </BrowserRouter>
  );
}

export default App;
