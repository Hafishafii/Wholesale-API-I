import { formatRupeeWithWords } from "../../../../utils/helpers/formatters";

type Props = {
  label: string;
  value: number;
};
const StatusCard = ({ label, value }: Props) => {
  return (
    <div className="bg-white text-center flex justify-center items-center flex-col rounded-md h-[150px] p-[20px] overflow-auto no-scrollbar capitalize shadow">
      <p>{label}</p>
      <p className="font-bold text-lg md:text-xl lg:text-2xl xl:text-3xl ">
        {label.toLocaleLowerCase().includes("sales") ? formatRupeeWithWords(value) : value}
      </p>
    </div>
  );
};

export default StatusCard;
