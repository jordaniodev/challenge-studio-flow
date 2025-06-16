import { Fragment, useState } from 'react';

import { Dialog, DialogPanel, DialogTitle, Transition, TransitionChild } from '@headlessui/react';
import { XIcon } from 'lucide-react';

import { type Scene as SceneDetails } from '../../contexts/scenes/scenes.types';
import { useScene } from '../../hooks/useScene';
import { saveScene } from '../../services/scene.service';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  scene?: SceneDetails;
}

const steps: Record<number, string> = {
  1: 'Roteirizado',
  2: 'Em pré-produção',
  3: 'Em gravação',
  4: 'Em pós-produção',
  5: 'Finalizado',
};

const SceneModal = ({ isOpen, onClose, scene }: ModalProps) => {
  const [editedScene, setEditedScene] = useState<Partial<SceneDetails> | undefined>(scene);
  const [isSaving, setIsSaving] = useState(false);
  const { updateScene } = useScene();

  const handleChange = <K extends keyof SceneDetails>(field: K, value: SceneDetails[K]) => {
    setEditedScene((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!editedScene) return;

    editedScene.step = editedScene?.step ?? 1;

    setIsSaving(true);

    const editedSceneResponse = await saveScene(editedScene, editedScene.id);

    updateScene(editedSceneResponse as SceneDetails);
    onClose();
    setIsSaving(false);
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as='div' className='relative z-50' onClose={onClose}>
        <TransitionChild
          as={Fragment}
          enter='ease-out duration-300'
          enterFrom='opacity-0'
          enterTo='opacity-100'
          leave='ease-in duration-200'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'
        >
          <div className='fixed inset-0 bg-black/25' />
        </TransitionChild>
        <div className='fixed inset-0 overflow-y-auto'>
          <div className='flex min-h-full items-center justify-center p-4 text-center'>
            <TransitionChild
              as={Fragment}
              enter='ease-out duration-300'
              enterFrom='opacity-0 scale-95'
              enterTo='opacity-100 scale-100'
              leave='ease-in duration-200'
              leaveFrom='opacity-100 scale-100'
              leaveTo='opacity-0 scale-95'
            >
              <DialogPanel className='w-full max-w-md transform overflow-hidden rounded-2xl bg-background p-6 text-left align-middle shadow-xl transition-all'>
                <div className='flex items-center justify-between mb-4'>
                  <DialogTitle as='h3' className='text-lg font-medium leading-6 text-primary'>
                    {scene ? 'Detalhes da Cena' : 'Criar Cena'}
                  </DialogTitle>
                  <button
                    onClick={onClose}
                    className='rounded-full p-1 hover:bg-primary/10 transition-colors'
                  >
                    <XIcon className='h-5 w-5 text-primary' />
                  </button>
                </div>
                <form onSubmit={handleSubmit}>
                  <div className='space-y-4'>
                    <div>
                      <h4 className='text-sm font-medium text-primary/70'>Título</h4>
                      <input
                        required
                        type='text'
                        value={editedScene?.title}
                        onChange={(e) => handleChange('title', e.target.value)}
                        className='mt-1 w-full rounded-md border border-border bg-background px-3 py-2 text-primary focus:outline-none focus:ring-2 focus:ring-primary/50'
                      />
                    </div>

                    <div>
                      <h4 className='text-sm font-medium text-primary/70'>Descrição</h4>
                      <textarea
                        required
                        value={editedScene?.description}
                        onChange={(e) => handleChange('description', e.target.value)}
                        className='mt-1 w-full rounded-md border border-border bg-background px-3 py-2 text-primary focus:outline-none focus:ring-2 focus:ring-primary/50'
                        rows={3}
                      />
                    </div>

                    <div>
                      <h4 className='text-sm font-medium text-primary/70'>Episódio</h4>
                      <input
                        type='number'
                        required
                        value={editedScene?.episode}
                        onChange={(e) => handleChange('episode', e.target.value)}
                        className='mt-1 w-full rounded-md border border-border bg-background px-3 py-2 text-primary focus:outline-none focus:ring-2 focus:ring-primary/50'
                      />
                    </div>

                    <div>
                      <h4 className='text-sm font-medium text-primary/70'>Status</h4>
                      <select
                        required
                        value={editedScene?.step}
                        onChange={(e) => handleChange('step', Number(e.target.value))}
                        className='mt-1 w-full rounded-md border border-border bg-background px-3 py-2 text-primary focus:outline-none focus:ring-2 focus:ring-primary/50'
                      >
                        {Object.entries(steps).map(([value, label]) => (
                          <option key={value} value={value}>
                            {label}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <h4 className='text-sm font-medium text-primary/70'>Data de Gravação</h4>
                      <input
                        type='date'
                        required
                        value={editedScene?.recordDate}
                        onChange={(e) => handleChange('recordDate', e.target.value)}
                        min={new Date().toISOString().split('T')[0]}
                        className='mt-1 w-full rounded-md border border-border bg-background px-3 py-2 text-primary focus:outline-none focus:ring-2 focus:ring-primary/50'
                      />
                    </div>

                    <div>
                      <h4 className='text-sm font-medium text-primary/70'>Local de Gravação</h4>
                      <input
                        type='text'
                        required
                        value={editedScene?.recordLocation}
                        onChange={(e) => handleChange('recordLocation', e.target.value)}
                        className='mt-1 w-full rounded-md border border-border bg-background px-3 py-2 text-primary focus:outline-none focus:ring-2 focus:ring-primary/50'
                      />
                    </div>

                    <div className='mt-6 flex justify-end gap-3'>
                      <button
                        onClick={onClose}
                        className='rounded-md px-4 py-2 text-sm font-medium text-primary hover:bg-primary/10'
                      >
                        Cancelar
                      </button>
                      <button
                        disabled={isSaving}
                        type='submit'
                        className='rounded-md bg-primary px-4 py-2 text-sm font-medium text-accent hover:bg-primary/90 disabled:opacity-50'
                      >
                        {isSaving ? 'Salvando...' : 'Salvar'}
                      </button>
                    </div>
                  </div>
                </form>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export { SceneModal, type SceneDetails };
