import React from 'react';
import { IoIosChatboxes } from 'react-icons/io';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import LoginInput from '../components/LoginInput';
import { asyncSetAuthUser } from '../states/authUser/action';

function LoginPage() {
  const dispatch = useDispatch();

  const onLogin = ({ email, password }) => {
    dispatch(asyncSetAuthUser({ email, password }));
  };

  return (
    <section className="login-page">
      <header className="login-page__hero">
        <h1>
          <IoIosChatboxes />
        </h1>
      </header>
      <article className="login-page__main">
        <h2>
          Hola,
          {' '}
          <br />
          Welcome to
          {' '}
          <strong>Discussion&apos;s forum jonry</strong>
        </h2>

        <LoginInput login={onLogin} />
        <p>
          Don&apos;t have an account?
          {' '}
          <Link to="/register">Register</Link>
        </p>
      </article>
    </section>
  );
}

export default LoginPage;
