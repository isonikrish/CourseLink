import { Moon, Sun } from "lucide-react";
import useTheme from "../stores/useTheme";
import Logo from "./Logo";
import { Link } from "react-router-dom";

function Navbar() {
  const { isDarkMode, toggleDarkMode } = useTheme();
  return (
    <div
      className={`navbar px-10 py-0 flex items-center justify-between fixed top-0 left-1/2 transform -translate-x-1/2 w-full z-10  transition duration-300 ease-in-out border-b border-base-300 bg-base-100`}
    >
      <Link to={"/"}>
        <Logo />
      </Link>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1 gap-2 flex items-center justify-center">
          <label className="swap swap-rotate">
            <input
              type="checkbox"
              checked={isDarkMode}
              onChange={toggleDarkMode}
            />
            <div className="swap-on">
              <Sun className="text-xl select-none" />
            </div>
            <div className="swap-off">
              <Moon className="text-xl select-none"/>
            </div>
          </label>
          <Link to={"/login"}>
            <li>
              <button className="w-24 btn text-sm font-medium rounded-full px-4 py-2 shadow-[0px_-1px_0px_0px_#FFFFFF40_inset,_0px_2px_2px_0px_#FFFFFF40_inset]">
                Login
              </button>
            </li>
          </Link>
        </ul>
      </div>
    </div>
  );
}

export default Navbar;
