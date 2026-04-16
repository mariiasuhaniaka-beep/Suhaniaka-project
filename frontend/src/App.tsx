import { Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import Tracks from './pages/Tracks';
import CreateTrack from './pages/CreateTrack';

function App() {
  return (
    <>
      <nav>
        <Link to="/">Home</Link> | 
        <Link to="/tracks">Tracks</Link> | 
        <Link to="/create">Add Track</Link>
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