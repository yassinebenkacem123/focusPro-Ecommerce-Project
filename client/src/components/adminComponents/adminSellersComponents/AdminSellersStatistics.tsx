
import { FiUsers, FiCheckCircle } from "react-icons/fi";
import { GoAlert } from "react-icons/go";
import { MdOutlinePendingActions } from "react-icons/md";
import type { SellersProp } from "../../../pages/admin/Sellers";

const AdminSellersStatistics = ({ sellers }: { sellers: SellersProp[] }) => {
  const totalSellers: number = sellers.length;
  const activeSellers: number = sellers.filter(
    (seller) => seller.status.toLowerCase() === "active"
  ).length;
  const suspendedSellers: number = sellers.filter(
    (seller) => seller.status.toLowerCase() === "suspended"
  ).length;
  const pendingApproval: number = sellers.filter(
    (seller) => seller.status.toLowerCase() === "pending"
  ).length;

  const stats = [
    {
      title: "Total Sellers",
      value: totalSellers,
      icon: <FiUsers size={25} />,
      iconStyle: "bg-stone-100 dark:bg-gray-700/60 text-stone-700 dark:text-gray-300",
    },
    {
      title: "Active Sellers",
      value: activeSellers,
      icon: <FiCheckCircle size={25} />,
      iconStyle: "bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400",
    },
    {
      title: "Suspended Sellers",
      value: suspendedSellers,
      icon: <GoAlert size={25} />,
      iconStyle: "bg-red-100 dark:bg-red-950/60 text-red-600 dark:text-red-400",
    },
    {
      title: "Pending Approval",
      value: pendingApproval,
      icon: <MdOutlinePendingActions size={25} />,
      iconStyle: "bg-amber-100 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400",
    },
  ];

  return (
    <div className="w-full justify-between flex gap-4">
      {stats.map((stat) => (
        <div
          key={stat.title}
          className="rounded-xl flex-1 px-4 py-7 border border-stone-200 dark:border-gray-700/50 bg-white dark:bg-gray-800/60 transition-shadow hover:shadow-sm"
        >
          <div className="flex gap-10 items-center justify-between">
            <div>
              <p className="text-lg font-medium text-stone-500 dark:text-gray-400">{stat.title}</p>
              <h3 className="mt-3 text-2xl font-bold text-stone-800 dark:text-gray-100">
                {stat.value}
              </h3>
            </div>

            <div
              className={`flex h-13 w-13 items-center justify-center rounded-xl ${stat.iconStyle}`}
            >
              {stat.icon}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AdminSellersStatistics;
