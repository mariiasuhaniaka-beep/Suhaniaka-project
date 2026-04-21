import { useEffect, useState } from 'react';
import { api } from '../api/api';
import { FaMusic, FaTrash } from 'react-icons/fa';

// тип треку 
type Track = {
  id: number;
  title: string;
  artist: string;
  year: number;
};

function Tracks() {
  // список треків (тепер правильно типізований)
  const [tracks, setTracks] = useState<Track[]>([]);

  // стан завантаження
  const [loading, setLoading] = useState(true);

  // стан помилки
  const [error, setError] = useState('');

  // трек для редагування
  const [editTrack, setEditTrack] = useState<Track | null>(null);

  // ЗАВАНТАЖЕННЯ
  useEffect(() => {
    api.get('/tracks')
      .then((res) => {
        setTracks(res.data);
      })
      .catch((err) => {
        console.log(err);
        setError('Error loading data');
      })
      .finally(() => setLoading(false));
  }, []);

  // ВИДАЛЕННЯ
  const deleteTrack = async (id: number) => {
    await api.delete(`/tracks/${id}`);

    setTracks(prev => prev.filter(t => t.id !== id));
  };

  // РЕДАГУВАННЯ 
  const startEdit = (track: Track) => {
    setEditTrack(track);
  };

  // ЗБЕРЕЖЕННЯ РЕДАГУВАННЯ
  const saveEdit = async () => {
    if (!editTrack) return;

    await api.patch(`/tracks/${editTrack.id}`, {
      title: editTrack.title,
      artist: editTrack.artist,
      year: Number(editTrack.year),
    });

    // оновлення списку без перезавантаження
    setTracks(prev =>
      prev.map(t =>
        t.id === editTrack.id ? editTrack : t
      )
    );

    setEditTrack(null);
  };

  // loading
  if (loading) return <p>Loading...</p>;

  // error
  if (error) return <p>{error}</p>;

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto' }}>

      <h2>Треки</h2>

      {/* СПИСОК */}
      <ul>
        {tracks.map((t) => (
          <li key={t.id} className="track-card">

            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <FaMusic />
                <strong>{t.title}</strong>
              </div>

              <div style={{ opacity: 0.7 }}>
                {t.artist} ({t.year})
              </div>
            </div>

            <div style={{ display: 'flex', gap: '8px' }}>

              {/* редагувати */}
              <button onClick={() => startEdit(t)}>
                ✏️
              </button>

              {/* видалити */}
              <button onClick={() => deleteTrack(t.id)}>
                <FaTrash />
              </button>

            </div>
          </li>
        ))}
      </ul>

      {/* EDIT FORM*/}
      {editTrack && (
        <div style={{ marginTop: '20px' }}>
          <h3>Редагування треку</h3>

          <input
            value={editTrack.title}
            onChange={(e) =>
              setEditTrack({ ...editTrack, title: e.target.value })
            }
          />

          <input
            value={editTrack.artist}
            onChange={(e) =>
              setEditTrack({ ...editTrack, artist: e.target.value })
            }
          />

          <input
            value={editTrack.year}
            onChange={(e) =>
              setEditTrack({
                ...editTrack,
                year: Number(e.target.value) || 0
              })
            }
          />

          <button onClick={saveEdit}>Save</button>
          <button onClick={() => setEditTrack(null)}>Cancel</button>
        </div>
      )}

    </div>
  );
}

export default Tracks;