import {
  type Active,
  DndContext,
  type DragEndEvent,
  DragOverlay,
  type DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { arrayMove, SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { ArrowLeftIcon } from 'lucide-react';

import { Button } from '../../components/Button';
import { Column } from '../../components/Column';
import { Scene, type SceneProps } from '../../components/Scene';
import Title from '../../components/title';
import { useProduction } from '../../hooks/useProduction';

import { SceneModal, type SceneDetails } from '../../components/SceneModal';
import { useScene } from '../../hooks/useScene';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';


const steps: Record<number, string> = {
  1: 'Roteirizado',
  2: 'Em pré-produção',
  3: 'Em gravação',
  4: 'Em pós-produção',
  5: 'Finalizado',
};

const Studio = () => {
  const { selectedProduction, unselectProduction, selectProductionById } = useProduction();
  const { moveScene, updateScene, scenes, updateScenesOrder } = useScene();
  const [activeScene, setActiveScene] = useState<SceneProps | null>(null);
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const handleUnselectProduction = () => {
    unselectProduction();
    navigate('/');
  };

  if (!selectedProduction) {
    selectProductionById(id!);
  }

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    setActiveScene(getActiveScene(active));
  };

  const getActiveScene = (active: Active | null): SceneProps | null => {
    return scenes.find(scene => scene.id === String(active?.id)) || null;
  };

  const handleDragEnd = (event: DragEndEvent) => {
  setActiveScene(null);

  const { active, over } = event;
  if (!over || active.id === over.id) return;

  const activeSceneObj = scenes.find(scene => scene.id === active.id);
  const overSceneObj = scenes.find(scene => scene.id === over.id);

  if (
    activeSceneObj &&
    overSceneObj &&
    activeSceneObj.step === overSceneObj.step
  ) {
    const step = activeSceneObj.step;
    const stepScenes = scenes.filter(scene => scene.step === step);
    const oldIndex = stepScenes.findIndex(scene => scene.id === active.id);
    const newIndex = stepScenes.findIndex(scene => scene.id === over.id);

    if (oldIndex !== newIndex) {
      const newOrder = arrayMove(stepScenes, oldIndex, newIndex);

      updateScenesOrder(step, newOrder);
    }
    return;
  }

  const fromStep = Number(activeSceneObj?.step);
  const toStep = Number(overSceneObj?.step);

  if (toStep !== fromStep + 1) return;

  moveScene(active.id as string, toStep);
};

  const handleSceneUpdate = (updatedScene: SceneDetails) => {
    updateScene(updatedScene);
  };

  const countedScenesByStep = (step: number) => scenes.filter((s) => s.step === step).length;

  const filteredScenesByStep = (step: number) => scenes.filter(
  (scene) => scene.step === step
)

  const stepIndexList = Object.keys(steps).map(Number)

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        delay: 200,
        tolerance: 5,
      },
    }),
  );

  return (
    <div className='w-full bg-background p-4 flex flex-col gap-4 h-full'> 
      <div className='flex items-center gap-4'>
        <Button variant='outline' size='icon' className='cursor-pointer' onClick={() => handleUnselectProduction()}>
          <ArrowLeftIcon />
        </Button>
        <Title />
      </div>
      <div className='flex gap-4 overflow-x-auto w-full h-full'>
        <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd} sensors={sensors}>
          <DragOverlay>{activeScene ? <Scene {...activeScene} /> : null}</DragOverlay>
          {stepIndexList.map((step) => (
            <Column
              key={step}
              id={`${step}`}
              step={step}
              label={steps[step]}
              count={countedScenesByStep(step)}
            >
              <SortableContext
                items={filteredScenesByStep(step).map(scene => scene.id)}
                strategy={verticalListSortingStrategy}
              >
                {filteredScenesByStep(step).map((scene) => (
                  <Scene key={scene.id} {...scene} onUpdate={handleSceneUpdate} />
                ))}
              </SortableContext>
            </Column>
          ))}
        </DndContext>
      </div>
    </div>
  );
};

export default Studio;
