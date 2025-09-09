import { useParams, Link, useNavigate } from "react-router";

const BreedShow = ({ getBreedById, onDelete }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const breed = getBreedById(id);

  if (!breed) {
    return (
      <div className="max-w-4xl mx-auto text-center py-12">
        <div className="text-6xl mb-4">🐕‍🦺</div>
        <h2 className="text-2xl font-bold text-slate-100 mb-4">
          Breed Not Found
        </h2>
        <p className="text-slate-400 mb-6">
          The breed you're looking for doesn't exist or may have been deleted.
        </p>
        <Link
          to="/"
          className="px-4 py-2 bg-blue-700 text-white rounded-md hover:bg-blue-600"
        >
          ← Back to All Breeds
        </Link>
      </div>
    );
  }

  const handleDelete = () => {
    if (window.confirm(`Are you sure you want to delete ${breed.name}?`)) {
      onDelete(breed.id);
      navigate("/");
    }
  };

  const getSizeColor = (size) => {
    const colors = {
      Small: "bg-green-800 text-green-200 border-green-700",
      Medium: "bg-yellow-800 text-yellow-200 border-yellow-700",
      Large: "bg-red-800 text-red-200 border-red-700",
    };
    return colors[size] || "bg-slate-700 text-slate-200 border-slate-600";
  };

  const getSizeDescription = (size) => {
    const descriptions = {
      Small: "Under 25 lbs",
      Medium: "25-60 lbs",
      Large: "Over 60 lbs",
    };
    return descriptions[size] || "Size not specified";
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <Link
            to="/"
            className="text-blue-300 hover:text-blue-200 flex items-center text-sm font-medium"
          >
            ← Back to All Breeds
          </Link>
          <div className="flex space-x-3">
            <Link
              to={`/edit/${breed.id}`}
              className="px-4 py-2 bg-emerald-700 text-white rounded-md hover:bg-emerald-600 text-sm"
            >
              Edit Breed
            </Link>
            <button
              onClick={handleDelete}
              className="px-4 py-2 bg-red-700 text-white rounded-md hover:bg-red-600 text-sm"
            >
              Delete Breed
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="bg-slate-800 rounded-lg shadow-lg overflow-hidden">
        {/* Header Section */}
        <div className="bg-gradient-to-r from-blue-800 to-blue-900 text-white p-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-4xl font-bold mb-2">{breed.name}</h1>
              <p className="text-blue-200 text-lg">
                Originating from {breed.origin}
              </p>
            </div>
            <div className="mt-4 md:mt-0">
              <span
                className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium border ${getSizeColor(
                  breed.size
                )}`}
              >
                {breed.size} Breed
              </span>
            </div>
          </div>
        </div>

        {/* Details Section */}
        <div className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Quick Facts */}
            <div className="lg:col-span-1">
              <h3 className="text-lg font-semibold text-slate-100 mb-4">
                Quick Facts
              </h3>
              <div className="space-y-3">
                <div className="bg-slate-700 p-3 rounded-lg">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-slate-300">
                      Size Category
                    </span>
                    <span
                      className={`px-2 py-1 rounded text-xs font-medium ${getSizeColor(
                        breed.size
                      )}`}
                    >
                      {breed.size}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 mt-1">
                    {getSizeDescription(breed.size)}
                  </p>
                </div>

                <div className="bg-slate-700 p-3 rounded-lg">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-slate-300">
                      Origin
                    </span>
                    <span className="text-sm font-semibold text-slate-100">
                      {breed.origin}
                    </span>
                  </div>
                </div>

                <div className="bg-slate-700 p-3 rounded-lg">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-slate-300">
                      Life Span
                    </span>
                    <span className="text-sm font-semibold text-slate-100">
                      {breed.lifeSpan}
                    </span>
                  </div>
                </div>

                <div className="bg-slate-700 p-3 rounded-lg">
                  <span className="text-sm font-medium text-slate-300 block mb-2">
                    Temperament
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {breed.temperament.split(",").map((trait, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-blue-800 text-blue-200 text-xs rounded-full"
                      >
                        {trait.trim()}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="lg:col-span-2">
              <h3 className="text-lg font-semibold text-slate-100 mb-4">
                About This Breed
              </h3>
              <p className="text-slate-300 leading-relaxed mb-6">
                {breed.description}
              </p>

              {/* Additional Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-blue-900/50 border border-blue-700 rounded-lg p-4">
                  <h4 className="font-semibold text-blue-200 mb-2">
                    Perfect For
                  </h4>
                  <p className="text-blue-300 text-sm">
                    {breed.size === "Small" &&
                      "Apartment living, seniors, first-time owners"}
                    {breed.size === "Medium" &&
                      "Active families, moderate exercise needs"}
                    {breed.size === "Large" &&
                      "Experienced owners, large yards, active lifestyles"}
                  </p>
                </div>

                <div className="bg-emerald-900/50 border border-emerald-700 rounded-lg p-4">
                  <h4 className="font-semibold text-emerald-200 mb-2">
                    Exercise Needs
                  </h4>
                  <p className="text-emerald-300 text-sm">
                    {breed.size === "Small" &&
                      "Low to moderate exercise, daily walks"}
                    {breed.size === "Medium" &&
                      "Moderate exercise, regular playtime"}
                    {breed.size === "Large" &&
                      "High exercise needs, daily activities"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Footer */}
        <div className="bg-slate-700 px-6 py-4 border-t border-slate-600">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <p className="text-sm text-slate-400">
              Last updated: {new Date().toLocaleDateString()}
            </p>
            <div className="flex space-x-3">
              <Link
                to={`/edit/${breed.id}`}
                className="px-4 py-2 bg-emerald-700 text-white rounded-md hover:bg-emerald-600 text-sm"
              >
                Edit Information
              </Link>
              <Link
                to="/"
                className="px-4 py-2 border border-slate-600 text-slate-300 rounded-md hover:bg-slate-600 text-sm"
              >
                Browse More Breeds
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BreedShow;
