import {APIRoute, FavoritesStatus} from '../../const';
import {OfferDetail, Offers} from '../../types/offers.ts';
import {createAppAsyncThunk} from '../../hooks';

type ChangeFavoriteProps = {
  offerId: OfferDetail['id'];
  status: FavoritesStatus;
}

type ChangeFavoriteResponce = OfferDetail;

export const fetchFavoritesAction = createAppAsyncThunk<Offers, undefined>(
  'data/fetchFavorites',
  async (_arg, {extra: api}) => {
    const {data} = await api.get<Offers>(APIRoute.Favorite);
    return data;
  },
);

export const changeFavoriteAction = createAppAsyncThunk<ChangeFavoriteResponce, ChangeFavoriteProps>(
  'data/changeFavorite',
  async ({offerId, status}, {extra: api}) => {
    const response = await api.post<OfferDetail>(`${APIRoute.Favorite}/${offerId}/${status}`);
    return response.data;
  },
);
