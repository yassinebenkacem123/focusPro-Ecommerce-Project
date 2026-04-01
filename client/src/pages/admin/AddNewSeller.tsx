import React, { useState } from "react";

type SellerStatus = "active" | "pending" | "suspended";
type VerificationStatus = "verified" | "not-verified";
type PayoutMethod = "bank-transfer" | "paypal" | "cash" | "";

type AddSellerFormData = {
  sellerName: string;
  email: string;
  phoneNumber: string;
  address: string;
  city: string;
  country: string;
  status: SellerStatus;
  verification: VerificationStatus;
  payoutMethod: PayoutMethod;
  adminNote: string;
};

const AddNewSeller = () => {
  const [formData, setFormData] = useState<AddSellerFormData>({
    sellerName: "",
    email: "",
    phoneNumber: "",
    address: "",
    city: "",
    country: "",
    status: "active",
    verification: "not-verified",
    payoutMethod: "",
    adminNote: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const sellerPayload = {
      ...formData,
    };

    console.log("Seller payload:", sellerPayload);

    // here you can dispatch redux thunk or call your api
    // مثال:
    // dispatch(addNewSeller(sellerPayload))
  };

  const inputClass = "w-full rounded-xl border border-stone-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-4 py-3 text-sm text-stone-700 dark:text-gray-300 outline-none transition focus:border-stone-400 dark:focus:border-gray-500 placeholder:text-stone-400 dark:placeholder:text-gray-500";
  const labelClass = "mb-2 block text-sm font-medium text-stone-600 dark:text-gray-300";
  const cardClass = "rounded-2xl border border-stone-200 dark:border-gray-700/50 bg-white dark:bg-gray-800/60 p-5";
  const cardTitleClass = "mb-5 text-lg font-semibold text-stone-800 dark:text-gray-100";

  return (
    <form onSubmit={handleSubmit} className="w-full space-y-6 py-5 px-10">
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        {/* Seller Information */}
        <div className={cardClass}>
          <h2 className={cardTitleClass}>Seller Information</h2>

          <div className="space-y-4">
            <div>
              <label className={labelClass}>Seller Name</label>
              <input
                type="text"
                name="sellerName"
                value={formData.sellerName}
                onChange={handleChange}
                placeholder="Enter seller name"
                className={inputClass}
              />
            </div>

            <div>
              <label className={labelClass}>Email Address</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter email address"
                className={inputClass}
              />
            </div>

            <div>
              <label className={labelClass}>Phone Number</label>
              <input
                type="text"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                placeholder="Enter phone number"
                className={inputClass}
              />
            </div>

            <div>
              <label className={labelClass}>Address</label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Enter address"
                className={inputClass}
              />
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <label className={labelClass}>City</label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  placeholder="Enter city"
                  className={inputClass}
                />
              </div>

              <div>
                <label className={labelClass}>Country</label>
                <input
                  type="text"
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  placeholder="Enter country"
                  className={inputClass}
                />
              </div>
            </div>
          </div>
        </div>

        <div>
          <div className="space-y-6">
            {/* Verification & Status */}
            <div className={cardClass}>
              <h2 className={cardTitleClass}>Verification & Status</h2>

              <div className="space-y-4">
                <div>
                  <label className={labelClass}>Status</label>
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    className={inputClass}
                  >
                    <option value="active">Active</option>
                    <option value="pending">Pending</option>
                    <option value="suspended">Suspended</option>
                  </select>
                </div>

                <div>
                  <label className={labelClass}>Verification</label>
                  <select
                    name="verification"
                    value={formData.verification}
                    onChange={handleChange}
                    className={inputClass}
                  >
                    <option value="verified">Verified</option>
                    <option value="not-verified">Not Verified</option>
                  </select>
                </div>

                <div>
                  <label className={labelClass}>Payout Method</label>
                  <select
                    name="payoutMethod"
                    value={formData.payoutMethod}
                    onChange={handleChange}
                    className={inputClass}
                  >
                    <option value="">Select payout method</option>
                    <option value="bank-transfer">Bank Transfer</option>
                    <option value="paypal">PayPal</option>
                    <option value="cash">Cash</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Admin Notes */}
            <div className={cardClass}>
              <h2 className={cardTitleClass}>Admin Notes</h2>

              <div>
                <label className={labelClass}>Internal Note</label>
                <textarea
                  name="adminNote"
                  value={formData.adminNote}
                  onChange={handleChange}
                  placeholder="Add an internal note for this seller..."
                  rows={8}
                  className={`${inputClass} resize-none`}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-end gap-3 border-t border-stone-200 dark:border-gray-700/50 pt-5">
        <button
          type="button"
          className="rounded-xl border border-stone-300 dark:border-gray-600 px-5 py-3 text-sm font-medium text-stone-700 dark:text-gray-300 transition hover:bg-stone-100 dark:hover:bg-gray-700/60"
        >
          Cancel
        </button>

        <button
          type="submit"
          className="rounded-xl bg-stone-800 dark:bg-gray-700 px-6 py-3 text-sm font-medium text-white transition hover:bg-stone-700 dark:hover:bg-gray-600"
        >
          Create Seller
        </button>
      </div>
    </form>
  );
};

export default AddNewSeller;