import { useState, useEffect } from 'react';

function useFetching(fetchFunction, defaultState = null) {
  const [data, setData] = useState(defaultState);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const { error, data } = await fetchFunction();

      if (!error) setData(data);

      setLoading(false);

      return () => {
        setLoading(true);
      };
    }

    fetchData();
  }, []);

  return [data, loading];
}

export {
  useFetching,
}
