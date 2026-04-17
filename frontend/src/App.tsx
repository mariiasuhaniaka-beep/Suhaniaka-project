import { Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import Tracks from './pages/Tracks';
import CreateTrack from './pages/CreateTrack';

function App() {
  return (
    <>
      <nav>
        <Link to="/">Головна</Link> | 
        <Link to="/tracks">Каталог</Link> | 
        <Link to="/create">Додати трек</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/tracks" element={<Tracks />} />
        <Route path="/create" element={<CreateTrack />} />
      </Routes>
    </>
  );
}

export default App;