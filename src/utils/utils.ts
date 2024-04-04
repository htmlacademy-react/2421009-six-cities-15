import {DEFAULT_CITY} from '../const.ts';
import {Cities, City, CityName} from '../types/cities.ts';
import {Review} from '../types/reviews.ts';

export const getUpperString = (stringToUpFirstLetter: string): string => stringToUpFirstLetter.charAt(0).toUpperCase() + stringToUpFirstLetter.slice(1);
export const getPlural = (number: number, txt: [string, string, string], cases = [2, 0, 1, 1, 1, 2]) => txt[(number % 100 > 4 && number % 100 < 20) ? 2 : cases[(number % 10 < 5) ? number % 10 : 5]];

export const getActiveCityParams = (cities: Cities, activeCity: CityName): City => {
  for (const j in cities) {
    if (cities[j].name === activeCity) {
      return cities[j];
    }
  }
  return DEFAULT_CITY;
};

export const sortComments = (a: Review, b: Review) => {
  if (a.date > b.date) {
    return -1;
  }
  if (a.date < b.date) {
    return 1;
  }
  return 0;
};
