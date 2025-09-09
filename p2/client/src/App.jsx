import { useEffect, useState } from "react";

const API = import.meta.env.VITE_API_URL || "http://localhost:3000/movies";

function App() {
  const [movies, setMovies] = useState([]);
  const [form, setForm] = useState({
    title: "",
    director: "",
    genre: "",
    release_year: "",
    rating: "",
  });
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchMovies();
  }, []);
  const fetchMovies = async () => {
    const res = await fetch(API);
    setMovies(await res.json());
  };

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editId) {
      await fetch(`${API}/${editId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
    } else {
      await fetch(API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
    }
    setForm({
      title: "",
      director: "",
      genre: "",
      release_year: "",
      rating: "",
    });
    setEditId(null);
    fetchMovies();
  };

  const handleEdit = (m) => {
    setForm(m);
    setEditId(m.id);
  };

  const handleDelete = async (id) => {
    await fetch(`${API}/${id}`, { method: "DELETE" });
    fetchMovies();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-6 text-gray-100">
      <div className="max-w-xl mx-auto bg-gray-800 shadow-2xl rounded-xl p-8 border border-gray-700">
        <h1 className="text-3xl font-extrabold mb-6 text-center text-blue-400 tracking-wide drop-shadow">
          🎬 Movie Catalog
        </h1>
        <form className="mb-8 grid gap-3" onSubmit={handleSubmit}>
          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="Title"
            className="bg-gray-900 border border-gray-700 p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-100 placeholder-gray-400"
            required
          />
          <input
            name="director"
            value={form.director}
            onChange={handleChange}
            placeholder="Director"
            className="bg-gray-900 border border-gray-700 p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-100 placeholder-gray-400"
            required
          />
          <input
            name="genre"
            value={form.genre}
            onChange={handleChange}
            placeholder="Genre"
            className="bg-gray-900 border border-gray-700 p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-100 placeholder-gray-400"
            required
          />
          <input
            name="release_year"
            value={form.release_year}
            onChange={handleChange}
            placeholder="Release Year"
            className="bg-gray-900 border border-gray-700 p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-100 placeholder-gray-400"
            required
          />
          <input
            name="rating"
            value={form.rating}
            onChange={handleChange}
            placeholder="Rating"
            className="bg-gray-900 border border-gray-700 p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-100 placeholder-gray-400"
            required
          />
          <button className="bg-blue-600 text-white py-2 rounded font-semibold hover:bg-blue-700 transition-all shadow">
            {editId ? "Update" : "Add"} Movie
          </button>
        </form>
        <div className="overflow-x-auto rounded-lg shadow">
          <table className="w-full text-sm border border-gray-700 bg-gray-900">
            <thead>
              <tr className="bg-gray-800 text-blue-300">
                <th className="p-3">Title</th>
                <th className="p-3">Director</th>
                <th className="p-3">Genre</th>
                <th className="p-3">Year</th>
                <th className="p-3">Rating</th>
                <th className="p-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(movies) &&
                movies.map((m) => (
                  <tr
                    key={m.id}
                    className="border-t border-gray-700 hover:bg-gray-800 transition-all"
                  >
                    <td className="p-3 font-medium">{m.title}</td>
                    <td className="p-3">{m.director}</td>
                    <td className="p-3">{m.genre}</td>
                    <td className="p-3">{m.release_year}</td>
                    <td className="p-3">{m.rating}</td>
                    <td className="p-3 flex gap-2">
                      <button
                        className="text-blue-400 hover:text-blue-200 font-bold"
                        onClick={() => handleEdit(m)}
                      >
                        Edit
                      </button>
                      <button
                        className="text-red-400 hover:text-red-200 font-bold"
                        onClick={() => handleDelete(m.id)}
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
}

export default App;
