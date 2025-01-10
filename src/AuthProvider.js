import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from './api'; // Axios instance
import { getRefreshToken, setTokens, clearTokens } from './tokenUtlis';

function AuthProvider({ children }) {
 const navigate=useNavigate();

  useEffect(() => {
    const refreshAccessToken = async () => {
      const refreshToken = getRefreshToken();

      if (refreshToken) {
        try {
          const response = await api.post('/token/refresh', { refreshToken });
          const { accessToken } = response.data;
          setTokens(accessToken, refreshToken);
        } catch (err) {
          console.error('Failed to refresh token', err);
          clearTokens();
          navigate('/login');
        }
      }
    };

    // Refresh token periodically
    const intervalId = setInterval(refreshAccessToken, 15 * 60 * 1000); // 15 minutes
    return () => clearInterval(intervalId); // Cleanup interval on unmount
  }, [navigate]);

  return children;
}

export default AuthProvider;
