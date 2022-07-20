import axios, { AxiosError } from 'axios';

// @ts-ignore
export const API_BASE_URL = String(import.meta.env.VITE_API_URL);

export const api = axios.create({
  baseURL: `${API_BASE_URL}/api`,
});

export const post = async <Response = {}>(url: string, data: object): Promise<Response> => {
  return await (
    await fetch(`${API_BASE_URL}/api${url}`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
      body: JSON.stringify(data),
    })
  ).json();
};

export const promise = async <Result>(callback: () => Promise<Result>): Promise<[Result | null, Error | null]> => {
  try {
    const result = await callback();

    // @ts-ignore
    if (result.data) {
      // @ts-ignore
      return [result.data, null];
    }

    return [result, null];
  } catch (error) {
    return [null, error as AxiosError];
  }
};

export const withAuth = (input: string, token: string): string => {
  // set axios authentication header here
  api.defaults.headers.common['Authorization'] = token;

  return input;
};

// export const api = async <ResponseObject = {}>(
//   input: (RequestInfo | URL) | WithAuth,
//   init?: RequestInit
// ): Promise<ResponseObject> => {
//   if (typeof input === 'object') {
//     const { input: _input, init } = input as unknown as WithAuth;

//     const response = await fetch(`${API_BASE_URL}/api${_input}`, init);

//     return await response.json();
//   }

//   return await (await fetch(`${API_BASE_URL}/api${input}`, init)).json();
// };

// api.post = async <ResponseObject = {}>(input: RequestInfo | URL, body: object): Promise<ResponseObject> => {
//   return await (
//     await fetch(`${API_BASE_URL}/api${input}`, {
//       method: 'POST',
//       headers: {
//         Accept: 'application/json',
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(body),
//     })
//   ).json();
// };

export const blob = async (input: RequestInfo | URL, init?: RequestInit) => {
  return await (await fetch(`${API_BASE_URL}/api${input}`, init)).blob();
};
