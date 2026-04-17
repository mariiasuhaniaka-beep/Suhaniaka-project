import { useState } from 'react';
import { api } from '../api/api';

function CreateTrack() {
  const [title, setTitle] = useState('');// state для назви треку 
  const [artist, setArtist] = useState('');// state для виконавця 
  const [year, setYear] = useState(''); // state для року

  const handleSubmit = async (e: any) => {// обробка відправки форми
    e.preventDefault(); 
    // зупиняє стандартну поведінку форми (перезавантаження сторінки)

    // відправляємо POST запит на бекенд
    await api.post('/tracks', {
      title, // назва треку з state
      artist, // виконавець з state
      year: Number(year), // перетворюємо рік у число, бо input завжди повертає string
    });

    // повідомлення користувачу про успіх
    alert('Track added!');
  };

  return (
    // форма створення треку
    <form onSubmit={handleSubmit}>

      {/* поле вводу назви */}
      <input
        placeholder="Title"
        onChange={e => setTitle(e.target.value)}
        // кожна зміна записується у state title
      />

      {/* поле вводу виконавця */}
      <input
        placeholder="Artist"
        onChange={e => setArtist(e.target.value)}
        // записуємо значення в artist state
      />

      {/* поле вводу року */}
      <input
        placeholder="Year"
        onChange={e => setYear(e.target.value)}
        // записуємо рік як string у state
      />
      {/* кнопка відправки форми */}
      <button type="submit">Add</button>
    </form>
  );
}

export default CreateTrack;