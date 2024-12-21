export const inputTagList = [
  "input",
  "textarea",
  "[contenteditable='true']",
] as const;

export const addEventListenersToFormElements = () => {
  const inputs = getInputElements();

  inputs.forEach((input) => {
    input.addEventListener("input", handleInput);
    input.addEventListener("blur", handleBlur);
  });
};

export const getInputElements = () => {
  return document.querySelectorAll(inputTagList.join(", "));
};

export const handleInput = (event: Event) => {
  const eventTarget = event.target;
  if (!isHTMLElement(eventTarget)) {
    return;
  }
  const value = getInputValue(eventTarget);
  const identifier = getElementIdentifier(eventTarget);
  console.log("Input detected:", identifier, value);
};

// blur イベントの処理
export const handleBlur = (event: Event) => {
  const eventTarget = event.target;
  if (!isHTMLElement(eventTarget)) {
    return;
  }
  const value = getInputValue(eventTarget);
  const identifier = getElementIdentifier(eventTarget);
  console.log("Blur detected:", identifier, value);
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
    element.getAttribute("class")
  );
};
