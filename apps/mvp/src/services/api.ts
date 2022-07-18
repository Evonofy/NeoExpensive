// @ts-ignore
const API_BASE_URL = String(import.meta.env.VITE_API_URL);

export const api = async <ResponseObject = {}>(
  input: RequestInfo | URL,
  init?: RequestInit
): Promise<ResponseObject> => {
  return await (await fetch(`${API_BASE_URL}${input}`, init)).json();
};

export const blob = async (input: RequestInfo | URL, init?: RequestInit) => {
  return await (await fetch(`${API_BASE_URL}${input}`, init)).blob();
};
