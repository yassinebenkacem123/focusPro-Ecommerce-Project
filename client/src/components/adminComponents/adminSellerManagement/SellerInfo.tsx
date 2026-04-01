import type { SellerInfosProps } from "../../../pages/admin/AdminSellerManagement";
import { IoIosSend } from "react-icons/io";
import { AiOutlineDelete } from "react-icons/ai";

const SellerInfo = ({
  sellerInfos,
  onSendMessageClick,
}: {
  sellerInfos: SellerInfosProps;
  onSendMessageClick: () => void;
}) => {
  return (
    <div className="flex w-[40%] flex-col gap-5 rounded-2xl border border-stone-200 dark:border-gray-700/50 bg-white dark:bg-gray-800/60 p-5 shadow-sm">
      <div className="flex gap-5">
        <img
          className="h- w-[50%] rounded-2xl object-cover border border-stone-200 dark:border-gray-600"
          src={"https://img.freepik.com/photos-gratuite/jeune-homme-beau-joyeux-bras-croises_171337-1073.jpg?semt=ais_hybrid&w=740&q=80"}
          alt={sellerInfos.sellerName}
        />

        <div className="flex w-[50%] flex-col">
          <div className="border-b flex items-center justify-between border-stone-200 dark:border-gray-700 pb-4">
            <p className="text-2xl font-semibold text-stone-800 dark:text-gray-100">
              {sellerInfos.sellerName}
            </p>
            <div className="ml-3">
              {sellerInfos.status === "active" ? (
                <span className="inline-flex items-center rounded-full bg-emerald-100 dark:bg-emerald-950/60 px-3 py-1 text-xs font-medium text-emerald-600 dark:text-emerald-400">
                  Active
                </span>
              ) : (
                <span className="inline-flex items-center rounded-full bg-red-100 dark:bg-red-950/60 px-3 py-1 text-xs font-medium text-red-600 dark:text-red-400">
                  Inactive
                </span>
              )}
            </div>
          </div>

          <div className="mt-4 space-y-3">
            <div className="flex flex-col gap-1">
              <h3 className="text-md font-medium text-stone-700 dark:text-gray-300">Email</h3>
              <p className="text-sm text-stone-900 dark:text-gray-400 break-all">{sellerInfos.email}</p>
            </div>

            <div className="flex flex-col gap-1">
              <h3 className="text-md font-medium text-stone-700 dark:text-gray-300">Phone</h3>
              <p className="text-sm text-stone-900 dark:text-gray-400">{sellerInfos.phoneNumber}</p>
            </div>

            <div className="flex flex-col gap-1">
              <h3 className="text-md font-medium text-stone-700 dark:text-gray-300">Address</h3>
              <p className="text-sm text-stone-900 dark:text-gray-400">{sellerInfos.sellerAddress}</p>
            </div>

            <div className="flex flex-col gap-1">
              <h3 className="text-md font-medium text-stone-700 dark:text-gray-300">Joined Date</h3>
              <p className="text-sm text-stone-900 dark:text-gray-400">
                {new Date(sellerInfos.registrationDate).toLocaleDateString()}
              </p>
            </div>
          </div>

          <div className="mt-5 flex items-center justify-end gap-3">
            <div className="flex items-center gap-3">
              <button
                onClick={onSendMessageClick}
                className="flex cursor-pointer h-11 w-11 items-center justify-center rounded-xl border border-stone-300 dark:border-gray-600 text-stone-700 dark:text-gray-300 transition hover:bg-stone-100 dark:hover:bg-gray-700/60 hover:text-stone-900 dark:hover:text-gray-100"
                title="Send message"
              >
                <IoIosSend size={22} />
              </button>

              <button
                title="Delete seller"
                className="flex cursor-pointer h-11 w-11 items-center justify-center rounded-xl border border-red-200 dark:border-red-800/60 bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 transition hover:bg-red-100 dark:hover:bg-red-800/60 hover:text-red-700 dark:hover:text-red-300"
              >
                <AiOutlineDelete size={22} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellerInfo;
