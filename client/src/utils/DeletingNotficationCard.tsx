import { GoAlertFill } from "react-icons/go";

type DeletingNotficationCardProps = {
  modelName: string;
  onCancel: () => void;
  onConfirm: () => void;
  isDeleting?: boolean;
};

const DeletingNotficationCard = ({
  modelName,
  onCancel,
  onConfirm,
  isDeleting = false,
}: DeletingNotficationCardProps) => {
  return (
    <div className="w-100 rounded-2xl bg-white p-6 shadow-lg border border-black/5">
      
      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-red-100">
          <GoAlertFill className="text-red-500 text-xl" />
        </div>
        <h3 className="text-lg font-semibold text-stone-800">
          Confirm Deletion
        </h3>
      </div>

      {/* Message */}
      <p className="text-sm text-stone-600 mb-6">
        Are you sure you want to delete{" "}
        <span className="font-medium text-stone-800">{modelName}</span>?  
        This action cannot be undone.
      </p>

      {/* Actions */}
      <div className="flex justify-end gap-3">
        <button
          onClick={onCancel}
          disabled={isDeleting}
          className="px-4 py-2 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 transition cursor-pointer disabled:cursor-not-allowed disabled:opacity-60"
        >
          Cancel
        </button>

        <button
          onClick={onConfirm}
          disabled={isDeleting}
          className="px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 transition cursor-pointer shadow-sm disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isDeleting ? "Deleting..." : "Delete"}
        </button>
      </div>
    </div>
  );
};

export default DeletingNotficationCard;