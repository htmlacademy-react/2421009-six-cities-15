import {CITIES, DEFAULT_CITY} from '../../const.ts';

export const getCityId = (cityName: string): string => CITIES.find((city) => city.name === cityName)?.id ?? DEFAULT_CITY.id;
