import { IoIosSend } from "react-icons/io";
import { MdOutlineMail } from "react-icons/md";

const SellerCommunicationOptionsModal = ({
  sellerName,
  onClose,
  onChooseChat,
  onChooseEmail,
}: {
  sellerName: string;
  onClose: () => void;
  onChooseChat: () => void;
  onChooseEmail: () => void;
}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/45 dark:bg-black/60 p-4">
      <div className="w-full max-w-xl rounded-2xl border border-stone-200 dark:border-gray-700/50 bg-white dark:bg-gray-800 p-6 shadow-xl">
        <div className="flex items-start justify-between border-b border-stone-200 dark:border-gray-700/50 pb-4">
          <div>
            <h2 className="text-xl font-semibold text-stone-800 dark:text-gray-100">Contact Seller</h2>
            <p className="mt-1 text-sm text-stone-500 dark:text-gray-400">
              Choose how you want to communicate with {sellerName}
            </p>
          </div>

          <button
            onClick={onClose}
            className="inline-flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg border border-stone-300 dark:border-gray-600 text-stone-600 dark:text-gray-400 transition hover:bg-stone-100 dark:hover:bg-gray-700"
            title="Close"
          >
            x
          </button>
        </div>

        <div className="mt-5 grid gap-3">
          <button
            onClick={onChooseChat}
            className="group flex w-full cursor-pointer items-center justify-between rounded-xl border border-stone-200 dark:border-gray-700/50 bg-stone-50 dark:bg-gray-700/40 p-4 text-left transition hover:border-stone-400 dark:hover:border-gray-500 hover:bg-stone-100 dark:hover:bg-gray-700"
          >
            <div className="flex items-center gap-3">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-stone-900 dark:bg-gray-900 text-white">
                <IoIosSend size={20} />
              </span>
              <div>
                <p className="font-semibold text-stone-800 dark:text-gray-200">Open Internal Chat</p>
                <p className="text-sm text-stone-500 dark:text-gray-400">Continue conversation inside the dashboard</p>
              </div>
            </div>
            <span className="text-sm font-medium text-stone-600 dark:text-gray-400 group-hover:text-stone-900 dark:group-hover:text-gray-200">Open</span>
          </button>

          <button
            onClick={onChooseEmail}
            className="group flex w-full cursor-pointer items-center justify-between rounded-xl border border-stone-200 dark:border-gray-700/50 bg-stone-50 dark:bg-gray-700/40 p-4 text-left transition hover:border-stone-400 dark:hover:border-gray-500 hover:bg-stone-100 dark:hover:bg-gray-700"
          >
            <div className="flex items-center gap-3">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-600 text-white">
                <MdOutlineMail size={20} />
              </span>
              <div>
                <p className="font-semibold text-stone-800 dark:text-gray-200">Send Message by Email</p>
                <p className="text-sm text-stone-500 dark:text-gray-400">Compose and send an email directly to seller</p>
              </div>
            </div>
            <span className="text-sm font-medium text-stone-600 dark:text-gray-400 group-hover:text-stone-900 dark:group-hover:text-gray-200">Compose</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SellerCommunicationOptionsModal;
