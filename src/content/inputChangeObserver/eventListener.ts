import { useStore } from "../../store/useStore";

export const useEventListeners = () => {
  const { saveValue, pushValueImmediately } = useStore();

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

  return { handleInput, pushValueImmediately };
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
