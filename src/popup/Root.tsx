import { useStorageData } from "./useStorageData";

export const Root: React.FC = () => {
  const { currentStorageData } = useStorageData();

  return (
    <div>
      {
        <ul>
          {currentStorageData?.map((data) => {
            return <li key={data.datetime}>{data.value}</li>;
          })}
        </ul>
      }
    </div>
  );
};
