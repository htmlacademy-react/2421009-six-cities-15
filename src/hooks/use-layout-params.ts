import {AppRoute, CITIES} from '../const.ts';
import {useAppSelector} from './index.ts';
import {favoritesSelectors} from '../store/slices/favorites.ts';

function useLayoutParams (pathname: AppRoute) {
  let pageClass: string = 'page';
  let isShownFooter: boolean = false;
  let isShownHeaderUserInfo : boolean = true;

  const favoritesCount = useAppSelector(favoritesSelectors.favorites).length;

  const cities = CITIES.map((city) => (`/${city.id}`));

  if (pathname === AppRoute.Root) {
    pageClass = 'page page--gray page--main';
  } else if (pathname === AppRoute.Favorites) {
    pageClass = favoritesCount > 0 ? 'page' : 'page page--favorites-empty';
    isShownFooter = true;
  } else if (pathname === AppRoute.Login) {
    pageClass = 'page page--gray page--login';
    isShownHeaderUserInfo = false;
  } else if (cities.includes(pathname)) {
    pageClass = 'page page--gray page--main';
  }

  return {pageClass, isShownFooter, isShownHeaderUserInfo};
}

export default useLayoutParams;
