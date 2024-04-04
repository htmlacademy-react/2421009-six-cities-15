import {Helmet} from 'react-helmet-async';

import {NavLink} from 'react-router-dom';

import {CITIES, PASSWORD_VALID_ERROR} from '../../const.ts';
import {FormEvent, useRef} from 'react';
import {useActionCreators} from '../../hooks';
import {userActions} from '../../store/slices/user.ts';
import {toast} from 'react-toastify';

function LoginScreen (): JSX.Element {

  const loginRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);

  const {loginAction} = useActionCreators(userActions);

  const handleFormSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    if (loginRef.current !== null && passwordRef.current !== null) {

      const password = passwordRef.current.value;

      if (!password.match(/\d/g) || !password.match(/[a-zA-Z]/g)) {
        toast.error(PASSWORD_VALID_ERROR);
      } else {
        loginAction({
          login: loginRef.current.value,
          password: passwordRef.current.value
        });
      }
    }
  };

  const randomCityIndex = Math.floor(Math.random() * 6);
  const randomCity = CITIES[randomCityIndex];

  return (

    <main className="page__main page__main--login">
      <Helmet>
        <title>Авторизация</title>
      </Helmet>

      <div className="page__login-container container">
        <section className="login">
          <h1 className="login__title">Sign in</h1>
          <form className="login__form form" action="#" method="post" onSubmit={handleFormSubmit}>
            <div className="login__input-wrapper form__input-wrapper">
              <label className="visually-hidden">E-mail</label>
              <input
                className="login__input form__input"
                type="email"
                name="email"
                placeholder="Email"
                required
                ref={loginRef}
              />
            </div>
            <div className="login__input-wrapper form__input-wrapper">
              <label className="visually-hidden">Password</label>
              <input
                className="login__input form__input"
                type="password"
                name="password"
                placeholder="Password"
                required
                ref={passwordRef}
              />
            </div>
            <button className="login__submit form__submit button" type="submit">Sign in</button>
          </form>
        </section>
        <section className="locations locations--login locations--current">
          <div className="locations__item">
            <NavLink to={`/${randomCity.id}`} className={'locations__item-link'}>
              <span>{randomCity.name}</span>
            </NavLink>
          </div>
        </section>
      </div>
    </main>
  );
}

export default LoginScreen;
