export const monitorDOMChanges = (
  inputTagList: readonly string[],
  callback: () => void
) => {
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
        callback();
      });
    });
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true,
  });

  return observer;
};
