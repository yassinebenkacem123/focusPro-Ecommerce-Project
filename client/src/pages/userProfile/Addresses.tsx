import { useEffect, useState } from "react";
import { Building, CheckCircle, Home, MapPin, PencilLine, Plus, Trash2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import api from "../../api/api";
import ErrorMessage from "../../components/error/ErrorMessage";
import Loader from "../../components/loader/Loader";
import { fetchUserAddresses } from "../../features/address/addressSlice";
import type { RootState } from "../../store/store";

type Address = {
  id?: number | null;
  addressId?: number | null;
  buildingName: string;
  city: string;
  country: string;
  pincode: string;
  state: string;
  street: string;
};

type AddressForm = {
  buildingName: string;
  city: string;
  country: string;
  pincode: string;
  state: string;
  street: string;
};

const emptyAddressForm: AddressForm = {
  buildingName: "",
  city: "",
  country: "",
  pincode: "",
  state: "",
  street: "",
};

const inputClassName =
  "rounded-lg border border-yellow-50/20 bg-stone-800 p-3 text-base text-yellow-50 w-full outline-none focus:border-orange-500";

const labelClassName = "mb-1.5 block text-sm font-medium text-stone-300";

const UserAddresses = () => {
  const [addressForm, setAddressForm] = useState<AddressForm>(emptyAddressForm);
  const [editingAddressId, setEditingAddressId] = useState<number | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [defaultAddressId, setDefaultAddressId] = useState<number | null>(null);
  const [formErrors, setFormErrors] = useState<Partial<AddressForm>>({});
  const [isSavingAddress, setIsSavingAddress] = useState(false);
  const [deletingAddressId, setDeletingAddressId] = useState<number | null>(null);

  const { addresses, isLoading, errorMessage } = useSelector((state: RootState) => state.address);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUserAddresses() as any);
  }, [dispatch]);

  const getAddressId = (address: Address): number | null => {
    if (typeof address.addressId === "number") return address.addressId;
    if (typeof address.id === "number") return address.id;
    return null;
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAddressForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (formErrors[name as keyof AddressForm]) {
      setFormErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const getSanitizedForm = (): AddressForm => ({
    buildingName: addressForm.buildingName.trim(),
    city: addressForm.city.trim(),
    country: addressForm.country.trim(),
    pincode: addressForm.pincode.trim(),
    state: addressForm.state.trim(),
    street: addressForm.street.trim(),
  });

  const validateForm = (formData: AddressForm): boolean => {
    const errors: Partial<AddressForm> = {};

    if (!formData.buildingName) errors.buildingName = "Building name is required";
    if (!formData.street) errors.street = "Street is required";
    if (!formData.city) errors.city = "City is required";
    if (!formData.state) errors.state = "State is required";
    if (!formData.country) errors.country = "Country is required";
    if (!formData.pincode) errors.pincode = "Pincode is required";

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const resetForm = () => {
    setAddressForm(emptyAddressForm);
    setEditingAddressId(null);
    setShowForm(false);
    setFormErrors({});
  };

  const handleAddOrUpdateAddress = async () => {
    const sanitizedForm = getSanitizedForm();

    if (!validateForm(sanitizedForm)) {
      return;
    }

    try {
      setIsSavingAddress(true);

      if (editingAddressId !== null) {
        await api.put(`/updateAddress/${editingAddressId}`, sanitizedForm);
        toast.success("Address updated successfully.");
      } else {
        await api.post("/address/user", sanitizedForm);
        toast.success("Address added successfully.");
      }

      await dispatch(fetchUserAddresses() as any);
      resetForm();
    } catch (error: any) {
      const message =
        error?.response?.data?.message ||
        error?.response?.data ||
        (editingAddressId !== null ? "Failed to update address." : "Failed to add address.");

      toast.error(
        typeof message === "string"
          ? message
          : editingAddressId !== null
            ? "Failed to update address."
            : "Failed to add address."
      );
    } finally {
      setIsSavingAddress(false);
    }
  };

  const handleEditAddress = (address: Address) => {
    const currentAddressId = getAddressId(address);
    if (currentAddressId === null) {
      toast.error("Invalid address id.");
      return;
    }

    setEditingAddressId(currentAddressId);
    setAddressForm({
      buildingName: address.buildingName,
      city: address.city,
      country: address.country,
      pincode: address.pincode,
      state: address.state,
      street: address.street,
    });
    setShowForm(true);
  };

  const handleDeleteAddress = async (addressId: number) => {
    try {
      setDeletingAddressId(addressId);
      await api.delete(`/deleteAddress/${addressId}`);
      toast.success("Address deleted successfully.");

      if (editingAddressId === addressId) {
        resetForm();
      }

      await dispatch(fetchUserAddresses() as any);
    } catch (error: any) {
      const message =
        error?.response?.data?.message ||
        error?.response?.data ||
        "Failed to delete address.";
      toast.error(typeof message === "string" ? message : "Failed to delete address.");
    } finally {
      setDeletingAddressId(null);
    }
  };

  const handleSetDefault = (addressId: number) => {
    setDefaultAddressId(addressId);
  };

  const handleAddNewClick = () => {
    resetForm();
    setShowForm(true);
  };

  return (
    <div className="space-y-6 rounded-lg bg-stone-900 p-5">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-white">Addresses</h1>
          <p className="text-sm text-yellow-50/80">Manage your shipping and billing addresses</p>
        </div>

        {!showForm && (
          <button
            onClick={handleAddNewClick}
            className="inline-flex items-center gap-2 rounded-lg border border-yellow-50/20 bg-stone-800 px-4 py-2 text-sm font-medium text-white transition hover:bg-orange-600"
          >
            <Plus size={16} />
            Add Address
          </button>
        )}
      </div>

      {errorMessage && <ErrorMessage message={errorMessage} />}
      {isLoading && <Loader message="Loading addresses..." className="p-6" />}

      {!isLoading && addresses && addresses.length > 0 && (
        <div className="grid grid-cols-1 gap-4">
          {addresses.map((address: Address) => {
            const currentAddressId = getAddressId(address);
            if (currentAddressId === null) return null;

            return (
              <article
                key={currentAddressId}
                className={`rounded-xl border p-4 ${
                  defaultAddressId === currentAddressId
                    ? "border-orange-500/50 bg-stone-800"
                    : "border-yellow-50/20 bg-stone-800"
                }`}
              >
                <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                  <div className="flex items-start gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-stone-700 text-orange-400">
                      <Home size={20} />
                    </div>

                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="text-lg font-semibold text-white">{address.buildingName}</h3>
                        {defaultAddressId === currentAddressId && (
                          <span className="inline-flex items-center gap-1 rounded-full bg-orange-500/20 px-2 py-1 text-xs font-medium text-orange-300">
                            <CheckCircle size={12} />
                            Default
                          </span>
                        )}
                      </div>

                      <p className="text-sm text-yellow-50/80">{address.street}</p>
                      <p className="text-sm text-yellow-50/80">
                        {address.city}, {address.state} - {address.pincode}
                      </p>
                      {address.country && <p className="text-sm text-yellow-50/60">{address.country}</p>}
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-2">
                    {defaultAddressId !== currentAddressId && (
                      <button
                        onClick={() => handleSetDefault(currentAddressId)}
                        className="rounded-lg border border-yellow-50/20 bg-stone-700 px-3 py-1.5 text-xs font-medium text-yellow-50 transition hover:bg-stone-600"
                      >
                        Set as Default
                      </button>
                    )}

                    <button
                      onClick={() => handleEditAddress(address)}
                      className="inline-flex items-center gap-1 rounded-lg border border-yellow-50/20 bg-stone-700 px-3 py-1.5 text-xs font-medium text-yellow-50 transition hover:bg-orange-600"
                    >
                      <PencilLine size={14} />
                      Edit
                    </button>

                    <button
                      onClick={() => void handleDeleteAddress(currentAddressId)}
                      disabled={deletingAddressId === currentAddressId}
                      className="inline-flex items-center gap-1 rounded-lg border border-red-500/40 bg-red-500/10 px-3 py-1.5 text-xs font-medium text-red-300 transition hover:bg-red-500/20 disabled:cursor-not-allowed disabled:opacity-70"
                    >
                      <Trash2 size={14} />
                      {deletingAddressId === currentAddressId ? "Deleting..." : "Delete"}
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      )}

      {!isLoading && (!addresses || addresses.length === 0) && !showForm && (
        <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-yellow-50/20 bg-stone-800 p-10 text-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-stone-700 text-orange-400">
            <MapPin size={26} />
          </div>
          <h3 className="mt-3 text-lg font-medium text-white">No addresses yet</h3>
          <p className="mt-1 text-sm text-yellow-50/70">Add your first address to get started</p>
          <button
            onClick={handleAddNewClick}
            className="mt-4 inline-flex items-center gap-2 rounded-lg bg-orange-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-orange-600"
          >
            <Plus size={16} />
            Add Your First Address
          </button>
        </div>
      )}

      {showForm && (
        <section className="rounded-xl border border-yellow-50/20 bg-stone-900 p-5">
          <div className="mb-5 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-stone-700 text-orange-400">
              <Building size={20} />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-white">
                {editingAddressId !== null ? "Edit Address" : "Add New Address"}
              </h2>
              <p className="text-xs text-yellow-50/70">
                {editingAddressId !== null
                  ? "Update your address details below"
                  : "Enter your address details below"}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <label className={labelClassName}>Building Name *</label>
              <input
                type="text"
                name="buildingName"
                value={addressForm.buildingName}
                onChange={handleFormChange}
                placeholder="e.g., Sunset Residency, Apt 4B"
                className={`${inputClassName} ${formErrors.buildingName ? "border-red-500/60" : ""}`}
              />
              {formErrors.buildingName && <p className="mt-1 text-xs text-red-400">{formErrors.buildingName}</p>}
            </div>

            <div>
              <label className={labelClassName}>Street Address *</label>
              <input
                type="text"
                name="street"
                value={addressForm.street}
                onChange={handleFormChange}
                placeholder="e.g., 123 Main Street"
                className={`${inputClassName} ${formErrors.street ? "border-red-500/60" : ""}`}
              />
              {formErrors.street && <p className="mt-1 text-xs text-red-400">{formErrors.street}</p>}
            </div>

            <div>
              <label className={labelClassName}>City *</label>
              <input
                type="text"
                name="city"
                value={addressForm.city}
                onChange={handleFormChange}
                placeholder="e.g., New York"
                className={`${inputClassName} ${formErrors.city ? "border-red-500/60" : ""}`}
              />
              {formErrors.city && <p className="mt-1 text-xs text-red-400">{formErrors.city}</p>}
            </div>

            <div>
              <label className={labelClassName}>State *</label>
              <input
                type="text"
                name="state"
                value={addressForm.state}
                onChange={handleFormChange}
                placeholder="e.g., California"
                className={`${inputClassName} ${formErrors.state ? "border-red-500/60" : ""}`}
              />
              {formErrors.state && <p className="mt-1 text-xs text-red-400">{formErrors.state}</p>}
            </div>

            <div>
              <label className={labelClassName}>Country *</label>
              <input
                type="text"
                name="country"
                value={addressForm.country}
                onChange={handleFormChange}
                placeholder="e.g., United States"
                className={`${inputClassName} ${formErrors.country ? "border-red-500/60" : ""}`}
              />
              {formErrors.country && <p className="mt-1 text-xs text-red-400">{formErrors.country}</p>}
            </div>

            <div>
              <label className={labelClassName}>Pincode / ZIP *</label>
              <input
                type="text"
                name="pincode"
                value={addressForm.pincode}
                onChange={handleFormChange}
                placeholder="e.g., 10001"
                className={`${inputClassName} ${formErrors.pincode ? "border-red-500/60" : ""}`}
              />
              {formErrors.pincode && <p className="mt-1 text-xs text-red-400">{formErrors.pincode}</p>}
            </div>
          </div>

          <div className="mt-6 flex flex-wrap justify-end gap-2 border-t border-yellow-50/10 pt-4">
            <button
              onClick={resetForm}
              className="rounded-lg border border-stone-300 bg-white px-4 py-2 text-sm font-medium text-stone-700 transition hover:bg-stone-100"
            >
              Cancel
            </button>
            <button
              onClick={() => void handleAddOrUpdateAddress()}
              disabled={isSavingAddress}
              className="rounded-lg bg-orange-500 px-5 py-2 text-sm font-medium text-white transition hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {isSavingAddress
                ? "Saving..."
                : editingAddressId !== null
                  ? "Update Address"
                  : "Save Address"}
            </button>
          </div>
        </section>
      )}
    </div>
  );
};

export default UserAddresses;
