import {address, datatype, internet, lorem, name, random} from 'faker';

import { Action } from 'redux';
import { ThunkDispatch } from '@reduxjs/toolkit';
import { createAPI } from '../services/api';
import {OfferDetail} from '../types/offers.ts';
import {AuthorizationStatus, FavoritesStatus, RequestStatus, StoreSlices} from '../const.ts';
import {Review} from '../types/reviews.ts';
import {User} from '../types/user.ts';
import {Auth} from '../types/auth.ts';
import {State} from '../types/state';

export type AppThunkDispatch = ThunkDispatch<State, ReturnType<typeof createAPI>, Action>;

export const makeFakeOffer = (isFavorite: FavoritesStatus): OfferDetail => ({
  'id': random.word(),
  'title': lorem.words(),
  'type': random.word(),
  'price': datatype.number(),
  'city': {
    'name': address.cityName(),
    'location': {
      'latitude': Number(address.latitude(50, 55, 10)),
      'longitude': Number(address.longitude(4, 10, 10)),
      'zoom': datatype.number(),
    }},
  'location': {
    'latitude': Number(address.latitude(50, 55, 10)),
    'longitude': Number(address.longitude(4, 10, 10)),
    'zoom': datatype.number(),
  },
  'isFavorite': !!isFavorite,
  'isPremium': datatype.boolean(),
  'rating': datatype.number(5),
  'description': lorem.paragraph(1),
  'bedrooms': datatype.number(10),
  'goods': [
    random.word(),
  ],
  'host': {
    'name': name.firstName(),
    'avatarUrl': internet.avatar(),
    'isPro': datatype.boolean()
  },
  'images': [
    internet.url()
  ],
  'maxAdults': datatype.number(100)
} as OfferDetail);

export const makeFakeReview = (): Review => ({
  'id': random.word(),
  'date': datatype.string(),
  'user': {
    'name': name.firstName(),
    'avatarUrl': internet.avatar(),
    'isPro': datatype.boolean()
  },
  'comment': lorem.paragraph(1),
  'rating': datatype.number(5)
} as Review);

export const makeFakeComment = () => ({
  'body' : {
    'comment' : lorem.paragraph(1),
    'rating' : datatype.number(5)
  },
  'offerId' : random.word(),
});

export const makeFakeUser = (): User => ({
  'name' : name.firstName(),
  'email' : internet.email(),
  'avatarUrl' : internet.avatar(),
  'isPro' : false,
  'token' : datatype.string(),
});

export const makeFakeLoginData = (): Auth => ({
  'login' : internet.email(),
  'password' : internet.password(),
});

export const makeFakeStore = (initialState?: Partial<State>): State => ({
  [StoreSlices.Offers]: { offers:[], status: RequestStatus.Idle, activeId: '' },
  [StoreSlices.Offer]: {offer:makeFakeOffer(FavoritesStatus.Removed), status: RequestStatus.Idle, nearby:[]},
  [StoreSlices.Reviews]: {reviews:[], status: RequestStatus.Idle, posting: RequestStatus.Idle},
  [StoreSlices.Favorites]: {items:[], status: RequestStatus.Idle},
  [StoreSlices.User]: {user:{
    'name' : '',
    'email' : '',
    'avatarUrl' : '',
    'isPro' : false,
    'token' : '',
  }, status:AuthorizationStatus.Unknown, requestStatus:RequestStatus.Idle},

  ...initialState ?? {},
});
