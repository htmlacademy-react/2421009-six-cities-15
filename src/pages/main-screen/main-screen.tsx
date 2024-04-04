import {useMemo, useState} from 'react';

import {Offers} from '../../types/offers.ts';
import {CityName} from '../../types/cities.ts';

import {getActiveCityParams, getPlural} from '../../utils/utils.ts';

import {useAppSelector} from '../../hooks';

import MemorizedCitiesList from '../../components/cities-list';
import MemorizedOffersList from '../../components/offers-list';
import MemorizedSortingForm from '../../components/sorting-form';
import Map from '../../components/map';
import {offersSelectors} from '../../store/slices/offers.ts';

import {CITIES, RequestStatus, SortOption} from '../../const.ts';
import classNames from 'classnames';
import MemorizedLoading from '../../components/loading';
import sortOffers from './utils.ts';

type MainScreenProps = {
  city: CityName;
}

function MainScreen ({city}: MainScreenProps): JSX.Element {

  const [activeSort, setActiveSort] = useState(SortOption.Popular);

  const activeCityParams = getActiveCityParams(CITIES, city);
  const offers:Offers = useAppSelector(offersSelectors.offers);

  const currentOffersByCity:Offers = useMemo(() => {
    const offersByCity = Object.groupBy(offers, (offer) => offer.city.name);
    return offersByCity[city] || [];
  }, [offers, city]);

  const activeId = useAppSelector(offersSelectors.activeId);
  const activeOffer = (offers.filter((offer) => offer.id === activeId)).shift();

  const cityOffersCount = currentOffersByCity.length;

  const statusOffersDataLoading = useAppSelector(offersSelectors.status);

  const sortedOffers = useMemo(() => sortOffers(activeSort, currentOffersByCity), [activeSort, currentOffersByCity]);

  return (
    <main className={classNames('page__main page__main--index', {'page__main--index-empty' : (cityOffersCount === 0)})}>
      {
        statusOffersDataLoading === RequestStatus.Loading ?
          <MemorizedLoading /> :
          ''
      }
      <h1 className="visually-hidden">Cities</h1>
      <div className="tabs">
        <section className="locations container">
          <MemorizedCitiesList />
        </section>
      </div>
      <div className="cities">
        <div className={classNames('cities__places-container container', {'cities__places-container--empty' : (cityOffersCount === 0)})}>
          {
            cityOffersCount !== 0 ?
              <>
                <section className="cities__places places">
                  <h2 className="visually-hidden">Places</h2>
                  <b className="places__found">{cityOffersCount} {getPlural(cityOffersCount, ['place', 'places', 'places'])} to stay in {city}</b>
                  <MemorizedSortingForm current={activeSort} setter={setActiveSort} />
                  <div className="cities__places-list places__list tabs__content">
                    <MemorizedOffersList
                      offersList={sortedOffers}
                      offersListTemplate="mainScreen"
                      hovered
                    />
                  </div>
                </section>
                <div className="cities__right-section">
                  <Map offers={currentOffersByCity} className={'cities__map map'} selectedPoint={activeOffer} selectedCity={activeCityParams} />
                </div>
              </>
              :
              <>
                <section className="cities__no-places">
                  <div className="cities__status-wrapper tabs__content">
                    <b className="cities__status">No places to stay available</b>
                    <p className="cities__status-description">We could not find any property available at the moment in {city}</p>
                  </div>
                </section>
                <div className="cities__right-section"></div>
              </>
          }
        </div>
      </div>
    </main>
  );
}

export default MainScreen;
