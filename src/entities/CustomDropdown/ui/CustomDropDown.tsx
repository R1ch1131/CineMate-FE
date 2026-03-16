import React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { type SetStateAction } from "react";

interface Option {
  label: string;
  value: string;
}

interface CustomDropdownProps {
  label: string;
  options: Option[];
  selected: Option;
  setSelected: (option: SetStateAction<Option>) => void;
}

export const CustomDropdown: React.FC<CustomDropdownProps> = ({
  label,
  options,
  selected,
  setSelected,
}) => {
  return (
    <div>
      <label className="mb-3 block text-sm font-medium text-white">
        {label}
      </label>
      <Select
        value={selected.value}
        onValueChange={(value) => {
          const newOption = options.find((opt) => opt.value === value);
          if (newOption) setSelected(newOption);
        }}
      >
        <SelectTrigger className="w-full rounded-xl border border-white/20 bg-white/10 px-5 py-6 text-left text-white transition-all duration-200 hover:bg-white/20 ">
          <SelectValue />
        </SelectTrigger>
        <SelectContent className="p2 rounded-lg border border-white/20 bg-gray-700 text-left text-white transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600">
          <SelectGroup>
            {options.map((option) => (
              <SelectItem
                key={option.value}
                value={option.value}
                className="block w-full px-4 py-1 text-left text-sm text-white transition-all duration-200 hover:bg-blue-600/20 focus-visible:rounded-xl focus-visible:bg-blue-600 focus-visible:text-white data-[state=checked]:bg-gray-800 data-[state=checked]:text-white"
              >
                {option.label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};
