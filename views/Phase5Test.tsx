import React from 'react';
import { useProject } from '../context/ProjectContext';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';

const Phase5Test: React.FC = () => {
  const { project, updatePhase5 } = useProject();

  if (!project) return null;

  const handleChange = (field: keyof typeof project.phase5, value: string) => {
    updatePhase5({ [field]: value });
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
          <span className="bg-green-100 text-green-600 w-8 h-8 rounded-full flex items-center justify-center text-sm">5</span>
          Testear (Matriz de Aprendizaje)
        </h2>
        <p className="text-gray-600 mt-2">
          Después de mostrar tu prototipo a usuarios reales, registra el feedback.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Top Left: + */}
        <div className="bg-white p-6 rounded-xl border-l-4 border-green-500 shadow-sm">
          <div className="flex items-center mb-3 text-green-700 font-semibold">
            <span className="text-xl mr-2">+</span> ¿Qué funcionó?
          </div>
          <textarea
            className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:ring-1 focus:ring-green-500 outline-none h-32 resize-none text-sm"
            placeholder="Cosas que le gustaron al usuario..."
            value={project.phase5.worked}
            onChange={(e) => handleChange('worked', e.target.value)}
          />
        </div>

        {/* Top Right: - */}
        <div className="bg-white p-6 rounded-xl border-l-4 border-red-500 shadow-sm">
          <div className="flex items-center mb-3 text-red-700 font-semibold">
            <span className="text-xl mr-2">-</span> ¿Qué NO funcionó?
          </div>
          <textarea
            className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:ring-1 focus:ring-red-500 outline-none h-32 resize-none text-sm"
            placeholder="Críticas constructivas..."
            value={project.phase5.notWorked}
            onChange={(e) => handleChange('notWorked', e.target.value)}
          />
        </div>

        {/* Bottom Left: ? */}
        <div className="bg-white p-6 rounded-xl border-l-4 border-yellow-500 shadow-sm">
          <div className="flex items-center mb-3 text-yellow-700 font-semibold">
            <span className="text-xl mr-2">?</span> Dudas que surgieron
          </div>
          <textarea
            className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:ring-1 focus:ring-yellow-500 outline-none h-32 resize-none text-sm"
            placeholder="Preguntas que hizo el usuario..."
            value={project.phase5.questions}
            onChange={(e) => handleChange('questions', e.target.value)}
          />
        </div>

        {/* Bottom Right: Bulb */}
        <div className="bg-white p-6 rounded-xl border-l-4 border-blue-500 shadow-sm">
          <div className="flex items-center mb-3 text-blue-700 font-semibold">
            <span className="text-xl mr-2">💡</span> Nuevas Ideas
          </div>
          <textarea
            className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:ring-1 focus:ring-blue-500 outline-none h-32 resize-none text-sm"
            placeholder="Inspiración para la siguiente versión..."
            value={project.phase5.ideas}
            onChange={(e) => handleChange('ideas', e.target.value)}
          />
        </div>
      </div>

      <div className="mt-8 flex justify-end">
        <Link to="/report" className="flex items-center bg-gray-900 text-white px-6 py-2 rounded-lg hover:bg-gray-800 transition-colors">
          <CheckCircle2 size={18} className="mr-2" />
          Ver Reporte Final
          <ArrowRight size={18} className="ml-2" />
        </Link>
      </div>
    </div>
  );
};

export default Phase5Test;