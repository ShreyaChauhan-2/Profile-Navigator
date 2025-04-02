import React, { useState } from "react";
import "leaflet/dist/leaflet.css";
import { DummyProfiles } from "./DummyProfiles";
import {GoogleMap, LoadScript, Marker, InfoWindow,} from "@react-google-maps/api";

const GOOGLE_MAPS_API_KEY = "ENTER_YOUR_GOOGLE_MAPS_API_KEY"; 

const ProfileCard = ({profile,onSelect,onDelete,onEdit,onBack,showActions = true,}) => {
  return (
    <div className="bg-white shadow-xl rounded-2xl p-6 text-center hover:scale-105 transition-transform duration-300 cursor-pointer">
      <img
        src={profile.photo}
        alt={profile.name}
        className="w-28 h-28 rounded-full mx-auto mb-4 border-4 border-gray-300"
      />
      <h2 className="text-2xl font-bold text-black-800">{profile.name}</h2>
      <p className="text-black-400 mt-2">{profile.description}</p>
      <p className="text-black-500 mt-2">Contact: {profile.contact}</p>

      {showActions && (
        <>
          <button
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            onClick={() => onSelect(profile)}
          >
            Summary
          </button>
          <button
            className="ml-2 px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600"
            onClick={() => onEdit(profile)}
          >
            Edit
          </button>
          <button
            className="ml-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
            onClick={() => onDelete(profile.id)}
          >
            Delete
          </button>
        </>
      )}
      {onBack && (
        <button
          className="ml-2 mt-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-800"
          onClick={onBack}
        >
          Navigate to All Profiles
        </button>
      )}
    </div>
  );
};

