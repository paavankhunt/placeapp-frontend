import React, { useCallback, useState } from 'react';
import axios from 'axios';
import { getToken } from '../helpers';
import Logout from '../components/Logout';
import { useNavigate } from 'react-router-dom';
import {
  GoogleMap,
  InfoWindow,
  Marker,
  useLoadScript,
} from '@react-google-maps/api';

const CreatePlace = () => {
  const navigate = useNavigate();
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

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setPlace({ ...place, lat: latitude, lng: longitude });
        },
        (error) => {
          console.error('Error getting current location:', error);
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.leftSide}>
        <div
          style={{
            flex: 1,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '2rem',
          }}
        >
          <h2>Create New Place</h2>
          <div style={styles.Buttons}>
            <div>
              <button
                onClick={getCurrentLocation}
                style={{
                  backgroundColor: '#4CAF50',
                  color: '#fff',
                  padding: '10px',
                  border: 'none',
                  borderRadius: '5px',
                  cursor: 'pointer',
                }}
              >
                Set Current Location
              </button>
            </div>
            <div>
              <button
                onClick={() => navigate('/')}
                style={{
                  backgroundColor: 'blue',
                  textDecoration: 'none',
                  color: '#fff',
                  padding: '10px',
                  border: 'none',
                  borderRadius: '5px',
                  cursor: 'pointer',
                }}
              >
                Dashboard
              </button>
            </div>
            <div>
              <Logout />
            </div>
          </div>
        </div>
        <div>
          <div style={{ ...styles.formContainer, flexDirection: 'column' }}>
            <div style={{ ...styles.formGroup, flexDirection: 'column' }}>
              <label style={styles.label}>Name:</label>
              <input
                style={{
                  height: '1.5rem',
                  maxWidth: '20rem',
                }}
                type="text"
                value={place.name}
                onChange={(e) => setPlace({ ...place, name: e.target.value })}
              />
            </div>
            <div style={{ ...styles.formGroup, flexDirection: 'column' }}>
              <label style={styles.label}>Description:</label>
              <textarea
                style={{
                  height: '4rem',
                  maxWidth: '20rem',
                }}
                value={place.description}
                onChange={(e) =>
                  setPlace({ ...place, description: e.target.value })
                }
              />
            </div>
            <div style={{ ...styles.formGroup, flexDirection: 'column' }}>
              <label style={styles.label}>Latitude:</label>
              <input
                style={{
                  height: '1.5rem',
                  maxWidth: '20rem',
                }}
                type="number"
                placeholder="Enter Latitude"
                value={place.lat}
                onChange={(e) =>
                  setPlace({ ...place, lat: Number(e.target.value) })
                }
              />
            </div>
            <div style={{ ...styles.formGroup, flexDirection: 'column' }}>
              <label style={styles.label}>Longitude:</label>
              <input
                style={{
                  height: '1.5rem',
                  maxWidth: '20rem',
                }}
                type="number"
                placeholder="Enter Longitude"
                value={place.lng}
                onChange={(e) =>
                  setPlace({ ...place, lng: Number(e.target.value) })
                }
              />
            </div>
          </div>
          <button onClick={handleCreatePlace} style={styles.createButton}>
            Create Place
          </button>
        </div>
      </div>
      <div style={styles.rightSide}>
        {!isLoaded ? (
          <button>Loading...</button>
        ) : (
          <div style={styles.map}>
            <GoogleMap
              mapContainerClassName="map-container"
              center={{ lat: 23, lng: 25 }}
              onClick={(e) => onMapClick(e.latLng?.lat(), e.latLng?.lng())}
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
                  <InfoWindow onCloseClick={() => setIsOpen(false)}>
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

const styles = {
  container: {
    display: 'flex',
  },
  Buttons: {
    display: 'flex',
    gap: '1rem',
  },
  leftSide: {
    flex: 1,
    padding: '20px',
  },
  rightSide: {
    flex: 1,
    height: '100vh',
    overflow: 'hidden',
  },
  formContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  },
  formGroup: {
    display: 'flex',
  },
  label: {
    marginBottom: '0.5rem',
    fontWeight: 'bold',
  },
  createButton: {
    marginTop: '1rem',
    backgroundColor: '#4CAF50',
    color: '#fff',
    padding: '10px 20px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  map: {
    width: '100%',
    height: '100%',
    backgroundColor: '#f0f0f0',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: '#666',
    fontSize: '18px',
  },
};

export default CreatePlace;
