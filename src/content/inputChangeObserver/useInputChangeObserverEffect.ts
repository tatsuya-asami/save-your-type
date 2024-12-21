import { useEffect } from "react";
import {
  addEventListenersToFormElements,
  getInputElements,
  handleBlur,
  handleInput,
  inputTagList,
} from "./eventListener";
import { monitorDOMChanges } from "./monitorDOMChanges";

export const useInputChangeObserverEffect = () => {
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
  }, []);
};
