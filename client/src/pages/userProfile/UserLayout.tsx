import { Outlet } from "react-router-dom";
import UserLinks from "../../components/userProfileComponents/UserLinks";

const UserLayout = () => {
  return (
    <section className="px-4  md:px-15 ">
      <div className="flex w-full flex-col py-4">
        <UserLinks />

        <div className=" flex-1 rounded-2xl borderp-4 md:p-6">
          <Outlet />
        </div>
      </div>
    </section>
  );
};

export default UserLayout;
