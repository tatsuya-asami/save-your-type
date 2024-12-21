export type Store = {
  datetime: string;
  identifier: string;
  url: string;
  value: string;
};

export const useStore = () => {
  const saveValue = (store: Omit<Store, "datetime" | "url">) => {
    console.log("Save value:", {
      ...store,
      datetime: new Date().toISOString(),
      url: window.location.href,
    });
  };

  return { saveValue };
};
