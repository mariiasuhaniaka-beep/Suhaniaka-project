import { useEffect, useState } from 'react';
import { api } from '../api/api';

function Tracks() {
  const [tracks, setTracks] = useState([]);

  useEffect(() => {
    api.get('/tracks').then(res => setTracks(res.data));
  }, []);

  return (
    <div>
      <h2>Tracks</h2>
      <ul>
        {tracks.map((t: any) => (
          <li key={t.id}>
            {t.title} — {t.artist} ({t.year})
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Tracks;