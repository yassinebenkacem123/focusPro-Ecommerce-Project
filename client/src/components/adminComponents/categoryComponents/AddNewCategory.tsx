import { GoPlus } from "react-icons/go";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../../store/store";
import { addNewCategoryToStats } from "../../../features/categoriesStats/categoriesStatsSlice";
import { useState } from "react";

const AddNewCategory = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { addCategoryErrorMessage, isAddingCategory } = useSelector(
    (state: RootState) => state.categoriesStats
  );

  const [categoryName, setCategoryName] = useState<string>("");

  const handleAddCategory = async (): Promise<void> => {
    const trimmedCategoryName = categoryName.trim();
    if (!trimmedCategoryName) {
      toast.error("Category name cannot be empty");
      return;
    }
    try {
      const result = await dispatch(addNewCategoryToStats(trimmedCategoryName)).unwrap();
      const successToastMessage =
        typeof result === "string" && result.trim() ? result : "New category added successfully!";
      toast.success(successToastMessage);
      setCategoryName("");
    } catch {
      toast.error(addCategoryErrorMessage || "Failed to add new category");
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    await handleAddCategory();
  };

  return (
    <form onSubmit={handleSubmit} className='w-full'>
      <div className='flex h-12 w-full items-center gap-3 rounded-lg border border-stone-200 dark:border-gray-600 bg-white dark:bg-gray-800/80 px-2'>
        <input
          placeholder='add new category...'
          className='h-full w-full rounded-md border-none px-2 text-md text-stone-700 dark:text-gray-300 bg-transparent outline-none placeholder:text-stone-400 dark:placeholder:text-gray-500'
          type="text"
          value={categoryName}
          onChange={(e) => setCategoryName(e.target.value)}
          disabled={isAddingCategory}
        />
        <button
          type='submit'
          disabled={isAddingCategory}
          className='flex h-9 cursor-pointer items-center gap-2 rounded-md bg-stone-800 dark:bg-gray-700 px-3 text-white transition-colors hover:bg-stone-700 dark:hover:bg-gray-600 disabled:cursor-not-allowed disabled:bg-stone-400 dark:disabled:bg-gray-600'
          aria-label='Add category'
        >
          <GoPlus size={20} />
          <span className='hidden text-sm font-medium sm:inline'>Add</span>
        </button>
      </div>
      {isAddingCategory && (
        <p className='mt-2 text-sm text-stone-500 dark:text-gray-400'>
          <span className='mr-2 inline-block h-2 w-2 animate-pulse rounded-full bg-stone-500 dark:bg-gray-400' />
          Adding category...
        </p>
      )}
    </form>
  );
};

export default AddNewCategory;
