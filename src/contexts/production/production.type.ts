
export interface Production {
    id: string
    name: string
    description?: string
}

export interface ProductionState {
    productions: Production[]
    selectedProduction?: Production | null
    isLoading: boolean
    error?: string
}
export enum ProductionActionType {
    SET_PRODUCTIONS = "SET_PRODUCTIONS",
    SELECT_PRODUCTION = "SELECT_PRODUCTION",
    UNSELECT_PRODUCTION = "UNSELECT_PRODUCTION",
    SET_LOADING = "SET_LOADING",
    SET_ERROR = "SET_ERROR"
}

export type ProductionAction =
    | { type: ProductionActionType.SET_PRODUCTIONS; payload: Production[] }
    | { type: ProductionActionType.SELECT_PRODUCTION; payload: Production }
    | { type: ProductionActionType.UNSELECT_PRODUCTION; }
    | { type: ProductionActionType.SET_LOADING; payload: boolean }
    | { type: ProductionActionType.SET_ERROR; payload?: string }