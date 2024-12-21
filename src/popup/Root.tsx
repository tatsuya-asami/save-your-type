import { useStorageData } from "./useStorageData";

export const Root: React.FC = () => {
  const { currentStorageData, allStorageData } = useStorageData();

  return (
    <div>
      <ul>
        {currentStorageData?.map((data) => {
          return <li key={data.datetime}>{data.value}</li>;
        })}
      </ul>
      <ul>
        {allStorageData?.map((data) => {
          return <li key={data.datetime}>{data.value}</li>;
        })}
      </ul>
    </div>
  );
};
