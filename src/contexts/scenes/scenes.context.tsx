import {
  type ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useReducer,
  useState,
} from 'react';

import { fetchScenes } from '../../services/scene.service';
import { type Action, ActionType, type Scene, type State } from './scenes.types';

const initialSceneState: State = {
  scenes: [],
  loading: false,
  error: null,
};

type Handler<A extends Action> = (state: State, action: A) => State;

const setScenes: Handler<Extract<Action, { type: ActionType.SET_SCENES }>> = (state, action) => ({
  ...state,
  scenes: action.payload,
  error: null,
});

const moveScene: Handler<Extract<Action, { type: ActionType.MOVE_SCENE }>> = (state, action) => ({
  ...state,
  scenes: state.scenes.map((scene) =>
    scene.id === action.payload.id ? { ...scene, step: action.payload.toStep } : scene,
  ),
});

const updateScene: Handler<Extract<Action, { type: ActionType.UPDATE_SCENE }>> = (
  state,
  action,
) => ({
  ...state,
  scenes: state.scenes.map((scene) =>
    scene.id === action.payload.id ? { ...scene, ...action.payload } : scene,
  ),
});

const setLoading: Handler<Extract<Action, { type: ActionType.SET_LOADING }>> = (state, action) => ({
  ...state,
  loading: action.payload,
});

const setError: Handler<Extract<Action, { type: ActionType.SET_ERROR }>> = (state, action) => ({
  ...state,
  error: action.payload,
  loading: false,
});

const updateScenesOrderInStep: Handler<
  Extract<Action, { type: ActionType.UPDATE_SCENES_ORDER_IN_STEP }>
> = (state, action) => ({
  ...state,
  scenes: [
    ...state.scenes.filter((scene) => scene.step !== action.payload.step),
    ...action.payload.newOrder,
  ],
});

const handlers = {
  [ActionType.SET_SCENES]: setScenes,
  [ActionType.MOVE_SCENE]: moveScene,
  [ActionType.UPDATE_SCENE]: updateScene,
  [ActionType.SET_LOADING]: setLoading,
  [ActionType.SET_ERROR]: setError,
  [ActionType.UPDATE_SCENES_ORDER_IN_STEP]: updateScenesOrderInStep,
};

function sceneReducer(state: State, action: Action): State {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handler = handlers[action.type as keyof typeof handlers] as Handler<any> | undefined;
  return handler ? handler(state, action) : state;
}

interface SceneContextValue extends State {
  loadScenes: () => Promise<void>;
  moveScene: (id: string, toStep: number) => void;
  updateScene: (scene: Scene) => void;
  updateScenesOrder: (step: number, newOrder: Scene[]) => void;
  setSceneFilter: (value: string) => void;
  filter: string;
}

const SceneContext = createContext<SceneContextValue | undefined>(undefined);

function SceneProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(sceneReducer, initialSceneState);
  const [filter, setFilter] = useState('');
  const [allScenes, setAllScenes] = useState<Scene[]>([]);

  const updateScenesOrder = (step: number, newOrder: Scene[]) => {
    dispatch({ type: ActionType.UPDATE_SCENES_ORDER_IN_STEP, payload: { step, newOrder } });
  };
  const loadScenes = useCallback(async () => {
    try {
      dispatch({ type: ActionType.SET_LOADING, payload: true });

      const scenes = await fetchScenes();
      setAllScenes(scenes);
      dispatch({ type: ActionType.SET_SCENES, payload: scenes });
    } catch (error) {
      dispatch({
        type: ActionType.SET_ERROR,
        payload: error instanceof Error ? error.message : 'An error occurred',
      });
    } finally {
      dispatch({ type: ActionType.SET_LOADING, payload: false });
    }
  }, []);

  const setSceneFilter = (value: string) => {
    setFilter(value);
    if (!value.trim()) {
      dispatch({ type: ActionType.SET_SCENES, payload: allScenes });
      return;
    }
    const lower = value.trim().toLowerCase();
    const filtered = allScenes.filter(
      (scene) =>
        scene.title.toLowerCase().includes(lower) ||
        scene.description.toLowerCase().includes(lower),
    );
    dispatch({ type: ActionType.SET_SCENES, payload: filtered });
  };

  const moveSceneHandler = (id: string, toStep: number) => {
    dispatch({ type: ActionType.MOVE_SCENE, payload: { id, toStep } });
  };

  const updateSceneHandler = (scene: Scene) => {
    dispatch({ type: ActionType.UPDATE_SCENE, payload: scene });
  };

  const handleStorage = useCallback(() => {
    loadScenes();
  }, [loadScenes]);

  useEffect(() => {
    loadScenes();
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, [loadScenes, handleStorage]);

  return (
    <SceneContext.Provider
      value={{
        ...state,
        loadScenes,
        moveScene: moveSceneHandler,
        updateScene: updateSceneHandler,
        updateScenesOrder,
        setSceneFilter,
        filter,
      }}
    >
      {children}
    </SceneContext.Provider>
  );
}

function useSceneContext() {
  const context = useContext(SceneContext);
  if (!context) throw new Error('useSceneContext must be used within a SceneProvider');
  return context;
}

// eslint-disable-next-line react-refresh/only-export-components
export { SceneProvider, useSceneContext, SceneContext };
