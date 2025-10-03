import { Field, Input } from "@headlessui/react";
import { Search } from "lucide-react";

export const SearchBar = () => (
  <Field>
    <div className="flex flex-col gap-2">
      <div className="relative">
        <Input
          type="text"
          placeholder="Поиск фильмов в вашем списке..."
          className="outline-grey bg-frostedglass focus:outline-lightorange block w-full rounded-xl py-3 pl-12 text-sm/6 text-white outline-3"
        />
        <div className="absolute top-1/2 left-3.5 -translate-y-1/2 transform">
          <Search className="text-white" />
        </div>
      </div>
    </div>
  </Field>
);