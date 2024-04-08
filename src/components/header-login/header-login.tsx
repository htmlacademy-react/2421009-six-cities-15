import {AppRoute} from '../../const';
import {Link} from 'react-router-dom';
import {useActionCreators} from '../../hooks';

import {useAuth} from '../../hooks/user-authorization.ts';
import {userActions} from '../../store/slices/user.ts';
import {memo} from 'react';

function HeaderLogin(): JSX.Element {

  const {logoutAction} = useActionCreators(userActions);

  const handleSignOut = () => {
    logoutAction();
  };

  return (
    useAuth() && (
      <li className="header__nav-item">
        <Link to={'#'} className="header__nav-link" onClick={handleSignOut}>
          <span className="header__signout">Sign out</span>
        </Link>
      </li>
    ) || (
      <li className="header__nav-item user">
        <Link to={AppRoute.Login} className="header__nav-link header__nav-link--profile">
          <div className="header__avatar-wrapper user__avatar-wrapper"></div>
          <span className="header__login">Sign in</span>
        </Link>
      </li>
    )
  );
}
const MemorizedHeaderLogin = memo(HeaderLogin);

export default MemorizedHeaderLogin;
