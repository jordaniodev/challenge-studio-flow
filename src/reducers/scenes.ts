type Scene = {
  id: string;
  title: string;
  description: string;
  step: number;
  columnId: string;
};

type State = {
  scenes: Scene[];
  loading: boolean;
  error: string | null;
};

const initialSceneState: State = {
  scenes: [],
  loading: false,
  error: null,
};

type Action =
  | { type: 'SET_SCENES'; payload: Scene[] }
  | { type: 'MOVE_SCENE'; payload: { id: string; toStep: number } }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null };

const sceneReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'SET_SCENES':
      return { ...state, scenes: action.payload, error: null };

    case 'MOVE_SCENE':
      return {
        ...state,
        scenes: state.scenes.map((scene) =>
          scene.id === action.payload.id ? { ...scene, step: action.payload.toStep } : scene,
        ),
      };

    case 'SET_LOADING':
      return { ...state, loading: action.payload };

    case 'SET_ERROR':
      return { ...state, error: action.payload };

    default:
      return state;
  }
};

export { initialSceneState, sceneReducer };
