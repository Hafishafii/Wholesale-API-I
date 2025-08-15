import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

type Option = string;

type Props = {
  label: string;
  value?: string;
  options: Option[];
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
};

const SelectOptions = ({
  label,
  value,
  options,
  onChange,
  placeholder = "Select",
  className = "col-span-2 h-8",
}: Props) => {
  return (
    <div className="grid grid-cols-3 items-center gap-4">
      <label>{label}</label>
      <Select onValueChange={onChange} value={value}>
        <SelectTrigger className={className}>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {options.map((opt) => (
            <SelectItem
              key={opt}
              value={opt.toLowerCase().replace(/\s+/g, "_")}
            >
              {opt}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default SelectOptions;
