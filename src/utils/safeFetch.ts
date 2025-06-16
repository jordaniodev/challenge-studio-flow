import { toast } from 'react-toastify';

export async function safeFetch<T>(url: string, options: RequestInit = {}): Promise<T | undefined> {
  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}${url}`, options);

    if (!response.ok) {
      const { statusText } = await response.json();
      throw new Error(statusText);
    }

    return (await response.json()) as T;
  } catch (error) {
    toast.error('Network error: Unable to fetch data.');
    // eslint-disable-next-line no-console
    console.error('Fetch error:', error);
    return undefined;
  }
}
