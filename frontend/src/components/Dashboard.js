import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { DummyProfiles } from "./DummyProfiles";

const Dashboard = () => {
  const [profiles, setProfiles] = useState(DummyProfiles);
  const [editingProfile, setEditingProfile] = useState(null);
  const [editedData, setEditedData] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const [filterLocation, setFilterLocation] = useState("");
  const navigate = useNavigate();

  const handleEditClick = (profile) => {
    setEditingProfile(profile.id);
    setEditedData({ ...profile });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    setProfiles(
      profiles.map((profile) =>
        profile.id === editedData.id ? editedData : profile
      )
    );
    setEditingProfile(null);
  };

  const handleDelete = (id) => {
    setProfiles(profiles.filter((profile) => profile.id !== id));
  };

  const filteredProfiles = profiles.filter((profile) =>
    profile.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (filterLocation === "" || profile.address.toLowerCase().includes(filterLocation.toLowerCase()))
  );

  return (
    <div className="min-h-screen flex flex-col items-center bg-gradient-to-b from-blue-200 to-blue-400 py-12">
    <div className="container mx-auto p-8 bg-black-300 min-h-screen">
      <h1 className="text-4xl font-bold text-center mb-6 text-black-700">Admin Dashboard</h1>
      
      {/* Search & Filter */}
      <div className="flex gap-4 mb-6">
        <input
          type="text"
          placeholder="Search by name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className=" placeholder-gray-700 border p-3 rounded-lg w-1/2 shadow-sm focus:ring-2 focus:ring-blue-300"
        />
        <input
          type="text"
          placeholder="Filter by location..."
          value={filterLocation}
          onChange={(e) => setFilterLocation(e.target.value)}
          className="placeholder-gray-700 border p-3 rounded-lg w-1/2 shadow-sm focus:ring-2 focus:ring-blue-300"
        />
        <button 
          className="px-5 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-800 transition"
          onClick={() => navigate("/profiles")}
        >
          View All Profiles
        </button>
        <button 
          className="px-5 py-2 bg-green-500 text-white rounded-lg shadow-md hover:bg-green-700 transition"
          onClick={() => navigate("/profiles")}
        >
          Add New Profile
        </button>
      </div>
      
      {/* Profile Table */}
      <div className="overflow-hidden rounded-lg shadow-md">
        <table className="w-full bg-white rounded-lg">
          <thead className="bg-blue-500 text-white">
            <tr>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Photo</th>
              <th className="p-3 text-left">Description</th>
              <th className="p-3 text-left">Location</th>
              <th className="p-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredProfiles.map((profile, index) => (
              <tr key={profile.id} className={`${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'} border-b`}> 
                <td className="p-3">
                  {editingProfile === profile.id ? (
                    <input
                      type="text"
                      name="name"
                      value={editedData.name}
                      onChange={handleChange}
                      className="border p-2 rounded"
                    />
                  ) : (
                    <span className="text-gray-800 font-medium">{profile.name}</span>
                  )}
                </td>
                <td className="p-3">
                  <img
                    src={profile.photo}
                    alt={profile.name}
                    className="w-12 h-12 rounded-full shadow-md"
                  />
                </td>
                <td className="p-3">
                  {editingProfile === profile.id ? (
                    <input
                      type="text"
                      name="description"
                      value={editedData.description}
                      onChange={handleChange}
                      className="border p-2 rounded"
                    />
                  ) : (
                    profile.description
                  )}
                </td>
                <td className="p-3">
                    {editingProfile === profile.id ? (
                        <input
                        type="text"
                        name="address"
                        value={editedData.address}
                        onChange={handleChange}
                        className="border p-2 rounded"
                        />
                    ) : (
                        profile.address
                    )}
                </td>
                <td className="p-3">
                  {editingProfile === profile.id ? (
                    <button
                      className="bg-green-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-green-600 transition mb-1 mr-1"
                      onClick={handleSave}
                    >
                      Save
                    </button>
                  ) : (
                    <button
                      className="bg-yellow-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-yellow-600 transition mr-2 mb-1"
                      onClick={() => handleEditClick(profile)}
                    >
                      Edit
                    </button>
                  )}
                  <button
                    className="bg-red-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-red-600 transition"
                    onClick={() => handleDelete(profile.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    </div>
  );
};

export default Dashboard;
