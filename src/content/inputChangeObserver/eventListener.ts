import { useStore } from "../../store/useStore";

export const useEventListeners = () => {
  const {
    saveValue,
    cancelPrevValueAndPushCurrentValue,
    pushValueImmediately,
  } = useStore();

  const handleInput = (event: Event) => {
    const eventTarget = event.target;
    if (!isHTMLElement(eventTarget)) {
      return;
    }
    const value = getInputValue(eventTarget);
    const identifier = getElementIdentifier(eventTarget);
    if (!value) {
      return;
    }
    saveValue({ identifier, value });
  };

  const handleBlur = (event: Event) => {
    const eventTarget = event.target;
    if (!isHTMLElement(eventTarget)) {
      return;
    }
    const value = getInputValue(eventTarget);
    const identifier = getElementIdentifier(eventTarget);
    if (!value) {
      return;
    }
    cancelPrevValueAndPushCurrentValue({ identifier, value });
  };

  return { handleInput, handleBlur, pushValueImmediately };
};

const isHTMLElement = (target: EventTarget | null): target is HTMLElement => {
  return target instanceof HTMLElement;
};

const isEditableTag = (
  eventTarget: HTMLElement
): eventTarget is HTMLInputElement | HTMLTextAreaElement => {
  return eventTarget.tagName === "INPUT" || eventTarget.tagName === "TEXTAREA";
};

const isExcludedElement = (element: HTMLElement) => {
  if (element.getAttribute("type") === "password") {
    return true;
  }
};

const getInputValue = (eventTarget: EventTarget) => {
  if (!isHTMLElement(eventTarget)) {
    return;
  }
  if (isExcludedElement(eventTarget)) {
    return;
  }
  if (isEditableTag(eventTarget)) {
    return eventTarget.value.trim();
  } else {
    return eventTarget.innerText.trim();
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
