import { useMemo, useState } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { type Scene as SceneType } from '../../contexts/scenes/scenes.types';
import { SceneModal } from '../SceneModal';

interface SceneProps {
  id: string;
  step: number;
  title: string;
  columnId: string;
  description: string;
  episode: string;
  recordDate: string;
  recordLocation: string;
  onUpdate?: (scene: SceneType) => void;
}

const heavyComputation = (text: string) => {
  return text.trim();
};

const Scene = ({
  id,
  title,
  description,
  columnId,
  step,
  episode,
  recordDate,
  recordLocation,
  onUpdate,
}: SceneProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const computedTitle = useMemo(() => heavyComputation(title), [title]);
  const computedDescription = useMemo(() => heavyComputation(description), [description]);

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id,
    data: {
      columnId,
      step,
      title,
      description,
      episode,
      recordDate,
      recordLocation,
    },
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  const sceneDetails: SceneType = {
    id,
    title,
    description,
    step,
    episode,
    columnId,
    recordDate,
    recordLocation,
  };

  return (
    <div>
      <SceneModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        scene={sceneDetails}
      />

      <div
        ref={setNodeRef}
        style={style}
        {...listeners}
        {...attributes}
        onClick={() => setIsModalOpen(true)}
        className='flex flex-col gap-2 p-2 cursor-pointer bg-primary text-accent rounded-lg border border-border'
      >
        <div className='flex flex-col gap-1'>
          <span className='text-sm font-medium'>{computedTitle}</span>
          <span className='text-xs'>{computedDescription}</span>
        </div>
      </div>
    </div>
  );
};

export { Scene, type SceneProps };