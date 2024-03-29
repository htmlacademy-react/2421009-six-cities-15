import {useParams} from 'react-router-dom';

import {DEFAULT_CITY, RequestStatus,} from '../../const.ts';
import {Cities} from '../../types/cities.ts';

import {getActiveCityParams, upperString} from '../../utils/utils.ts';
import Page404Screen from '../page404-screen';
import Reviews from '../../components/reviews';
import OffersList from '../../components/offers-list';
import {Ratings} from '../../types/rating.ts';
import Map from '../../components/map';

import {useActionCreators, useAppSelector} from '../../hooks';
import {offerActions, offerSelectors} from '../../store/slices/offer.ts';
import {reviewsActions, reviewsSelectors} from '../../store/slices/reviews.ts';
import {useEffect} from 'react';
import Loading from '../../components/loading';
import {offersSelectors} from '../../store/slices/offers.ts';
import {useAuth} from '../../hooks/user-authorization.ts';
import FavoriteButton from '../../components/favorite-button';

type OfferGalleryImagesType = {
  src: string;
  alt: string;
}

type GoogsType = {
  good: string;
}

function OfferGallery ({src, alt}: OfferGalleryImagesType): JSX.Element {
  return (
    <div className="offer__image-wrapper">
      <img className="offer__image" src={src} alt={alt} />
    </div>
  );
}

function GoogListItem ({good}:GoogsType): JSX.Element {
  return (
    <li className="offer__inside-item">
      {good}
    </li>
  );
}

type OfferScreenProps = {
  citiesList: Cities;
  ratingsList: Ratings;
};

function OfferScreen({citiesList, ratingsList}: OfferScreenProps): JSX.Element {

  const {name:activeCity} = DEFAULT_CITY;

  const currentOffer = useAppSelector(offerSelectors.offer);
  const status = useAppSelector(offerSelectors.status);
  const nearByOffers = useAppSelector(offerSelectors.nearby);
  const reviews = useAppSelector(reviewsSelectors.reviews);

  const {fetchOfferAction, fetchNearByAction} = useActionCreators(offerActions);
  const {fetchCommentsAction} = useActionCreators(reviewsActions);

  const {id} = useParams();

  useEffect(() => {
    Promise.all([fetchOfferAction(id as string), fetchNearByAction(id as string), fetchCommentsAction(id as string)]);
  }, [fetchOfferAction, fetchNearByAction, fetchCommentsAction, id]);


  const activeId = useAppSelector(offersSelectors.activeId);
  const offersList = useAppSelector(offersSelectors.offers);
  const activeOffer = (offersList.filter((offer) => offer.id === activeId)).shift();

  const isAuth = useAuth();

  if (status === RequestStatus.Failed || currentOffer === null || currentOffer === undefined || id === undefined) {
    return <Page404Screen />;
  }

  const activeCityParams = getActiveCityParams(citiesList, activeCity);

  const ratingStarsStyle = currentOffer.rating * 20;
  const upperType = upperString(currentOffer.type);

  return (
    <main className="page__main page__main--offer">
      {
        status === RequestStatus.Loading ?
          <Loading /> :
          ''
      }
      <section className="offer">
        {
          currentOffer.images !== undefined ?
            <div className="offer__gallery-container container">
              <div className="offer__gallery">
                {currentOffer.images.map((image) => (
                  <OfferGallery key={image} src={image} alt={currentOffer.title} />
                ))}
              </div>
            </div>
            : null
        }
        <div className="offer__container container">
          <div className="offer__wrapper">
            {
              currentOffer.isPremium ?
                <div className="offer__mark">
                  <span>Premium</span>
                </div>
                : null
            }
            <div className="offer__name-wrapper">
              <h1 className="offer__name">{currentOffer.title}</h1>
              <FavoriteButton bemBlock={'offer'} isFavorite={currentOffer.isFavorite} offerId={id} width={31} />
            </div>
            <div className="offer__rating rating">
              <div className="offer__stars rating__stars">
                <span style={{'width': `${ratingStarsStyle}%`}}></span>
                <span className="visually-hidden">Rating</span>
              </div>
              <span className="offer__rating-value rating__value">{currentOffer.rating}</span>
            </div>
            <ul className="offer__features">
              <li className="offer__feature offer__feature--entire">{upperType}</li>
              {
                currentOffer.bedrooms !== undefined ?
                  <li className="offer__feature offer__feature--bedrooms">
                    {currentOffer.bedrooms} Bedrooms
                  </li>
                  : null
              }
              {
                currentOffer.maxAdults !== undefined ?
                  <li className="offer__feature offer__feature--adults">
                    Max {currentOffer.maxAdults} adults
                  </li>
                  : null
              }
            </ul>
            <div className="offer__price">
              <b className="offer__price-value">&euro;{currentOffer.price}</b>
              <span className="offer__price-text">&nbsp;night</span>
            </div>
            {
              currentOffer.goods !== undefined && currentOffer.goods.length > 0 ?
                <div className="offer__inside">
                  <h2 className="offer__inside-title">What&apos;s inside</h2>
                  <ul className="offer__inside-list">
                    {
                      currentOffer.goods.map((good) => (
                        <GoogListItem good={good} key={good} />
                      ))
                    }
                  </ul>
                </div>
                : null
            }
            <div className="offer__host">
              <h2 className="offer__host-title">Meet the host</h2>
              {
                currentOffer.host !== undefined ?
                  <div className="offer__host-user user">
                    <div className="offer__avatar-wrapper offer__avatar-wrapper--pro user__avatar-wrapper">
                      <img className="offer__avatar user__avatar" src={currentOffer.host.avatarUrl} width="74" height="74" alt={currentOffer.host.name} />
                    </div>
                    <span className="offer__user-name">{currentOffer.host.name}</span>
                    <span className="offer__user-status">{currentOffer.host.isPro ? 'Pro' : null}</span>
                  </div>
                  : null
              }
              <div className="offer__description">{currentOffer.description}</div>
            </div>
            <section className="offer__reviews reviews">
              <Reviews reviewsListData={reviews} isAuth={isAuth} ratingsList={ratingsList} />
            </section>
          </div>
        </div>
        <Map offers={nearByOffers} className={'offer__map map'} selectedPoint={activeOffer} selectedCity={activeCityParams} />
      </section>
      <div className="container">
        <section className="near-places places">
          <h2 className="near-places__title">Other places in the neighbourhood</h2>
          <div className="near-places__list places__list">
            <OffersList
              offersList={nearByOffers}
              offersListTemplate="offerScreen"
            />
          </div>
        </section>
      </div>
    </main>
  );
}

export default OfferScreen;
