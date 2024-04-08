import {Offers} from '../../types/offers.ts';
import {Fragment, memo} from 'react';
import {NavLink} from 'react-router-dom';
import MemorizedOffersList from '../offers-list';
import {getCityId} from './utils.ts';
import {CityName} from '../../types/cities.ts';

type FavoritesListProps = {
  offers : Offers;
}

function FavoritesList ({offers}: FavoritesListProps): JSX.Element {

  const offersByCity: Partial<Record<CityName, Offers>> = {};

  for (const offer of offers) {
    const city = offer.city.name as CityName;
    if (!offersByCity[city]) {
      offersByCity[city] = [];
    }
    offersByCity[city]!.push(offer);
  }

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
                  offersList={offersByCity[city as CityName] as Offers}
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
