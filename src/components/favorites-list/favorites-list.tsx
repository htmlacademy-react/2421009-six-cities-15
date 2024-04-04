import {Offers} from '../../types/offers.ts';
import {Fragment, memo} from 'react';
import {NavLink} from 'react-router-dom';
import MemorizedOffersList from '../offers-list';
import {getCityId} from './utils.ts';

type FavoritesListProps = {
  offers : Offers;
}

function FavoritesList ({offers}: FavoritesListProps): JSX.Element {

  const offersByCity = Object.groupBy(offers, (offer) => offer.city.name);
  const cities = Object.keys(offersByCity);

  return (
    <ul className="favorites__list">
      {
        cities.map((city): JSX.Element => (
          <Fragment key={city}>
            <li className="favorites__locations-items">
              <div className="favorites__locations locations locations--current">
                <div className="locations__item">
                  <NavLink to={`/${getCityId(city)}`} className={'locations__item-link'}>
                    <span>{city}</span>
                  </NavLink>
                </div>
              </div>
              <div className="favorites__places">
                <MemorizedOffersList
                  offersList={offersByCity[city] as Offers}
                  offersListTemplate="favoriteScreen"
                />
              </div>
            </li>
          </Fragment>
        ))
      }
    </ul>
  );
}

const MemorizedFavoritesList = memo(FavoritesList);

export default MemorizedFavoritesList;
