import { FiSearch, FiSun, FiMoon } from "react-icons/fi";
import { IoNotificationsOutline } from "react-icons/io5";
import { useTheme } from "../../features/theme/useTheme";

const AdminDashboardHeader = () => {
  const { isDark, toggleTheme } = useTheme();

  return (
    <header className="flex gap-6 items-center">
      {/* 1. Enhanced Search Bar */}
      <div className="relative flex w-72 max-w-md items-center group">
        <FiSearch
          size={16}
          className="absolute left-3 text-gray-400 dark:text-gray-500 transition-colors"
        />
        <input
          type="text"
          placeholder="Search by category, name..."
          className="w-full rounded-xl bg-gray-50 dark:bg-gray-800/70 py-2.5 pl-10 pr-4 text-sm text-gray-700 dark:text-gray-300 placeholder-gray-400 dark:placeholder-gray-500 outline-none ring-1 ring-transparent focus:ring-gray-200 dark:focus:ring-gray-700 transition-all border border-gray-200/80 dark:border-gray-700/60"
        />
      </div>

      {/* 2. Actions & Profile */}
      <div className="flex items-center gap-4">

        {/* Theme Toggle Button */}
        <button
          onClick={toggleTheme}
          title={isDark ? "Switch to light mode" : "Switch to dark mode"}
          aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
          className="relative flex items-center justify-center h-9 w-9 rounded-full cursor-pointer
            bg-gray-100 dark:bg-gray-800 
            text-gray-500 dark:text-gray-400
            hover:bg-gray-200 dark:hover:bg-gray-700
            hover:text-amber-500 dark:hover:text-amber-400
            border border-gray-200/80 dark:border-gray-700/60
            transition-all duration-200 overflow-hidden"
        >
          <span
            className={`absolute transition-all duration-300 ${
              isDark ? "translate-y-0 opacity-100" : "-translate-y-6 opacity-0"
            }`}
          >
            <FiSun size={17} />
          </span>
          <span
            className={`absolute transition-all duration-300 ${
              isDark ? "translate-y-6 opacity-0" : "translate-y-0 opacity-100"
            }`}
          >
            <FiMoon size={17} />
          </span>
        </button>

        {/* Notification Bell */}
        <button className="relative rounded-full p-2 cursor-pointer text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-700 dark:hover:text-gray-200 transition-colors">
          <IoNotificationsOutline size={22} />
          <span className="absolute top-2 right-2 flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-600"></span>
          </span>
        </button>

        {/* User Profile */}
        <button className="flex items-center gap-3 rounded-lg p-1 pr-3 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors text-left">
          <img
            src="https://placehold.co/400"
            alt="Yassine's profile"
            className="h-9 w-9 rounded-full border border-gray-200 dark:border-gray-700 object-cover"
          />
          <div className="hidden sm:flex flex-col">
            <span className="text-sm font-bold text-gray-900 dark:text-gray-100 leading-tight">Yassine</span>
            <span className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Administrator</span>
          </div>
        </button>
      </div>
    </header>
  );
};

export default AdminDashboardHeader;