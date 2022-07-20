// @ts-ignore
export const API_BASE_URL = String(import.meta.env.VITE_API_URL);

export const promise = async <Result>(callback: () => Promise<Result>): Promise<[Result | null, Error | null]> => {
  try {
    const result = await callback();

    return [result, null];
  } catch (error) {
    return [null, error as Error];
  }
};

export const api = async <ResponseObject = {}>(
  input: RequestInfo | URL,
  init?: RequestInit
): Promise<ResponseObject> => {
  return await (await fetch(`${API_BASE_URL}/api${input}`, init)).json();
};

api.post = async <ResponseObject = {}>(input: RequestInfo | URL, body: object): Promise<ResponseObject> => {
  return await (
    await fetch(`${API_BASE_URL}/api${input}`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })
  ).json();
};

export const blob = async (input: RequestInfo | URL, init?: RequestInit) => {
  return await (await fetch(`${API_BASE_URL}/api${input}`, init)).blob();
};
