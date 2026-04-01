import type { DashboardGlobalStatics } from '../../../lib/type'

type AdminDashboardRecentActivitiesProps = {
  data: DashboardGlobalStatics['recentActivities']
}

const AdminDashboardRecentActivities = ({ data }: AdminDashboardRecentActivitiesProps) => {
  return (
    <section className="rounded-2xl border border-stone-200 dark:border-gray-700/50 bg-white dark:bg-gray-800/60 p-5 shadow-sm">
      <h2 className="text-base font-semibold text-stone-800 dark:text-gray-100">Recent Activities</h2>
      <p className="mt-1 text-sm text-stone-500 dark:text-gray-400">Platform events from the last days</p>

      <ol className="mt-5 space-y-4">
        {data.map((item, index) => (
          <li key={`${item.activity}-${index}`} className="flex gap-3">
            <div className="relative mt-1 flex flex-col items-center">
              <span className="h-2.5 w-2.5 rounded-full bg-sky-500 dark:bg-sky-400" />
              {index !== data.length - 1 && <span className="mt-1 h-10 w-px bg-stone-200 dark:bg-gray-700" />}
            </div>
            <div className="flex-1 rounded-xl border border-stone-200 dark:border-gray-700/50 bg-stone-50 dark:bg-gray-700/40 p-3">
              <p className="text-sm font-medium text-stone-700 dark:text-gray-200">{item.activity}</p>
              <p className="mt-1 text-xs text-stone-500 dark:text-gray-500">{new Date(item.date).toLocaleDateString()}</p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  )
}

export default AdminDashboardRecentActivities
