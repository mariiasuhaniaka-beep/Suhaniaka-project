import { useState } from 'react';
import { api } from '../api/api';

function CreateTrack() {
  const [title, setTitle] = useState('');
  const [artist, setArtist] = useState('');
  const [year, setYear] = useState('');

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    await api.post('/tracks', {
      title,
      artist,
      year: Number(year),
    });

    alert('Track added!');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input placeholder="Title" onChange={e => setTitle(e.target.value)} />
      <input placeholder="Artist" onChange={e => setArtist(e.target.value)} />
      <input placeholder="Year" onChange={e => setYear(e.target.value)} />
      <button type="submit">Add</button>
    </form>
  );
  <form style={{ maxWidth: '400px', margin: '0 auto' }}></form>
}

export default CreateTrack;