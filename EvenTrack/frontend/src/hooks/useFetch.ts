import { useState, useEffect } from 'react';

// Helper function to decide if it's a development environment and allow HTTP
const getApiUrl = (url: string): string => {
  if (process.env.NODE_ENV === 'development') {
    // In development, allow HTTP for local APIs (since frontend is HTTPS)
    return `http://${url}`;
  }
  return url; // In production, the backend should be HTTPS
};

export const useFetch = (url: string, method: string = 'GET', body: any = "") => {
  const [data, setData] = useState<any>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const options: RequestInit = {
          method,
          headers: {
            'Content-Type': 'application/json', // Ensures the request is sent as JSON
          },
        };

        // Only add body if it's not a GET request
        if (method !== 'GET' && body) {
          options.body = JSON.stringify(body);
        }

        const response = await fetch(getApiUrl(url), options);

        if (!response.ok) {
          throw new Error('Error fetching data');
        }

        const result = await response.json();
        setData(result);
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url, method, body]); // Runs whenever url, method, or body changes

  return { data, loading, error };
};
