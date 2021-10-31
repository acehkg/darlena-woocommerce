import { useState } from 'react';
interface BooleanState {
  value: boolean;
  setTrue: () => void;
  setFalse: () => void;
  toggle: () => void;
}

export const useBooleanState = (initialValue = false): BooleanState => {
  const [value, setValue] = useState<boolean>(initialValue);
  const setTrue = () => setValue(true);
  const setFalse = () => setValue(false);
  const toggle = () => setValue(!value);
  return { value, toggle, setTrue, setFalse };
};

export interface DataState<T> {
  value: T;
  set: (newValue: T) => void;
  reset: () => void;
}

export const useDataState = <T>(initialValue?: T): DataState<T | undefined> => {
  const [value, setValue] = useState<T | undefined>(initialValue);
  const set = (newValue: T | undefined) => setValue(newValue);
  const reset = () => setValue(undefined);
  return { value, set, reset };
};
