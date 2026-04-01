import type { DashboardGlobalStatics } from '../../../lib/type'

type AdminDashboardRecentOrdersProps = {
  data: DashboardGlobalStatics['recentOrders']
}

const statusClassMap: Record<string, string> = {
  completed: 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400',
  processing: 'bg-sky-100 dark:bg-sky-950/60 text-sky-700 dark:text-sky-400',
  shipped: 'bg-indigo-100 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-400',
  cancelled: 'bg-red-100 dark:bg-red-950/60 text-red-700 dark:text-red-400',
}

const AdminDashboardRecentOrders = ({ data }: AdminDashboardRecentOrdersProps) => {
  return (
    <section className="rounded-lg border border-stone-200 dark:border-gray-700/50 bg-white dark:bg-gray-800/60 p-4 shadow-xs">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">Recent Orders</h2>
          <p className="mt-1 text-sm text-stone-500 dark:text-gray-400">Latest transactions and order statuses</p>
        </div>
      </div>

      <div className="overflow-x-auto rounded-xl border border-stone-200 dark:border-gray-700/50">
        <table className="w-full min-w-175 border-separate border-spacing-y-0 text-sm">
          <thead>
            <tr className="text-left text-sm uppercase tracking-wide text-stone-100 dark:text-gray-300 bg-stone-900 dark:bg-gray-700/80">
              <th className="px-6 py-3 font-semibold">Order</th>
              <th className="px-6 py-3 font-semibold">Customer</th>
              <th className="px-6 py-3 font-semibold">Product</th>
              <th className="px-6 py-3 font-semibold">Country</th>
              <th className="px-6 py-3 font-semibold">Amount</th>
              <th className="px-6 py-3 font-semibold">Status</th>
            </tr>
          </thead>
          <tbody className="text-sm text-stone-600 dark:text-gray-400">
            {data.map((order) => {
              const badgeClass = statusClassMap[order.status.toLowerCase()] ?? 'bg-stone-100 dark:bg-gray-700 text-stone-700 dark:text-gray-300'

              return (
                <tr
                  key={order.orderId}
                  className="border-t border-stone-200 dark:border-gray-700/50 odd:bg-white dark:odd:bg-gray-800/40 even:bg-stone-50/40 dark:even:bg-gray-800/20 hover:bg-stone-100 dark:hover:bg-gray-700/40 transition-colors duration-150"
                >
                  <td className="px-6 py-4 font-medium text-stone-700 dark:text-gray-300">#{order.orderId}</td>
                  <td className="px-6 py-4 text-stone-700 dark:text-gray-300">{order.customer}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={order.product.image}
                        alt={order.product.name}
                        className="h-9 w-9 rounded-lg border border-stone-200 dark:border-gray-600 object-cover"
                        onError={(event) => {
                          event.currentTarget.src = 'https://placehold.co/80x80'
                        }}
                      />
                      <div>
                        <p className="font-medium text-stone-700 dark:text-gray-300">{order.product.name}</p>
                        <p className="text-xs text-stone-500 dark:text-gray-500">{new Date(order.date).toLocaleDateString()}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-stone-600 dark:text-gray-400">{order.country}</td>
                  <td className="px-6 py-4 font-semibold text-stone-800 dark:text-gray-200">${order.amount.toFixed(2)}</td>
                  <td className="px-6 py-4">
                    <span className={`rounded-full px-2.5 py-1 text-xs font-semibold capitalize ${badgeClass}`}>
                      {order.status}
                    </span>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </section>
  )
}

export default AdminDashboardRecentOrders
