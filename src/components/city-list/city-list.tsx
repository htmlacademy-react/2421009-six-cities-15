import {NavLink} from 'react-router-dom';
import {City} from '../../types/cities.ts';
import classNames from 'classnames';
import {memo} from 'react';

type CityProps = {
  city: City;
}
function CityList ({city}: CityProps): JSX.Element {
  return (
    <li className="locations__item" data-testid="locations__item">
      <NavLink to={`/${city.id}`} className={({isActive}) => classNames(
        'locations__item-link', 'tabs__item', {'tabs__item--active': isActive}
      )}
      >
        <span>{city.name}</span>
      </NavLink>
    </li>
  );
}

const MemorizedCityList = memo(CityList);

export default MemorizedCityList;
