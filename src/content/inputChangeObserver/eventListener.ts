import { useStore } from "../store/useStore";

export const inputTagList = [
  "input",
  "textarea",
  "[contenteditable='true']",
] as const;

export const useEventListeners = () => {
  const { saveValue } = useStore();

  const handleInput = (event: Event) => {
    const eventTarget = event.target;
    if (!isHTMLElement(eventTarget)) {
      return;
    }
    const value = getInputValue(eventTarget);
    const identifier = getElementIdentifier(eventTarget);
    if (value === undefined) {
      return;
    }
    saveValue({ identifier, value });
  };

  // blur イベントの処理
  const handleBlur = (event: Event) => {
    const eventTarget = event.target;
    if (!isHTMLElement(eventTarget)) {
      return;
    }
    const value = getInputValue(eventTarget);
    const identifier = getElementIdentifier(eventTarget);
    if (value === undefined) {
      return;
    }
    saveValue({ identifier, value });
  };

  const addEventListenersToFormElements = () => {
    const inputs = getInputElements();

    inputs.forEach((input) => {
      input.addEventListener("input", handleInput);
      input.addEventListener("blur", handleBlur);
    });
  };

  return { handleInput, handleBlur, addEventListenersToFormElements };
};

export const getInputElements = () => {
  return document.querySelectorAll(inputTagList.join(", "));
};

const isHTMLElement = (target: EventTarget | null): target is HTMLElement => {
  return target instanceof HTMLElement;
};

const isEditableTag = (
  eventTarget: HTMLElement
): eventTarget is HTMLInputElement | HTMLTextAreaElement => {
  return eventTarget.tagName === "INPUT" || eventTarget.tagName === "TEXTAREA";
};

const getInputValue = (eventTarget: EventTarget) => {
  if (!isHTMLElement(eventTarget)) {
    return;
  }
  if (isEditableTag(eventTarget)) {
    return eventTarget.value;
  } else {
    return eventTarget.innerText;
  }
};

const getElementIdentifier = (element: HTMLElement) => {
  return (
    element.getAttribute("id") ||
    element.getAttribute("name") ||
    element.getAttribute("aria-label") ||
    element.getAttribute("placeholder") ||
    element.getAttribute("class") ||
    "unknown"
  );
};
