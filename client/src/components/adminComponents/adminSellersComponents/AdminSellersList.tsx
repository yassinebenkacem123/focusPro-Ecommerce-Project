import { useMemo, useState } from "react";
import { FaStar } from "react-icons/fa6";
import { FiEye, FiEdit2, FiTrash2, FiUsers } from "react-icons/fi";
import type { SellersProp } from "../../../pages/admin/Sellers";
import { useNavigate } from "react-router-dom";

const ITEMS_PER_PAGE = 5;

const formatCurrency = (value: number) =>
  `$${value.toLocaleString("en-US", { maximumFractionDigits: 0 })}`;

const getStatusBadge = (status: string) => {
  const s = status.toLowerCase();
  if (s === "active") return "inline-flex items-center rounded-full bg-emerald-100 dark:bg-emerald-950/60 px-3 py-1 text-xs font-medium text-emerald-700 dark:text-emerald-400";
  if (s === "suspended") return "inline-flex items-center rounded-full bg-red-100 dark:bg-red-950/60 px-3 py-1 text-xs font-medium text-red-700 dark:text-red-400";
  return "inline-flex items-center rounded-full bg-amber-100 dark:bg-amber-950/60 px-3 py-1 text-xs font-medium text-amber-700 dark:text-amber-400";
};

const createShopName = (sellerName: string) => {
  const firstName = sellerName.split(" ")[0];
  return `${firstName.charAt(0).toUpperCase()}${firstName.slice(1)}'s Store`;
};

const getInitials = (sellerName: string) => {
  const names = sellerName.split(" ").filter(Boolean);
  if (names.length === 0) return "NA";
  if (names.length === 1) return names[0].charAt(0).toUpperCase();
  return `${names[0].charAt(0)}${names[1].charAt(0)}`.toUpperCase();
};

