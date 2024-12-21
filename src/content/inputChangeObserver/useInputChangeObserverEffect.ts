import { useEffect } from "react";
import { useEventListeners } from "./eventListener";
import { monitorDOMChanges } from "./monitorDOMChanges";

export const useInputChangeObserverEffect = () => {
  const { handleInput } = useEventListeners();

  useEffect(() => {
    document.body.addEventListener("input", handleInput);

    return () => {
      document.body.removeEventListener("input", handleInput);
    };
  }, [handleInput]);

  useEffect(() => {
    const observer = monitorDOMChanges(handleInput);

    return () => {
      observer.disconnect();
    };
  }, [handleInput]);
};
