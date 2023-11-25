import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { getToken } from '../helpers';
import { Link } from 'react-router-dom';
import MapView from '../components/Map';

export interface Place {
  _id: string;
  name: string;
  description: string;
  lat: number;
  lng: number;
}

const PlaceList = () => {
  const [places, setPlaces] = useState<Place[]>();

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

  return (
    <div>
      <div>
        <h3>List View</h3>
        <Link to="/place">Create Place</Link>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Description</th>
              <th>Location</th>
            </tr>
          </thead>
          <tbody>
            {places &&
              places.map((place) => (
                <tr key={place._id}>
                  <td>{place.name}</td>
                  <td>{place.description}</td>
                  <td>{`( ${place.lat},${place.lng})`}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      <div>
        <h3>Map View</h3>
        <MapView places={places ?? []} />
      </div>
    </div>
  );
};

export default PlaceList;
