export const inputTagList = [
  "input",
  "textarea",
  "[contenteditable='true']",
] as const;

export const monitorDOMChanges = (callback: (value: Event) => void) => {
  const observer = new MutationObserver((mutationsList) => {
    mutationsList.forEach((mutation) => {
      if (!(mutation.type === "childList")) {
        return;
      }
      mutation.addedNodes.forEach((node) => {
        if (!(node.nodeType === 1 && node instanceof Element)) {
          return;
        }
        if (!inputTagList.some((selector) => node.matches(selector))) {
          return;
        }
        document.body.addEventListener("input", callback);
      });
    });
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true,
  });

  return observer;
};
