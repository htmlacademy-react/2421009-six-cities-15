import {CITIES} from '../../const.ts';

export const getCityId = (cityName: string): string => {
  let id = '';
  for (const city of CITIES) {
    if (city['name'] === cityName) {
      id = city.id;
      break;
    }
  }

  return id;
};
