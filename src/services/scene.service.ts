import { type Scene } from '../contexts/scenes/scenes.types';
import { safeFetch } from '../utils/safeFetch';

const fetchScenes = async (): Promise<Scene[]> => {
  return (await safeFetch<Scene[]>('/scenes')) ?? [];
};

const saveScene = async (scene: Partial<Scene>, id?: string): Promise<Scene | undefined> => {
  const method = id ? 'PUT' : 'POST';
  const url = `/scenes${id ? `/${id}` : ''}`;

  return await safeFetch<Scene>(url, {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(scene),
  });
};

export { fetchScenes, saveScene };
