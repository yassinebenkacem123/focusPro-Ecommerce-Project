import { FiFilter, FiSearch } from "react-icons/fi";
import { HiOutlineAdjustmentsHorizontal } from "react-icons/hi2";

const AdminSellersFilter = () => {  

    const categories = [
        { name: "All", value: "all" },
        { name: "Active", value: "active" },
        { name: "Suspended", value: "suspended" },
        { name: "Pending", value: "pending" },
    ];

  const sortBy = [
        { name: "Newest", value: "newest" },
        { name: "Oldest", value: "oldest" },
        { name: "Most Sales", value: "most-sales" },
        { name: "Highest Rating", value: "highest-rating" },
     ];

  return (
    <section className="w-full rounded-xl border border-stone-200 dark:border-gray-700/50 bg-white dark:bg-gray-800/60 p-4 shadow-xs sm:p-5">
      <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <div className="mb-2 flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-stone-100 dark:bg-gray-700/60 text-stone-700 dark:text-gray-300">
              <FiFilter size={18} />
            </div>
            <h3 className="text-lg font-semibold text-stone-800 dark:text-gray-100">
              Filter Sellers
            </h3>
          </div>
          <p className="text-sm text-stone-500 dark:text-gray-400">
            Narrow down sellers by category, price, stock status, and date.
          </p>
        </div>

        <button
          type="button"
          className="flex w-full items-center justify-center gap-2 rounded-xl border border-stone-200 dark:border-gray-700/50 bg-stone-50 dark:bg-gray-700/40 px-4 py-2 text-sm font-medium text-stone-700 dark:text-gray-300 transition hover:bg-stone-100 dark:hover:bg-gray-700/60 sm:w-auto"
        >
          <HiOutlineAdjustmentsHorizontal size={18} />
          Reset Filters
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {/* Search */}
        <div className="sm:col-span-2 lg:col-span-1">
          <label className="mb-2 block text-sm font-medium text-stone-700 dark:text-gray-300">
            Search
          </label>
          <div className="flex items-center rounded-xl border border-stone-300 dark:border-gray-600 bg-white dark:bg-gray-800/80 px-3">
            <FiSearch className="text-stone-400 dark:text-gray-500" size={18} />
            <input
              type="text"
              placeholder="Search by seller name or email"
              className="w-full bg-transparent px-3 py-3 text-sm text-stone-700 dark:text-gray-300 placeholder-stone-400 dark:placeholder-gray-500 outline-none"
            />
          </div>
        </div>

        {/* Category */}
        <div>
          <label className="mb-2 block text-sm font-medium text-stone-700 dark:text-gray-300">
            Category
          </label>
          <select className="w-full rounded-xl border border-stone-300 dark:border-gray-600 bg-white dark:bg-gray-800/80 px-3 py-3 text-sm text-stone-700 dark:text-gray-300 outline-none transition focus:border-stone-400 dark:focus:border-gray-500">
            {categories.map((category) => (
              <option key={category.value} value={category.value}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-stone-700 dark:text-gray-300">
            Sort By
          </label>
          <select className="w-full rounded-xl border border-stone-300 dark:border-gray-600 bg-white dark:bg-gray-800/80 px-3 py-3 text-sm text-stone-700 dark:text-gray-300 outline-none transition focus:border-stone-400 dark:focus:border-gray-500">
            {sortBy.map((sort) => (
              <option key={sort.value} value={sort.value}>
                {sort.name}
              </option>
            ))}
          </select>
        </div>
      </div>
    </section>
  );
}

export default AdminSellersFilter
