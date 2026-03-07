import React, { useState } from 'react';

const ProfileOverview = () => {
  // 1. Initialize state with your default user details
  const initialUserDetails = {
    name: "John Doe",
    email: "john.doe@example.com",
    profilePicture: "https://via.placeholder.com/150",
    phoneNumber: "+1 234 567 890",
    address: "123 Main St, Anytown, USA",
    gender: "Male",
    dateOfBirth: "1990-01-01",
  };

  const [userData, setUserData] = useState(initialUserDetails);
  const [editData, setEditData] = useState(initialUserDetails);
  const [isEditing, setIsEditing] = useState(false);

  // 2. Handle input changes dynamically based on the input's 'name' attribute
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // 3. Save changes and exit edit mode
  const handleSave = () => {
    setUserData(editData);
    setIsEditing(false);
  };

  // 4. Discard changes and exit edit mode
  const handleCancel = () => {
    setEditData(userData); // Revert back to the saved data
    setIsEditing(false);
  };

  return (
    <div className=" p-6rounded-xl shadow-sm border border-gray-100 space-y-6">
      
      {/* Profile Picture Section */}
      <div className="flex items-center gap-4">
        <div className="w-20 h-20 shrink-0">
          <img
            className="w-full h-full rounded-full object-cover border border-gray-200"
            src={isEditing ? editData.profilePicture : userData.profilePicture}
            alt={`${userData.name}'s profile`}
          />
        </div>
        {!isEditing && (
          <button
            onClick={() => setIsEditing(true)}
            className="px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
          >
            Edit Profile
          </button>
        )}
      </div>

      {/* Main Content Area (Conditional Rendering) */}
      {isEditing ? (
        <div className="flex flex-col gap-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {/* Name Input */}
            <label className="flex flex-col text-sm text-gray-600">
              Full Name
              <input
                type="text"
                name="name"
                value={editData.name}
                onChange={handleChange}
                className="mt-1 p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500 text-gray-900"
              />
            </label>

            {/* Email Input */}
            <label className="flex flex-col text-sm text-gray-600">
              Email
              <input
                type="email"
                name="email"
                value={editData.email}
                onChange={handleChange}
                className="mt-1 p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500 text-gray-900"
              />
            </label>

            {/* Phone Number Input */}
            <label className="flex flex-col text-sm text-gray-600">
              Phone Number
              <input
                type="tel"
                name="phoneNumber"
                value={editData.phoneNumber}
                onChange={handleChange}
                className="mt-1 p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500 text-gray-900"
              />
            </label>

            {/* Date of Birth Input */}
            <label className="flex flex-col text-sm text-gray-600">
              Date of Birth
              <input
                type="date"
                name="dateOfBirth"
                value={editData.dateOfBirth}
                onChange={handleChange}
                className="mt-1 p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500 text-gray-900"
              />
            </label>

            {/* Gender Select */}
            <label className="flex flex-col text-sm text-gray-600">
              Gender
              <select
                name="gender"
                value={editData.gender}
                onChange={handleChange}
                className="mt-1 p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500 text-gray-900"
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
                <option value="Prefer not to say">Prefer not to say</option>
              </select>
            </label>

            {/* Profile Picture URL */}
            <label className="flex flex-col text-sm text-gray-600 sm:col-span-2">
              Profile Picture URL
              <input
                type="text"
                name="profilePicture"
                value={editData.profilePicture}
                onChange={handleChange}
                className="mt-1 p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500 text-gray-900"
              />
            </label>

            {/* Address Input */}
            <label className="flex flex-col text-sm text-gray-600 sm:col-span-2">
              Address
              <input
                type="text"
                name="address"
                value={editData.address}
                onChange={handleChange}
                className="mt-1 p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500 text-gray-900"
              />
            </label>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 mt-4">
            <button
              onClick={handleSave}
              className="px-5 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Save Changes
            </button>
            <button
              onClick={handleCancel}
              className="px-5 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        /* Display Mode */
        <div className="flex flex-col gap-3">
          <h1 className="text-2xl font-bold text-gray-900">{userData.name}</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-6 text-gray-600">
            <p><strong>Email:</strong> {userData.email}</p>
            <p><strong>Phone:</strong> {userData.phoneNumber}</p>
            <p className="sm:col-span-2"><strong>Address:</strong> {userData.address}</p>
            <p><strong>Gender:</strong> {userData.gender}</p>
            <p><strong>Born:</strong> {userData.dateOfBirth}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileOverview;