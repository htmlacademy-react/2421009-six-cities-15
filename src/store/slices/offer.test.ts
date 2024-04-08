import {offerActions, offerSlice} from './offer.ts';
import {FavoritesStatus, RequestStatus} from '../../const.ts';
import {makeFakeOffer} from '../../utils/mocks.ts';


describe('Offer Slice', () => {

  const {fetchOfferAction, fetchNearByAction} = offerActions;
  const mockOfferCard = makeFakeOffer(FavoritesStatus.Removed);

  it('should return initial state with empty action', () => {
    const emptyAction = { type: '' };
    const expectedState = {
      offer: null,
      nearby: [],
      status: RequestStatus.Idle,
    };

    const result = offerSlice.reducer(expectedState, emptyAction);

    expect(result).toEqual(expectedState);
  });

  it('should return default initial state with empty action', () => {
    const emptyAction = { type: '' };
    const expectedState = {
      offer: null,
      nearby: [],
      status: RequestStatus.Idle,
    };

    const result = offerSlice.reducer(undefined, emptyAction);

    expect(result).toEqual(expectedState);
  });

  it('should set "status" to "1" (Loading), "nearby" to "[]", "offer" to "[]" with "fetchOfferAction.pending"', () => {
    const expectedState = {
      offer: null,
      nearby: [],
      status: RequestStatus.Loading,
    };

    const result = offerSlice.reducer(undefined, fetchOfferAction.pending('', ''));

    expect(result).toEqual(expectedState);
  });

  it('should set "status" to "2", "nearby" to "[]", "offer" to array with offer,  with "fetchOfferAction.fulfilled"', () => {

    const initialState = {
      offer: null,
      nearby: [],
      status: RequestStatus.Idle,
    };

    const expectedState = {
      offer: mockOfferCard,
      nearby: [],
      status: RequestStatus.Success,
    };

    const result = offerSlice.reducer(initialState, fetchOfferAction.fulfilled(mockOfferCard, '', '')
    );

    expect(result).toEqual(expectedState);
  });

  it('should set "status" to "3" - "Failed" with "fetchOfferAction.rejected', () => {
    const expectedState = {
      offer: null,
      nearby: [],
      status: RequestStatus.Failed,
    };

    const result = offerSlice.reducer(undefined, fetchOfferAction.rejected(null, '', ''));

    expect(result).toEqual(expectedState);
  });

  it('should set "status" to "2", "items" to "[]" with "fetchNearByAction.fulfilled"', () => {
    const initialState = {
      offer: null,
      nearby: [],
      status: RequestStatus.Idle,
    };

    const expectedState = {
      offer: null,
      nearby: [mockOfferCard],
      status: RequestStatus.Idle,
    };

    const result = offerSlice.reducer(initialState, fetchNearByAction.fulfilled([mockOfferCard], '', ''));

    expect(result).toEqual(expectedState);
  });

});
