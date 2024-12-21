import { useEffect } from "react";
import {
  getInputElements,
  inputTagList,
  useEventListeners,
} from "./eventListener";
import { monitorDOMChanges } from "./monitorDOMChanges";

export const useInputChangeObserverEffect = () => {
  const { handleInput, handleBlur, addEventListenersToFormElements } =
    useEventListeners();

  useEffect(() => {
    addEventListenersToFormElements();

    const observer = monitorDOMChanges(
      inputTagList,
      addEventListenersToFormElements
    );

    return () => {
      const inputs = getInputElements();
      inputs.forEach((input) => {
        input.removeEventListener("input", handleInput);
        input.removeEventListener("blur", handleBlur);
      });

      observer.disconnect();
    };
  }, [addEventListenersToFormElements, handleBlur, handleInput]);
};
