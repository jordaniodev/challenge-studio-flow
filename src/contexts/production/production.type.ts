interface Production {
  id: string;
  name: string;
  description?: string;
}

interface ProductionState {
  productions: Production[];
  selectedProduction?: Production | null;
  isLoading: boolean;
  error?: string;
}

enum ProductionActionType {
  SET_PRODUCTIONS = 'SET_PRODUCTIONS',
  SELECT_PRODUCTION = 'SELECT_PRODUCTION',
  UNSELECT_PRODUCTION = 'UNSELECT_PRODUCTION',
  SET_LOADING = 'SET_LOADING',
  SET_ERROR = 'SET_ERROR',
}

type ProductionAction =
  | { type: ProductionActionType.SET_PRODUCTIONS; payload: Production[] }
  | { type: ProductionActionType.SELECT_PRODUCTION; payload: Production }
  | { type: ProductionActionType.UNSELECT_PRODUCTION }
  | { type: ProductionActionType.SET_LOADING; payload: boolean }
  | { type: ProductionActionType.SET_ERROR; payload?: string };

export type { Production, ProductionState, ProductionAction };
export { ProductionActionType };
