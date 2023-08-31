import { useCallback, useState } from 'react';

import { API_URL } from '../assets/variables';

const useHttp = ({ endPoint, method, headers, errorMessage, responseOkFn }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const sendRequest = useCallback(
    async (body) => {
      try {
        setIsLoading(true);
        const response = await fetch(`${API_URL}/${endPoint}.json`, {
          method: method ? method : 'GET',
          headers: headers ? headers : {},
          body: body ? JSON.stringify(body) : null,
        });
        if (!response.ok) {
          throw Error(errorMessage);
        }
        const data = await response.json();
        responseOkFn(data);
      } catch (err) {
        setError(
          `Error: ${!!err.message ? err.message : 'Something went wrong.'}`
        );
      } finally {
        setIsLoading(false);
      }
    },
    [endPoint, method, headers, errorMessage, responseOkFn]
  );

  return {
    isLoading,
    error,
    sendRequest,
  };
};

export default useHttp;
