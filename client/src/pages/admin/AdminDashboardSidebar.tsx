import { NavLink } from 'react-router-dom';
import Logo from '../../components/header/Logo';
import { dashboardAdminLinks } from '../../lib/staticData';
import SlideButton from './SlideButton';

const AdminDashboardSidebar = () => {
  return (
    <aside className="flex px-4 py-5 border-r-2 h-screen border-gray-300/40 flex-col gap-3 w-64 flex-shrink-0">
      <div className="flex items-center justify-between w-full">
        <Logo size={"text-2xl"} />
        <SlideButton />
      </div>

      <nav className="flex flex-col gap-5 mt-4">
        {dashboardAdminLinks.map((group, idx) => (
          <div key={idx} className="flex flex-col gap-3">
              <button  className="text-gray-500 text-start font-semibold text-xs uppercase tracking-wider px-2">
                {group.mainName}

              </button>
          
            <div className="flex flex-col gap-1">
              {group.links?.map((link, linkIdx) => (
                <NavLink
                  key={linkIdx}
                  to={link.path}
                  end
                  className={({ isActive }) => `
                    flex items-center gap-3 text-md font-medium p-2 rounded-lg transition-colors
                    ${link.name === "Promote" 
                      ? "bg-indigo-50 text-indigo-700 hover:bg-indigo-100" 
                      : "text-gray-600 hover:bg-gray-100/50"
                    }
                    ${isActive 
                      ? link.name === "Promote" 
                        ? "bg-indigo-100" 
                        : "bg-gray-200/50" 
                      : ""
                    }
                  `}
                >
                  {link.icon && <link.icon className="text-lg" />}
                  <span>{link.name}</span>
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
