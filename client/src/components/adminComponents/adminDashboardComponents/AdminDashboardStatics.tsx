import { FiDollarSign, FiShoppingCart, FiTrendingUp, FiUsers } from 'react-icons/fi'
import type { DashboardGlobalStatics } from '../../../lib/type'

type AdminDashboardStaticsProps = {
  data: Pick<
    DashboardGlobalStatics,
    'totalSales' | 'totoalOrders' | 'totalVisitors' | 'currentMonthRevenus'
  >;
}

const formatCurrency = (value: number) => `$${value.toLocaleString()}`

const AdminDashboardStatics = ({ data }: AdminDashboardStaticsProps) => {
  const averageOrderValue = data.totoalOrders > 0 ? data.totalSales / data.totoalOrders : 0

  const stats = [
    {
      title: 'Total Sales',
      value: formatCurrency(data.totalSales),
      subtitle: `Avg order ${formatCurrency(Math.round(averageOrderValue))}`,
      icon: <FiDollarSign size={22} />,
      iconStyle: 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400',
    },
    {
      title: 'Total Orders',
      value: data.totoalOrders.toLocaleString(),
      subtitle: 'Across all channels',
      icon: <FiShoppingCart size={22} />,
      iconStyle: 'bg-blue-100 dark:bg-blue-950/60 text-blue-700 dark:text-blue-400',
    },
    {
      title: 'Total Visitors',
      value: data.totalVisitors.toLocaleString(),
      subtitle: 'Unique visitors',
      icon: <FiUsers size={22} />,
      iconStyle: 'bg-violet-100 dark:bg-violet-950/60 text-violet-700 dark:text-violet-400',
    },
    {
      title: 'Current Month Revenue',
      value: formatCurrency(data.currentMonthRevenus),
      subtitle: 'Running month performance',
      icon: <FiTrendingUp size={22} />,
      iconStyle: 'bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-400',
    },
  ]

  return (
    <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {stats.map((stat) => (
        <article
          key={stat.title}
          className="rounded-2xl border border-stone-200 dark:border-gray-700/50 bg-white dark:bg-gray-800/60 p-5 shadow-sm hover:shadow-md dark:hover:shadow-gray-900/30 transition-shadow duration-200"
        >
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-sm font-medium text-stone-500 dark:text-gray-400">{stat.title}</p>
              <h3 className="mt-2 text-2xl font-bold text-stone-800 dark:text-gray-100">{stat.value}</h3>
              <p className="mt-1 text-xs text-stone-500 dark:text-gray-500">{stat.subtitle}</p>
            </div>
            <div className={`flex h-11 w-11 items-center justify-center rounded-xl ${stat.iconStyle}`}>
              {stat.icon}
            </div>
          </div>
        </article>
      ))}
    </section>
  )
}

export default AdminDashboardStatics
