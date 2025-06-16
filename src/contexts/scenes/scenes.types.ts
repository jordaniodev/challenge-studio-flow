import type { Dispatch, ReactNode } from "react";

export type Scene = {
    id: string;
    title: string;
    description: string;
    step: number;
    columnId: string;
    episode: string;
    recordDate: string;
    recordLocation: string;
};

export type State = {
    scenes: Scene[];
    loading: boolean;
    error: string | null;
};

export enum ActionType {
    SET_SCENES = 'SET_SCENES',
    MOVE_SCENE = 'MOVE_SCENE',
    SET_LOADING = 'SET_LOADING',
    UPDATE_SCENES_ORDER_IN_STEP = 'UPDATE_SCENES_ORDER_IN_STEP',
    SET_ERROR = 'SET_ERROR',
    UPDATE_SCENE = 'UPDATE_SCENE',
}

export type Action =
    | { type: ActionType.SET_SCENES; payload: Scene[] }
    | { type: ActionType.MOVE_SCENE; payload: { id: string; toStep: number } }
    | { type: ActionType.SET_LOADING; payload: boolean }
    | { type: ActionType.SET_ERROR; payload: string | null }
    | { type: ActionType.UPDATE_SCENES_ORDER_IN_STEP; payload: { step: number; newOrder: Scene[] } }
    | { type: ActionType.UPDATE_SCENE; payload: Scene };


export type SceneContextType = {
    state: State;
    dispatch: Dispatch<Action>;
};

export type SceneProviderProps = {
  children: ReactNode;
};

