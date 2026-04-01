import { useState } from "react";

const SellerEmailComposerModal = ({
  sellerName,
  sellerEmail,
  onClose,
}: {
  sellerName: string;
  sellerEmail: string;
  onClose: () => void;
}) => {
  const [subject, setSubject] = useState(`Regarding your seller account, ${sellerName}`);
  const [message, setMessage] = useState("");

  const handleSendEmail = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const trimmedMessage = message.trim();
    if (!trimmedMessage) {
      return;
    }

    const mailtoUrl = `mailto:${sellerEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(trimmedMessage)}`;
    window.location.href = mailtoUrl;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/45 dark:bg-black/60 p-4">
      <div className="w-full max-w-2xl rounded-2xl border border-stone-200 dark:border-gray-700/50 bg-white dark:bg-gray-800 p-6 shadow-xl">
        <div className="mb-5 flex items-start justify-between border-b border-stone-200 dark:border-gray-700/50 pb-4">
          <div>
            <h2 className="text-xl font-semibold text-stone-800 dark:text-gray-100">Email Seller</h2>
            <p className="mt-1 text-sm text-stone-500 dark:text-gray-400">
              Send a direct email to {sellerName} ({sellerEmail})
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

        <form onSubmit={handleSendEmail} className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-stone-700 dark:text-gray-300">To</label>
            <input
              value={sellerEmail}
              disabled
              className="h-11 w-full rounded-xl border border-stone-200 dark:border-gray-600 bg-stone-50 dark:bg-gray-700/50 px-4 text-sm text-stone-700 dark:text-gray-400"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-stone-700 dark:text-gray-300">Subject</label>
            <input
              value={subject}
              onChange={(event) => setSubject(event.target.value)}
              className="h-11 w-full rounded-xl border border-stone-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-4 text-sm text-stone-800 dark:text-gray-100 outline-none transition placeholder:text-stone-400 dark:placeholder:text-gray-500 focus:border-stone-700 dark:focus:border-gray-400"
              placeholder="Email subject"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-stone-700 dark:text-gray-300">Message</label>
            <textarea
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              className="min-h-40 w-full rounded-xl border border-stone-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-4 py-3 text-sm text-stone-800 dark:text-gray-100 outline-none transition placeholder:text-stone-400 dark:placeholder:text-gray-500 focus:border-stone-700 dark:focus:border-gray-400"
              placeholder="Write your email message here..."
              required
            />
          </div>

          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="inline-flex h-11 cursor-pointer items-center justify-center rounded-xl border border-stone-300 dark:border-gray-600 px-4 text-sm font-medium text-stone-700 dark:text-gray-300 transition hover:bg-stone-100 dark:hover:bg-gray-700"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="inline-flex h-11 cursor-pointer items-center justify-center rounded-xl bg-emerald-600 px-5 text-sm font-medium text-white transition hover:bg-emerald-700 dark:hover:bg-emerald-500"
            >
              Send by Email
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SellerEmailComposerModal;
