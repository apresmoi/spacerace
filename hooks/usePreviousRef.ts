import React from "react";

export function usePreviousRef<T>(state: T, initialState?: T): T | undefined {
  const ref = React.useRef<T | undefined>(initialState);

  React.useEffect(() => {
    ref.current = state;
  }, [state]);

  return ref.current;
}
