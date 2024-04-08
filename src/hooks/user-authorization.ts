import {useAppSelector} from './index.ts';
import {userSelectors} from '../store/slices/user.ts';

export const useAuth = (): boolean => useAppSelector(userSelectors.isAuth);
