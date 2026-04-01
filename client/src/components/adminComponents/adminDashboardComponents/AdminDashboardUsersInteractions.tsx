import { BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, Tooltip, type ChartOptions } from 'chart.js'
import { Bar } from 'react-chartjs-2'
import type { DashboardGlobalStatics } from '../../../lib/type'
import { useTheme } from '../../../features/theme/useTheme'

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend)

type AdminDashboardUsersInteractionsProps = {
  data: DashboardGlobalStatics['usersInteractions']
}

const AdminDashboardUsersInteractions = ({ data }: AdminDashboardUsersInteractionsProps) => {
  const { isDark } = useTheme()

  const sortedInteractions = [...data].sort((a, b) => b.count - a.count).slice(0, 5)
  const totalInteractions = data.reduce((acc, item) => acc + item.count, 0)
  const colors = [
    'rgba(59, 130, 246, 0.75)',
    'rgba(16, 185, 129, 0.75)',
    'rgba(245, 158, 11, 0.75)',
    'rgba(239, 68, 68, 0.75)',
    'rgba(99, 102, 241, 0.75)',
  ]

  const gridColor = isDark ? 'rgba(75, 85, 99, 0.4)' : 'rgba(229, 231, 235, 0.9)'
  const tickColor = isDark ? '#9ca3af' : '#6b7280'

  const chartData = {
    labels: sortedInteractions.map((item) => item.interaction),
    datasets: [
      {
        label: 'Interactions',
        data: sortedInteractions.map((item) => item.count),
        backgroundColor: sortedInteractions.map((_, index) => colors[index % colors.length]),
        borderRadius: 8,
        maxBarThickness: 36,
      },
    ],
  }

  const options: ChartOptions<'bar'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: isDark ? '#111827' : '#1f2937',
        titleColor: '#f9fafb',
        bodyColor: '#d1d5db',
        callbacks: {
          label: (ctx) => `Count: ${(ctx.parsed.y ?? 0).toLocaleString()}`,
        },
      },
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: {
          color: tickColor,
          maxRotation: 0,
          autoSkip: false,
          font: { size: 10 },
        },
        border: { display: false },
      },
      y: {
        beginAtZero: true,
        grid: { color: gridColor },
        ticks: { color: tickColor },
        border: { display: false },
      },
    },
  }

  return (
    <section className="rounded-lg border border-gray-100 dark:border-gray-700/50 bg-white dark:bg-gray-800/60 p-4 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">User Interactions</h2>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Top engagement actions</p>
        </div>
        <div className="rounded-xl border border-stone-200 dark:border-gray-700/50 bg-stone-50 dark:bg-gray-700/40 px-3 py-2">
          <p className="text-xs text-gray-500 dark:text-gray-400">Total</p>
          <p className="text-sm font-semibold text-gray-800 dark:text-gray-100">{totalInteractions.toLocaleString()}</p>
        </div>
      </div>

      <div className="mt-4 h-64 rounded-xl border border-stone-200 dark:border-gray-700/50 bg-stone-50/60 dark:bg-gray-800/40 p-3">
        <Bar key={isDark ? 'dark' : 'light'} data={chartData} options={options} />
      </div>
    </section>
  )
}

export default AdminDashboardUsersInteractions
