import type { SellerEarningsStatisticsProps } from '../../../pages/admin/AdminSellerManagement'
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
import { useTheme } from '../../../features/theme/useTheme'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend, Filler)

const SellerGrapthForEarnings = ({ sellerEarningsStatistics }: { sellerEarningsStatistics: SellerEarningsStatisticsProps[] }) => {
  const { isDark } = useTheme()

  const labels = sellerEarningsStatistics.map((stat, index) => {
    const shortMonth = stat.month.slice(0, 3)
    const cycle = Math.floor(index / 12) + 1

    return sellerEarningsStatistics.length > 12 ? `${shortMonth} ${cycle}` : shortMonth
  })

  const earningsValues = sellerEarningsStatistics.map((stat) => stat.earnings)
  const totalEarnings = earningsValues.reduce((acc, value) => acc + value, 0)
  const averageEarnings = earningsValues.length ? totalEarnings / earningsValues.length : 0
  const highestEarning = earningsValues.length ? Math.max(...earningsValues) : 0

  const chartData = {
    labels,
    datasets: [
      {
        label: 'Monthly Earnings',
        data: earningsValues,
        borderColor: isDark ? '#14b8a6' : '#0f766e',
        backgroundColor: isDark ? 'rgba(20, 184, 166, 0.15)' : 'rgba(15, 118, 110, 0.14)',
        pointBackgroundColor: isDark ? '#14b8a6' : '#0f766e',
        pointBorderColor: isDark ? '#1f2937' : '#ffffff',
        pointBorderWidth: 2,
        pointRadius: 3,
        pointHoverRadius: 5,
        borderWidth: 2,
        fill: true,
        tension: 0.32,
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
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: isDark ? '#111827' : '#1c1917',
        padding: 12,
        displayColors: false,
        callbacks: {
          label: (context) => {
            const value = context.parsed.y ?? 0
            return `Earnings: $${value.toLocaleString()}`
          },
        },
      },
    },
    scales: {
      x: {
        grid: {
          color: isDark ? 'rgba(75, 85, 99, 0.3)' : 'rgba(214, 211, 209, 0.45)',
        },
        border: {
          display: false,
        },
        ticks: {
          color: isDark ? '#9ca3af' : '#78716c',
          maxRotation: 0,
          autoSkip: true,
          maxTicksLimit: 12,
          font: {
            size: 11,
          },
        },
      },
      y: {
        beginAtZero: true,
        grid: {
          color: isDark ? 'rgba(75, 85, 99, 0.3)' : 'rgba(214, 211, 209, 0.45)',
        },
        border: {
          display: false,
        },
        ticks: {
          color: isDark ? '#9ca3af' : '#78716c',
          callback: (value) => `$${Number(value).toLocaleString()}`,
          font: {
            size: 11,
          },
        },
      },
    },
  }

  return (
    <div className="w-[60%] rounded-2xl border border-stone-200 dark:border-gray-700/50 bg-white dark:bg-gray-800/60 p-5 shadow-sm">
      <div className="flex flex-wrap items-start justify-between gap-4 border-b border-stone-200 dark:border-gray-700/50 pb-4">
        <div>
          <h2 className="text-lg font-semibold text-stone-800 dark:text-gray-100">Earnings Overview</h2>
          <p className="mt-1 text-sm text-stone-500 dark:text-gray-400">Seller earnings by month</p>
        </div>

        <div className="flex flex-wrap gap-2">
          <div className="rounded-xl border border-stone-200 dark:border-gray-700/50 bg-stone-50 dark:bg-gray-700/40 px-3 py-2">
            <p className="text-xs text-stone-500 dark:text-gray-400">Total</p>
            <p className="text-sm font-semibold text-stone-800 dark:text-gray-100">${totalEarnings.toLocaleString()}</p>
          </div>
          <div className="rounded-xl border border-stone-200 dark:border-gray-700/50 bg-stone-50 dark:bg-gray-700/40 px-3 py-2">
            <p className="text-xs text-stone-500 dark:text-gray-400">Average</p>
            <p className="text-sm font-semibold text-stone-800 dark:text-gray-100">${averageEarnings.toFixed(0)}</p>
          </div>
          <div className="rounded-xl border border-stone-200 dark:border-gray-700/50 bg-stone-50 dark:bg-gray-700/40 px-3 py-2">
            <p className="text-xs text-stone-500 dark:text-gray-400">Peak</p>
            <p className="text-sm font-semibold text-emerald-600 dark:text-emerald-400">${highestEarning.toLocaleString()}</p>
          </div>
        </div>
      </div>

      <div className="mt-4 h-80 rounded-xl border border-stone-200 dark:border-gray-700/50 bg-stone-50/60 dark:bg-gray-800/50 p-3">
        <Line key={isDark ? 'dark' : 'light'} data={chartData} options={options} />
      </div>
    </div>
  )
}

export default SellerGrapthForEarnings
