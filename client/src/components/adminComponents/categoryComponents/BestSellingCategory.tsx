import {
  ArcElement,
  Chart as ChartJS,
  Legend,
  Tooltip,
  type ChartOptions,
} from 'chart.js'
import { Doughnut } from 'react-chartjs-2'
import { useTheme } from '../../../features/theme/useTheme'

type CategoryData = {
  categoryName: string
  numberSellingProducts: number
}

type BestSellingCategoryProps = {
  categories: CategoryData[]
}

ChartJS.register(ArcElement, Tooltip, Legend)

const bgColors = [
  'rgba(16, 185, 129, 0.75)',
  'rgba(59, 130, 246, 0.75)',
  'rgba(245, 158, 11, 0.75)',
  'rgba(236, 72, 153, 0.75)',
  'rgba(99, 102, 241, 0.75)',
]

const BestSellingCategory = ({ categories }: BestSellingCategoryProps) => {
  const { isDark } = useTheme()

  const sortedCategories = [...categories]
    .sort((a, b) => b.numberSellingProducts - a.numberSellingProducts)
    .slice(0, 5)

  const chartData = {
    labels: sortedCategories.map((category) => category.categoryName),
    datasets: [
      {
        label: 'Best selling categories',
        data: sortedCategories.map((category) => category.numberSellingProducts),
        backgroundColor: bgColors,
        borderColor: isDark ? '#1f2937' : '#ffffff',
        borderWidth: 2,
      },
    ],
  }

  const options: ChartOptions<'doughnut'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          color: isDark ? '#9ca3af' : '#374151',
          padding: 12,
        },
      },
      tooltip: {
        backgroundColor: isDark ? '#111827' : '#1f2937',
        titleColor: '#f9fafb',
        bodyColor: '#d1d5db',
        callbacks: {
          label: (context) => `Sold: ${context.parsed}`,
        },
      },
    },
  }

  return (
    <div className='rounded-lg border border-gray-100 dark:border-gray-700/50 bg-white dark:bg-gray-800/60 p-4 shadow-sm'>
      <h3 className='mb-4 text-lg font-semibold text-gray-800 dark:text-gray-100'>Best Selling Category</h3>
      <div className='h-72'>
        {sortedCategories.length > 0 ? (
          <Doughnut key={isDark ? 'dark' : 'light'} data={chartData} options={options} />
        ) : (
          <p className='text-sm text-gray-500 dark:text-gray-400'>No sales data available.</p>
        )}
      </div>
    </div>
  )
}

export default BestSellingCategory
