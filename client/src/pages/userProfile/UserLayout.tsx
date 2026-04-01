import { Outlet } from "react-router-dom";
import UserLinks from "../../components/userProfileComponents/UserLinks";

const UserLayout = () => {
  return (
    <section className="px-4  md:px-15 ">
      <div className=" w-full gap-4 flex py-4">
        <UserLinks />
        <Outlet />
      </div>
    </section>
  );
};

export default UserLayout;
