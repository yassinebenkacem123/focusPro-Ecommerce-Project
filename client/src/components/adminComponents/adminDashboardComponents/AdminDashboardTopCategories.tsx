import type { DashboardGlobalStatics } from '../../../lib/type'

type AdminDashboardTopCategoriesProps = {
  data: DashboardGlobalStatics['topCategories']
}

const AdminDashboardTopCategories = ({ data }: AdminDashboardTopCategoriesProps) => {
  const highestSale = Math.max(...data.map((item) => item.sales), 1)
  const barColors = [
    'from-emerald-500 to-teal-500',
    'from-blue-500 to-sky-500',
    'from-amber-500 to-orange-500',
    'from-pink-500 to-rose-500',
    'from-indigo-500 to-violet-500',
  ]

  return (
    <section className="rounded-lg border border-gray-100 dark:border-gray-700/50 bg-white dark:bg-gray-800/60 p-4 shadow-sm">
      <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">Top Categories</h2>
      <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Revenue distribution by category</p>

      <div className="mt-5 space-y-4">
        {data.map((category, index) => {
          const width = (category.sales / highestSale) * 100

          return (
            <div key={category.name}>
              <div className="mb-1 flex items-center justify-between text-sm">
                <p className="font-medium text-gray-700 dark:text-gray-300">
                  {index + 1}. {category.name}
                </p>
                <p className="font-semibold text-gray-800 dark:text-gray-100">${category.sales.toLocaleString()}</p>
              </div>
              <div className="h-2.5 rounded-full bg-gray-100 dark:bg-gray-700/60">
                <div
                  className={`h-full rounded-full bg-linear-to-r ${barColors[index % barColors.length]}`}
                  style={{ width: `${width}%` }}
                />
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}

export default AdminDashboardTopCategories
