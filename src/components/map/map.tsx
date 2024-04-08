import {useRef, useEffect} from 'react';
import leaflet, {Icon, Marker, LayerGroup} from 'leaflet';
import 'leaflet/dist/leaflet.css';
import useMap from '../../hooks/use-map';
import {Offers, OfferList} from '../../types/offers.ts';
import {URL_MARKER_DEFAULT, URL_MARKER_CURRENT} from '../../const';
import {Nullable} from 'vitest';
import {City} from '../../types/cities.ts';

type MapProps = {
  offers: Offers;
  className: string;
  selectedPoint: Nullable<OfferList>;
  selectedCity: City;
};

const defaultCustomIcon = new Icon({
  iconUrl: URL_MARKER_DEFAULT,
  iconSize: [27, 39],
  iconAnchor: [27, 39]
});

const currentCustomIcon = new Icon({
  iconUrl: URL_MARKER_CURRENT,
  iconSize: [27, 39],
  iconAnchor: [27, 39]
});

function Map ({offers, className, selectedPoint, selectedCity}: MapProps): JSX.Element {

  const mapRef = useRef(null);
  const map = useMap(mapRef, selectedCity);
  const markerLayer = useRef<LayerGroup>(leaflet.layerGroup());

  useEffect(() => {
    if (map) {

      map.setView([selectedCity.location.latitude, selectedCity.location.longitude], selectedCity.location.zoom);
      markerLayer.current.clearLayers();
      markerLayer.current.addTo(map);

      offers.forEach((point) => {
        const marker = new Marker({
          lat: point.location.latitude,
          lng: point.location.longitude
        });

        marker
          .setIcon(
            selectedPoint !== undefined && selectedPoint !== null && point.id === selectedPoint.id
              ? currentCustomIcon
              : defaultCustomIcon
          )
          .addTo(markerLayer.current);
      });

      return () => {

      };
    }
  }, [map, offers, selectedCity, selectedPoint]);

  return <section style={{height: '600px'}} className={className} ref={mapRef}></section>;
}

export default Map;
