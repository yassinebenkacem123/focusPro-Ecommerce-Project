import { useEffect, useState } from "react";
import { CalendarDays, Mail, PencilLine, Phone, UserRound, VenusAndMars } from "lucide-react";
import { Link } from "react-router-dom";
import api from "../../api/api";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../store/store";
import { fetchCurrentUser } from "../../features/authentication/authSlice";

type UserDetails = {
  name: string;
  email: string;
  profilePicture: string;
  phoneNumber: string;
  gender: "Male" | "Female" | "Other" | "Prefer not to say";
  dateOfBirth: string;
};

type UserProfileResponse = {
  username?: string | null;
  email?: string | null;
  phoneNumber?: string | null;
  imageUrl?: string | null;
  gender?: string | null;
  dateOfBirth?: string | null;
};

type UpdateUserDTO = {
  username: string;
  email: string;
  dateOfBirth: string | null;
  phoneNumber: string;
  gender: "MALE" | "FEMALE" | "OTHER" | null;
};

const initialUserDetails: UserDetails = {
  name: "",
  email: "",
  profilePicture: "",
  phoneNumber: "",
  gender: "Prefer not to say",
  dateOfBirth: "",
};

const inputClassName =
  " rounded-lg border  border-yellow-50/20 bg-stone-800 p-3 text-lg text-yellow-50  w-full text-lg  outline-none ring-none";

const cardClassName =
  "p-4 ";

type EditableField = "name" | "email" | "phoneNumber" | "gender" | "dateOfBirth" | "profilePicture";

const DEFAULT_PROFILE_IMAGE = ""

