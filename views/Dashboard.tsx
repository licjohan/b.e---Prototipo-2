import React from 'react';
import { useProject } from '../context/ProjectContext';
import { Link } from 'react-router-dom';
import { 
  Heart, Target, Lightbulb, Wrench, ClipboardCheck, ArrowRight
} from 'lucide-react';

const Dashboard: React.FC = () => {
  const { project } = useProject();

  if (!project) return null;

  // Calculate rough progress based on filled fields
  const getPhaseProgress = () => {
    let completed = 0;
    const total = 5;
    
    // Phase 1
    const p1 = project.phase1;
    if (p1.thinks && p1.feels && p1.says && p1.does) completed += 1;
    
    // Phase 2
    const p2 = project.phase2;
    if (p2.user && p2.need && p2.insight) completed += 1;

    // Phase 3
    if (project.phase3.length > 0) completed += 1;

    // Phase 4
    if (project.phase4.description) completed += 1;

    // Phase 5
    if (project.phase5.worked && project.phase5.notWorked) completed += 1;

    return Math.round((completed / total) * 100);
  };

  const progress = getPhaseProgress();

  const cards = [
    { title: '1. Empatizar', desc: 'Mapa de Empatía', to: '/phase1', icon: Heart, color: 'text-pink-500', bg: 'bg-pink-50' },
    { title: '2. Definir', desc: 'Problem Statement', to: '/phase2', icon: Target, color: 'text-purple-500', bg: 'bg-purple-50' },
    { title: '3. Idear', desc: 'Brainstorming', to: '/phase3', icon: Lightbulb, color: 'text-yellow-500', bg: 'bg-yellow-50' },
    { title: '4. Prototipar', desc: 'Descripción del MVP', to: '/phase4', icon: Wrench, color: 'text-blue-500', bg: 'bg-blue-50' },
    { title: '5. Testear', desc: 'Matriz de Aprendizaje', to: '/phase5', icon: ClipboardCheck, color: 'text-green-500', bg: 'bg-green-50' },
  ];

  return (
    <div className="max-w-5xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Hola, {project.studentName} 👋</h1>
        <p className="text-gray-600">Continuemos trabajando en tu proyecto: <span className="font-semibold text-brand-600">{project.projectName}</span></p>
      </div>

      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 mb-10">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-700">Progreso General</span>
          <span className="text-sm font-bold text-brand-600">{progress}%</span>
        </div>
        <div className="w-full bg-gray-100 rounded-full h-2.5">
          <div 
            className="bg-brand-600 h-2.5 rounded-full transition-all duration-500" 
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cards.map((card) => (
          <Link 
            key={card.to} 
            to={card.to}
            className="group bg-white rounded-xl border border-gray-200 hover:border-brand-300 hover:shadow-md transition-all p-6 flex flex-col"
          >
            <div className={`w-12 h-12 ${card.bg} ${card.color} rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
              <card.icon size={24} />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-1">{card.title}</h3>
            <p className="text-sm text-gray-500 mb-6">{card.desc}</p>
            <div className="mt-auto flex items-center text-brand-600 font-medium text-sm group-hover:translate-x-1 transition-transform">
              Ir a fase <ArrowRight size={16} className="ml-1" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;