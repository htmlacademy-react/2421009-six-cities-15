import {memo} from 'react';
import {City} from '../../types/cities.ts';
import {CITIES} from '../../const.ts';
import MemorizedCityList from '../city-list';

function CitiesList (): JSX.Element {
  return (
    <ul className="locations__list tabs__list" data-testid="locations__list">
      {CITIES.map((city:City) => (
        <MemorizedCityList city={city} key={city.id} />
      ))}
    </ul>
  );
}

const MemorizedCitiesList = memo(CitiesList);

export default MemorizedCitiesList;