const ProfileOverview = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [userData, setUserData] = useState<UserDetails>(initialUserDetails);
  const [editData, setEditData] = useState<UserDetails>(initialUserDetails);
  const [editingField, setEditingField] = useState<EditableField | null>(null);
  const [imageUrlInput, setImageUrlInput] = useState<string>("");
  const [selectedImageFile, setSelectedImageFile] = useState<File | null>(null);
  const [isUpdatingImage, setIsUpdatingImage] = useState<boolean>(false);
  const [isUpdatingUserData, setIsUpdatingUserData] = useState<boolean>(false);

  const mapGender = (value?: string | null): UserDetails["gender"] => {
    if (!value) return "Prefer not to say";
    if (value === "Male" || value === "Female" || value === "Other") return value;
    if (value === "MALE") return "Male";
    if (value === "FEMALE") return "Female";
    if (value === "OTHER") return "Other";
    return "Prefer not to say";
  };

  const toBackendGender = (
    value: UserDetails["gender"]
  ): UpdateUserDTO["gender"] => {
    if (value === "Male") return "MALE";
    if (value === "Female") return "FEMALE";
    if (value === "Other") return "OTHER";
    return null;
  };

  const fetchProfile = async () => {
    try {
      const { data } = await api.get<UserProfileResponse>("/user/profile");
      const nextUserData: UserDetails = {
        name: data.username ?? "",
        email: data.email ?? "",
        profilePicture: data.imageUrl?.trim() || DEFAULT_PROFILE_IMAGE,
        phoneNumber: data.phoneNumber ?? "",
        gender: mapGender(data.gender),
        dateOfBirth: data.dateOfBirth ?? "",
      };

      setUserData(nextUserData);
      setEditData(nextUserData);
      setImageUrlInput(nextUserData.profilePicture);
    } catch (error) {
      console.error("Failed to fetch user profile", error);
    }
  };

  useEffect(() => {
    void fetchProfile();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setEditData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const startEditing = (field: EditableField) => {
    setEditData(userData);
    if (field === "profilePicture") {
      setImageUrlInput(userData.profilePicture);
      setSelectedImageFile(null);
    }
    setEditingField(field);
  };

  const handleSaveProfileImage = async () => {
    const trimmedImageUrl = imageUrlInput.trim();

    if (!selectedImageFile && !trimmedImageUrl) {
      toast.warning("Select an image file or provide an image URL.");
      return;
    }

    try {
      setIsUpdatingImage(true);
      const formData = new FormData();

      if (selectedImageFile) {
        formData.append("image", selectedImageFile);
      }

      if (trimmedImageUrl) {
        formData.append("imageUrl", trimmedImageUrl);
      }

      await api.put("/user/image", formData);
      await fetchProfile();
      await dispatch(fetchCurrentUser());
      setEditingField(null);
      setSelectedImageFile(null);
      toast.success("Profile picture updated successfully.");
    } catch (error: any) {
      const message =
        error?.response?.data?.message ||
        error?.response?.data ||
        "Failed to update profile picture.";
      toast.error(typeof message === "string" ? message : "Failed to update profile picture.");
    } finally {
      setIsUpdatingImage(false);
    }
  };

  const handleSaveField = async (field: EditableField) => {
    if (field === "profilePicture") return;

    try {
      setIsUpdatingUserData(true);
      const payload: UpdateUserDTO = {
        username: editData.name.trim(),
        email: editData.email.trim(),
        dateOfBirth: editData.dateOfBirth ? editData.dateOfBirth : null,
        phoneNumber: editData.phoneNumber.trim(),
        gender: toBackendGender(editData.gender),
      };

      await api.put("/updateUser", payload);
      await fetchProfile();
      await dispatch(fetchCurrentUser());
      setEditingField(null);
      toast.success("Profile updated successfully.");
    } catch (error: any) {
      const message =
        error?.response?.data?.message ||
        error?.response?.data ||
        "Failed to update profile.";
      toast.error(typeof message === "string" ? message : "Failed to update profile.");
    } finally {
      setIsUpdatingUserData(false);
    }
  };

  const handleCancelField = () => {
    setEditData(userData);
    setImageUrlInput(userData.profilePicture);
    setSelectedImageFile(null);
    setEditingField(null);
  };


  return (
    <div className="space-y-6 bg-stone-900 p-5 w-full rounded-lg">
      <section className="w-full rounded-2xl   bg-linear-to-r ">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-4">
            <div className="h-20 w-20 overflow-hidden rounded-full border-2 border-yellow-50 shadow">
              <img
                className="h-full w-full object-cover"
                src={editingField === "profilePicture" ? editData.profilePicture : userData.profilePicture}
                alt={`${userData.name}'s profile`}
              />
            </div>

            <div>
              <p className="text-sm uppercase text-yellow-50 tracking-[0.2em]">Profile Overview</p>
              <h1 className="text-2xl text-white font-semibold md:text-3xl">{userData.name || "User"}</h1>
              <p className="text-sm text-yellow-50/80">Manage your personal details and contact information.</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {editingField === "profilePicture" ? (
                  <div className="flex flex-wrap items-center gap-2 w-full">
                    <input
                      type="url"
                      value={imageUrlInput}
                      onChange={(e) => setImageUrlInput(e.target.value)}
                      placeholder="https://example.com/avatar.jpg"
                      className="rounded-lg border border-yellow-50/20 bg-stone-800 p-3 text-lg text-yellow-50 w-full outline-none ring-none"
                    />
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => setSelectedImageFile(e.target.files?.[0] ?? null)}
                      className="rounded-lg border border-yellow-50/20 bg-stone-800 p-2 text-sm text-yellow-50 w-full"
                    />
                    <button
                      onClick={() => void handleSaveProfileImage()}
                      disabled={isUpdatingImage}
                      className="rounded-lg bg-orange-500 px-3 py-1.5 text-sm font-medium text-white transition hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-70"
                    >
                      {isUpdatingImage ? "Saving..." : "Save"}
                    </button>
                    <button
                      onClick={handleCancelField}
                      disabled={isUpdatingImage}
                      className="rounded-lg border border-stone-300 bg-white px-3 py-1.5 text-sm font-medium text-stone-700 transition hover:bg-stone-100"
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => startEditing("profilePicture")}
                    className="inline-flex items-center gap-1 rounded-lg bg-stone-800 border border-yellow-50/20 cursor-pointer px-3 py-1.5 text-sm font-medium text-white transition hover:bg-orange-600"
                  >
                    <PencilLine size={14} />
                    Edit Picture
                  </button>
                )}
                <Link
                  to="/profile/addresses"
                  className="inline-flex items-center gap-1 rounded-lg border border-yellow-50/20 bg-stone-800 px-3 py-1.5 text-sm font-medium text-white transition hover:bg-orange-600"
                >
                  Manage Addresses
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <article className={cardClassName}>
          <div className="mb-2 flex items-center justify-between gap-2">
            <p className="text-lg font-semibold tracking-wider text-stone-300">Email</p>
            {editingField === "email" ? (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => void handleSaveField("email")}
                  disabled={isUpdatingUserData}
                  className="rounded-lg bg-orange-500 px-3 py-1.5 text-sm font-medium text-white transition hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {isUpdatingUserData ? "Saving..." : "Save"}
                </button>
                <button
                  onClick={handleCancelField}
                  disabled={isUpdatingUserData}
                  className="rounded-lg border border-stone-300 bg-white px-3 py-1.5 text-sm font-medium text-stone-700 transition hover:bg-stone-100"
                >
                  Cancel
                </button>
              </div>
            ) : (
              <button
                onClick={() => startEditing("email")}
                className="inline-flex items-center border border-yellow-50/20 gap-1 rounded-lg bg-stone-800 px-3 py-1.5 text-sm font-medium text-white transition hover:bg-orange-600"
              >
                <PencilLine size={14} />
                Edit
              </button>
            )}
          </div>
          {editingField === "email" ? (
            <input
              type="email"
              name="email"
              value={editData.email}
              onChange={handleChange}
              className={inputClassName}
            />
          ) : (
            <div className="flex items-center rounded-lg border border-yellow-50/20 bg-stone-800 p-3 text-lg text-yellow-50  ">
              <Mail className="mr-3 text-orange-500" size={20} />
              <span className="font-medium">{userData.email || "Not provided"}</span>
            </div>
          )}
        </article>

        <article className={cardClassName}>
          <div className="mb-2 flex items-center justify-between gap-2">
            <p className="text-lg font-semibold tracking-wider text-stone-300">Phone</p>
            {editingField === "phoneNumber" ? (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => void handleSaveField("phoneNumber")}
                  disabled={isUpdatingUserData}
                  className="rounded-lg bg-orange-500 px-3 py-1.5 text-sm font-medium text-white transition hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {isUpdatingUserData ? "Saving..." : "Save"}
                </button>
                <button
                  onClick={handleCancelField}
                  disabled={isUpdatingUserData}
                  className="rounded-lg border border-stone-300 bg-white px-3 py-1.5 text-sm font-medium text-stone-700 transition hover:bg-stone-100"
                >
                  Cancel
                </button>
              </div>
            ) : (
              <button
                onClick={() => startEditing("phoneNumber")}
                className="inline-flex items-center border border-yellow-50/20 gap-1 rounded-lg bg-stone-800 px-3 py-1.5 text-sm font-medium text-white transition hover:bg-orange-600"
              >
                <PencilLine size={14} />
                Edit
              </button>
            )}
          </div>
          {editingField === "phoneNumber" ? (
            <input
              type="tel"
              name="phoneNumber"
              value={editData.phoneNumber}
              onChange={handleChange}
              className={inputClassName}
            />
          ) : (
            <div className="flex items-center rounded-lg border border-yellow-50/20 bg-stone-800 p-3 text-lg text-yellow-50  ">
              <Phone className="mr-3 text-orange-500" size={20} />
              <span className="font-medium">{userData.phoneNumber || "Not provided"}</span>
            </div>
          )}
        </article>

        <article className={cardClassName}>
          <div className="mb-2 flex items-center justify-between gap-2">
            <p className="text-lg font-semibold tracking-wider text-stone-300">Gender</p>
            {editingField === "gender" ? (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => void handleSaveField("gender")}
                  disabled={isUpdatingUserData}
                  className="rounded-lg bg-orange-500 px-3 py-1.5 text-sm font-medium text-white transition hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {isUpdatingUserData ? "Saving..." : "Save"}
                </button>
                <button
                  onClick={handleCancelField}
                  disabled={isUpdatingUserData}
                  className="rounded-lg border border-stone-300 bg-white px-3 py-1.5 text-sm font-medium text-stone-700 transition hover:bg-stone-100"
                >
                  Cancel
                </button>
              </div>
            ) : (
              <button
                onClick={() => startEditing("gender")}
                className="inline-flex items-center border border-yellow-50/20 gap-1 rounded-lg bg-stone-800 px-3 py-1.5 text-sm font-medium text-white transition hover:bg-orange-600"
              >
                <PencilLine size={14} />
                Edit
              </button>
            )}
          </div>
          {editingField === "gender" ? (
            <select
              name="gender"
              value={editData.gender}
              onChange={handleChange}
              className={inputClassName}
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
              <option value="Prefer not to say">Prefer not to say</option>
            </select>
          ) : (
            <div className="flex items-center rounded-lg border border-yellow-50/20 bg-stone-800 p-3 text-lg text-yellow-50  ">
              <VenusAndMars className="mr-3 text-orange-400" size={26} />
              <span className="font-medium">{userData.gender}</span>
            </div>
          )}
        </article>

        <article className={cardClassName}>
          <div className="mb-2 flex items-center justify-between gap-2">
            <p className="text-lg font-semibold tracking-wider text-stone-300">Date of Birth</p>
            {editingField === "dateOfBirth" ? (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => void handleSaveField("dateOfBirth")}
                  disabled={isUpdatingUserData}
                  className="rounded-lg bg-orange-500 px-3 py-1.5 text-sm font-medium text-white transition hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {isUpdatingUserData ? "Saving..." : "Save"}
                </button>
                <button
                  onClick={handleCancelField}
                  disabled={isUpdatingUserData}
                  className="rounded-lg border border-stone-300 bg-white px-3 py-1.5 text-sm font-medium text-stone-700 transition hover:bg-stone-100"
                >
                  Cancel
                </button>
              </div>
            ) : (
              <button
                onClick={() => startEditing("dateOfBirth")}
                className="inline-flex items-center gap-1 rounded-lg bg-stone-800 px-3 py-1.5 text-sm font-medium text-white transition hover:bg-orange-600"
              >
                <PencilLine size={14} />
                Edit
              </button>
            )}
          </div>
          {editingField === "dateOfBirth" ? (
            <input
              type="date"
              name="dateOfBirth"
              value={editData.dateOfBirth}
              onChange={handleChange}
              className={inputClassName}
            />
          ) : (
            <div className="flex items-center rounded-lg border border-yellow-50/20 bg-stone-800 p-3 text-lg text-yellow-50  ">
              <CalendarDays className="mr-3 text-orange-500" size={20} />
              <span className="font-medium">{userData.dateOfBirth.split("T")[0] || "Not provided"}</span>
            </div>
          )}
        </article>

        <article className={cardClassName}>
          <div className="mb-2 flex items-center justify-between gap-2">
            <p className="text-lg font-semibold uppercase tracking-wider text-stone-300 ">Account Name</p>
            {editingField === "name" ? (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => void handleSaveField("name")}
                  disabled={isUpdatingUserData}
                  className="rounded-lg bg-orange-500 px-3 py-1.5 text-sm font-medium text-white transition hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {isUpdatingUserData ? "Saving..." : "Save"}
                </button>
                <button
                  onClick={handleCancelField}
                  disabled={isUpdatingUserData}
                  className="rounded-lg border border-stone-300 bg-white px-3 py-1.5 text-sm font-medium text-stone-700 transition hover:bg-stone-100"
                >
                  Cancel
                </button>
              </div>
            ) : (
              <button
                onClick={() => startEditing("name")}
                className="inline-flex items-center gap-1 rounded-lg bg-stone-800 px-3 py-1.5 text-sm font-medium text-white transition hover:bg-orange-600"
              >
                <PencilLine size={14} />
                Edit
              </button>
            )}
          </div>
          {editingField === "name" ? (
            <input
              type="text"
              name="name"
              value={editData.name}
              onChange={handleChange}
              className={inputClassName}
            />
          ) : (
            <div className="flex items-center rounded-lg border border-yellow-50/20 bg-stone-800 p-3 text-lg text-yellow-50  ">
              <UserRound className="mr-3 text-orange-500" size={20} />
              <span className="font-medium">{userData.name || "Not provided"}</span>
            </div>
          )}
        </article>
      </section>
    </div>
  );
};

export default ProfileOverview;