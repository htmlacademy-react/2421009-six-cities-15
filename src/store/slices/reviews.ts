import {createSlice} from '@reduxjs/toolkit';

import {RequestStatus, StoreSlices} from '../../const.ts';
import {Review, ReviewsType,} from '../../types/reviews.ts';
import {fetchCommentsAction, addCommentAction} from '../thunks/comments.ts';

interface ReviewsState {
  reviews: ReviewsType;
  status: RequestStatus;
  posting: RequestStatus;
}

const initialState: ReviewsState = {
  reviews: [],
  status: RequestStatus.Idle,
  posting: RequestStatus.Idle,
};

const sortComments = (a: Review, b: Review) => {
  if (a.date > b.date) {
    return -1;
  }
  if (a.date < b.date) {
    return 1;
  }
  return 0;
};

const reviewsSlice = createSlice({
  initialState,
  name: StoreSlices.Reviews,
  extraReducers(builder) {
    builder
      .addCase(fetchCommentsAction.pending, (state) => {
        state.status = RequestStatus.Loading;
      })
      .addCase(fetchCommentsAction.fulfilled, (state, action) => {
        state.status = RequestStatus.Success;
        state.reviews = action.payload;
        state.reviews.sort(sortComments);
      })
      .addCase(fetchCommentsAction.rejected, (state) => {
        state.status = RequestStatus.Failed;
      })
      .addCase(addCommentAction.pending, (state) => {
        state.posting = RequestStatus.Loading;
      })
      .addCase(addCommentAction.fulfilled, (state, action) => {
        state.reviews.unshift(action.payload);
        state.posting = RequestStatus.Success;
      })
      .addCase(addCommentAction.rejected, (state) => {
        state.posting = RequestStatus.Failed;
      });
  },
  reducers: {},
  selectors: {
    reviews: (state:ReviewsState) => state.reviews,
    status: (state:ReviewsState) => state.status,
    posting: (state:ReviewsState) => state.posting,
  }
});

const reviewsActions = {...reviewsSlice.actions, fetchCommentsAction, addCommentAction};
const reviewsSelectors = {
  ...reviewsSlice.selectors,
};

export {reviewsActions, reviewsSelectors, reviewsSlice};
