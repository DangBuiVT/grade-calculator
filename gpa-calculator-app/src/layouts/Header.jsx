import React from "react";
import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";
import { useLanguage } from "../LanguageContext.jsx";

export default function Header() {
  const [dropdownOpen, setDropdownOpen] = React.useState(false);
  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };
  const { language, toggleLanguage } = useLanguage();
  return (
    <header className="bg-[var(--dark-blue-primary)] text-white shadow-md w-full h-16 flex items-center justify-center relative">
      <button
        className="block md:hidden justify-self-start absolute left-5 hover:scale-110 transition-transform"
        onClick={toggleDropdown}
      >
        {/* hamburger button */}
        <Icon icon="mdi:menu" width="40" height="40" />
      </button>
      {dropdownOpen && (
        <nav className="absolute top-16 left-0 w-1/2 bg-[var(--dark-blue-primary)] text-white shadow-md md:hidden z-10">
          <ul className="flex flex-col items-strech font-bold text-2xl gap-10 py-5">
            <li>
              <Link
                to="/"
                className="py-5 px-10 w-full block hover:bg-[var(--dark-blue-dim)] transition-colors"
              >
                {language === "en" ? "Home" : "Trang Chủ"}
              </Link>
            </li>
            <li>
              <Link
                to="/calculator"
                className="py-5 px-10 block hover:bg-[var(--dark-blue-dim)] transition-colors"
              >
                {language === "en" ? "Calculator" : "Tính Toán GPA"}
              </Link>
            </li>
            <li>
              <Link
                to="/settings"
                className="py-5 px-10 block hover:bg-[var(--dark-blue-dim)] transition-colors"
              >
                {language === "en" ? "Settings" : "Thiết Lập"}
              </Link>
            </li>
          </ul>
        </nav>
      )}
      <nav className="flex justify-center hidden md:block">
        <ul className="flex items-strech font-bold text-2xl gap-10 px-5">
          <li>
            <Link
              to="/"
              className="py-5 px-10 w-full block hover:bg-[var(--dark-blue-dim)] transition-colors"
            >
              {language === "en" ? "Home" : "Trang Chủ"}
            </Link>
          </li>
          <li>
            <Link
              to="/calculator"
              className="py-5 px-10 block hover:bg-[var(--dark-blue-dim)] transition-colors"
            >
              {language === "en" ? "Calculator" : "Tính Toán GPA"}
            </Link>
          </li>
          <li>
            <Link
              to="/settings"
              className="py-5 px-10 block hover:bg-[var(--dark-blue-dim)] transition-colors"
            >
              {language === "en" ? "Settings" : "Thiết Lập"}
            </Link>
          </li>
        </ul>
      </nav>
      <button
        className="absolute right-10 hover:scale-110 transition-transform"
        onClick={toggleLanguage}
      >
        <Icon
          icon={
            language === "en"
              ? "twemoji:flag-vietnam"
              : "twemoji:flag-united-states"
          }
          width="40"
          height="40"
        />
      </button>
    </header>
  );
}
