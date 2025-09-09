import { useState } from "react";
import { Link } from "react-router";

const BreedList = ({ breeds, onDelete }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterSize, setFilterSize] = useState("All");

  const filteredBreeds = breeds.filter((breed) => {
    const matchesSearch =
      breed.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      breed.origin.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSize = filterSize === "All" || breed.size === filterSize;
    return matchesSearch && matchesSize;
  });

  const handleDelete = (id, breedName) => {
    if (window.confirm(`Delete ${breedName}?`)) {
      onDelete(id);
    }
  };

  const getSizeColor = (size) => {
    const colors = {
      Small: "bg-emerald-900 text-emerald-300",
      Medium: "bg-amber-900 text-amber-300",
      Large: "bg-red-900 text-red-300",
    };
    return colors[size] || "bg-slate-700 text-slate-300";
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-slate-100 mb-2">
          Dog Breed Collection
        </h1>
        <p className="text-slate-400">Manage your favorite dog breeds</p>
      </div>

      {/* Search and Filter */}
      <div className="bg-slate-800 p-4 rounded-lg shadow border border-slate-700">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Search breeds..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="px-4 py-2 border border-slate-600 bg-slate-700 text-slate-100 rounded-md focus:ring-2 focus:ring-blue-500 placeholder-slate-400"
          />
          <select
            value={filterSize}
            onChange={(e) => setFilterSize(e.target.value)}
            className="px-4 py-2 border border-slate-600 bg-slate-700 text-slate-100 rounded-md focus:ring-2 focus:ring-blue-500"
          >
            <option value="All">All Sizes</option>
            <option value="Small">Small</option>
            <option value="Medium">Medium</option>
            <option value="Large">Large</option>
          </select>
        </div>
        <p className="mt-2 text-sm text-slate-400">
          Showing {filteredBreeds.length} of {breeds.length} breeds
        </p>
      </div>

      {/* Breeds Grid */}
      {filteredBreeds.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🐕</div>
          <h3 className="text-xl font-semibold mb-2 text-slate-100">
            No breeds found
          </h3>
          <Link
            to="/create"
            className="px-4 py-2 bg-blue-700 text-white rounded-md hover:bg-blue-600"
          >
            Add Your First Breed
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBreeds.map((breed) => (
            <div
              key={breed.id}
              className="bg-slate-800 rounded-lg shadow hover:shadow-xl transition-shadow p-6 border border-slate-700"
            >
              <div className="flex justify-between items-start mb-3">
                <h3 className="text-xl font-bold text-slate-100">
                  {breed.name}
                </h3>
                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium ${getSizeColor(
                    breed.size
                  )}`}
                >
                  {breed.size}
                </span>
              </div>

              <div className="space-y-2 text-sm text-slate-300 mb-4">
                <div>
                  <strong className="text-slate-200">Origin:</strong>{" "}
                  {breed.origin}
                </div>
                <div>
                  <strong className="text-slate-200">Life Span:</strong>{" "}
                  {breed.lifeSpan}
                </div>
                <div>
                  <strong className="text-slate-200">Temperament:</strong>{" "}
                  {breed.temperament}
                </div>
              </div>

              <p className="text-sm text-slate-400 mb-4 line-clamp-3">
                {breed.description}
              </p>

              <div className="flex gap-2">
                <Link
                  to={`/breed/${breed.id}`}
                  className="flex-1 px-3 py-2 bg-blue-700 text-white text-sm rounded hover:bg-blue-600 text-center"
                >
                  View
                </Link>
                <Link
                  to={`/edit/${breed.id}`}
                  className="flex-1 px-3 py-2 bg-emerald-700 text-white text-sm rounded hover:bg-emerald-600 text-center"
                >
                  Edit
                </Link>
                <button
                  onClick={() => handleDelete(breed.id, breed.name)}
                  className="flex-1 px-3 py-2 bg-red-700 text-white text-sm rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Floating Add Button */}
      <Link
        to="/create"
        className="fixed bottom-6 right-6 w-14 h-14 bg-blue-700 text-white rounded-full shadow-lg hover:bg-blue-600 flex items-center justify-center text-2xl"
        title="Add New Breed"
      >
        +
      </Link>
    </div>
  );
};

export default BreedList;
