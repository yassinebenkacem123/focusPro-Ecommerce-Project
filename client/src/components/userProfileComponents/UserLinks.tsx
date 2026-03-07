import { NavLink } from "react-router-dom";
import { links } from "../../lib/staticData";


function UserLinks() {
  return (
    <nav className="w-full bg-stone-800 items-center  p-2 flex justify-between rounded-md">
      {links.map((link) => (
        <NavLink
          key={link.to}
          to={link.to}
          end={link.to === "/profile"}
          className={({ isActive }) =>
            [
              "flex  rounded-xl text-xl items-center px-4 py-3  font-medium transition-colors",
              isActive
                ? "bg-orange-500 text-white"
                : "text-stone-200 hover:text-stone-800 hover:bg-stone-100",
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
