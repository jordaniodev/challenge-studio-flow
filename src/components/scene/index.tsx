import { useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';

interface SceneProps {
  id: string;
  step: number;
  title: string;
  columnId: string;
  description: string;
}

const Scene = ({ id, title, description, columnId, step }: SceneProps) => {
  const { attributes, listeners, setNodeRef, transform, active } = useDraggable({
    id,
    attributes: { role: 'button' },
    data: {
      columnId,
      step,
      title,
      description,
    },
    disabled: false,
  });

  if (active?.id === id) {
    return null;
  }

  return (
    <div
      ref={setNodeRef}
      style={{
        transform: CSS.Translate.toString(transform),
      }}
      {...listeners}
      {...attributes}
      className='flex flex-col gap-2 p-2 cursor-pointer bg-primary text-accent rounded-lg border border-border'
    >
      <div className='flex items-center gap-2'>
        <div className='w-10 h-10 bg-primary rounded-full'></div>
        <div className='flex flex-col gap-1'>
          <span className='text-sm font-medium'>{title}</span>
          <span className='text-xs'>{description}</span>
        </div>
      </div>
    </div>
  );
};

export { Scene, type SceneProps };
