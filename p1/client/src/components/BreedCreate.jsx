import { useState } from "react";
import { useNavigate, Link } from "react-router";

const BreedCreate = ({ onAdd }) => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    origin: "",
    size: "",
    temperament: "",
    lifeSpan: "",
    description: "",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Breed name is required";
    if (!formData.origin.trim())
      newErrors.origin = "Origin country is required";
    if (!formData.size) newErrors.size = "Please select a size category";
    if (!formData.temperament.trim())
      newErrors.temperament = "Temperament is required";
    if (!formData.lifeSpan.trim()) newErrors.lifeSpan = "Life span is required";
    if (!formData.description.trim())
      newErrors.description = "Description is required";
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setIsSubmitting(false);
      return;
    }

    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      onAdd({
        ...formData,
        name: formData.name.trim(),
        origin: formData.origin.trim(),
        temperament: formData.temperament.trim(),
        lifeSpan: formData.lifeSpan.trim(),
        description: formData.description.trim(),
      });
      navigate("/");
    } catch (error) {
      setErrors({ submit: "Failed to add breed. Please try again." });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setFormData({
      name: "",
      origin: "",
      size: "",
      temperament: "",
      lifeSpan: "",
      description: "",
    });
    setErrors({});
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-6">
        <Link
          to="/"
          className="text-blue-300 hover:text-blue-200 text-sm font-medium"
        >
          ← Back to Breeds
        </Link>
        <h1 className="text-3xl font-bold text-slate-100 mt-2 mb-2">
          Add New Dog Breed
        </h1>
        <p className="text-slate-400">
          Fill in the details below to add a new dog breed.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-slate-800 shadow-lg rounded-lg p-6 space-y-4"
      >
        {errors.submit && (
          <div className="bg-red-50 border border-red-200 rounded-md p-4">
            <p className="text-red-600 text-sm">{errors.submit}</p>
          </div>
        )}

        <div>
          <label className="block text-sm font-medium text-slate-300 mb-1">
            Breed Name *
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="e.g., Golden Retriever"
            className={`w-full px-4 py-2 border rounded-md bg-slate-700 text-slate-100 placeholder-slate-400 focus:ring-2 focus:ring-blue-500 ${
              errors.name ? "border-red-400 bg-red-900/20" : "border-slate-600"
            }`}
          />
          {errors.name && (
            <p className="mt-1 text-sm text-red-400">{errors.name}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-300 mb-1">
            Origin Country *
          </label>
          <input
            type="text"
            name="origin"
            value={formData.origin}
            onChange={handleChange}
            placeholder="e.g., Scotland"
            className={`w-full px-4 py-2 border rounded-md bg-slate-700 text-slate-100 placeholder-slate-400 focus:ring-2 focus:ring-blue-500 ${
              errors.origin
                ? "border-red-400 bg-red-900/20"
                : "border-slate-600"
            }`}
          />
          {errors.origin && (
            <p className="mt-1 text-sm text-red-400">{errors.origin}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-300 mb-1">
            Size Category *
          </label>
          <select
            name="size"
            value={formData.size}
            onChange={handleChange}
            className={`w-full px-4 py-2 border rounded-md bg-slate-700 text-slate-100 focus:ring-2 focus:ring-blue-500 ${
              errors.size ? "border-red-400 bg-red-900/20" : "border-slate-600"
            }`}
          >
            <option value="">Select size category</option>
            <option value="Small">Small (Under 25 lbs)</option>
            <option value="Medium">Medium (25-60 lbs)</option>
            <option value="Large">Large (Over 60 lbs)</option>
          </select>
          {errors.size && (
            <p className="mt-1 text-sm text-red-400">{errors.size}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-300 mb-1">
            Temperament *
          </label>
          <input
            type="text"
            name="temperament"
            value={formData.temperament}
            onChange={handleChange}
            placeholder="e.g., Friendly, Intelligent, Devoted"
            className={`w-full px-4 py-2 border rounded-md bg-slate-700 text-slate-100 placeholder-slate-400 focus:ring-2 focus:ring-blue-500 ${
              errors.temperament
                ? "border-red-400 bg-red-900/20"
                : "border-slate-600"
            }`}
          />
          {errors.temperament && (
            <p className="mt-1 text-sm text-red-400">{errors.temperament}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-300 mb-1">
            Life Span *
          </label>
          <input
            type="text"
            name="lifeSpan"
            value={formData.lifeSpan}
            onChange={handleChange}
            placeholder="e.g., 10-12 years"
            className={`w-full px-4 py-2 border rounded-md bg-slate-700 text-slate-100 placeholder-slate-400 focus:ring-2 focus:ring-blue-500 ${
              errors.lifeSpan
                ? "border-red-400 bg-red-900/20"
                : "border-slate-600"
            }`}
          />
          {errors.lifeSpan && (
            <p className="mt-1 text-sm text-red-400">{errors.lifeSpan}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-300 mb-1">
            Description *
          </label>
          <textarea
            name="description"
            rows={4}
            value={formData.description}
            onChange={handleChange}
            placeholder="Provide a detailed description of the breed..."
            className={`w-full px-4 py-2 border rounded-md bg-slate-700 text-slate-100 placeholder-slate-400 focus:ring-2 focus:ring-blue-500 ${
              errors.description
                ? "border-red-400 bg-red-900/20"
                : "border-slate-600"
            }`}
          />
          {errors.description && (
            <p className="mt-1 text-sm text-red-400">{errors.description}</p>
          )}
        </div>

        <div className="flex gap-4 pt-4 border-t border-slate-600">
          <button
            type="submit"
            disabled={isSubmitting}
            className={`flex-1 px-6 py-2 rounded-md font-medium ${
              isSubmitting
                ? "bg-slate-600 text-slate-400 cursor-not-allowed"
                : "bg-blue-700 text-white hover:bg-blue-600"
            }`}
          >
            {isSubmitting ? "Adding..." : "Add Breed"}
          </button>
          <button
            type="button"
            onClick={handleReset}
            disabled={isSubmitting}
            className="flex-1 px-6 py-2 border border-slate-600 text-slate-300 rounded-md hover:bg-slate-700"
          >
            Reset
          </button>
          <Link
            to="/"
            className="flex-1 px-6 py-2 text-center border border-slate-600 text-slate-300 rounded-md hover:bg-slate-700"
          >
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
};

export default BreedCreate;
