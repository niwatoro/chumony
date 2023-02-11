import { NineCellLoading } from "react-loadingg";

export default function Loading(): React.ReactElement {
  return (
    <div className="h-full w-full flex">
      <div className="justify-center w-full flex items-center h-full">
        <NineCellLoading color="#0093AF" />
      </div>
    </div>
  );
}
