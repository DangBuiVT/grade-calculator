import React from "react";
import { Icon } from "@iconify/react";

export default function Header() {
  const [dropdownOpen, setDropdownOpen] = React.useState(false);
  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };
  return (
    <header className="bg-[var(--dark-blue-primary)] text-white shadow-md w-full h-16 flex items-center justify-center">
      <button
        className="block md:hidden justify-self-start absolute left-5 hover:scale-110 transition-transform"
        onClick={toggleDropdown}
      >
        {/* hamburger button */}
        <Icon icon="mdi:menu" width="40" height="40" />
      </button>
      {dropdownOpen && (
        <nav className="absolute top-16 left-0 w-1/2 bg-[var(--dark-blue-primary)] text-white shadow-md md:hidden z-10">
          <ul className="flex flex-col items-strech font-bold text-2xl ">
            <li>
              <a
                href="/"
                className="py-5 px-10 w-full block hover:bg-[var(--dark-blue-dim)] transition-colors"
              >
                Home
              </a>
            </li>
            <li>
              <a
                href="/calculator"
                className="py-5 px-10 block hover:bg-[var(--dark-blue-dim)] transition-colors"
              >
                Calculator
              </a>
            </li>
            <li>
              <a
                href="/settings"
                className="py-5 px-10 block hover:bg-[var(--dark-blue-dim)] transition-colors"
              >
                Settings
              </a>
            </li>
          </ul>
        </nav>
      )}
      <nav className="flex justify-center hidden md:block">
        <ul className="flex items-strech font-bold text-2xl ">
          <li>
            <a
              href="/"
              className="py-5 px-10 w-full block hover:bg-[var(--dark-blue-dim)] transition-colors"
            >
              Home
            </a>
          </li>
          <li>
            <a
              href="/calculator"
              className="py-5 px-10 block hover:bg-[var(--dark-blue-dim)] transition-colors"
            >
              Calculator
            </a>
          </li>
          <li>
            <a
              href="/settings"
              className="py-5 px-10 block hover:bg-[var(--dark-blue-dim)] transition-colors"
            >
              Settings
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
}
