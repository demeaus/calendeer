import { useEffect, useRef } from "react";

// Hook to listen for a click outside of an area in the DOM
export default function useOutsideClick(action, listenCapturing = true) {
  // Represents the ex. modal as DOM element
  const ref = useRef();

  // Listens for click outside the element represented by the ref
  useEffect(() => {
    function handleClick(e) {
      // ref.current contains the DOM node
      if (ref.current && !ref.current.contains(e.target)) {
        action();
      }
    }
    document.addEventListener("click", handleClick, listenCapturing);

    return () =>
      document.removeEventListener("click", handleClick, listenCapturing);
  }, [action, listenCapturing]);

  return ref;
}
