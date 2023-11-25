import { useState } from 'react';

interface Position {
  lat: number;
  long: number;
}

interface GeolocationHook {
  isLoading: boolean;
  position: Position | null;
  error: string | null;
  getPosition: () => void;
}

export function useGeolocation(
  defaultPosition: Position | null = null
): GeolocationHook {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [position, setPosition] = useState<Position | null>(defaultPosition);
  const [error, setError] = useState<string | null>(null);

  function getPosition() {
    if (!navigator.geolocation) {
      setError('Your browser does not support geolocation');
      return;
    }

    setIsLoading(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setPosition({
          lat: pos.coords.latitude,
          long: pos.coords.longitude,
        });
        setIsLoading(false);
      },
      (error) => {
        setError(error.message);
        setIsLoading(false);
      }
    );
  }

  return { isLoading, position, error, getPosition };
}
