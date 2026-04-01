import type { SellerActivityProps } from "../../../pages/admin/AdminSellerManagement";
import { Activity, ShoppingBag, AlertCircle, Info } from "lucide-react";

const SellerActivitiesLog = ({ activities }: { activities: SellerActivityProps[] }) => {
  if (!activities?.length) {
    return (
      <div className="w-full rounded-2xl border border-stone-200 dark:border-gray-700/50 bg-white dark:bg-gray-800/60 p-8 text-center shadow-sm">
        <Activity className="mx-auto h-8 w-8 text-stone-300 dark:text-gray-500 mb-3" />
        <p className="text-stone-500 dark:text-gray-400 font-medium">No recent activities</p>
      </div>
    );
  }

  const getActivityStyling = (type: string) => {
    const t = type.toLowerCase();
    if (t.includes('added') || t.includes('order')) {
      return { icon: <ShoppingBag size={18} />, bg: "bg-emerald-100 dark:bg-emerald-900/40 text-emerald-600 dark:text-emerald-400" };
    }
    if (t.includes('removed') || t.includes('error')) {
      return { icon: <AlertCircle size={18} />, bg: "bg-red-100 dark:bg-red-900/40 text-rose-600 dark:text-red-400" };
    }
    return { icon: <Info size={18} />, bg: "bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400" };
  };

  return (
    <div className="w-full rounded-2xl border border-gray-200 dark:border-gray-700/50 bg-white dark:bg-gray-800/60 shadow-sm overflow-hidden">
      <div className="border-b border-gray-100 dark:border-gray-700/50 px-6 py-5 flex justify-between items-center">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Seller Activities</h2>
        <button className="text-sm font-medium text-stone-700 dark:text-gray-400 hover:text-stone-900 dark:hover:text-gray-200 transition-colors cursor-pointer">
          View All
        </button>
      </div>

      <div className="flex flex-col">
        {activities.map((activity) => {
          const style = getActivityStyling(activity.type);
          
          return (
            <div 
              key={activity.id} 
              className="group flex items-start gap-4 px-6 py-4 transition-colors hover:bg-gray-50 dark:hover:bg-gray-700/30"
            >
              <div className={`mt-1 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full ${style.bg}`}>
                {style.icon}
              </div>

              <div className="flex flex-col flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <span className="font-medium text-gray-900 dark:text-gray-200 truncate">
                    {activity.type}
                  </span>
                  <span className="whitespace-nowrap text-xs text-gray-500 dark:text-gray-400">
                    {new Date(activity.date).toLocaleDateString(undefined, { 
                      month: 'short', 
                      day: 'numeric' 
                    })}
                  </span>
                </div>
                
                <p className="mt-1 text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                  {activity.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SellerActivitiesLog;