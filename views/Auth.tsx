import React, { useState } from 'react';
import { useProject } from '../context/ProjectContext';
import { useNavigate } from 'react-router-dom';
import { Rocket } from 'lucide-react';

const Auth: React.FC = () => {
  const [studentName, setStudentName] = useState('');
  const [projectName, setProjectName] = useState('');
  const { login } = useProject();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (studentName.trim() && projectName.trim()) {
      login(studentName, projectName);
      navigate('/dashboard');
    }
  };

  return (
    <div className="min-h-screen bg-brand-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-8">
        <div className="flex flex-col items-center mb-8">
          <div className="w-16 h-16 bg-brand-100 rounded-full flex items-center justify-center text-brand-600 mb-4">
            <Rocket size={32} />
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Bienvenido a b.e</h1>
          <p className="text-gray-500 text-center mt-2">Plataforma de Emprendimiento Escolar</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="studentName" className="block text-sm font-medium text-gray-700 mb-1">
              Nombre del Estudiante
            </label>
            <input
              type="text"
              id="studentName"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition-all"
              placeholder="Ej. Ana García"
              value={studentName}
              onChange={(e) => setStudentName(e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="projectName" className="block text-sm font-medium text-gray-700 mb-1">
              Nombre del Proyecto
            </label>
            <input
              type="text"
              id="projectName"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition-all"
              placeholder="Ej. Mochila Solar"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-brand-600 hover:bg-brand-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors shadow-sm"
          >
            Comenzar Proyecto
          </button>
        </form>
      </div>
    </div>
  );
};

export default Auth;