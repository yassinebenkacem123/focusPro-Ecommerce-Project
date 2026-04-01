import type { DashboardGlobalStatics } from '../../../lib/type'

type AdminDashboardConversionRatesProps = {
  totalVisitors: DashboardGlobalStatics['totalVisitors']
  totoalOrders: DashboardGlobalStatics['totoalOrders']
  usersInteractions: DashboardGlobalStatics['usersInteractions']
}

const AdminDashboardConversionRates = ({
  totalVisitors,
  totoalOrders,
  usersInteractions,
}: AdminDashboardConversionRatesProps) => {
  const findInteraction = (name: string) =>
    usersInteractions.find((item) => item.interaction.toLowerCase() === name.toLowerCase())?.count ?? 0

  const productViews = findInteraction('Product Views')
  const addToCart = findInteraction('Add to Cart')
  const purchases = findInteraction('Purchases')

  const visitToOrder = totalVisitors > 0 ? (totoalOrders / totalVisitors) * 100 : 0
  const viewToCart = productViews > 0 ? (addToCart / productViews) * 100 : 0
  const cartToPurchase = addToCart > 0 ? (purchases / addToCart) * 100 : 0

  const metrics = [
    { label: 'Visit to Order', value: visitToOrder, color: 'bg-emerald-500 dark:bg-emerald-400' },
    { label: 'View to Cart', value: viewToCart, color: 'bg-blue-500 dark:bg-blue-400' },
    { label: 'Cart to Purchase', value: cartToPurchase, color: 'bg-amber-500 dark:bg-amber-400' },
  ]

  return (
    <section className="rounded-lg border border-gray-100 dark:border-gray-700/50 bg-white dark:bg-gray-800/60 p-4 shadow-sm">
      <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">Conversion Rates</h2>
      <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Checkout funnel performance</p>

      <div className="mt-5 space-y-4">
        {metrics.map((metric) => {
          const clamped = Math.max(0, Math.min(metric.value, 100))

          return (
            <div key={metric.label}>
              <div className="mb-1 flex items-center justify-between text-sm">
                <span className="font-medium text-gray-600 dark:text-gray-300">{metric.label}</span>
                <span className="font-semibold text-gray-800 dark:text-gray-100">{metric.value.toFixed(1)}%</span>
              </div>
              <div className="h-2.5 rounded-full bg-gray-100 dark:bg-gray-700/60">
                <div className={`h-full rounded-full ${metric.color}`} style={{ width: `${clamped}%` }} />
              </div>
            </div>
          )
        })}
      </div>

      <div className="mt-5 grid grid-cols-2 gap-3 text-sm">
        <div className="rounded-xl border border-gray-100 dark:border-gray-700/50 bg-gray-50 dark:bg-gray-700/40 p-3">
          <p className="text-gray-500 dark:text-gray-400">Visitors</p>
          <p className="mt-1 font-semibold text-gray-800 dark:text-gray-100">{totalVisitors.toLocaleString()}</p>
        </div>
        <div className="rounded-xl border border-gray-100 dark:border-gray-700/50 bg-gray-50 dark:bg-gray-700/40 p-3">
          <p className="text-gray-500 dark:text-gray-400">Orders</p>
          <p className="mt-1 font-semibold text-gray-800 dark:text-gray-100">{totoalOrders.toLocaleString()}</p>
        </div>
      </div>
    </section>
  )
}

export default AdminDashboardConversionRates
