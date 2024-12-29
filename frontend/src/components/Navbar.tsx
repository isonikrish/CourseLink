import {
  BookOpen,
  LogOut,
  Moon,
  Plus,
  Search,
  Sun,
  UserRound,
} from "lucide-react";
import useTheme from "../stores/useTheme";
import Logo from "./Logo";
import { Link } from "react-router-dom";
import { useAuth } from "../stores/useAuth";

function Navbar() {
  const { isDarkMode, toggleDarkMode } = useTheme();
  const { user, logout } = useAuth();
  const isTutor = user?.role === "tutor";

  return (
    <nav className="navbar px-10 py-0 fixed top-0 left-1/2 transform -translate-x-1/2 w-full z-10 flex items-center justify-between bg-base-100 border-b border-base-300 transition duration-300 ease-in-out">
      <Link to={"/"}>
        <Logo />
      </Link>

      <div className="flex items-center gap-4">
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
            <Moon className="text-xl select-none" />
          </div>
        </label>


        {user ? (
          <div className="flex items-center gap-6">

            <label className="input input-bordered flex items-center gap-2">
              <Search className="w-5 h-5" />
              <input
                type="text"
                placeholder="Search"
                className="grow outline-none"
              />
              <kbd className="kbd kbd-sm">⌘</kbd>
              <kbd className="kbd kbd-sm">K</kbd>
            </label>

            <div className="dropdown dropdown-end">
              <button tabIndex={0} className="btn btn-ghost btn-circle avatar">
                <div className="avatar placeholder">
                  <div className="bg-neutral text-neutral-content w-10 h-10 rounded-full flex items-center justify-center">
                    <span className="text-xl font-bold">
                      {user?.firstName[0]?.toUpperCase()}
                    </span>
                  </div>
                </div>
              </button>

              <ul
                tabIndex={0}
                className="menu menu-lg dropdown-content bg-base-100 rounded-lg z-[1] mt-3 w-52 p-2 shadow"
              >
                <li className="border-b border-base-300">
                  <a>
                    <UserRound className="w-5 h-5" />
                    Profile
                  </a>
                </li>
                <li>
                  <a className="flex gap-3">
                    <BookOpen className="w-5 h-5" />
                    {isTutor ? <p>My Courses</p>: <p className="text-wrap">My Enrollments</p>}
                  </a>
                </li>

                {isTutor && (
                  <li>
                    <Link to={'/create-course'}>
                      <Plus className="w-5 h-5" />
                      Create Course
                    </Link>
                  </li>
                )}

                <li className="border-t border-base-300" onClick={()=>logout()}>
                  <a>
                    <LogOut className="w-5 h-5" />
                    Logout
                  </a>
                </li>
              </ul>
            </div>
          </div>
        ) : (

          <Link to={"/login"}>
            <button className="w-24 btn text-sm font-medium rounded-full px-4 py-2 shadow-[0px_-1px_0px_0px_#FFFFFF40_inset,_0px_2px_2px_0px_#FFFFFF40_inset]">
              Login
            </button>
          </Link>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
