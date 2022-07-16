import React from "react";

export function useOutsideClick<T extends HTMLElement>(
  ref: React.RefObject<T>,
  onClickOutside?: () => void
) {
  React.useEffect(() => {
    if (onClickOutside) {
      const handleOutsideClick = (e: MouseEvent) => {
        if (e.target && !ref.current?.contains(e.target as HTMLElement)) {
          onClickOutside?.();
        }
      };
      window.addEventListener("click", handleOutsideClick);
      return () => {
        window.removeEventListener("click", handleOutsideClick);
      };
    }
  }, [onClickOutside]);
}
