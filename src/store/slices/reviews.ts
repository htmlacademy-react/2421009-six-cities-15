import {createSlice} from '@reduxjs/toolkit';

import {RequestStatus, StoreSlices} from '../../const.ts';
import {ReviewsType} from '../../types/reviews.ts';
import {fetchCommentsAction, addCommentAction} from '../thunks/comments.ts';
import {sortComments} from '../../utils/utils.ts';

interface ReviewsState {
  reviews: ReviewsType;
  status: RequestStatus;
}

const initialState: ReviewsState = {
  reviews: [],
  status: RequestStatus.Idle,
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
      .addCase(addCommentAction.fulfilled, (state, action) => {
        state.status = RequestStatus.Success;
        state.reviews.unshift(action.payload);
      })
      .addCase(addCommentAction.pending, (state) => {
        state.status = RequestStatus.Loading;
      })
      .addCase(addCommentAction.rejected, (state) => {
        state.status = RequestStatus.Failed;
      });
  },
  reducers: {},
  selectors: {
    reviews: (state:ReviewsState) => state.reviews,
    status: (state:ReviewsState) => state.status,
  }
});

const reviewsActions = {...reviewsSlice.actions, fetchCommentsAction, addCommentAction};
const reviewsSelectors = {
  ...reviewsSlice.selectors,
};

export {reviewsActions, reviewsSelectors, reviewsSlice};
