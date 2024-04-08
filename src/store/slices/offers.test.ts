import {offersActions, offersSlice} from './offers.ts';
import {FavoritesStatus, RequestStatus} from '../../const.ts';
import {makeFakeOffer} from '../../utils/mocks.ts';


describe('Offers Slice', () => {

  const {fetchOffersAction, setActiveId} = offersActions;
  const mockOfferCard = makeFakeOffer(FavoritesStatus.Removed);

  it('should return initial state with empty action', () => {
    const emptyAction = { type: '' };
    const expectedState = {
      activeId: undefined,
      offers: [],
      status: RequestStatus.Idle,
    };

    const result = offersSlice.reducer(expectedState, emptyAction);

    expect(result).toEqual(expectedState);
  });

  it('should return default initial state with empty action', () => {
    const emptyAction = { type: '' };
    const expectedState = {
      activeId: undefined,
      offers: [],
      status: RequestStatus.Idle,
    };

    const result = offersSlice.reducer(undefined, emptyAction);

    expect(result).toEqual(expectedState);
  });

  it('should set "status" to "1" (Loading), "activeId" to "undefined", "offer" to "[]" with "fetchOffersAction.pending"', () => {
    const expectedState = {
      activeId: undefined,
      offers: [],
      status: RequestStatus.Loading,
    };

    const result = offersSlice.reducer(undefined, fetchOffersAction.pending('', undefined));

    expect(result).toEqual(expectedState);
  });

  it('should set "status" to "2" (Success), "activeId" to "undefined", "offers" to array offers,  with "fetchOffersAction.fulfilled"', () => {

    const initialState = {
      activeId: undefined,
      offers: [],
      status: RequestStatus.Idle,
    };

    const expectedState = {
      activeId: undefined,
      offers: [mockOfferCard],
      status: RequestStatus.Success,
    };

    const result = offersSlice.reducer(initialState, fetchOffersAction.fulfilled([mockOfferCard], '', undefined)
    );

    expect(result).toEqual(expectedState);
  });

  it('should set "status" to "3" - "Failed" with "fetchOffersAction.rejected', () => {
    const expectedState = {
      activeId: undefined,
      offers: [],
      status: RequestStatus.Failed,
    };

    const result = offersSlice.reducer(undefined, fetchOffersAction.rejected(null, '', undefined));

    expect(result).toEqual(expectedState);
  });

  it('should set "activeId" to activeOfferId with "setActiveId"', () => {

    const expectedState = {
      activeId: mockOfferCard.id,
      offers: [],
      status: RequestStatus.Idle,
    };

    const result = offersSlice.reducer(expectedState, setActiveId(mockOfferCard.id));

    expect(result).toEqual(expectedState);
  });

});
