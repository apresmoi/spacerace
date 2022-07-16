import React from "react";
import { Store } from "./Store";

export function useStore() {
  return React.useContext(Store);
}
