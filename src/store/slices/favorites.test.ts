import {favoritesActions, favoritesSlice} from './favorites.ts';
import {FavoritesStatus, RequestStatus} from '../../const.ts';
import {makeFakeOffer} from '../../utils/mocks.ts';


describe('Favorite Slice', () => {

  const {fetchFavoritesAction, changeFavoriteAction} = favoritesActions;
  const mockOfferCard = makeFakeOffer(FavoritesStatus.Removed);

  it('should return initial state with empty action', () => {
    const emptyAction = { type: '' };
    const expectedState = {
      items: [],
      status: RequestStatus.Idle,
    };

    const result = favoritesSlice.reducer(expectedState, emptyAction);

    expect(result).toEqual(expectedState);
  });

  it('should return default initial state with empty action', () => {
    const emptyAction = { type: '' };
    const expectedState = {
      items: [],
      status: RequestStatus.Idle,
    };

    const result = favoritesSlice.reducer(undefined, emptyAction);

    expect(result).toEqual(expectedState);
  });

  it('should set "status" to "1", "items" to "[]" with "fetchFavoritesAction.pending"', () => {
    const expectedState = {
      status: RequestStatus.Loading,
      items: []
    };

    const result = favoritesSlice.reducer(undefined, fetchFavoritesAction.pending('', undefined));

    expect(result).toEqual(expectedState);
  });

  it('should set "offers" to array with offer, "status" to "2" with "fetchFavoritesAction.fulfilled"', () => {

    const expectedState = {
      status: RequestStatus.Success,
      items: [mockOfferCard]
    };

    const result = favoritesSlice.reducer(undefined, fetchFavoritesAction.fulfilled([mockOfferCard], '', undefined)
    );

    expect(result).toEqual(expectedState);
  });

  it('should set "status" to "3" - "Failed" with "fetchFavoritesAction.rejected', () => {
    const expectedState = {
      status: RequestStatus.Failed,
      items: []
    };

    const result = favoritesSlice.reducer(undefined, fetchFavoritesAction.rejected(null, '', undefined));

    expect(result).toEqual(expectedState);
  });

  it('should set "status" to "1", "items" to "[]" with "changeFavoriteAction.pending"', () => {
    const expectedState = {
      status: RequestStatus.Loading,
      items: []
    };

    const result = favoritesSlice.reducer(undefined, changeFavoriteAction.pending('', {offerId:'', status: FavoritesStatus.Added | FavoritesStatus.Removed}));

    expect(result).toEqual(expectedState);
  });

  it('should set "status" to "3", "changeFavoriteAction.rejected"', () => {
    const expectedState = {
      status: RequestStatus.Failed,
      items: []
    };

    const result = favoritesSlice.reducer(undefined, changeFavoriteAction.rejected(null, '', {offerId:'', status: FavoritesStatus.Added}));

    expect(result).toEqual(expectedState);
  });

  it('should set "status" to "2", "items" add "offer" with "changeFavoriteAction.fulfilled"', () => {
    const isFavorite = FavoritesStatus.Added;
    const mockOfferCardFavorite = makeFakeOffer(isFavorite);
    const initialState = {
      status: RequestStatus.Idle,
      items: []
    };
    const expectedState = {
      status: RequestStatus.Success,
      items: [mockOfferCardFavorite]
    };

    const result = favoritesSlice.reducer(initialState, changeFavoriteAction.fulfilled(mockOfferCardFavorite, '', {offerId: mockOfferCardFavorite.id, status: isFavorite}));

    expect(result).toEqual(expectedState);
  });

  it('should set "status" to "2", "items" remove "offer" with "changeFavoriteAction.fulfilled"', () => {
    const isFavorite = FavoritesStatus.Removed;
    const mockOfferCardFavorite = makeFakeOffer(isFavorite);
    const initialState = {
      status: RequestStatus.Idle,
      items: [mockOfferCardFavorite]
    };
    const expectedState = {
      status: RequestStatus.Success,
      items: []
    };

    const result = favoritesSlice.reducer(initialState, changeFavoriteAction.fulfilled(mockOfferCardFavorite, '', {offerId: mockOfferCardFavorite.id, status: isFavorite}));

    expect(result).toEqual(expectedState);
  });

});
