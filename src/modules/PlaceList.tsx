import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { getToken } from '../helpers';
import { useNavigate } from 'react-router-dom';
import MapView from '../components/Map';
import Logout from '../components/Logout';

export interface Place {
  _id: string;
  name: string;
  description: string;
  lat: number;
  lng: number;
}

const PlaceList = () => {
  const [places, setPlaces] = useState<Place[]>();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        const response = await axios(
          `${process.env.REACT_APP_API_URL}place/fetch`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              authorization: getToken(),
            },
          }
        );
        setPlaces(response.data.places);
      } catch (error) {
        console.error('Error fetching places:', error);
      }
    };

    fetchPlaces();
  }, []);

  const styles = {
    dashboard: {
      display: 'flex',
    },
    Buttons: {
      display: 'flex',
      gap: '1rem',
    },
    tableContainer: {
      flex: '1',
      marginRight: '20px',
      padding: '20px',
    },
    table: {
      width: '100%',
      marginTop: '10px',
    },
    tableData: {
      overflow: 'wrap',
      paddingTop: '5px',
    },
    mapContainer: {
      flex: '1',
    },
    map: {
      width: '100%',
      height: '100vh', // Take up the full height of the viewport
      backgroundColor: '#f0f0f0',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      color: '#666',
      fontSize: '18px',
    },
    logoutButton: {
      backgroundColor: '#f44336',
      color: '#fff',
      padding: '10px 20px',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
    },
  };

  return (
    <div style={styles.dashboard}>
      <div style={styles.tableContainer}>
        <div
          style={{
            flex: 1,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '2rem',
          }}
        >
          <h2>Dashboard</h2>
          <div style={styles.Buttons}>
            <div>
              <button
                onClick={() => navigate('/place')}
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
                Create Place
              </button>
            </div>
            <div>
              <Logout />
            </div>
          </div>
        </div>
        <table style={styles.table}>
          <thead>
            <tr>
              <th align="left">Name</th>
              <th align="left" style={{ paddingLeft: '1rem' }}>
                Description
              </th>
              <th align="left" style={{ paddingLeft: '1rem' }}>
                Latitude
              </th>
              <th align="left">Longitude</th>
            </tr>
          </thead>
          <tbody>
            {places &&
              places.map((place) => (
                <tr key={place._id}>
                  <td
                    style={{
                      ...styles.tableData,
                      minWidth: '5rem',
                      whiteSpace: 'normal',
                      wordBreak: 'break-all',
                    }}
                  >
                    {place.name}
                  </td>
                  <td
                    style={{
                      ...styles.tableData,
                      whiteSpace: 'normal',
                      wordBreak: 'break-all',
                      paddingLeft: '1rem',
                    }}
                  >
                    {place.description}
                  </td>
                  <td
                    style={{
                      ...styles.tableData,
                      minWidth: '5rem',
                      paddingLeft: '1rem',
                    }}
                  >
                    {place.lat.toFixed(2)}
                  </td>
                  <td style={{ ...styles.tableData, minWidth: '5rem' }}>
                    {place.lng.toFixed(2)}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      <div style={styles.mapContainer}>
        <div style={styles.map}>
          <MapView places={places ?? []} />
        </div>
      </div>
    </div>
  );
};

export default PlaceList;
