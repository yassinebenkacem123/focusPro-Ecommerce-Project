import type { SellerProductProps } from "../../../pages/admin/AdminSellerManagement"
import { FaStar } from "react-icons/fa"
import { FiPackage } from "react-icons/fi"

const SellerProductsTableOnAdmin = ({ sellerProducts }: { sellerProducts: SellerProductProps[] }) => {
  return (
    <div className='w-[60%] rounded-2xl border border-stone-200 dark:border-gray-700/50 bg-white dark:bg-gray-800/60 p-5 shadow-sm'>
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-stone-800 dark:text-gray-100">Seller Products</h2>
          <p className="text-sm text-stone-500 dark:text-gray-400">Inventory and product performance overview</p>
        </div>
        <span className="inline-flex items-center rounded-full bg-stone-100 dark:bg-gray-700/60 px-3 py-1 text-xs font-medium text-stone-700 dark:text-gray-300">
          {sellerProducts.length} {sellerProducts.length === 1 ? "product" : "products"}
        </span>
      </div>

      {sellerProducts.length === 0 ? (
        <div className="flex min-h-56 items-center justify-center rounded-xl border border-dashed border-stone-300 dark:border-gray-600 bg-stone-50 dark:bg-gray-800/40">
          <div className="flex flex-col items-center text-center">
            <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-stone-100 dark:bg-gray-700 text-stone-500 dark:text-gray-400">
              <FiPackage size={22} />
            </div>
            <p className="text-sm font-medium text-stone-600 dark:text-gray-300">No products available</p>
            <p className="mt-1 text-xs text-stone-400 dark:text-gray-500">This seller has no products listed yet.</p>
          </div>
        </div>
      ) : (
        <div className="overflow-hidden rounded-xl border border-stone-200 dark:border-gray-700/50">
          <div className="max-h-200 overflow-auto">
            <table className="min-w-full border-collapse text-left">
              <thead className="sticky top-0 z-10 bg-stone-900 dark:bg-gray-700/90 text-xs uppercase tracking-wide text-stone-100 dark:text-gray-200">
                <tr>
                  <th className="px-6 py-4 font-semibold">Product</th>
                  <th className="px-6 py-4 font-semibold">Category</th>
                  <th className="px-6 py-4 font-semibold">Price</th>
                  <th className="px-6 py-4 font-semibold">Stock</th>
                  <th className="px-6 py-4 font-semibold">Status</th>
                  <th className="px-6 py-4 font-semibold">Sales</th>
                  <th className="px-6 py-4 font-semibold">Rating</th>
                </tr>
              </thead>

              <tbody className="text-sm text-stone-700 dark:text-gray-300">
                {sellerProducts.map((product) => (
                  <tr
                    key={product.productId}
                    className="border-t border-stone-200 dark:border-gray-700/50 odd:bg-white dark:odd:bg-gray-800/40 even:bg-stone-50/40 dark:even:bg-gray-800/20 transition hover:bg-stone-100 dark:hover:bg-gray-700/40"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={product.productImage}
                          alt={product.productName}
                          className="h-12 w-12 rounded-xl border border-stone-200 dark:border-gray-600 object-cover"
                        />
                        <div>
                          <p className="font-semibold text-stone-800 dark:text-gray-200">{product.productName}</p>
                        </div>
                      </div>
                    </td>

                    <td className="px-6 py-4">
                      <span className="inline-flex rounded-full bg-stone-100 dark:bg-gray-700/60 px-3 py-1 text-xs font-medium text-stone-700 dark:text-gray-300">
                        {product.category}
                      </span>
                    </td>

                    <td className="px-6 py-4 font-semibold text-stone-800 dark:text-gray-200">${product.price.toFixed(2)}</td>

                    <td className="px-6 py-4">
                      <span className="inline-flex min-w-12 justify-center rounded-full bg-stone-100 dark:bg-gray-700/60 px-3 py-1 text-xs font-medium text-stone-700 dark:text-gray-300">
                        {product.quentity}
                      </span>
                    </td>

                    <td className="px-6 py-4">
                      {product.status.toLowerCase().includes("in") ? (
                        <span className="inline-flex items-center rounded-full bg-emerald-100 dark:bg-emerald-950/60 px-3 py-1 text-xs font-medium text-emerald-600 dark:text-emerald-400">
                          In Stock
                        </span>
                      ) : (
                        <span className="inline-flex items-center rounded-full bg-red-100 dark:bg-red-950/60 px-3 py-1 text-xs font-medium text-red-600 dark:text-red-400">
                          Out of Stock
                        </span>
                      )}
                    </td>

                    <td className="px-6 py-4 text-stone-700 dark:text-gray-300">{product.sales}</td>

                    <td className="px-6 py-4">
                      <span className="inline-flex items-center gap-2 rounded-full bg-amber-50 dark:bg-amber-950/40 px-3 py-1 text-xs font-medium text-amber-700 dark:text-amber-400">
                        <FaStar size={13} className="text-amber-500" />
                        {product.rating.toFixed(1)} / 5
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}

export default SellerProductsTableOnAdmin
