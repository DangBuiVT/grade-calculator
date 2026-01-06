import React from "react";

export default function Header() {
  return (
    <header className="bg-[var(--dark-blue-primary)] text-white shadow-md w-full">
      <nav className="flex justify-center">
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
