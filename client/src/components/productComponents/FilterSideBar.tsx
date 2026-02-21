import { priceRanges, categories } from "../../lib/staticData";

const FilterSideBar = ({ handleCategorySelect }: { handleCategorySelect: (e: React.ChangeEvent<HTMLInputElement>) => void }) => {
  return (
    <aside className="hidden md:flex flex-col w-[20%] pr-8 border-r border-stone-200 min-h-screen">
      <div className="flex items-center justify-between mb-10">
        <div className="flex items-center gap-3">
          <h2 className="text-4xl font-semibold tracking-tight text-stone-900">Filters</h2>
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-stone-900 text-[15px] font-bold text-white">
            3
          </span>
        </div>
  
      </div>

      <div className="flex flex-col gap-10">
        {/* Category Section */}
        <section>
          <h3 className="text-xl font-bold uppercase tracking-widest text-stone-500 mb-5">
            Categories
          </h3>
          <div className="flex flex-col gap-3">
            {categories.map((category) => (
              <label
                key={category.categoryId}
                className="group flex items-center cursor-pointer"
              >
                <div  className="relative flex items-center">
                  <input
                    value={category.categoryName}
                    onChange={(e) => handleCategorySelect(e)}
                    type="radio"
                    name="categories"
                    id={`category-${category.categoryId}`}
                    className="peer h-7 w-7 cursor-pointer appearance-none rounded border border-stone-300 bg-white transition-all checked:bg-stone-900 checked:border-stone-900 hover:border-stone-400"
                  />
                  <svg
                    className="absolute h-3.5 w-3.5 text-white opacity-0 peer-checked:opacity-100 pointer-events-none left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transition-opacity"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <span className="ml-3 text-lg font-medium text-stone-600 group-hover:text-stone-900 transition-colors">
                  {category.categoryName}
                </span>
              </label>
            ))}
          </div>
        </section>

        {/* Price Range Section */}
        <section>
          <h3 className="text-xl font-bold uppercase tracking-widest text-stone-500 mb-5">
            Price Range
          </h3>
          <div className="flex flex-col gap-3">
            {priceRanges.map((range, index) => (
              <label
                key={index}
                className="group flex items-center cursor-pointer"
              >
                <div className="relative flex items-center">
                  <input
                    type="checkbox"
                    id={`price-${index}`}
                    className="peer h-7 w-7 cursor-pointer appearance-none rounded-full border border-stone-300 bg-white transition-all checked:bg-stone-900 checked:border-stone-900 hover:border-stone-400"
                  />
                  <div className="absolute h-1.5 w-1.5 rounded-full bg-white opacity-0 peer-checked:opacity-100 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transition-opacity" />
                </div>
                <span className="ml-3 text-lg font-medium text-stone-600 group-hover:text-stone-900 transition-colors">
                  {range.label}
                </span>
              </label>
            ))}
          </div>
        </section>
      </div>
    </aside>
  );
};

export default FilterSideBar;