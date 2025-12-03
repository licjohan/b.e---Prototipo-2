import React from 'react';
import { useProject } from '../context/ProjectContext';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Phase1Empathize: React.FC = () => {
  const { project, updatePhase1 } = useProject();

  if (!project) return null;

  const handleChange = (field: keyof typeof project.phase1, value: string) => {
    updatePhase1({ [field]: value });
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
          <span className="bg-pink-100 text-pink-600 w-8 h-8 rounded-full flex items-center justify-center text-sm">1</span>
          Mapa de Empatía
        </h2>
        <p className="text-gray-600 mt-2">
          Entiende a tu usuario ideal. ¿Qué pasa por su mente?
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <label className="block text-sm font-semibold text-gray-700 mb-2">¿Qué Piensa y Siente?</label>
          <p className="text-xs text-gray-500 mb-3">Lo que realmente le importa, sus preocupaciones y aspiraciones.</p>
          <textarea
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 outline-none h-32 resize-none"
            placeholder="Escribe aquí..."
            value={project.phase1.feels}
            onChange={(e) => handleChange('feels', e.target.value)}
          />
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <label className="block text-sm font-semibold text-gray-700 mb-2">¿Qué Ve?</label>
          <p className="text-xs text-gray-500 mb-3">Su entorno, sus amigos, lo que el mercado le ofrece.</p>
          <textarea
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 outline-none h-32 resize-none"
            placeholder="Escribe aquí..."
            value={project.phase1.thinks} // Using 'thinks' to map to 'sees/environment' for simplicity of MVP struct provided
            onChange={(e) => handleChange('thinks', e.target.value)}
          />
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <label className="block text-sm font-semibold text-gray-700 mb-2">¿Qué Dice y Hace?</label>
          <p className="text-xs text-gray-500 mb-3">Su actitud en público, aspecto, comportamiento.</p>
          <textarea
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 outline-none h-32 resize-none"
            placeholder="Escribe aquí..."
            value={project.phase1.says}
            onChange={(e) => handleChange('says', e.target.value)}
          />
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <label className="block text-sm font-semibold text-gray-700 mb-2">¿Qué Escucha?</label>
          <p className="text-xs text-gray-500 mb-3">Lo que dicen amigos, jefe, influencias.</p>
          <textarea
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 outline-none h-32 resize-none"
            placeholder="Escribe aquí..."
            value={project.phase1.does} // Mapping 'does' field to 'hears' context for 4-quadrant layout visual balance
            onChange={(e) => handleChange('does', e.target.value)}
          />
        </div>
      </div>

      <div className="mt-8 flex justify-end">
        <Link to="/phase2" className="flex items-center bg-brand-600 text-white px-6 py-2 rounded-lg hover:bg-brand-700 transition-colors">
          Siguiente: Definir <ArrowRight size={18} className="ml-2" />
        </Link>
      </div>
    </div>
  );
};

export default Phase1Empathize;