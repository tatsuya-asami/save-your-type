import { useStorageData } from "./useStorageData";

export const Root: React.FC = () => {
  const { storageData } = useStorageData();
  console.log(storageData);

  return (
    <div>
      {
        <ul>
          {storageData?.map((data) => {
            return <li key={data.datetime}>{data.value}</li>;
          })}
        </ul>
      }
    </div>
  );
};
