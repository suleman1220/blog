import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

export default function SearchInput({ placeholder, handleSearch }) {
  const [q, setQ] = useState("");

  const handleQChange = ({ target: { value } }) => {
    if (value) {
      setQ(value);
    } else {
      setQ("");
      handleSearch("");
    }
  };

  return (
    <div className="relative mx-auto max-w-lg">
      <input
        type="text"
        value={q}
        onChange={handleQChange}
        placeholder={placeholder}
        name="search"
        id="search"
        className="w-full rounded-md border px-3 py-2 outline-none focus:border-gray-300 focus:shadow-sm dark:border-gray-600 dark:bg-gray-900 dark:focus:border-white"
      />

      <button
        className="absolute inset-y-0 right-0 flex items-center pr-3"
        onClick={() => handleSearch(q)}>
        <MagnifyingGlassIcon className="h-4 w-4 text-gray-400" />
      </button>
    </div>
  );
}
