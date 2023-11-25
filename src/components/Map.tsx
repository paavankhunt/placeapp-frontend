import React, { useEffect, useState } from 'react';
import { Place } from '../modules/PlaceList';
import {
  GoogleMap,
  InfoWindow,
  Marker,
  useLoadScript,
} from '@react-google-maps/api';

interface Position {
  lat: number;
  lng: number;
}

export default function MapView({ places }: { places: Place[] }) {
  const [mapPosition, setMapPosition] = useState<Position>({
    lat: 40,
    lng: 1,
  });
  const [mapRef, setMapRef] = useState<any>();
  const [isOpen, setIsOpen] = useState(false);
  const [infoWindowData, setInfoWindowData] = useState<any>();

  useEffect(() => {
    if (places.length > 0) {
      setMapPosition({
        lat: places[0].lat,
        lng: places[0].lng,
      });
    }
  }, [places]);

  const onMapLoad = (map: any) => {
    setMapRef(map);
    const bounds = new google.maps.LatLngBounds();
    map.fitBounds(bounds);
  };

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_API_KEY ?? '',
  });

  const handleMarkerClick = (props: {
    id: string;
    lat: number;
    lng: number;
    name: string;
    description: string;
  }) => {
    mapRef?.panTo({ lat: props.lat, lng: props.lng });
    setInfoWindowData({
      id: props.id,
      name: props.name,
      description: props.description,
    });
    setIsOpen(true);
  };

  return (
    <div>
      {!isLoaded ? (
        <button>'Loading...'</button>
      ) : (
        <div
          style={{
            width: '100%',
            height: '20rem',
          }}
        >
          <GoogleMap
            mapContainerClassName="map-container"
            center={{
              lat: mapPosition.lat,
              lng: mapPosition.lng,
            }}
            zoom={1}
            onClick={() => setIsOpen(false)}
            onLoad={onMapLoad}
          >
            {places.map((place) => {
              return (
                <Marker
                  position={{ lat: place.lat, lng: place.lng }}
                  key={place._id}
                  onClick={() => {
                    handleMarkerClick({
                      id: place._id,
                      lat: place.lat,
                      lng: place.lng,
                      name: place.name,
                      description: place.description,
                    });
                  }}
                >
                  {isOpen && infoWindowData?.id === place._id && (
                    <InfoWindow
                      onCloseClick={() => {
                        setIsOpen(false);
                      }}
                    >
                      <>
                        <h3>{infoWindowData.name}</h3>
                        <h6>{infoWindowData.description}</h6>
                      </>
                    </InfoWindow>
                  )}
                </Marker>
              );
            })}
          </GoogleMap>
        </div>
      )}
    </div>
  );
}
