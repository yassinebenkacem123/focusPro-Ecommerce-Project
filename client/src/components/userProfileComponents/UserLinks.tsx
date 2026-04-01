import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { links } from "../../lib/staticData";
import { logout } from "../../features/authentication/authSlice";
import type { AppDispatch } from "../../store/store";


function UserLinks() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await dispatch(logout()).unwrap();
    } catch {
      // Redirect regardless so user leaves protected profile pages.
    } finally {
      navigate("/auth");
    }
  };

  return (
    <nav className="w-[20%] flex-col  border-r-2 border-stone-200  p-2 flex justify-between">
      {links.map((link) => (
        <NavLink
          key={link.to}
          to={link.to}
          onClick={(e) => {
            if (link.to === "/logout") {
              e.preventDefault();
              void handleLogout();
            }
          }}
          end={link.to === "/profile"}
          className={({ isActive }) =>
            [
              "flex  rounded-xl text-xl  px-4 py-3  font-medium transition-colors",
              isActive
                ? "text-stone-400"
                : link.to === "/logout"
                  ? "border border-yellow-50/30 text-stone-800 bg-red-600 hover:bg-red-500"
                  : "text-stone-800 hover:text-stone-800 hover:bg-stone-100",
            ].join(" ")
          }
        >
          {link.icon && <link.icon className="mr-2 text-2xl" />} {link.name}
        </NavLink>
      ))}
    </nav>
  );
}

export default UserLinks;
