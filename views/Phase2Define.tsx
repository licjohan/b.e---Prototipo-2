import React from 'react';
import { useProject } from '../context/ProjectContext';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Phase2Define: React.FC = () => {
  const { project, updatePhase2 } = useProject();

  if (!project) return null;

  const handleChange = (field: keyof typeof project.phase2, value: string) => {
    updatePhase2({ [field]: value });
  };

  const isComplete = project.phase2.user && project.phase2.need && project.phase2.insight;

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
          <span className="bg-purple-100 text-purple-600 w-8 h-8 rounded-full flex items-center justify-center text-sm">2</span>
          Definir el Problema
        </h2>
        <p className="text-gray-600 mt-2">
          Crea tu "Problem Statement" llenando los espacios en blanco.
        </p>
      </div>

      <div className="bg-white p-8 rounded-xl border border-gray-200 shadow-sm space-y-6">
        
        {/* User Input */}
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">
            1. El Usuario
          </label>
          <div className="flex items-center gap-3">
            <span className="text-gray-500 font-serif italic text-lg">El/La</span>
            <input
              type="text"
              className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
              placeholder="Ej. Estudiante de secundaria con poco tiempo..."
              value={project.phase2.user}
              onChange={(e) => handleChange('user', e.target.value)}
            />
          </div>
        </div>

        {/* Need Input */}
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">
            2. La Necesidad
          </label>
          <div className="flex items-center gap-3">
            <span className="text-gray-500 font-serif italic text-lg">necesita</span>
            <input
              type="text"
              className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
              placeholder="Ej. una forma de cargar sus dispositivos en movimiento..."
              value={project.phase2.need}
              onChange={(e) => handleChange('need', e.target.value)}
            />
          </div>
        </div>

        {/* Insight Input */}
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">
            3. El Insight (El Por qué)
          </label>
          <div className="flex items-center gap-3">
            <span className="text-gray-500 font-serif italic text-lg">porque</span>
            <input
              type="text"
              className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
              placeholder="Ej. su aprendizaje depende de estar conectado todo el día."
              value={project.phase2.insight}
              onChange={(e) => handleChange('insight', e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Result Preview */}
      <div className={`mt-8 p-6 rounded-xl border transition-all duration-500 ${isComplete ? 'bg-purple-50 border-purple-200 opacity-100' : 'bg-gray-50 border-gray-200 opacity-50'}`}>
        <h3 className="text-xs font-bold text-purple-800 uppercase tracking-wide mb-2">Resultado Final</h3>
        <p className="text-xl md:text-2xl font-serif text-gray-800 leading-relaxed">
          "El <strong>{project.phase2.user || '...'}</strong> necesita <strong>{project.phase2.need || '...'}</strong> porque <strong>{project.phase2.insight || '...'}</strong>."
        </p>
      </div>

      <div className="mt-8 flex justify-end">
        <Link to="/phase3" className="flex items-center bg-brand-600 text-white px-6 py-2 rounded-lg hover:bg-brand-700 transition-colors">
          Siguiente: Idear <ArrowRight size={18} className="ml-2" />
        </Link>
      </div>
    </div>
  );
};

export default Phase2Define;