const ProfileList = () => {
  const [profiles, setProfiles] = useState(DummyProfiles);
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [editingProfile, setEditingProfile] = useState(null);
  const [newProfile, setNewProfile] = useState({
    name: "",
    photo: "",
    description: "",
    location: { lat: "", lng: "" },
    address: "",
    contact:"",
  });

  const handleAddProfile = () => {
    setProfiles([...profiles, { ...newProfile, id: profiles.length + 1 }]);
    setNewProfile({
      name: "",
      photo: "",
      description: "",
      location: { lat: "", lng: "" },
      address: "",
      contact:"",
    });
  };

  const handleDeleteProfile = (id) => {
    setProfiles(profiles.filter((profile) => profile.id !== id));
  };

  const handleEditProfile = (updatedProfile) => {
    setProfiles(
      profiles.map((profile) =>
        profile.id === updatedProfile.id ? updatedProfile : profile
      )
    );
    setEditingProfile(null);
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-gradient-to-b from-blue-200 to-blue-500 py-12">
      <h1 className="text-5xl font-extrabold text-gray-900 mb-12">
        {selectedProfile ? "Profile Summary" : "Profile List"}
      </h1>

      <div className="mb-8 p-6 bg-white shadow-md rounded-lg mr-3 ml-3">
        <h2 className="text-xl font-bold mb-4">Add New Profile</h2>
        <input
          className="border p-2 rounded mb-2"
          type="text"
          placeholder="Name"
          value={newProfile.name}
          onChange={(e) =>
            setNewProfile({ ...newProfile, name: e.target.value })
          }
        />
        <input
          className="border p-2 rounded mb-2"
          type="text"
          placeholder="Photo URL"
          value={newProfile.photo}
          onChange={(e) =>
            setNewProfile({ ...newProfile, photo: e.target.value })
          }
        />
        <input
          className="border p-2 rounded mb-2"
          type="text"
          placeholder="Description"
          value={newProfile.description}
          onChange={(e) =>
            setNewProfile({ ...newProfile, description: e.target.value })
          }
        />
        <input
          className="border p-2 rounded mb-2"
          type="number"
          placeholder="Latitude"
          value={newProfile.location.lat}
          onChange={(e) =>
            setNewProfile({
              ...newProfile,
              location: { ...newProfile.location, lat: Number(e.target.value) },
            })
          }
        />
        <input
          className="border p-2 rounded mb-2"
          type="number"
          placeholder="Longitude"
          value={newProfile.location.lng}
          onChange={(e) =>
            setNewProfile({ ...newProfile, location: { ...newProfile.location, lng: Number(e.target.value) },})
          }
        />
        <input
          className="border p-2 rounded mb-2"
          type="text"
          placeholder="Address"
          value={newProfile.address}
          onChange={(e) =>
            setNewProfile({ ...newProfile, address: e.target.value })
          }
        />
        <input
          className="border p-2 rounded mb-2"
          type="number"
          placeholder="Contact"
          value={newProfile.contact}
          onChange={(e) =>
            setNewProfile({ ...newProfile, contact: Number(e.target.value) })
          }
        />
        <button
          className="mt-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
          onClick={handleAddProfile}
        >
          Add Profile
        </button>
      </div>

      {editingProfile && (
        <div className="mb-8 p-6 bg-white shadow-md rounded-lg">
          <h2 className="text-xl font-bold mb-4">Edit Profile</h2>
          <input
            className="border p-2 rounded mb-2"
            type="text"
            placeholder="Name"
            value={editingProfile.name}
            onChange={(e) =>
              setEditingProfile({ ...editingProfile, name: e.target.value })
            }
          />
          <input
            className="border p-2 rounded mb-2"
            type="text"
            placeholder="Photo URL"
            value={editingProfile.photo}
            onChange={(e) =>
              setEditingProfile({ ...editingProfile, photo: e.target.value })
            }
          />
          <input
            className="border p-2 rounded mb-2"
            type="text"
            placeholder="Description"
            value={editingProfile.description}
            onChange={(e) =>
              setEditingProfile({
                ...editingProfile,
                description: e.target.value,
              })
            }
          />
          <input
            className="border p-2 rounded mb-2"
            type="number"
            placeholder="Latitude"
            value={editingProfile.location.lat}
            onChange={(e) =>
              setEditingProfile({
                ...editingProfile,
                location: {
                  ...editingProfile.location,
                  lat: Number(e.target.value),
                },
              })
            }
          />
          <input
            className="border p-2 rounded mb-2"
            type="number"
            placeholder="Longitude"
            value={editingProfile.location.lng}
            onChange={(e) =>
              setEditingProfile({
                ...editingProfile,
                location: {
                  ...editingProfile.location,
                  lng: Number(e.target.value),
                },
              })
            }
          />
          <input
            className="border p-2 rounded mb-2"
            type="text"
            placeholder="Address"
            value={editingProfile.address}
            onChange={(e) =>
              setEditingProfile({ ...editingProfile, address: e.target.value })
            }
          />
          <input
            className="border p-2 rounded mb-2"
            type="number"
            placeholder="Contact"
            value={editingProfile.contact}
            onChange={(e) =>
              setEditingProfile({ ...editingProfile, contact: Number(e.target.value) })
            }
          />
          <button
            className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            onClick={() => handleEditProfile(editingProfile)}
          >
            Save Changes
          </button>
          <button
            className="ml-2 mt-2 px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-700"
            onClick={() => setEditingProfile(null)}
          >
            Cancel
          </button>
        </div>
      )}

      {selectedProfile ? (
        <div className="flex flex-col items-center bg-white shadow-lg p-6 rounded-xl w-full max-w-lg">
          <ProfileCard
            profile={selectedProfile}
            onSelect={() => {}}
            onDelete={() => {}}
            onEdit={() => {}}
            onBack={() => setSelectedProfile(null)}
            showActions={false}
          />

          <div className="w-full mt-6 h-96 rounded-lg overflow-hidden shadow-lg">
            <LoadScript googleMapsApiKey={GOOGLE_MAPS_API_KEY}>
              <GoogleMap
                mapContainerStyle={{ width: "100%", height: "100%" }}
                center={selectedProfile.location}
                zoom={12}
              >
                <Marker position={selectedProfile.location} />
                <InfoWindow position={selectedProfile.location}>
                  <div>{selectedProfile.address}</div>
                </InfoWindow>
              </GoogleMap>
            </LoadScript>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 px-8">
          {profiles.map((profile) => (
            <ProfileCard
              key={profile.id}
              profile={profile}
              onSelect={setSelectedProfile}
              onDelete={handleDeleteProfile}
              onEdit={(profile) => setEditingProfile(profile)}
              showActions={true}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ProfileList;