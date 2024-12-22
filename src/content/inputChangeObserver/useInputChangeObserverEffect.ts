import { useEffect } from "react";
import { useEventListeners } from "./eventListener";
import { monitorDOMChanges } from "./monitorDOMChanges";

export const useInputChangeObserverEffect = () => {
  const { handleInput, handleBlur, pushValueImmediately } = useEventListeners();

  useEffect(() => {
    window.addEventListener("beforeunload", pushValueImmediately);

    return () => {
      window.removeEventListener("beforeunload", pushValueImmediately);
    };
  }, [pushValueImmediately]);

  useEffect(() => {
    document.body.addEventListener("input", handleInput);
    document.body.addEventListener("paste", handleInput);

    return () => {
      document.body.removeEventListener("input", handleInput);
      document.body.removeEventListener("paste", handleInput);
    };
  }, [handleInput]);

  useEffect(() => {
    window.addEventListener("blur", handleBlur, true);

    return () => {
      window.removeEventListener("blur", handleBlur, true);
    };
  }, [handleBlur]);

  useEffect(() => {
    const observer = monitorDOMChanges(handleInput);

    return () => {
      observer.disconnect();
    };
  }, [handleInput]);
};
