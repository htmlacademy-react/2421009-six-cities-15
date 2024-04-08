import {createSlice} from '@reduxjs/toolkit';

import {FavoritesStatus, RequestStatus, StoreSlices} from '../../const.ts';
import {Offers} from '../../types/offers.ts';
import {changeFavoriteAction, fetchFavoritesAction} from '../thunks/favorites.ts';

interface FavoritesState {
  items: Offers;
  status: RequestStatus;
}

const initialState: FavoritesState = {
  items: [],
  status: RequestStatus.Idle,
};

const favoritesSlice = createSlice({
  initialState,
  name: StoreSlices.Favorites,
  extraReducers(builder) {
    builder
      .addCase(fetchFavoritesAction.pending, (state) => {
        state.status = RequestStatus.Loading;
      })
      .addCase(fetchFavoritesAction.fulfilled, (state, action) => {
        state.status = RequestStatus.Success;
        state.items = action.payload;
      })
      .addCase(fetchFavoritesAction.rejected, (state) => {
        state.status = RequestStatus.Failed;
      })
      .addCase(changeFavoriteAction.fulfilled, (state, action) => {
        switch (action.payload.isFavorite) {
          case !!FavoritesStatus.Added:
            state.items.push(action.payload);
            break;
          case !!FavoritesStatus.Removed:
            state.items = state.items.filter(({id}) => id !== action.payload.id);
        }
        state.status = RequestStatus.Success;
      })
      .addCase(changeFavoriteAction.pending, (state) => {
        state.status = RequestStatus.Loading;
      })
      .addCase(changeFavoriteAction.rejected, (state) => {
        state.status = RequestStatus.Failed;
      });
  },
  reducers: {},
  selectors: {
    favorites: (state:FavoritesState) => state.items,
    status: (state:FavoritesState) => state.status,
  }
});

const favoritesActions = {...favoritesSlice.actions, fetchFavoritesAction, changeFavoriteAction};
const favoritesSelectors = {
  ...favoritesSlice.selectors,
};

export {favoritesActions, favoritesSelectors, favoritesSlice};
