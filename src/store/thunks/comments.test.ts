import {configureMockStore} from '@jedmao/redux-mock-store';
import {createAPI} from '../../services/api';
import MockAdapter from 'axios-mock-adapter';
import thunk from 'redux-thunk';
import {Action} from 'redux';
import {AppThunkDispatch, extractActionsTypes, makeFakeComment, makeFakeOffer, makeFakeReview} from '../../utils/mocks';
import {State} from '../../types/state';
import {addCommentAction, fetchCommentsAction} from './comments.ts';
import {APIRoute, FavoritesStatus} from '../../const';

describe('Comments actions', () => {
  const axios = createAPI();
  const mockAxiosAdapter = new MockAdapter(axios);
  const middleware = [thunk.withExtraArgument(axios)];
  const mockStoreCreator = configureMockStore<State, Action<string>, AppThunkDispatch>(middleware);
  const mockOffer = makeFakeOffer(FavoritesStatus.Removed);
  const mockComment = makeFakeComment();
  const mockReview = makeFakeReview();
  let store: ReturnType<typeof mockStoreCreator>;

  beforeEach(() => {
    store = mockStoreCreator();
  });

  describe('fetchCommentsAction', () => {
    it('should dispatch "fetchCommentsAction.pending" and "fetchCommentsAction.fulfilled" with thunk "fetchCommentsAction', async () => {
      const offerId = mockOffer.id;
      const route = `${APIRoute.Comments}/${offerId}`;
      mockAxiosAdapter.onGet(route).reply(200, [mockOffer]);
      await store.dispatch(fetchCommentsAction(offerId));
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        fetchCommentsAction.pending.type,
        fetchCommentsAction.fulfilled.type,
      ]);
    });

    it('should dispatch "fetchCommentsAction.pending" and "fetchCommentsAction.rejected" when server response 400', async() => {
      const offerId = mockOffer.id;
      const route = `${APIRoute.Comments}/${offerId}`;
      mockAxiosAdapter.onGet(route).reply(400, []);
      await store.dispatch(fetchCommentsAction(offerId));
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        fetchCommentsAction.pending.type,
        fetchCommentsAction.rejected.type,
      ]);
    });
  });

  describe('addCommentAction', () => {
    it('should dispatch "addCommentAction.pending", "addCommentAction.fulfilled" when server response 200', async() => {
      const offerId = mockComment.offerId;
      const route = `${APIRoute.Comments}/${offerId}`;
      mockAxiosAdapter.onPost(route).reply(200, mockReview);
      await store.dispatch(addCommentAction(mockComment));
      const actions = extractActionsTypes(store.getActions());
      const addCommentActionFullfilled = store.getActions().at(1) as ReturnType<typeof addCommentAction.fulfilled>;

      expect(actions).toEqual([
        addCommentAction.pending.type,
        addCommentAction.fulfilled.type,
      ]);

      expect(addCommentActionFullfilled.payload)
        .toEqual(mockReview);
    });

    it('should dispatch "addCommentAction.pending", "addCommentAction.rejected" when server response 400', async () => {
      const offerId = mockComment.offerId;
      const route = `${APIRoute.Comments}/${offerId}`;
      mockAxiosAdapter.onPost(route).reply(400, []);
      await store.dispatch(addCommentAction(mockComment));
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        addCommentAction.pending.type,
        addCommentAction.rejected.type,
      ]);
    });
  });
});
