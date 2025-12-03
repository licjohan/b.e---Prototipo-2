import React from 'react';
import { useProject } from '../context/ProjectContext';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Phase4Prototype: React.FC = () => {
  const { project, updatePhase4 } = useProject();

  if (!project) return null;

  const handleChange = (field: keyof typeof project.phase4, value: string) => {
    updatePhase4({ [field]: value });
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
          <span className="bg-blue-100 text-blue-600 w-8 h-8 rounded-full flex items-center justify-center text-sm">4</span>
          Prototipar
        </h2>
        <p className="text-gray-600 mt-2">
          Describe cómo es tu solución tangible.
        </p>
      </div>

      <div className="space-y-6">
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <label className="block text-lg font-semibold text-gray-800 mb-3">Descripción General del Prototipo</label>
          <p className="text-sm text-gray-500 mb-4">¿Qué es? ¿Cómo se ve? ¿De qué material está hecho?</p>
          <textarea
            className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none h-48 resize-none"
            placeholder="Mi prototipo es una maqueta hecha de cartón que representa..."
            value={project.phase4.description}
            onChange={(e) => handleChange('description', e.target.value)}
          />
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <label className="block text-lg font-semibold text-gray-800 mb-3">Características Principales</label>
          <p className="text-sm text-gray-500 mb-4">Enumera las 3 funciones más importantes que cumple.</p>
          <textarea
            className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none h-48 resize-none"
            placeholder="1. Permite al usuario...&#10;2. Es resistente a...&#10;3. Se conecta con..."
            value={project.phase4.features}
            onChange={(e) => handleChange('features', e.target.value)}
          />
        </div>
      </div>

      <div className="mt-8 flex justify-end">
        <Link to="/phase5" className="flex items-center bg-brand-600 text-white px-6 py-2 rounded-lg hover:bg-brand-700 transition-colors">
          Siguiente: Testear <ArrowRight size={18} className="ml-2" />
        </Link>
      </div>
    </div>
  );
};

export default Phase4Prototype;