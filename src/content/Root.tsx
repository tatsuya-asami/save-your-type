export const Root: React.FC = () => {
  useExtractAllInputElements();

  return <></>;
};

const useExtractAllInputElements = () => {
  document.body.addEventListener("input", (event) => {
    const eventTarget = event.target;
    if (!isHTMLElement(eventTarget)) {
      return;
    }
    const content = getElementContent(eventTarget);
    if (!content) {
      return;
    }

    console.log("Input detected:", getElementIdentifier(eventTarget), content);
  });

  function isHTMLElement(target: EventTarget | null): target is HTMLElement {
    return target instanceof HTMLElement;
  }

  function isEditableTag(
    eventTarget: HTMLElement
  ): eventTarget is HTMLInputElement | HTMLTextAreaElement {
    return (
      eventTarget.tagName === "INPUT" || eventTarget.tagName === "TEXTAREA"
    );
  }

  function getElementContent(eventTarget: HTMLElement) {
    if (isEditableTag(eventTarget)) {
      return eventTarget.value;
    } else if (eventTarget.hasAttribute("contenteditable")) {
      return eventTarget.innerText; // ネストされた内容も含む
    }
    return "";
  }

  function getElementIdentifier(element: HTMLElement) {
    return (
      element.getAttribute("id") ||
      element.getAttribute("name") ||
      element.getAttribute("aria-label") ||
      element.getAttribute("placeholder") ||
      element.getAttribute("class")
    );
  }
};
