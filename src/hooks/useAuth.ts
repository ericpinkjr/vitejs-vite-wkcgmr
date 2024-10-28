import { useState, useEffect } from 'react';
import useStore from '../store';

export const useAuth = () => {
  const playerInfo = useStore((state) => state.playerInfo);
  const [isAuthenticated, setIsAuthenticated] = useState(!!playerInfo);

  useEffect(() => {
    setIsAuthenticated(!!playerInfo);
  }, [playerInfo]);

  return { isAuthenticated, playerInfo };
};