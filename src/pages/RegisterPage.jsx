import React from 'react';
import { IoIosChatboxes } from 'react-icons/io';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import RegisterInput from '../components/RegisterInput';
import { asyncRegisterUser } from '../states/users/action';

function RegisterPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onRegister = ({ name, email, password }) => {
    dispatch(asyncRegisterUser({ name, email, password })).then((result) => {
      if (result) {
        navigate('/');
      }
    });
  };

  return (
    <section className="register-page">
      <header className="register-page__hero">
        <h1>
          <IoIosChatboxes />
        </h1>
      </header>
      <article className="register-page__main">
        <h2>Create your account</h2>
        <RegisterInput register={onRegister} />

        <p>
          Already have an account?
          {' '}
          <Link to="/">Login</Link>
        </p>
      </article>
    </section>
  );
}

export default RegisterPage;
