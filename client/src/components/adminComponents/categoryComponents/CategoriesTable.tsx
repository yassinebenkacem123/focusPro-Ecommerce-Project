import { FaStar } from "react-icons/fa6";
import { RiDeleteBin5Line } from "react-icons/ri";
import { CiEdit } from "react-icons/ci";
import { toast } from "react-toastify";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../../store/store";
import {
  deleteCategoryFromStats,
  updateCategoryFromStats,
  type categoryStatsProp,
} from "../../../features/categoriesStats/categoriesStatsSlice";
import DeletingNotficationCard from "../../../utils/DeletingNotficationCard";
import EditCategoryForm from "./EditCategoryForm";

type CategoriesTableProps = {
  categories: categoryStatsProp[]
}

const CategoriesTable = ({ categories }: CategoriesTableProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const {
    isDeletingCategory,
    deletingCategoryId,
    isUpdatingCategory,
    updatingCategoryId,
  } = useSelector((state: RootState) => state.categoriesStats);

  const [categoryToDelete, setCategoryToDelete] = useState<categoryStatsProp | null>(null);
  const [categoryToEdit, setCategoryToEdit] = useState<categoryStatsProp | null>(null);
  const [editedCategoryName, setEditedCategoryName] = useState<string>("");
  const shouldScroll = categories.length > 8;

  const openEditDialog = (category: categoryStatsProp): void => {
    setCategoryToEdit(category);
    setEditedCategoryName(category.categoryName || "");
  };

  const closeEditDialog = (): void => {
    setCategoryToEdit(null);
    setEditedCategoryName("");
  };

  const openDeleteDialog = (category: categoryStatsProp): void => {
    if (category.numberProducts > 0) {
      toast.error("Cannot delete category with existing products.");
      return;
    }
    setCategoryToDelete(category);
  };

  const handleDeleteCategory = async (): Promise<void> => {
    if (!categoryToDelete) return;
    const category = categoryToDelete;
    if (!category.categoryId) {
      toast.error("Missing category id. Please refresh and try again.");
      setCategoryToDelete(null);
      return;
    }
    try {
      const responseMessage = await dispatch(deleteCategoryFromStats(category.categoryId)).unwrap();
      toast.success(
        typeof responseMessage === "string" && responseMessage.trim()
          ? responseMessage
          : "Category deleted successfully!"
      );
      setCategoryToDelete(null);
    } catch (error) {
      toast.error(
        typeof error === "string" && error.trim() ? error : "Failed to delete category"
      );
    }
  };

  const handleUpdateCategory = async (): Promise<void> => {
    if (!categoryToEdit) return;
    if (!categoryToEdit.categoryId) {
      toast.error("Missing category id. Please refresh and try again.");
      closeEditDialog();
      return;
    }
    const trimmedCategoryName = editedCategoryName.trim();
    if (!trimmedCategoryName) {
      toast.error("Category name cannot be empty");
      return;
    }
    if (trimmedCategoryName === categoryToEdit.categoryName.trim()) {
      toast.info("No changes to save");
      return;
    }
    try {
      const responseMessage = await dispatch(
        updateCategoryFromStats({ categoryId: categoryToEdit.categoryId, categoryName: trimmedCategoryName })
      ).unwrap();
      toast.success(
        typeof responseMessage === "string" && responseMessage.trim()
          ? responseMessage
          : "Category updated successfully!"
      );
      closeEditDialog();
    } catch (error) {
      toast.error(
        typeof error === "string" && error.trim() ? error : "Failed to update category"
      );
    }
  };

  return (
    <div className="rounded-lg border border-stone-200 dark:border-gray-700/50 bg-white dark:bg-gray-800/60 p-4 shadow-xs">
      <div className={`overflow-hidden rounded-xl border border-stone-200 dark:border-gray-700/50 ${shouldScroll ? "max-h-136 overflow-y-auto" : ""}`}>
        <table cellPadding={0} className="w-full text-left">
          {/* Header */}
          <thead className="sticky top-0 z-10 bg-stone-900 dark:bg-gray-700/90 text-sm uppercase tracking-wide text-stone-100 dark:text-gray-200">
            <tr>
              <th className="px-6 py-3 text-start">Category</th>
              <th className="px-6 py-3 text-start">Rating</th>
              <th className="px-6 py-3 text-start">Products</th>
              <th className="px-6 py-3 text-center">Actions</th>
            </tr>
          </thead>

          {/* Body */}
          <tbody className="text-sm text-stone-600 dark:text-gray-300">
            {categories.map((category, index) => (
              <tr
                key={category.categoryId ?? index}
                className="border-t border-stone-200 dark:border-gray-700/50 odd:bg-white dark:odd:bg-gray-800/40 even:bg-stone-50/40 dark:even:bg-gray-800/20 hover:bg-stone-100 dark:hover:bg-gray-700/40 transition-colors duration-150"
              >
                <td className="px-6 py-4 text-base font-semibold text-stone-800 dark:text-gray-200">
                  {category.categoryName}
                </td>

                <td className="px-6 py-4 text-base">
                  <span className="inline-flex items-center gap-2 rounded-full bg-amber-50 dark:bg-amber-950/40 px-3 py-1 font-medium text-amber-700 dark:text-amber-400">
                    <FaStar size={16} className="text-amber-500" />
                    {Math.round(category.rating * 10) / 10}
                  </span>
                </td>

                <td className="px-6 py-4 text-base font-medium text-stone-700 dark:text-gray-300">
                  {category.numberProducts}
                </td>

                {/* Actions */}
                <td className="px-6 py-4">
                  <div className="flex items-center justify-center gap-3">
                    <button
                      onClick={() => openEditDialog(category)}
                      disabled={isUpdatingCategory && updatingCategoryId === category.categoryId}
                      title="Edit category"
                      className="inline-flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg border border-emerald-300/60 dark:border-emerald-700/40 bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600 dark:text-emerald-400 transition hover:bg-green-400 dark:hover:bg-emerald-700 hover:text-white disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      <CiEdit size={18} />
                    </button>

                    <button
                      onClick={() => openDeleteDialog(category)}
                      disabled={isDeletingCategory && deletingCategoryId === category.categoryId}
                      title="Delete category"
                      className="inline-flex h-9 min-w-9 cursor-pointer items-center justify-center rounded-lg border border-red-300/60 dark:border-red-700/40 bg-red-50 dark:bg-red-950/30 px-2 text-red-600 dark:text-red-400 transition hover:bg-red-600 dark:hover:bg-red-700 hover:text-white disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      {isDeletingCategory && deletingCategoryId === category.categoryId ? (
                        <span className="text-xs font-semibold">Deleting...</span>
                      ) : (
                        <RiDeleteBin5Line size={18} />
                      )}
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h4 className="mt-3 w-full text-end text-sm font-medium text-stone-500 dark:text-gray-400">
        ({categories.length}) {categories.length === 1 ? "category" : "categories"}
      </h4>

      {categories.length === 0 && (
        <p className="py-8 text-center text-sm text-stone-500 dark:text-gray-400">
          No categories found
        </p>
      )}

      {categoryToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/45 p-4">
          <DeletingNotficationCard
            modelName={categoryToDelete.categoryName}
            onCancel={() => setCategoryToDelete(null)}
            onConfirm={handleDeleteCategory}
            isDeleting={isDeletingCategory && deletingCategoryId === categoryToDelete.categoryId}
          />
        </div>
      )}

      {categoryToEdit && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/45 p-4">
          <EditCategoryForm
            categoryName={editedCategoryName}
            onChangeCategoryName={setEditedCategoryName}
            onCancel={closeEditDialog}
            onSubmit={handleUpdateCategory}
            isUpdating={isUpdatingCategory && updatingCategoryId === categoryToEdit.categoryId}
          />
        </div>
      )}
    </div>
  );
};

export default CategoriesTable;