import type { OrderRequest } from "../../../customize-order/hooks/useOrderRequests";
import { renderColor, renderIcons } from "../utlis/renderIcons";

interface Props {
  title: string;
  description: string;
  status?: OrderRequest["status"];
}

const CustomCard = ({ description, title, status }: Props) => {
  const Icon = renderIcons(title || description);
  return (
    <div className=" flex justify-between gap-[10px] bg-white rounded shadow overflow-hidden hover:shadow-md">
      <div className="flex gap-[10px] p-[10px]">
        <div className="bg-admin-bg aspect-square h-[50px] flex justify-center items-center rounded">
          <Icon className="text-white " size={25} />
        </div>
        <div>
          <p className="font-medium line-clamp-1">{title}</p>
          <p className="text-sm opacity-70 line-clamp-1"> {description}</p>
        </div>
      </div>
      {status && <div className={`flex justify-center items-center self-stretch w-[80px] text-sm md:text-[16px] font-semibold min-w-[80px] md:w-[100px] text-center capitalize ${renderColor(status)}`}>{status}</div>}
    </div>
  );
};

export default CustomCard;
