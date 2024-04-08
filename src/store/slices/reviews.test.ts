import {reviewsActions, reviewsSlice} from './reviews.ts';
import {RequestStatus} from '../../const.ts';
import {makeFakeComment, makeFakeReview} from '../../utils/mocks.ts';

describe('Reviews Slice', () => {

  const {fetchCommentsAction, addCommentAction} = reviewsActions;
  const mockReview = makeFakeReview();
  const mockComment = makeFakeComment();

  it('should return initial state with empty action', () => {
    const emptyAction = { type: '' };
    const expectedState = {
      reviews: [],
      status: RequestStatus.Idle,
      posting: RequestStatus.Idle,
    };

    const result = reviewsSlice.reducer(expectedState, emptyAction);

    expect(result).toEqual(expectedState);
  });

  it('should return default initial state with empty action', () => {
    const emptyAction = { type: '' };
    const expectedState = {
      reviews: [],
      status: RequestStatus.Idle,
      posting: RequestStatus.Idle,
    };

    const result = reviewsSlice.reducer(undefined, emptyAction);

    expect(result).toEqual(expectedState);
  });

  it('should set "status" to "1" (Loading), "posting" to "0" (Idle), "reviews" to "[]" with "fetchCommentsAction.pending"', () => {
    const expectedState = {
      reviews: [],
      status: RequestStatus.Loading,
      posting: RequestStatus.Idle,
    };

    const result = reviewsSlice.reducer(undefined, fetchCommentsAction.pending('', ''));

    expect(result).toEqual(expectedState);
  });

  it('should set "status" to "2" (Success), "posting" to "0" (Idle), "reviews" to "[reviews]"  with "fetchCommentsAction.fulfilled"', () => {

    const initialState = {
      reviews: [],
      status: RequestStatus.Idle,
      posting: RequestStatus.Idle,
    };

    const expectedState = {
      reviews: [mockReview],
      status: RequestStatus.Success,
      posting: RequestStatus.Idle,
    };

    const result = reviewsSlice.reducer(initialState, fetchCommentsAction.fulfilled([mockReview], '', ''));

    expect(result).toEqual(expectedState);
  });

  it('should set "status" to "3" - "Failed" with "fetchCommentsAction.rejected', () => {
    const expectedState = {
      reviews: [],
      status: RequestStatus.Failed,
      posting: RequestStatus.Idle,
    };

    const result = reviewsSlice.reducer(undefined, fetchCommentsAction.rejected(null, '', ''));

    expect(result).toEqual(expectedState);
  });

  it('should set "status" to "0" (Idle), "posting" to "1" (Loading), "reviews" to "[]" with "addCommentAction.pending"', () => {
    const expectedState = {
      reviews: [],
      status: RequestStatus.Idle,
      posting: RequestStatus.Loading,
    };

    const result = reviewsSlice.reducer(undefined, addCommentAction.pending('', mockComment, ''));

    expect(result).toEqual(expectedState);
  });

  it('should set "status" to "0" (Idle), "posting" to "2" (Success), "reviews" to "[reviews]" with "addCommentAction.fulfilled"', () => {
    const initialState = {
      reviews: [],
      status: RequestStatus.Idle,
      posting: RequestStatus.Idle,
    };

    const expectedState = {
      reviews: [mockReview],
      status: RequestStatus.Idle,
      posting: RequestStatus.Success,
    };

    const result = reviewsSlice.reducer(initialState, addCommentAction.fulfilled(mockReview, '', mockComment));

    expect(result).toEqual(expectedState);
  });

  it('should set "posting" to "3", "addCommentAction.rejected"', () => {
    const expectedState = {
      reviews: [],
      status: RequestStatus.Idle,
      posting: RequestStatus.Failed,
    };

    const result = reviewsSlice.reducer(undefined, addCommentAction.rejected(null, '', mockComment));

    expect(result).toEqual(expectedState);
  });

});
