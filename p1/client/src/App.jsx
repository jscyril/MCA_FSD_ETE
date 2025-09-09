import { useState } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router";
import "./App.css";
import BreedList from "./components/BreedList";
import BreedCreate from "./components/BreedCreate";
import BreedEdit from "./components/BreedEdit";
import BreedShow from "./components/BreedShow";

import { initialBreeds } from "./utils/data";

function App() {
  const [breeds, setBreeds] = useState(initialBreeds);

  const addBreed = (newBreed) => {
    const id = Math.max(...breeds.map((b) => b.id), 0) + 1;
    setBreeds([...breeds, { ...newBreed, id }]);
  };

  const updateBreed = (id, updatedBreed) => {
    setBreeds(
      breeds.map((breed) =>
        breed.id === parseInt(id)
          ? { ...updatedBreed, id: parseInt(id) }
          : breed
      )
    );
  };

  const deleteBreed = (id) => {
    setBreeds(breeds.filter((breed) => breed.id !== parseInt(id)));
  };

  const getBreedById = (id) => {
    return breeds.find((breed) => breed.id === parseInt(id));
  };

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-slate-900">
        <nav className="bg-slate-800 text-white shadow-lg border-b border-slate-700">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex items-center">
                <Link to="/" className="flex items-center">
                  <span className="text-xl font-bold text-blue-300">
                    🐕 Pet Breed Manager
                  </span>
                </Link>
              </div>
              <div className="flex items-center space-x-4">
                <Link
                  to="/"
                  className="hover:bg-slate-700 px-3 py-2 rounded-md text-sm font-medium transition-colors text-slate-200"
                >
                  All Breeds
                </Link>
                <Link
                  to="/create"
                  className="bg-blue-700 hover:bg-blue-600 px-4 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  Add New Breed
                </Link>
              </div>
            </div>
          </div>
        </nav>

        <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <Routes>
            <Route
              path="/"
              element={<BreedList breeds={breeds} onDelete={deleteBreed} />}
            />
            <Route path="/create" element={<BreedCreate onAdd={addBreed} />} />
            <Route
              path="/breed/:id"
              element={
                <BreedShow
                  breeds={breeds}
                  onDelete={deleteBreed}
                  getBreedById={getBreedById}
                />
              }
            />
            <Route
              path="/edit/:id"
              element={
                <BreedEdit
                  breeds={breeds}
                  onUpdate={updateBreed}
                  getBreedById={getBreedById}
                />
              }
            />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
