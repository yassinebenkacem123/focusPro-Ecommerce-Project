import type { SellerPerformanceProps } from "../../../pages/admin/AdminSellerManagement";
import { FaStar } from "react-icons/fa";

const SellerPerformanceOverview = ({
  sellerPerformance,
}: {
  sellerPerformance: SellerPerformanceProps;
}) => {
  return (
    <div className="w-full rounded-2xl border border-stone-200 dark:border-gray-700/50 bg-white dark:bg-gray-800/60 p-5 shadow-sm">
      
      <h1 className="text-lg font-semibold text-stone-800 dark:text-gray-100">
        Performance Overview
      </h1>

      <div className="mt-5 space-y-3">
        
        <div className="flex items-center justify-between rounded-xl border border-stone-200 dark:border-gray-700/50 bg-stone-50 dark:bg-gray-700/30 px-4 py-3 transition hover:bg-stone-100 dark:hover:bg-gray-700/60">
          <p className="text-sm text-stone-500 dark:text-gray-400">Total Sales</p>
          <p className="text-base font-semibold text-stone-800 dark:text-gray-100">
            ${sellerPerformance.totalSales.toFixed(2)}
          </p>
        </div>

        <div className="flex items-center justify-between rounded-xl border border-stone-200 dark:border-gray-700/50 bg-stone-50 dark:bg-gray-700/30 px-4 py-3 transition hover:bg-stone-100 dark:hover:bg-gray-700/60">
          <p className="text-sm text-stone-500 dark:text-gray-400">Total Revenue</p>
          <p className="text-base font-semibold text-stone-800 dark:text-gray-100">
            ${sellerPerformance.totalRevenue.toFixed(2)}
          </p>
        </div>

        <div className="flex items-center justify-between rounded-xl border border-stone-200 dark:border-gray-700/50 bg-stone-50 dark:bg-gray-700/30 px-4 py-3 transition hover:bg-stone-100 dark:hover:bg-gray-700/60">
          <p className="text-sm text-stone-500 dark:text-gray-400">Average Rating</p>
          <div className="flex items-center gap-2 text-stone-800 dark:text-gray-100">
            <FaStar className="text-yellow-500" size={14} />
            <span className="text-base font-semibold">
              {sellerPerformance.averageRating.toFixed(1)} / 5
            </span>
          </div>
        </div>

        <div className="flex items-center justify-between rounded-xl border border-stone-200 dark:border-gray-700/50 bg-stone-50 dark:bg-gray-700/30 px-4 py-3 transition hover:bg-stone-100 dark:hover:bg-gray-700/60">
          <p className="text-sm text-stone-500 dark:text-gray-400">
            Earnings (This Month)
          </p>
          <p className="text-base font-semibold text-emerald-600 dark:text-emerald-400">
            ${sellerPerformance.earningsThisMonth.toFixed(2)}
          </p>
        </div>

      </div>
    </div>
  );
};

export default SellerPerformanceOverview;