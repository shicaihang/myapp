import { EnthusiasmAction } from '../actions';
import { StoreState } from '../types';
import { INCREMENT_ENTHUSIASM, DECREMENT_ENTHUSIASM, RESET_ENTHUSIASM, ADD_CONSOLELOG } from '../constants';

export function enthusiasm(state: StoreState, action: EnthusiasmAction): StoreState {
  switch (action.type) {
    case INCREMENT_ENTHUSIASM:
      return { ...state, enthusiasmLevel: state.enthusiasmLevel + 1 };
    case DECREMENT_ENTHUSIASM:
      return { ...state, enthusiasmLevel: Math.max(1, state.enthusiasmLevel - 1) };
    case RESET_ENTHUSIASM:
      return { ...state, enthusiasmLevel: 1 };
    case ADD_CONSOLELOG:
      state.logs.push(action.log);
      return { ...state, logs: state.logs};
  }
  return state;
}