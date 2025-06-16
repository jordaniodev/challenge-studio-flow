import { useContext } from 'react';

import { SceneContext } from '../contexts/scenes/scenes.context';

export function useScene() {
  const context = useContext(SceneContext);

  if (context === undefined) {
    throw new Error('useScene must be used within a SceneProvider');
  }

  return context;
}
