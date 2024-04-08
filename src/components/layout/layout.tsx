import {NavLink, useLocation, Outlet, Link} from 'react-router-dom';
import {AppRoute, ImgPath} from '../../const.ts';

import MemorizedHeaderLogin from '../header-login';
import MemorizedHeaderProfile from '../header-profile';
import useLayoutParams from '../../hooks/use-layout-params.ts';
import {useAuth} from '../../hooks/user-authorization.ts';

function Layout (): JSX.Element {

  const {pathname} = useLocation();
  const {pageClass, isShownFooter, isShownHeaderUserInfo} = useLayoutParams(pathname as AppRoute);
  const isAuth = useAuth();

  return (

    <div className={pageClass}>
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <NavLink
                to={AppRoute.Root}
                title={AppRoute.Root}
                className={({ isActive }) => `header__logo-link${ isActive ? ' header__logo-link--active' : ''}`}
              >
                <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41" />
              </NavLink >
            </div>
            <nav className="header__nav">
              <ul className="header__nav-list">
                {
                  isShownHeaderUserInfo && (
                    <>
                      {isAuth && <MemorizedHeaderProfile />}
                      <MemorizedHeaderLogin />
                    </>
                  )
                }
              </ul>
            </nav>
          </div>
        </div>
      </header>
      <Outlet />
      {
        isShownFooter && (
          <footer className="footer container">
            <Link to={AppRoute.Root} className="footer__logo-link">
              <img className="footer__logo" src={ImgPath.Logo} alt="6 cities logo" width="64" height="33" />
            </Link>
          </footer>
        )
      }
    </div>
  );
}

export default Layout;
