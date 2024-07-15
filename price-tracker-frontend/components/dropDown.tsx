"use client";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { useSelector } from "react-redux";
import { useAppDispatch, RootState } from "../redux/store";
import { updateName } from "@/utils/cryptoDataSlice";

const cryptoOption = ["Bitcoin", "Ethereum", "Solana", "Tether", "BNB"];

export default function DropDown() {
  const cryptoName = useSelector((state: RootState) => state.cryptoName.name);
  const dispatch = useAppDispatch();

  const handleOptionClick = (name: string) => () => {
    dispatch(updateName({ name }));
  };

  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <MenuButton className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
          {cryptoName ? cryptoName : "Options"}
          <ChevronDownIcon
            aria-hidden="true"
            className="-mr-1 h-5 w-5 text-gray-400"
          />
        </MenuButton>
      </div>

      <MenuItems
        transition
        className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
      >
        <div className="py-1">
          {cryptoOption.map((item) => (
            <MenuItem>
              <a
                onClick={handleOptionClick(item)}
                href="#"
                className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900"
              >
                {item}
              </a>
            </MenuItem>
          ))}
        </div>
      </MenuItems>
    </Menu>
  );
}
