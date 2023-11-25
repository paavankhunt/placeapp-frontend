import React, { useCallback, useState } from 'react';
import axios from 'axios';
import { getToken } from '../helpers';
import Logout from '../components/Logout';
import { Link } from 'react-router-dom';
import {
  GoogleMap,
  InfoWindow,
  Marker,
  useLoadScript,
} from '@react-google-maps/api';

const CreatePlace = () => {
  const [place, setPlace] = useState({
    name: '',
    description: '',
    lng: 0,
    lat: 0,
  });
  const [mapRef, setMapRef] = useState<any>();
  const [isOpen, setIsOpen] = useState(false);

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_API_KEY ?? '',
  });

  const onMapClick = useCallback(
    async (lat?: number, lng?: number) => {
      setPlace({ ...place, lat: lat ?? 0, lng: lng ?? 0 });
    },
    [place]
  );

  const onMapLoad = (map: any) => {
    setMapRef(map);
  };

  const handleCreatePlace = async () => {
    try {
      const response = await axios(
        `${process.env.REACT_APP_API_URL}place/create`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            authorization: getToken(),
          },
          data: {
            name: place.name,
            description: place.description,
            lng: place.lng,
            lat: place.lat,
          },
        }
      );

      console.log(response.data);
      setPlace({
        name: '',
        description: '',
        lng: 0,
        lat: 0,
      });
    } catch (error) {
      console.error('Error creating place:', error);
    }
  };

  return (
    <div>
      <Logout />
      <h2>Create New Place</h2>
      <Link to="/">Dashboard</Link>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <label>
          Name:
          <input
            type="text"
            value={place.name}
            onChange={(e) => setPlace({ ...place, name: e.target.value })}
          />
        </label>
        <label>
          Description:
          <textarea
            value={place.description}
            onChange={(e) =>
              setPlace({ ...place, description: e.target.value })
            }
          />
        </label>
        <label>
          Location:
          <div style={{ display: 'flex', gap: '1rem' }}>
            <input
              type="text"
              placeholder="Latitude"
              value={place.lat}
              onChange={(e) =>
                setPlace({ ...place, lat: Number(e.target.value) })
              }
            />
            <input
              type="text"
              placeholder="Longitude"
              value={place.lng}
              onChange={(e) =>
                setPlace({ ...place, lng: Number(e.target.value) })
              }
            />
          </div>
        </label>
      </div>
      <button onClick={handleCreatePlace} style={{ marginTop: '1rem' }}>
        Create Place
      </button>
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
                lat: 23,
                lng: 25,
              }}
              onClick={(e) => {
                onMapClick(e.latLng?.lat(), e.latLng?.lng());
              }}
              onLoad={onMapLoad}
              zoom={1}
            >
              <Marker
                position={{ lat: place.lat, lng: place.lng }}
                onClick={() => {
                  mapRef?.panTo({ lat: place.lat, lng: place.lng });
                  setIsOpen(true);
                }}
              >
                {isOpen && (
                  <InfoWindow
                    onCloseClick={() => {
                      setIsOpen(false);
                    }}
                  >
                    <>
                      <h3>{place.name}</h3>
                      <h6>{place.description}</h6>
                    </>
                  </InfoWindow>
                )}
              </Marker>
            </GoogleMap>
          </div>
        )}
      </div>
    </div>
  );
};

export default CreatePlace;
