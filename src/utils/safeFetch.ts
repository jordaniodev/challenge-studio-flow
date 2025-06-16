import { toast } from 'react-toastify';

export async function safeFetch<T = any>(url: string, options: RequestInit = {}): Promise<T | undefined> {
  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}${url}`, options);

    if (!response.ok) {
      const { statusText } = await response.json();
      throw new Error(statusText);
    }

    return await response.json() as T;
  } catch (error: any) {
    toast.error('Network error: Unable to fetch data.');
    return undefined;
  }
}
