import {memo} from 'react';
import {Link} from 'react-router-dom';

import {AppRoute} from '../../const';
import {useAppSelector} from '../../hooks';
import {useFavoriteCount} from '../../hooks/use-favorite-count.ts';
import {useAuth} from '../../hooks/user-authorization.ts';
import {userSelectors} from '../../store/slices/user.ts';

function HeaderProfile() {

  const {email, avatarUrl} = useAppSelector(userSelectors.user);
  const count = useFavoriteCount();

  if (!useAuth()) {
    return null;
  }

  return (
    <li className="header__nav-item user">
      <Link to={AppRoute.Favorites} className="header__nav-link header__nav-link--profile">
        <div className="header__avatar-wrapper user__avatar-wrapper" style={{backgroundImage:`url(${avatarUrl})`}}></div>
        <span className="header__user-name user__name">{email}</span>
        <span className="header__favorite-count">{count}</span>
      </Link>
    </li>
  );
}

const MemorizedHeaderProfile = memo(HeaderProfile);

export default MemorizedHeaderProfile;
