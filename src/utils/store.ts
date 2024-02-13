import { useState, useEffect } from 'react';

const useStore = <T, F>(
  store: (callback: (state: T) => unknown) => F,
  callback: (state: T) => F
) => {
  const [data, setData] = useState<F>();

  useEffect(() => {
    const result = store(callback);
    setData(result);
  }, [store,callback]);

  return data;
};

export default useStore;