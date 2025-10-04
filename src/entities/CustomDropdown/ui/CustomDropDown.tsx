import React from "react";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { ChevronDown } from "lucide-react";
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
      <Menu>
        <MenuButton className="flex w-full justify-between rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-left text-white transition-all duration-200 hover:bg-white/20 focus:outline-none">
          {selected.label}
          <ChevronDown className="h-5 w-5" />
        </MenuButton>
        <MenuItems
          transition
          anchor="bottom"
          className="bg-darkblue z-10 mt-1 w-73 origin-top rounded-xl shadow-md transition duration-200 ease-out data-[closed]:scale-95 data-[closed]:opacity-0"
        >
          {options.map((option) => (
            <MenuItem key={option.value}>
              {({ focus }) => (
                <button
                  className={`block w-full px-4 py-1 text-left text-sm text-white ${
                    focus ? "rounded-xl bg-blue-600 text-white" : ""
                  }`}
                  onClick={() => {
                    setSelected(option);
                  }}
                >
                  {option.label}
                </button>
              )}
            </MenuItem>
          ))}
        </MenuItems>
      </Menu>
    </div>
  );
};
