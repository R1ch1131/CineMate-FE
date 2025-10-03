// features/MyList/ui/SortMenu.tsx
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { ChevronDown } from "lucide-react";
import { SORT_OPTIONS } from "../lib/constants";

type Props = {
  selectedOption: { label: string; value: string };
  onSelect: (option: { label: string; value: string }) => void;
};

export const SortMenu = ({ selectedOption, onSelect }: Props) => (
  <Menu>
    <MenuButton className="bg-frostedglass border-grey flex w-55 justify-center gap-1 rounded-xl border-2 py-2">
      {selectedOption.label}
      <ChevronDown />
    </MenuButton>
    <MenuItems anchor="bottom" className="bg-darkblue rounded-b-xl">
      {SORT_OPTIONS.map((option) => (
        <MenuItem key={option.value}>
          <a
            className="block px-4 py-1 text-sm w-full text-left hover:bg-blue-500 hover:rounded-xl"
            onClick={() => onSelect(option)}
          >
            {option.label}
          </a>
        </MenuItem>
      ))}
    </MenuItems>
  </Menu>
);
