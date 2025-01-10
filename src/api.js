import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api/auth',
});

// Response interceptor for refreshing tokens
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // Refresh token logic
        const refreshToken = localStorage.getItem('refreshToken');
        const response = await axios.post('/refresh-token', { refreshToken });

        const newAccessToken = response.data.accessToken;

        // Store the new access token
        localStorage.setItem('token', newAccessToken);

        // Update headers and retry the original request
        api.defaults.headers.common['Authorization'] = `Bearer ${newAccessToken}`;
        originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
        return api(originalRequest);
      } catch (err) {
        console.error('Token refresh failed', err);
        window.location.href = '/login'; // Redirect to login on failure
      }
    }

    return Promise.reject(error);
  }
);

export default api;
