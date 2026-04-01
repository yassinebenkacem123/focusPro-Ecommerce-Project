import { FiFilter, FiSearch } from "react-icons/fi";
import { HiOutlineAdjustmentsHorizontal } from "react-icons/hi2";

const ProductFilterBar = () => {
  const categories = [
    { name: "All", value: "all" },
    { name: "Electronics", value: "electronics" },
    { name: "Clothing", value: "clothing" },
    { name: "Home & Kitchen", value: "home-kitchen" },
  ];

  const priceRanges = [
    { name: "All", value: "all" },
    { name: "$0 - $50", value: "0-50" },
    { name: "$50 - $100", value: "50-100" },
    { name: "$100 - $500", value: "100-500" },
    { name: "$500+", value: "500+" },
  ];

  const stockStatuses = [
    { name: "All", value: "all" },
    { name: "In Stock", value: "in-stock" },
    { name: "Out of Stock", value: "out-of-stock" },
  ];

  const dateRanges = [
    { name: "All", value: "all" },
    { name: "Last 7 Days", value: "last-7-days" },
    { name: "Last 30 Days", value: "last-30-days" },
    { name: "Last 90 Days", value: "last-90-days" },
  ];

  const selectClass = "w-full rounded-xl border border-stone-300 dark:border-gray-600 bg-white dark:bg-gray-800/80 px-3 py-3 text-sm text-stone-700 dark:text-gray-300 outline-none transition focus:border-stone-400 dark:focus:border-gray-500";

  return (
    <section className="w-full rounded-xl border border-stone-200 dark:border-gray-700/50 bg-white dark:bg-gray-800/60 p-5 shadow-xs">
      <div className="mb-5 flex items-start justify-between gap-4">
        <div>
          <div className="mb-2 flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-stone-100 dark:bg-gray-700/60 text-stone-700 dark:text-gray-300">
              <FiFilter size={18} />
            </div>
            <h3 className="text-lg font-semibold text-stone-800 dark:text-gray-100">
              Filter Products
            </h3>
          </div>
          <p className="text-sm text-stone-500 dark:text-gray-400">
            Narrow down products by category, price, stock status, and date.
          </p>
        </div>

        <button
          type="button"
          className="flex items-center gap-2 rounded-xl border border-stone-200 dark:border-gray-600 bg-stone-50 dark:bg-gray-700/40 px-4 py-2 text-sm font-medium text-stone-700 dark:text-gray-300 transition hover:bg-stone-100 dark:hover:bg-gray-700/60"
        >
          <HiOutlineAdjustmentsHorizontal size={18} />
          Reset Filters
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-5">
        {/* Search */}
        <div className="xl:col-span-1">
          <label className="mb-2 block text-sm font-medium text-stone-700 dark:text-gray-300">Search</label>
          <div className="flex items-center rounded-xl border border-stone-300 dark:border-gray-600 bg-white dark:bg-gray-800/80 px-3">
            <FiSearch className="text-stone-400 dark:text-gray-500" size={18} />
            <input
              type="text"
              placeholder="Search product..."
              className="w-full bg-transparent px-3 py-3 text-sm text-stone-700 dark:text-gray-300 placeholder-stone-400 dark:placeholder-gray-500 outline-none"
            />
          </div>
        </div>

        {/* Category */}
        <div>
          <label className="mb-2 block text-sm font-medium text-stone-700 dark:text-gray-300">Category</label>
          <select className={selectClass}>
            {categories.map((c) => <option key={c.value} value={c.value}>{c.name}</option>)}
          </select>
        </div>

        {/* Price Range */}
        <div>
          <label className="mb-2 block text-sm font-medium text-stone-700 dark:text-gray-300">Price Range</label>
          <select className={selectClass}>
            {priceRanges.map((p) => <option key={p.value} value={p.value}>{p.name}</option>)}
          </select>
        </div>

        {/* Stock Status */}
        <div>
          <label className="mb-2 block text-sm font-medium text-stone-700 dark:text-gray-300">Stock Status</label>
          <select className={selectClass}>
            {stockStatuses.map((s) => <option key={s.value} value={s.value}>{s.name}</option>)}
          </select>
        </div>

        {/* Date Added */}
        <div>
          <label className="mb-2 block text-sm font-medium text-stone-700 dark:text-gray-300">Date Added</label>
          <select className={selectClass}>
            {dateRanges.map((d) => <option key={d.value} value={d.value}>{d.name}</option>)}
          </select>
        </div>
      </div>
    </section>
  );
};

export default ProductFilterBar;