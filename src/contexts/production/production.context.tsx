import { createContext, useCallback, useEffect, useReducer } from 'react';
import { type ReactNode } from 'react';

import {
  type Production,
  type ProductionAction,
  ProductionActionType,
  type ProductionState,
} from './production.type';

const initialState: ProductionState = {
  productions: [],
  isLoading: false,
};

type Handler<A extends ProductionAction> = (state: ProductionState, action: A) => ProductionState;

const setProductions: Handler<
  Extract<ProductionAction, { type: ProductionActionType.SET_PRODUCTIONS }>
> = (state, action) => ({
  ...state,
  productions: action.payload,
});

const selectProduction: Handler<
  Extract<ProductionAction, { type: ProductionActionType.SELECT_PRODUCTION }>
> = (state, action) => ({
  ...state,
  selectedProduction: action.payload,
});

const unselectProduction: Handler<
  Extract<ProductionAction, { type: ProductionActionType.SELECT_PRODUCTION }>
> = (state) => ({
  ...state,
});

const setLoading: Handler<Extract<ProductionAction, { type: ProductionActionType.SET_LOADING }>> = (
  state,
  action,
) => ({
  ...state,
  isLoading: action.payload,
});

const setError: Handler<Extract<ProductionAction, { type: ProductionActionType.SET_ERROR }>> = (
  state,
  action,
) => ({
  ...state,
  error: action.payload,
  isLoading: false,
});

const handlers = {
  [ProductionActionType.SET_PRODUCTIONS]: setProductions,
  [ProductionActionType.SELECT_PRODUCTION]: selectProduction,
  [ProductionActionType.UNSELECT_PRODUCTION]: unselectProduction,
  [ProductionActionType.SET_LOADING]: setLoading,
  [ProductionActionType.SET_ERROR]: setError,
};

function productionReducer(state: ProductionState, action: ProductionAction): ProductionState {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handler = handlers[action.type as keyof typeof handlers] as Handler<any> | undefined;
  return handler ? handler(state, action) : state;
}

interface ProductionContextType extends ProductionState {
  selectProduction: (production: Production) => void;
  selectProductionById: (productionId: Production['id']) => void;
  fetchProductions: () => Promise<void>;
  unselectProduction: () => void;
}

const ProductionContext = createContext<ProductionContextType | undefined>(undefined);

function ProductionProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(productionReducer, initialState);

  const fetchProductions = useCallback(async () => {
    try {
      dispatch({ type: ProductionActionType.SET_LOADING, payload: true });
      const response = await fetch(`${import.meta.env.VITE_API_URL}/productions`);

      if (!response.ok) {
        throw new Error('Failed to fetch productions');
      }

      const data = await response.json();
      dispatch({ type: ProductionActionType.SET_PRODUCTIONS, payload: data });
    } catch (error) {
      dispatch({
        type: ProductionActionType.SET_ERROR,
        payload: error instanceof Error ? error.message : 'An error occurred',
      });
    } finally {
      dispatch({ type: ProductionActionType.SET_LOADING, payload: false });
    }
  }, []);

  const selectProductionById = (productionId: Production['id']) => {
    const production = state.productions.find((p) => p.id === productionId);
    if (production) {
      dispatch({ type: ProductionActionType.SELECT_PRODUCTION, payload: production });
    }
  };

  const selectProduction = (production: Production) => {
    dispatch({ type: ProductionActionType.SELECT_PRODUCTION, payload: production });
  };

  const unselectProduction = () => {
    dispatch({ type: ProductionActionType.UNSELECT_PRODUCTION });
  };

  const handleStorage = useCallback(() => {
    fetchProductions();
  }, [fetchProductions]);

  useEffect(() => {
    fetchProductions();
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, [fetchProductions, handleStorage]);

  return (
    <ProductionContext.Provider
      value={{
        ...state,
        selectProduction,
        unselectProduction,
        selectProductionById,
        fetchProductions,
      }}
    >
      {children}
    </ProductionContext.Provider>
  );
}

export { ProductionProvider, ProductionContext };
