import type { DashboardGlobalStatics } from '../../../lib/type'
import { useTheme } from '../../../features/theme/useTheme'

type AdminDashboardMonthlyTargetProps = {
  monthlyTarget: DashboardGlobalStatics['monthlyTarget']
  currentMonthRevenus: DashboardGlobalStatics['currentMonthRevenus']
  targetProgress: DashboardGlobalStatics['targetProgress']
}

const AdminDashboardMonthlyTarget = ({
  monthlyTarget,
  currentMonthRevenus,
  targetProgress,
}: AdminDashboardMonthlyTargetProps) => {
  const { isDark } = useTheme()
  const safeProgress = Math.max(0, Math.min(100, targetProgress))
  const remaining = Math.max(monthlyTarget - currentMonthRevenus, 0)

  const trackColor = isDark ? '#374151' : '#e7e5e4'

  return (
    <section className="rounded-lg border border-gray-100 dark:border-gray-700/50 bg-white dark:bg-gray-800/60 p-4 shadow-sm">
      <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">Monthly Target</h2>
      <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Progress toward this month revenue goal</p>

      <div className="mt-5 flex items-center gap-5">
        <div
          className="relative grid h-28 w-28 place-items-center rounded-full shrink-0"
          style={{
            background: `conic-gradient(rgba(59, 130, 246, 1) ${safeProgress}%, ${trackColor} ${safeProgress}% 100%)`,
          }}
        >
          <div className="grid h-22 w-22 place-items-center rounded-full bg-white dark:bg-gray-800">
            <span className="text-xl font-bold text-gray-800 dark:text-gray-100">{safeProgress}%</span>
          </div>
        </div>

        <div className="space-y-2">
          <div>
            <p className="text-xs text-gray-500 dark:text-gray-400">Current</p>
            <p className="text-lg font-semibold text-gray-800 dark:text-gray-100">${currentMonthRevenus.toLocaleString()}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 dark:text-gray-400">Target</p>
            <p className="text-lg font-semibold text-gray-800 dark:text-gray-100">${monthlyTarget.toLocaleString()}</p>
          </div>
        </div>
      </div>

      <div className="mt-4 rounded-xl border border-gray-100 dark:border-gray-700/50 bg-gray-50 dark:bg-gray-700/40 p-3">
        <p className="text-xs text-gray-500 dark:text-gray-400">Remaining to goal</p>
        <p className="text-base font-semibold text-amber-700 dark:text-amber-400">${remaining.toLocaleString()}</p>
      </div>
    </section>
  )
}

export default AdminDashboardMonthlyTarget
