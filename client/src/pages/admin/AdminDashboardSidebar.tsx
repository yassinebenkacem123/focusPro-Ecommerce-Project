import { NavLink } from 'react-router-dom';
import Logo from '../../components/header/Logo';
import { dashboardAdminLinks } from '../../lib/staticData';
import SlideButton from './SlideButton';

type AdminDashboardSidebarProps = {
  isOpen: boolean;
  onToggle: () => void;
};

const AdminDashboardSidebar = ({ isOpen, onToggle }: AdminDashboardSidebarProps) => {
  return (
    <aside
      className={`flex py-5 border-r border-gray-200/60 dark:border-gray-700/50 h-full bg-white dark:bg-gray-900 flex-col gap-3 shrink-0 transition-all duration-300 ease-in-out overflow-hidden ${
        isOpen ? 'w-64 px-4' : 'w-20 px-3'
      }`}
    >
      <div className="flex items-center justify-between w-full">
        <div
          className={`transition-all duration-300 origin-left ${
            isOpen ? 'scale-100 opacity-100' : 'scale-0 opacity-0 w-0'
          }`}
        >
          <Logo size={"text-2xl"} />
        </div>
        <SlideButton isOpen={isOpen} onToggle={onToggle} />
      </div>

      <nav className="flex flex-col gap-5 mt-4">
        {dashboardAdminLinks.map((group, idx) => (
          <div key={idx} className="flex flex-col gap-3">
            <button
              className={`text-gray-400 dark:text-gray-500 text-start font-semibold text-xs uppercase tracking-wider px-2 whitespace-nowrap transition-all duration-300 ${
                isOpen ? 'opacity-100' : 'opacity-0 h-0 overflow-hidden py-0 px-0'
              }`}
            >
              {group.mainName}
            </button>
          
            <div className="flex flex-col gap-1">
              {group.links?.map((link, linkIdx) => (
                <NavLink
                  key={linkIdx}
                  to={link.path}
                  end
                  title={isOpen ? undefined : link.name}
                  className={({ isActive }) => `
                    flex items-center text-md font-medium p-2 rounded-lg transition-all duration-200
                    ${isOpen ? 'gap-3 justify-start' : 'justify-center'}
                    ${link.name === "Promote" 
                      ? "bg-indigo-50 dark:bg-indigo-950/50 text-indigo-700 dark:text-indigo-400 hover:bg-indigo-100 dark:hover:bg-indigo-900/60" 
                      : "text-gray-600 dark:text-gray-400 hover:bg-gray-100/70 dark:hover:bg-gray-800/70 hover:text-gray-800 dark:hover:text-gray-200"
                    }
                    ${isActive 
                      ? link.name === "Promote" 
                        ? "bg-indigo-100 dark:bg-indigo-900/60" 
                        : "bg-gray-100/80 dark:bg-gray-800/80 text-gray-900 dark:text-gray-100" 
                      : ""
                    }
                  `}
                >
                  {link.icon && <link.icon className="text-lg shrink-0" />}
                  <span
                    className={`whitespace-nowrap transition-all duration-300 ${
                      isOpen ? 'opacity-100 translate-x-0 max-w-35' : 'opacity-0 -translate-x-2 max-w-0 overflow-hidden'
                    }`}
                  >
                    {link.name}
                  </span>
                </NavLink>
              ))}
            </div>
          </div>
        ))}
      </nav>
    </aside>
  );
};

export default AdminDashboardSidebar;
