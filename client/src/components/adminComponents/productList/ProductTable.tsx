import type { ProductAdminState } from "../../../pages/admin/ProductList";
import { FaStar } from "react-icons/fa6";
import { FaUser } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { FiPackage } from "react-icons/fi";

const ProductTable = ({ products }: { products: ProductAdminState[] }) => {
  const navigate = useNavigate();

  return (
    <section className="w-full">
      {products.length === 0 ? (
        <div className="flex min-h-55 items-center justify-center rounded-xl border border-dashed border-stone-300 dark:border-gray-600 bg-stone-50 dark:bg-gray-800/40">
          <div className="flex flex-col items-center text-center">
            <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-stone-100 dark:bg-gray-700 text-stone-500 dark:text-gray-400">
              <FiPackage size={22} />
            </div>
            <p className="text-sm font-medium text-stone-600 dark:text-gray-300">No products found</p>
            <p className="mt-1 text-xs text-stone-400 dark:text-gray-500">
              Try adjusting your filters or add products from the seller dashboard.
            </p>
          </div>
        </div>
      ) : (
        <div className="overflow-hidden rounded-xl border border-stone-200 dark:border-gray-700/50">
          <div className="h-100 overflow-auto">
            <table className="min-w-full border-collapse">
              <thead className="sticky top-0 z-10 bg-stone-900 dark:bg-gray-700/90 text-xs uppercase tracking-wide text-stone-100 dark:text-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left font-semibold">Product</th>
                  <th className="px-6 py-4 text-left font-semibold">Image</th>
                  <th className="px-6 py-4 text-left font-semibold">Price</th>
                  <th className="px-6 py-4 text-left font-semibold">Category</th>
                  <th className="px-6 py-4 text-left font-semibold">Stock</th>
                  <th className="px-6 py-4 text-left font-semibold">Status</th>
                  <th className="px-6 py-4 text-left font-semibold">Created</th>
                  <th className="px-6 py-4 text-left font-semibold">Rating</th>
                  <th className="px-6 py-4 text-left font-semibold">Discount</th>
                  <th className="px-6 py-4 text-left font-semibold">Seller</th>
                </tr>
              </thead>

              <tbody className="bg-white dark:bg-transparent text-sm text-stone-700 dark:text-gray-300">
                {products.map((product) => (
                  <tr
                    key={product.productId}
                    className="border-t border-stone-200 dark:border-gray-700/50 transition hover:bg-stone-50 dark:hover:bg-gray-700/30"
                  >
                    <td className="px-6 py-4">
                      <div className="font-semibold text-stone-800 dark:text-gray-200">{product.productName}</div>
                    </td>

                    <td className="px-6 py-4">
                      <img
                        src={product.productImage}
                        alt={product.productName}
                        className="h-14 w-14 rounded-xl border border-stone-200 dark:border-gray-600 object-cover"
                      />
                    </td>

                    <td className="px-6 py-4 font-medium text-stone-800 dark:text-gray-200">
                      ${product.price.toFixed(2)}
                    </td>

                    <td className="px-6 py-4">
                      <span className="inline-flex rounded-full bg-stone-100 dark:bg-gray-700/60 px-3 py-1 text-xs font-medium text-stone-700 dark:text-gray-300">
                        {product.category}
                      </span>
                    </td>

                    <td className="px-6 py-4">
                      <span className="inline-flex min-w-12 justify-center rounded-full bg-stone-100 dark:bg-gray-700/60 px-3 py-1 text-xs font-medium text-stone-700 dark:text-gray-300">
                        {product.quentity}
                      </span>
                    </td>

                    <td className="px-6 py-4">
                      {product.status === "In Stock" ? (
                        <span className="inline-flex items-center rounded-full bg-emerald-100 dark:bg-emerald-950/60 px-3 py-1 text-xs font-medium text-emerald-600 dark:text-emerald-400">
                          In Stock
                        </span>
                      ) : (
                        <span className="inline-flex items-center rounded-full bg-red-100 dark:bg-red-950/60 px-3 py-1 text-xs font-medium text-red-600 dark:text-red-400">
                          Out of Stock
                        </span>
                      )}
                    </td>

                    <td className="px-6 py-4 text-sm text-stone-600 dark:text-gray-400">
                      {new Date(product.createdDate).toLocaleDateString()}
                    </td>

                    <td className="px-6 py-4">
                      <div className="inline-flex items-center gap-2 rounded-full bg-yellow-50 dark:bg-yellow-950/30 px-3 py-1 text-xs font-medium text-stone-700 dark:text-gray-300">
                        <FaStar size={13} className="text-yellow-500" />
                        {product.rating.toFixed(1)} / 5
                      </div>
                    </td>

                    <td className="px-6 py-4">
                      <span className="inline-flex rounded-full bg-blue-50 dark:bg-blue-950/40 px-3 py-1 text-xs font-medium text-blue-600 dark:text-blue-400">
                        {product.discount}%
                      </span>
                    </td>

                    <td className="px-6 py-4">
                      <button
                        onClick={() => navigate(`/admin/sellers/seller/${product.seller.sellerId}`)}
                        className="flex items-center gap-2 rounded-lg px-3 py-2 text-md font-medium text-stone-800 dark:text-gray-200 transition hover:bg-stone-100 dark:hover:bg-gray-700/60 hover:text-stone-900 dark:hover:text-gray-100 cursor-pointer"
                      >
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-stone-200 dark:bg-gray-700 text-stone-600 dark:text-gray-400">
                          <FaUser size={14} />
                        </div>
                        <span className="underline-offset-2 hover:underline">
                          {product.seller.sellerName}
                        </span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </section>
  );
};

export default ProductTable;