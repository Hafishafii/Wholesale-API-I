import { Button } from "../../../../components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../../../../components/ui/popover";
import { CiFilter } from "react-icons/ci";
import type { FilterProps } from "../hooks/useUserActivities";
import SelectOptions from "../../../../components/select/SelectOptions";
import {
  ORDER_STATUSES,
  TIME_OPTIONS,
} from "../utlis/constants";
import { useState } from "react";

type Props = {
  filters: FilterProps;
  setFilters: React.Dispatch<React.SetStateAction<FilterProps>>;
  type: "Order Request" | "User Activities";
  onApply: () => void;
};

const FilterOptions = ({ filters, setFilters, type, onApply }: Props) => {
  const [open, setOpen] = useState(false);


  const handleSelectChange = (key: string, value: string) => {
    if (key === "orderStatus" && value.toLowerCase() === "all") {
      value = "";
    }
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const handleApply = () => {
    onApply();
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button className="rounded hover:bg-muted transition items-center">
          <CiFilter className="text-xl" />
        </button>
      </PopoverTrigger>

      <PopoverContent className="max-w-80 mx-[20px]">
        <div className="grid gap-4">
          <div className="space-y-2">
            <h4 className="leading-none font-medium">Filter {type}</h4>
            <p className="text-muted-foreground text-sm">
              Use filters to narrow down results.
            </p>
          </div>

          <div className="grid gap-3">
            <SelectOptions
              label="Time"
              value={filters.time}
              options={TIME_OPTIONS}
              onChange={(val) => handleSelectChange("time", val)}
              placeholder="Last 30 days"
            />

            {/* {type === "Order Request" &&
              FILTER_INPUTS.map(({ label, placeholder, id }) => (
                <div key={id} className="grid grid-cols-3 items-center gap-4">
                  <label htmlFor={id}>{label}</label>
                  <Input
                    id={id}
                    value={filters[id as keyof typeof filters]}
                    onChange={handleInputChange}
                    placeholder={placeholder}
                    className="col-span-2 h-8"
                  />
                </div>
              ))} */}

            {type === "Order Request" && (
              <SelectOptions
                label="Order Status"
                value={filters.orderStatus}
                options={ORDER_STATUSES}
                onChange={(val) => handleSelectChange("orderStatus", val)}
                placeholder="Select status"
              />
            )}
          </div>

          <Button
            className="w-full mt-2 bg-admin-bg hover:bg-black text-white"
            onClick={handleApply} // 🔹 close popover on apply
          >
            Apply Filters
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default FilterOptions;
