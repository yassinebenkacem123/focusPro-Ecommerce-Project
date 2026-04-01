import {
  CategoryScale,
  Chart as ChartJS,
  Filler,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  Tooltip,
  type ChartOptions,
} from 'chart.js'
import { Line } from 'react-chartjs-2'
import type { DashboardGlobalStatics } from '../../../lib/type'
import { useTheme } from '../../../features/theme/useTheme'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend, Filler)

type AdminDashboardRevenusAnalyticsProps = {
  data: DashboardGlobalStatics['revenusAnalytics']
}

const AdminDashboardRevenusAnalytics = ({ data }: AdminDashboardRevenusAnalyticsProps) => {
  const { isDark } = useTheme()

  const labels = data.map((item) => item.month.slice(0, 3))
  const values = data.map((item) => item.revenus)
  const totalRevenue = values.reduce((acc, value) => acc + value, 0)
  const avgRevenue = values.length > 0 ? totalRevenue / values.length : 0
  const latestRevenue = values.at(-1) ?? 0
  const previousRevenue = values.at(-2) ?? latestRevenue
  const growth = previousRevenue > 0 ? ((latestRevenue - previousRevenue) / previousRevenue) * 100 : 0

  const gridColor = isDark ? 'rgba(75, 85, 99, 0.4)' : 'rgba(229, 231, 235, 0.9)'
  const tickColor = isDark ? '#9ca3af' : '#6b7280'

  const chartData = {
    labels,
    datasets: [
      {
        label: 'Revenue',
        data: values,
        borderColor: 'rgba(59, 130, 246, 1)',
        backgroundColor: isDark ? 'rgba(59, 130, 246, 0.10)' : 'rgba(59, 130, 246, 0.18)',
        pointBackgroundColor: 'rgba(59, 130, 246, 1)',
        pointBorderColor: isDark ? '#1f2937' : '#ffffff',
        pointBorderWidth: 2,
        pointRadius: 3,
        pointHoverRadius: 5,
        borderWidth: 2,
        fill: true,
        tension: 0.35,
      },
    ],
  }

  const options: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      mode: 'index',
      intersect: false,
    },
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: isDark ? '#111827' : '#1f2937',
        titleColor: '#f9fafb',
        bodyColor: '#d1d5db',
        displayColors: false,
        callbacks: {
          label: (ctx) => `Revenue: $${(ctx.parsed.y ?? 0).toLocaleString()}`,
        },
      },
    },
    scales: {
      x: {
        grid: { color: gridColor },
        ticks: { color: tickColor, maxRotation: 0 },
        border: { display: false },
      },
      y: {
        beginAtZero: true,
        grid: { color: gridColor },
        ticks: {
          color: tickColor,
          callback: (value) => `$${Number(value).toLocaleString()}`,
        },
        border: { display: false },
      },
    },
  }

  return (
    <section className="rounded-lg border border-gray-100 dark:border-gray-700/50 bg-white dark:bg-gray-800/60 p-4 shadow-sm">
      <div className="flex flex-wrap items-start justify-between gap-4 border-b border-stone-200 dark:border-gray-700/50 pb-4">
        <div>
          <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">Revenue Analytics</h2>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Monthly revenue trend for the current year</p>
        </div>

        <div className="flex flex-wrap gap-2">
          <div className="rounded-xl border border-stone-200 dark:border-gray-700/50 bg-stone-50 dark:bg-gray-700/40 px-3 py-2">
            <p className="text-xs text-gray-500 dark:text-gray-400">Total</p>
            <p className="text-sm font-semibold text-gray-800 dark:text-gray-100">${totalRevenue.toLocaleString()}</p>
          </div>
          <div className="rounded-xl border border-stone-200 dark:border-gray-700/50 bg-stone-50 dark:bg-gray-700/40 px-3 py-2">
            <p className="text-xs text-gray-500 dark:text-gray-400">Monthly Avg</p>
            <p className="text-sm font-semibold text-gray-800 dark:text-gray-100">${avgRevenue.toFixed(0)}</p>
          </div>
          <div className="rounded-xl border border-stone-200 dark:border-gray-700/50 bg-stone-50 dark:bg-gray-700/40 px-3 py-2">
            <p className="text-xs text-gray-500 dark:text-gray-400">MoM</p>
            <p className={`text-sm font-semibold ${growth >= 0 ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-600 dark:text-red-400'}`}>
              {growth >= 0 ? '+' : ''}
              {growth.toFixed(1)}%
            </p>
          </div>
        </div>
      </div>

      <div className="mt-4 h-80 rounded-xl border border-stone-200 dark:border-gray-700/50 bg-stone-50/60 dark:bg-gray-800/40 p-3">
        <Line key={isDark ? 'dark' : 'light'} data={chartData} options={options} />
      </div>
    </section>
  )
}

export default AdminDashboardRevenusAnalytics
