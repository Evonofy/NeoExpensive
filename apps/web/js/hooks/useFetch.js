const useAsync = async (promise) => {
  try {
    const response = await promise;
    const data = await response.json();

    return [data, null];
  } catch (error) {
    console.error(`[useFetch] -> ERROR: ${error}`);
    return [null, error];
  }
};

const handleAPIError = (error) => {
  return {
    message: `[useFetch] -> Error: ${error}`,
    data: null,
    error,
  };
};

const handleAPIResponse = (response) => {
  const { message, ...rest } = response;

  return {
    message,
    data: rest,
    error: null,
  };
};

/* TODO: find a better way to switch dev and prod urls */
// const API_URL = 'https://neo-expensive.herokuapp.com/v1';
const API_URL = 'https://neo-expensive-backend.herokuapp.com';
// const API_URL = 'http://localhost:3333';

export const useFetch = async (url, body, options) => {
  const [response, error] = await useAsync(
    fetch(`${API_URL}${url}`, {
      body,
      method: !!body ? 'POST' : 'GET',
      ...options,
    })
  );

  if (error) {
    handleAPIError(error);
  }

  return handleAPIResponse(response);
};

/*
  TODO: Create hashtable, store the fetch data in there, get it from there to minize fetch requests
 */
useFetch.get = async (url, options) => {
  const [response, error] = await useAsync(
    fetch(`${API_URL}${url}`, {
      method: 'GET',
      ...options,
    })
  );

  if (error) {
    handleAPIError(error);
  }

  return handleAPIResponse(response);
};

useFetch.post = async (url, body, options) => {
  const [response, error] = await useAsync(
    fetch(`${API_URL}${url}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
      ...options,
    })
  );

  if (error) {
    handleAPIError(error);
  }

  return handleAPIResponse(response);
};
