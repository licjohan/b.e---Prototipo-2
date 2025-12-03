import React from 'react';
import { useProject } from '../context/ProjectContext';
import { Printer } from 'lucide-react';

const Report: React.FC = () => {
  const { project } = useProject();

  if (!project) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-4xl mx-auto print:max-w-none print:mx-0">
      <div className="flex justify-between items-center mb-8 print:hidden">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Resumen del Proyecto</h2>
          <p className="text-gray-600">Vista consolidada lista para exportar.</p>
        </div>
        <button 
          onClick={handlePrint}
          className="flex items-center bg-brand-600 text-white px-4 py-2 rounded-lg hover:bg-brand-700 transition-colors"
        >
          <Printer size={18} className="mr-2" />
          Imprimir / Guardar PDF
        </button>
      </div>

      {/* Printable Area */}
      <div className="bg-white p-8 md:p-12 shadow-none md:shadow-lg border border-gray-200 md:border-none print:border-none print:p-0 print:shadow-none">
        
        {/* Header */}
        <div className="border-b-2 border-gray-900 pb-6 mb-8 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-2 font-serif">{project.projectName}</h1>
          <p className="text-lg text-gray-600">Estudiante: {project.studentName}</p>
          <p className="text-sm text-gray-400 mt-2">Generado con b.e - Herramienta de Emprendimiento Escolar</p>
        </div>

        {/* Phase 1 */}
        <section className="mb-8 break-inside-avoid">
          <h3 className="text-lg font-bold uppercase tracking-wider text-pink-600 border-b border-pink-200 mb-4 pb-1">1. Empatía</h3>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="bg-pink-50 p-3 rounded">
              <strong className="block text-pink-800 mb-1">Piensa y Siente:</strong>
              {project.phase1.feels || '-'}
            </div>
            <div className="bg-pink-50 p-3 rounded">
              <strong className="block text-pink-800 mb-1">Ve:</strong>
              {project.phase1.thinks || '-'}
            </div>
            <div className="bg-pink-50 p-3 rounded">
              <strong className="block text-pink-800 mb-1">Dice y Hace:</strong>
              {project.phase1.says || '-'}
            </div>
            <div className="bg-pink-50 p-3 rounded">
              <strong className="block text-pink-800 mb-1">Escucha:</strong>
              {project.phase1.does || '-'}
            </div>
          </div>
        </section>

        {/* Phase 2 */}
        <section className="mb-8 break-inside-avoid">
          <h3 className="text-lg font-bold uppercase tracking-wider text-purple-600 border-b border-purple-200 mb-4 pb-1">2. Definición</h3>
          <div className="bg-purple-50 p-6 rounded-lg text-center">
            <p className="text-xl font-serif italic text-gray-800 leading-relaxed">
              "El <span className="underline decoration-purple-300 font-semibold">{project.phase2.user || '...'}</span> necesita <span className="underline decoration-purple-300 font-semibold">{project.phase2.need || '...'}</span> porque <span className="underline decoration-purple-300 font-semibold">{project.phase2.insight || '...'}</span>."
            </p>
          </div>
        </section>

        {/* Phase 3 */}
        <section className="mb-8 break-inside-avoid">
          <h3 className="text-lg font-bold uppercase tracking-wider text-yellow-600 border-b border-yellow-200 mb-4 pb-1">3. Ideas Destacadas</h3>
          <ul className="list-disc list-inside space-y-1 text-gray-800">
            {project.phase3.filter(i => i.isFavorite).length > 0 ? (
              project.phase3.filter(i => i.isFavorite).map(idea => (
                <li key={idea.id} className="p-2 bg-yellow-50 rounded mb-1">{idea.text}</li>
              ))
            ) : (
              <li className="text-gray-400 italic">No hay ideas marcadas como favoritas.</li>
            )}
          </ul>
        </section>

        {/* Phase 4 */}
        <section className="mb-8 break-inside-avoid">
          <h3 className="text-lg font-bold uppercase tracking-wider text-blue-600 border-b border-blue-200 mb-4 pb-1">4. Prototipo</h3>
          <div className="mb-4">
            <strong className="block text-gray-700 text-sm mb-1">Descripción:</strong>
            <p className="text-gray-800 bg-gray-50 p-3 rounded whitespace-pre-wrap">{project.phase4.description || '-'}</p>
          </div>
          <div>
            <strong className="block text-gray-700 text-sm mb-1">Características:</strong>
            <p className="text-gray-800 bg-gray-50 p-3 rounded whitespace-pre-wrap">{project.phase4.features || '-'}</p>
          </div>
        </section>

        {/* Phase 5 */}
        <section className="break-inside-avoid">
          <h3 className="text-lg font-bold uppercase tracking-wider text-green-600 border-b border-green-200 mb-4 pb-1">5. Test & Aprendizaje</h3>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="border border-green-200 p-3 rounded bg-green-50">
              <strong className="block text-green-800 mb-1">(+) Funcionó:</strong>
              {project.phase5.worked || '-'}
            </div>
            <div className="border border-red-200 p-3 rounded bg-red-50">
              <strong className="block text-red-800 mb-1">(-) No Funcionó:</strong>
              {project.phase5.notWorked || '-'}
            </div>
            <div className="border border-yellow-200 p-3 rounded bg-yellow-50">
              <strong className="block text-yellow-800 mb-1">(?) Dudas:</strong>
              {project.phase5.questions || '-'}
            </div>
            <div className="border border-blue-200 p-3 rounded bg-blue-50">
              <strong className="block text-blue-800 mb-1">Inspiración:</strong>
              {project.phase5.ideas || '-'}
            </div>
          </div>
        </section>

      </div>
    </div>
  );
};

export default Report;