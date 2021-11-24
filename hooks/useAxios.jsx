import { useState, useEffect } from 'react';
import axios from 'axios';

const useAxios = ({ url, method, body = null, headers = null }) => {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState('');
  const [loading, setloading] = useState(true);

  const CancelToken = axios.CancelToken;
  const source = CancelToken.source();

  useEffect(() => {
    axios[method](url, JSON.parse(headers), JSON.parse(body), {
      cancelToken: source.token,
    })
      .then((res) => {
        setResponse(res.data);
      })
      .catch((err) => {
        setError(err);
      })
      .finally(() => {
        setloading(false);
      });

    return () => {
      source.cancel;
    };
  }, [method, url, body, headers, source]);

  return { response, error, loading };
};

export default useAxios;
