import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGeolocation } from '../helpers/useGeolocation';
import { Place } from '../modules/PlaceList';
import { Map } from 'mapbox-gl';

interface Position {
  lat: number;
  long: number;
}

export const initMap = (
  container: HTMLDivElement,
  coords: [number, number]
) => {
  return new Map({
    container,
    style: 'mapbox://styles/mapbox/dark-v10',
    pitchWithRotate: false,
    center: coords,
    zoom: 15,
    // accessToken: import.meta.env.VITE_KEY as string,
    doubleClickZoom: false,
  });
};
export default function MapView({ places }: { places: Place[] }) {
  const [mapPosition, setMapPosition] = useState<[number, number]>([40, 1]);
  const mapRef = useRef<HTMLDivElement>(null);

  const {
    isLoading: isLoadingPosition,
    position: geolocationPosition,
    getPosition,
  } = useGeolocation({
    lat: mapPosition[0],
    long: mapPosition[1],
  });

  useEffect(() => {
    if (geolocationPosition) {
      setMapPosition([geolocationPosition.lat, geolocationPosition.long]);
    }
  }, [geolocationPosition]);

  return (
    <div ref={mapRef} className="map">
      {!geolocationPosition && (
        <button onClick={getPosition}>
          {isLoadingPosition ? 'Loading...' : 'Use your position'}
        </button>
      )}
    </div>
  );
}