const AdminSellersList = ({ sellers }: { sellers: SellersProp[] }) => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.max(1, Math.ceil(sellers.length / ITEMS_PER_PAGE));

  const paginatedSellers = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return sellers.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [currentPage, sellers]);

  const startEntry = sellers.length === 0 ? 0 : (currentPage - 1) * ITEMS_PER_PAGE + 1;
  const endEntry = Math.min(currentPage * ITEMS_PER_PAGE, sellers.length);
  const pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1);

  return (
    <section className="w-full">
      {sellers.length === 0 ? (
        <div className="flex min-h-55 items-center justify-center rounded-xl border border-dashed border-stone-300 dark:border-gray-600 bg-stone-50 dark:bg-gray-800/40">
          <div className="flex flex-col items-center text-center">
            <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-stone-100 dark:bg-gray-700 text-stone-500 dark:text-gray-400">
              <FiUsers size={22} />
            </div>
            <p className="text-sm font-medium text-stone-600 dark:text-gray-300">No sellers found</p>
            <p className="mt-1 text-xs text-stone-400 dark:text-gray-500">
              Try changing filters or adding new sellers.
            </p>
          </div>
        </div>
      ) : (
        <div className="overflow-hidden rounded-xl border border-stone-200 dark:border-gray-700/50 bg-white dark:bg-gray-800/60">
          <div className="max-h-110 overflow-auto">
            <table className="min-w-full border-collapse">
              <thead className="sticky top-0 z-10 bg-stone-900 dark:bg-gray-700/90 text-xs uppercase tracking-wide text-stone-100 dark:text-gray-200">
                <tr>
                  <th className="px-5 py-4 text-left font-semibold">Seller</th>
                  <th className="px-5 py-4 text-left font-semibold">Shop Name</th>
                  <th className="px-5 py-4 text-left font-semibold">Email</th>
                  <th className="px-5 py-4 text-left font-semibold">Status</th>
                  <th className="px-5 py-4 text-left font-semibold">Products</th>
                  <th className="px-5 py-4 text-left font-semibold">Sales</th>
                  <th className="px-5 py-4 text-left font-semibold">Rating</th>
                  <th className="px-5 py-4 text-left font-semibold">Actions</th>
                </tr>
              </thead>

              <tbody className="bg-white dark:bg-transparent text-sm text-stone-700 dark:text-gray-300">
                {paginatedSellers.map((seller, index) => (
                  <tr
                    key={`${seller.sellerEmail}-${index}`}
                    className="border-t border-stone-200 dark:border-gray-700/50 transition hover:bg-stone-50 dark:hover:bg-gray-700/30"
                  >
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-stone-200 dark:bg-gray-700 text-xs font-semibold uppercase text-stone-700 dark:text-gray-300">
                          {getInitials(seller.sellerName)}
                        </div>
                        <span className="font-medium text-stone-800 dark:text-gray-200">{seller.sellerName}</span>
                      </div>
                    </td>

                    <td className="px-5 py-4 font-medium text-stone-700 dark:text-gray-300">
                      {createShopName(seller.sellerName)}
                    </td>

                    <td className="px-5 py-4 text-stone-600 dark:text-gray-400">{seller.sellerEmail}</td>

                    <td className="px-5 py-4">
                      <span className={getStatusBadge(seller.status)}>{seller.status}</span>
                    </td>

                    <td className="px-5 py-4">
                      <span className="inline-flex min-w-12 justify-center rounded-full bg-stone-100 dark:bg-gray-700/60 px-3 py-1 text-xs font-medium text-stone-700 dark:text-gray-300">
                        {seller.numberOfProducts ?? 0}
                      </span>
                    </td>

                    <td className="px-5 py-4 font-semibold text-stone-800 dark:text-gray-200">
                      {formatCurrency(seller.sales ?? 0)}
                    </td>

                    <td className="px-5 py-4">
                      <div className="inline-flex items-center gap-2 rounded-full bg-yellow-50 dark:bg-yellow-950/30 px-3 py-1 text-xs font-medium text-stone-700 dark:text-gray-300">
                        <FaStar size={12} className="text-yellow-500" />
                        {(seller.rating ?? 0).toFixed(1)}
                      </div>
                    </td>

                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2 text-stone-500 dark:text-gray-400">
                        <button
                          onClick={() => navigate(`/admin/sellers/seller/${seller.sellerEmail}`)}
                          type="button"
                          className="rounded-lg border border-stone-200 dark:border-gray-600 p-2 transition cursor-pointer hover:bg-gray-200/50 dark:hover:bg-gray-700/60 hover:border-stone-300 dark:hover:border-gray-500 hover:text-stone-700 dark:hover:text-gray-200"
                          aria-label={`View ${seller.sellerName}`}
                        >
                          <FiEye size={14} />
                        </button>
                        <button
                          type="button"
                          className="rounded-lg border border-stone-200 dark:border-gray-600 p-2 transition cursor-pointer hover:bg-green-200/80 dark:hover:bg-green-950/40 hover:border-green-300 dark:hover:border-green-700 hover:text-green-500 dark:hover:text-green-400"
                          aria-label={`Edit ${seller.sellerName}`}
                        >
                          <FiEdit2 size={14} />
                        </button>
                        <button
                          type="button"
                          className="rounded-lg border border-stone-200 dark:border-gray-600 p-2 transition cursor-pointer hover:bg-red-200/80 dark:hover:bg-red-950/40 hover:border-red-300 dark:hover:border-red-700 hover:text-red-600 dark:hover:text-red-400"
                          aria-label={`Delete ${seller.sellerName}`}
                        >
                          <FiTrash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex flex-col gap-3 border-t border-stone-200 dark:border-gray-700/50 px-4 py-3 text-xs text-stone-500 dark:text-gray-400 sm:flex-row sm:items-center sm:justify-between">
            <p>
              Showing {startEntry} to {endEntry} of {sellers.length} entries
            </p>

            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="rounded-md border border-stone-200 dark:border-gray-600 px-3 py-1.5 text-stone-600 dark:text-gray-300 transition hover:bg-stone-100 dark:hover:bg-gray-700/60 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Previous
              </button>

              {pageNumbers.map((page) => (
                <button
                  key={page}
                  type="button"
                  onClick={() => setCurrentPage(page)}
                  className={`rounded-md px-3 py-1.5 transition ${
                    page === currentPage
                      ? "bg-stone-800 dark:bg-gray-600 text-white"
                      : "border border-stone-200 dark:border-gray-600 text-stone-600 dark:text-gray-300 hover:bg-stone-100 dark:hover:bg-gray-700/60"
                  }`}
                >
                  {page}
                </button>
              ))}

              <button
                type="button"
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="rounded-md border border-stone-200 dark:border-gray-600 px-3 py-1.5 text-stone-600 dark:text-gray-300 transition hover:bg-stone-100 dark:hover:bg-gray-700/60 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default AdminSellersList;
