import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Tooltip,
} from 'chart.js'
import { Bar } from 'react-chartjs-2'
import { useTheme } from '../../../features/theme/useTheme'

type CategoryData = {
  categoryName: string
  numberProducts: number
}

type CategoryAndProductsProps = {
  categories: CategoryData[]
}

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend)

const CategoryAndProducts = ({ categories }: CategoryAndProductsProps) => {
  const { isDark } = useTheme()

  const chartData = {
    labels: categories.map((category) => category.categoryName),
    datasets: [
      {
        label: 'Products by category',
        data: categories.map((category) => category.numberProducts),
        backgroundColor: [
          'rgba(59, 130, 246, 0.7)',
          'rgba(16, 185, 129, 0.7)',
          'rgba(245, 158, 11, 0.7)',
          'rgba(239, 68, 68, 0.7)',
          'rgba(99, 102, 241, 0.7)',
          'rgba(236, 72, 153, 0.7)',
        ],
        borderColor: [
          'rgba(59, 130, 246, 1)',
          'rgba(16, 185, 129, 1)',
          'rgba(245, 158, 11, 1)',
          'rgba(239, 68, 68, 1)',
          'rgba(99, 102, 241, 1)',
          'rgba(236, 72, 153, 1)',
        ],
        borderWidth: 1,
        borderRadius: 8,
      },
    ],
  }

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: false,
      },
      tooltip: {
        backgroundColor: isDark ? '#111827' : '#1f2937',
        titleColor: '#f9fafb',
        bodyColor: '#d1d5db',
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: isDark ? '#9ca3af' : '#6b7280',
        },
        border: {
          display: false,
        },
      },
      y: {
        beginAtZero: true,
        grid: {
          color: isDark ? 'rgba(75, 85, 99, 0.4)' : 'rgba(229, 231, 235, 0.9)',
        },
        ticks: {
          color: isDark ? '#9ca3af' : '#6b7280',
          precision: 0,
        },
        border: {
          display: false,
        },
      },
    },
  }

  return (
    <div className='rounded-lg border border-gray-100 dark:border-gray-700/50 bg-white dark:bg-gray-800/60 p-4 shadow-sm'>
      <h3 className='mb-4 text-lg font-semibold text-gray-800 dark:text-gray-100'>Category and Products</h3>
      <div className='h-72'>
        {categories.length > 0 ? (
          <Bar key={isDark ? 'dark' : 'light'} data={chartData} options={options} />
        ) : (
          <p className='text-sm text-gray-500 dark:text-gray-400'>No category data available.</p>
        )}
      </div>
    </div>
  )
}

export default CategoryAndProducts
