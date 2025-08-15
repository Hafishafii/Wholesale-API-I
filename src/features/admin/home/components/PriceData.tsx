import { useState } from "react";
import { Input } from "../../../../components/ui/input";
import { Button } from "../../../../components/ui/button";
import { formatRupee } from "../../../../utils/helpers/formatters";
import {CheckIcon, EditIcon } from "lucide-react";

type Props = {
  onSelect: (price: string) => void;
  onEdit: () => void;
  price: string | undefined;
  showInput: boolean;
};

const PriceData = ({ onSelect, price, onEdit, showInput }: Props) => {
  const [value, setValue] = useState<string>(price || "");

  const handleConfirm = () => {
    onSelect(value);
  };

  return (
    <div className="relative w-full space-y-3">
      {price && (
        <div className="flex items-center gap-[10px]">
          <p>
            Price :{" "}
            <span className="font-medium text-lg text-green-600">
              {formatRupee(Number(price))}
            </span>{" "}
          </p>
          {!showInput && <Button variant={"outline"} className="rounded h-[30px]" onClick={onEdit}>
            <EditIcon size={10} /> Edit
          </Button>}
        </div>
      )}
      {showInput && (
        <div className="flex w-full items-center gap-[20px]">
          <Input
            value={value}
            onChange={(e) => setValue(e?.target?.value.toString())}
            placeholder="Price"
          />
          <Button className="text-white bg-green-500" onClick={handleConfirm}>
            <CheckIcon  size={20} />
          </Button>
        </div>
      )}
    </div>
  );
};

export default PriceData;
