import type { FormEvent } from "react";
import { GoPencil } from "react-icons/go";

type EditCategoryFormProps = {
  categoryName: string;
  onChangeCategoryName: (name: string) => void;
  onCancel: () => void;
  onSubmit: () => void;
  isUpdating?: boolean;
};

const EditCategoryForm = ({
  categoryName,
  onChangeCategoryName,
  onCancel,
  onSubmit,
  isUpdating = false,
}: EditCategoryFormProps) => {
  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-100 rounded-2xl border border-black/5 bg-white p-6 shadow-lg"
    >
      
      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-stone-100">
          <GoPencil className="text-stone-600 text-lg" />
        </div>
        <h3 className="text-lg font-semibold text-stone-800">
          Edit Category
        </h3>
      </div>

      {/* Message */}
      <p className="text-sm text-stone-600 mb-5">
        Update the category name below.
      </p>

      {/* Input */}
      <input
        type="text"
        placeholder="Category name"
        value={categoryName}
        onChange={(e) => onChangeCategoryName(e.target.value)}
        disabled={isUpdating}
        className="w-full rounded-lg border border-stone-300 px-3 py-2 text-sm text-stone-700 outline-none focus:ring-2  focus:border-transparent mb-6"
      />

      {/* Actions */}
      <div className="flex justify-end gap-3">
        <button
          type="button"
          onClick={onCancel}
          disabled={isUpdating}
          className="px-4 py-2 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 transition cursor-pointer disabled:cursor-not-allowed disabled:opacity-60"
        >
          Cancel
        </button>

        <button
          type="submit"
          disabled={isUpdating}
          className="px-4 py-2 rounded-lg bg-stone-800 text-white hover:bg-stone-700 transition cursor-pointer shadow-sm disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isUpdating ? "Saving..." : "Save Changes"}
        </button>
      </div>
    </form>
  );
};

export default EditCategoryForm;