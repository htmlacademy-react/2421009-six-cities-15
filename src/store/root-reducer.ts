import {combineReducers} from '@reduxjs/toolkit';
import {StoreSlices} from '../const';
import {offersSlice} from './slices/offers.ts';
import {offerSlice} from './slices/offer.ts';
import {reviewsSlice} from './slices/reviews.ts';
import {favoritesSlice} from './slices/favorites.ts';
import {userSlice} from './slices/user.ts';

export const rootReducer = combineReducers({
  [StoreSlices.Offers]: offersSlice.reducer,
  [StoreSlices.Offer]: offerSlice.reducer,
  [StoreSlices.Reviews]: reviewsSlice.reducer,
  [StoreSlices.Favorites]: favoritesSlice.reducer,
  [StoreSlices.User]: userSlice.reducer,
});
