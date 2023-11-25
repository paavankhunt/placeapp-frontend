import React, { useState } from 'react';
import axios from 'axios';
import { getToken } from '../helpers';
import Logout from '../components/Logout';
import { Link } from 'react-router-dom';

const CreatePlace = () => {
  const [place, setPlace] = useState({
    name: '',
    description: '',
    long: 0,
    lat: 0,
  });

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
            long: place.long,
            lat: place.lat,
          },
        }
      );

      console.log(response.data);
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
              value={place.long}
              onChange={(e) =>
                setPlace({ ...place, long: Number(e.target.value) })
              }
            />
          </div>
        </label>
      </div>
      <button onClick={handleCreatePlace}>Create Place</button>
    </div>
  );
};

export default CreatePlace;
