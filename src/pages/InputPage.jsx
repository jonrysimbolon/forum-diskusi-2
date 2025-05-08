import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import useInput from '../hooks/useInput';
import { asyncAddThread } from '../states/threads/action';

function InputPage() {
  const [title, onTitleChange] = useInput('');
  const [category, onCategoryChange] = useInput('');
  const [body, onBodyChange] = useInput('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(asyncAddThread({ title, body, category }));
    navigate('/');
  };

  return (
    <section className="input-page">
      <h2 className="input-title">Buat Diskusi Baru</h2>
      <form onSubmit={onSubmit} className="input-form">
        <input
          type="text"
          placeholder="Judul"
          value={title}
          onChange={onTitleChange}
          required
        />
        <input
          type="text"
          placeholder="Kategori"
          value={category}
          onChange={onCategoryChange}
        />
        <textarea
          placeholder="Tuliskan isi diskusi ..."
          value={body}
          onChange={onBodyChange}
          required
        />
        <button type="submit">Buat</button>
      </form>
    </section>
  );
}

export default InputPage;
