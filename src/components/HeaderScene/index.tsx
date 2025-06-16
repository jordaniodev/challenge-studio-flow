import { useCallback, useRef, useState } from 'react';

import { useScene } from '../../hooks/useScene';
import { Button } from '../Button';
import { Input } from '../Input';
import { SceneModal } from '../SceneModal';

export const HeaderScene = () => {
  const { setSceneFilter } = useScene();
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [isCreateSceneModalOpen, setIsCreateSceneModalOpen] = useState(false);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      if (debounceRef.current) clearTimeout(debounceRef.current);
      debounceRef.current = setTimeout(() => {
        setSceneFilter(value);
      }, 350);
    },
    [setSceneFilter],
  );

  return (
    <>
      <SceneModal
        isOpen={isCreateSceneModalOpen}
        onClose={() => setIsCreateSceneModalOpen(false)}
      />
      <div className='flex items-center gap-2 grow justify-center max-w-xl'>
        <Input placeholder='Pesquisar' className='grow' onChange={handleChange} />
        <Button
          variant='default'
          className='w-[150px]'
          onClick={() => setIsCreateSceneModalOpen(true)}
        >
          Criar cena
        </Button>
      </div>
    </>
  );
};
