import React, { useState } from 'react';
import { useProject } from '../context/ProjectContext';
import { ArrowRight, Plus, Star, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';

const Phase3Ideate: React.FC = () => {
  const { project, addIdea, toggleIdeaFavorite, removeIdea } = useProject();
  const [newIdeaText, setNewIdeaText] = useState('');

  if (!project) return null;

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (newIdeaText.trim()) {
      addIdea(newIdeaText.trim());
      setNewIdeaText('');
    }
  };

  const sortedIdeas = [...project.phase3].sort((a, b) => {
    // Favorites first, then by ID (date) descending
    if (a.isFavorite === b.isFavorite) {
        return Number(b.id) - Number(a.id);
    }
    return a.isFavorite ? -1 : 1;
  });

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
          <span className="bg-yellow-100 text-yellow-600 w-8 h-8 rounded-full flex items-center justify-center text-sm">3</span>
          Ideación (Brainstorming)
        </h2>
        <p className="text-gray-600 mt-2">
          ¡No hay malas ideas! Escribe todas las soluciones posibles. Marca con una estrella ⭐ tus favoritas.
        </p>
      </div>

      <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm mb-6">
        <form onSubmit={handleAdd} className="flex gap-4">
          <input
            type="text"
            className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 outline-none"
            placeholder="Escribe una nueva idea..."
            value={newIdeaText}
            onChange={(e) => setNewIdeaText(e.target.value)}
          />
          <button 
            type="submit"
            disabled={!newIdeaText.trim()}
            className="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-3 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
          >
            <Plus size={20} className="mr-2" /> Agregar
          </button>
        </form>
      </div>

      <div className="space-y-3">
        {sortedIdeas.length === 0 ? (
          <div className="text-center py-12 bg-gray-50 rounded-xl border-dashed border-2 border-gray-200">
            <p className="text-gray-400">Aún no hay ideas. ¡Empieza a crear!</p>
          </div>
        ) : (
          sortedIdeas.map((idea) => (
            <div 
              key={idea.id} 
              className={`flex items-center justify-between p-4 rounded-xl border transition-all ${
                idea.isFavorite 
                  ? 'bg-yellow-50 border-yellow-200 shadow-sm' 
                  : 'bg-white border-gray-100 hover:border-gray-200'
              }`}
            >
              <div className="flex-1 text-gray-800 font-medium">{idea.text}</div>
              <div className="flex items-center gap-2 ml-4">
                <button
                  onClick={() => toggleIdeaFavorite(idea.id)}
                  className={`p-2 rounded-full transition-colors ${
                    idea.isFavorite ? 'text-yellow-500 hover:bg-yellow-100' : 'text-gray-300 hover:text-yellow-400 hover:bg-gray-100'
                  }`}
                  title="Marcar como favorita"
                >
                  <Star size={20} fill={idea.isFavorite ? "currentColor" : "none"} />
                </button>
                <button
                  onClick={() => removeIdea(idea.id)}
                  className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors"
                  title="Eliminar idea"
                >
                  <Trash2 size={20} />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="mt-8 flex justify-end">
        <Link to="/phase4" className="flex items-center bg-brand-600 text-white px-6 py-2 rounded-lg hover:bg-brand-700 transition-colors">
          Siguiente: Prototipar <ArrowRight size={18} className="ml-2" />
        </Link>
      </div>
    </div>
  );
};

export default Phase3Ideate;