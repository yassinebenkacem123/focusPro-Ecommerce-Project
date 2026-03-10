import { useState } from "react";
import { CalendarDays, Mail, MapPin, PencilLine, Phone, UserRound, VenusAndMars } from "lucide-react";

type UserDetails = {
  name: string;
  email: string;
  profilePicture: string;
  phoneNumber: string;
  address: string;
  gender: "Male" | "Female" | "Other" | "Prefer not to say";
  dateOfBirth: string;
};

const initialUserDetails: UserDetails = {
  name: "John Doe",
  email: "john.doe@example.com",
  profilePicture: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=300&auto=format&fit=crop",
  phoneNumber: "+1 234 567 890",
  address: "123 Main St, Anytown, USA",
  gender: "Male",
  dateOfBirth: "1990-01-01",
};

const inputClassName =
  " rounded-lg border  border-yellow-50/20 bg-stone-800 p-3 text-lg text-yellow-50  w-full text-lg  outline-none ring-none";

const cardClassName =
  "p-4 ";

type EditableField = "name" | "email" | "phoneNumber" | "address" | "gender" | "dateOfBirth" | "profilePicture";

const ProfileOverview = () => {
  const [userData, setUserData] = useState<UserDetails>(initialUserDetails);
  const [editData, setEditData] = useState<UserDetails>(initialUserDetails);
  const [editingField, setEditingField] = useState<EditableField | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setEditData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const startEditing = (field: EditableField) => {
    setEditData(userData);
    setEditingField(field);
  };

  const handleSaveField = (field: EditableField) => {
    setUserData((prevData) => ({
      ...prevData,
      [field]: editData[field],
    }));
    setEditingField(null);
  };

  const handleCancelField = () => {
    setEditData(userData);
    setEditingField(null);
  };


  return (
    <div className="space-y-6 bg-stone-900 p-5 rounded-lg">
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
              <h1 className="text-2xl text-yellow-50 font-semibold md:text-3xl">{userData.name}</h1>
              <p className="text-sm text-yellow-50/80">Manage your personal details and contact information.</p>
              <div className="mt-3">
                {editingField === "profilePicture" ? (
                  <div className="flex flex-wrap items-center gap-2">
                    <input
                      type="text"
                      name="profilePicture"
                      value={editData.profilePicture}
                      onChange={handleChange}
                      className={inputClassName}
                    />
                    <button
                      onClick={() => handleSaveField("profilePicture")}
                      className="rounded-lg bg-orange-500 px-3 py-1.5 text-sm font-medium text-white transition hover:bg-orange-600"
                    >
                      Save
                    </button>
                    <button
                      onClick={handleCancelField}
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
                  onClick={() => handleSaveField("email")}
                  className="rounded-lg bg-orange-500 px-3 py-1.5 text-sm font-medium text-white transition hover:bg-orange-600"
                >
                  Save
                </button>
                <button
                  onClick={handleCancelField}
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
              <span className="font-medium">{userData.email}</span>
            </div>
          )}
        </article>

        <article className={cardClassName}>
          <div className="mb-2 flex items-center justify-between gap-2">
            <p className="text-lg font-semibold tracking-wider text-stone-300">Phone</p>
            {editingField === "phoneNumber" ? (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleSaveField("phoneNumber")}
                  className="rounded-lg bg-orange-500 px-3 py-1.5 text-sm font-medium text-white transition hover:bg-orange-600"
                >
                  Save
                </button>
                <button
                  onClick={handleCancelField}
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
              <span className="font-medium">{userData.phoneNumber}</span>
            </div>
          )}
        </article>

        <article className={cardClassName}>
          <div className="mb-2 flex items-center justify-between gap-2">
            <p className="text-lg font-semibold tracking-wider text-stone-300">Address</p>
            {editingField === "address" ? (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleSaveField("address")}
                  className="rounded-lg bg-orange-500 px-3 py-1.5 text-sm font-medium text-white transition hover:bg-orange-600"
                >
                  Save
                </button>
                <button
                  onClick={handleCancelField}
                  className="rounded-lg border border-stone-300 bg-white px-3 py-1.5 text-sm font-medium text-stone-700 transition hover:bg-stone-100"
                >
                  Cancel
                </button>
              </div>
            ) : (
              <button
                onClick={() => startEditing("address")}
                className="inline-flex items-center border border-yellow-50/20 gap-1 rounded-lg bg-stone-800 px-3 py-1.5 text-sm font-medium text-white transition hover:bg-orange-600"
              >
                <PencilLine size={14} />
                Edit
              </button>
            )}
          </div>
          {editingField === "address" ? (
            <input
              type="text"
              name="address"
              value={editData.address}
              onChange={handleChange}
              className={inputClassName}
            />
          ) : (
            <div className="flex items-center rounded-lg border border-yellow-50/20 bg-stone-800 p-3 text-lg text-yellow-50  ">
              <MapPin className="mr-3 text-orange-500" size={20} />
              <span className="font-medium">{userData.address}</span>
            </div>
          )}
        </article>

        <article className={cardClassName}>
          <div className="mb-2 flex items-center justify-between gap-2">
            <p className="text-lg font-semibold tracking-wider text-stone-300">Gender</p>
            {editingField === "gender" ? (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleSaveField("gender")}
                  className="rounded-lg bg-orange-500 px-3 py-1.5 text-sm font-medium text-white transition hover:bg-orange-600"
                >
                  Save
                </button>
                <button
                  onClick={handleCancelField}
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
                  onClick={() => handleSaveField("dateOfBirth")}
                  className="rounded-lg bg-orange-500 px-3 py-1.5 text-sm font-medium text-white transition hover:bg-orange-600"
                >
                  Save
                </button>
                <button
                  onClick={handleCancelField}
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
              <span className="font-medium">{userData.dateOfBirth}</span>
            </div>
          )}
        </article>

        <article className={cardClassName}>
          <div className="mb-2 flex items-center justify-between gap-2">
            <p className="text-lg font-semibold uppercase tracking-wider text-stone-300 ">Account Name</p>
            {editingField === "name" ? (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleSaveField("name")}
                  className="rounded-lg bg-orange-500 px-3 py-1.5 text-sm font-medium text-white transition hover:bg-orange-600"
                >
                  Save
                </button>
                <button
                  onClick={handleCancelField}
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
              <span className="font-medium">{userData.name}</span>
            </div>
          )}
        </article>
      </section>
    </div>
  );
};

export default ProfileOverview;