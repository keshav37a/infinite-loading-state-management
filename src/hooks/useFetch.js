import { useState, useEffect } from "react";

function useFetch(url) {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    console.log(url);
    function handleFetchData(url) {
      setLoading(true);
      fetch(url)
        .then((data) => data.json())
        .then((jsonData) => {
          setData(jsonData);
          setError(null);
          setLoading(false);
        })
        .catch((e) => {
          setError(e);
          setLoading(false);
          setData(null);
        });
    }
    handleFetchData(url);
  }, [url]);

  return { data, error, loading };
}

export default useFetch;
