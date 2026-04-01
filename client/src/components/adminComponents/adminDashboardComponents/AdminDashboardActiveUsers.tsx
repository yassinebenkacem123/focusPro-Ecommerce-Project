import { ArcElement, Chart as ChartJS, Legend, Tooltip, type ChartOptions } from 'chart.js'
import { Doughnut } from 'react-chartjs-2'
import type { DashboardGlobalStatics } from '../../../lib/type'
import { useTheme } from '../../../features/theme/useTheme'

ChartJS.register(ArcElement, Tooltip, Legend)

type AdminDashboardActiveUsersProps = {
  data: DashboardGlobalStatics['activeUsers']
}

const colors = [
  'rgba(16, 185, 129, 0.8)',
  'rgba(59, 130, 246, 0.8)',
  'rgba(245, 158, 11, 0.8)',
  'rgba(236, 72, 153, 0.8)',
  'rgba(99, 102, 241, 0.8)',
]

const AdminDashboardActiveUsers = ({ data }: AdminDashboardActiveUsersProps) => {
  const { isDark } = useTheme()

  const chartData = {
    labels: data.eachCountryPercentage.map((item) => item.country),
    datasets: [
      {
        data: data.eachCountryPercentage.map((item) => item.percentage),
        backgroundColor: colors,
        borderColor: isDark ? '#1f2937' : '#ffffff',
        borderWidth: 2,
        cutout: '72%',
      },
    ],
  }

  const options: ChartOptions<'doughnut'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: isDark ? '#111827' : '#1f2937',
        titleColor: '#f9fafb',
        bodyColor: '#d1d5db',
        callbacks: {
          label: (ctx) => `${ctx.label}: ${ctx.parsed}%`,
        },
      },
    },
  }

  return (
    <section className="rounded-lg border border-gray-100 dark:border-gray-700/50 bg-white dark:bg-gray-800/60 p-4 shadow-sm">
      <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">Active Users</h2>
      <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Live users by region</p>

      <div className="mt-4 flex items-center gap-5">
        <div className="relative h-44 w-44 shrink-0">
          <Doughnut key={isDark ? 'dark' : 'light'} data={chartData} options={options} />
          <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
            <p className="text-xs text-gray-500 dark:text-gray-400">Total Active</p>
            <p className="text-xl font-bold text-gray-800 dark:text-gray-100">{data.totalActiveUsers.toLocaleString()}</p>
          </div>
        </div>

        <ul className="flex-1 space-y-2">
          {data.eachCountryPercentage.map((item, idx) => (
            <li key={item.country} className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2">
                <span
                  className="inline-block h-2.5 w-2.5 rounded-full"
                  style={{ backgroundColor: colors[idx % colors.length] }}
                />
                <span className="text-gray-600 dark:text-gray-300">{item.country}</span>
              </div>
              <span className="font-semibold text-gray-800 dark:text-gray-100">{item.percentage}%</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

export default AdminDashboardActiveUsers
