//import {Cities} from './types/cities.ts';

export const BACKEND_URL = 'https://15.design.htmlacademy.pro/six-cities';
export const REQUEST_TIMEOUT = 5000;

import {City} from './types/cities.ts';

export enum ImgPath {
  Logo = 'img/logo.svg',
}

export enum AppRoute {
  Root = '/',
  Login = '/login',
  Favorites = '/favorites',
  Offer = '/offer/:id',
}

export enum APIRoute {
  Offers = '/offers',
  Login = '/login',
  Logout = '/logout',
  Favorite = '/favorite',
  Comments = '/comments',
}

export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}

export const URL_MARKER_DEFAULT =
  'img/pin.svg';

export const URL_MARKER_CURRENT =
  'img/pin-active.svg';

export const CITIES = [
  {
    'name' : 'Paris',
    'id' : 'paris',
    'location': {
      'latitude': 48.856663,
      'longitude': 2.351556,
      'zoom': 13
    }
  },{
    'name' : 'Cologne',
    'id' : 'cologne',
    'location': {
      'latitude': 50.930779,
      'longitude': 6.938399,
      'zoom': 13
    }
  },{
    'name' : 'Brussels',
    'id' : 'brussels',
    'location': {
      'latitude': 50.854283,
      'longitude': 4.352131,
      'zoom': 13
    }
  },{
    'name' : 'Amsterdam',
    'id' : 'amsterdam',
    'location': {
      'latitude': 52.373057,
      'longitude': 4.892557,
      'zoom': 13
    }
  },{
    'name' : 'Hamburg',
    'id' : 'hamburg',
    'location': {
      'latitude': 53.553103,
      'longitude': 9.995934,
      'zoom': 13
    }
  },{
    'name' : 'Dusseldorf',
    'id' : 'dusseldorf',
    'location': {
      'latitude': 51.230569,
      'longitude': 6.787428,
      'zoom': 13
    }
  },
] as const;

export const DEFAULT_CITY: City = CITIES[0];

export const RATINGS = [
  {
    'title': 'perfect',
    'value' : 5,
  },{
    'title': 'good',
    'value' : 4,
  },{
    'title': 'not bad',
    'value' : 3,
  },{
    'title': 'badly',
    'value' : 2,
  },{
    'title': 'terribly',
    'value' : 1,
  },
] as const;

export const SORT_OPTIONS = ['Popular', 'Price: low to high', 'Price: high to low', 'Top rated first'] satisfies Record<SortOption, string>;
export const enum SortOption {
  Popular,
  PriceLowToHigh,
  PriceHighToLow,
  TopRatedFirst
}

export const enum RequestStatus {
  Idle,
  Loading,
  Success,
  Failed
}

export const enum FavoritesStatus {
  Added = 1,
  Removed = 0
}

export enum StoreSlices {
  Offers = 'OFFERS',
  Offer = 'OFFER',
  Favorites = 'FAVORITES',
  Reviews = 'REVIEWS',
  User = 'USER'
}

export enum MaxCountLimit {
  OfferImages = 6,
  Comments = 10,
  OfferNearby = 3,
}

export const ReviewsParams = {
  MinReviewLength: 50,
  MaxReviewLength: 300,
  NoticeOfBadSending: 'No comment was posted. Please try sending later or contact your administrator.'
} as const;

export const PASSWORD_VALID_ERROR = 'Password must contain at least one letter and one number';

export const OFFER_TYPE = ['Apartment', 'Room', 'House', 'Hotel'] as const;

export type OfferType = (typeof OFFER_TYPE)[number];

export const RATING_MULTIPLIER = 20;
