import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { ProjectData, Idea } from '../types';

// Initial Empty State
const initialProjectState: ProjectData = {
  id: '',
  studentName: '',
  projectName: '',
  createdAt: '',
  phase1: { thinks: '', feels: '', says: '', does: '' },
  phase2: { user: '', need: '', insight: '' },
  phase3: [],
  phase4: { description: '', features: '' },
  phase5: { worked: '', notWorked: '', questions: '', ideas: '' }
};

interface ProjectContextType {
  project: ProjectData | null;
  isAuthenticated: boolean;
  login: (studentName: string, projectName: string) => void;
  logout: () => void;
  updatePhase1: (data: Partial<ProjectData['phase1']>) => void;
  updatePhase2: (data: Partial<ProjectData['phase2']>) => void;
  addIdea: (text: string) => void;
  toggleIdeaFavorite: (id: string) => void;
  removeIdea: (id: string) => void;
  updatePhase4: (data: Partial<ProjectData['phase4']>) => void;
  updatePhase5: (data: Partial<ProjectData['phase5']>) => void;
}

const ProjectContext = createContext<ProjectContextType | undefined>(undefined);

export const ProjectProvider = ({ children }: { children: ReactNode }) => {
  const [project, setProject] = useState<ProjectData | null>(null);

  // Load from LocalStorage on mount to simulate persistence
  useEffect(() => {
    const saved = localStorage.getItem('be_project_mvp');
    if (saved) {
      try {
        setProject(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse saved project", e);
      }
    }
  }, []);

  // Save to LocalStorage whenever project changes
  useEffect(() => {
    if (project) {
      localStorage.setItem('be_project_mvp', JSON.stringify(project));
    } else {
      localStorage.removeItem('be_project_mvp');
    }
  }, [project]);

  const login = (studentName: string, projectName: string) => {
    // If a project exists in LS, we might want to check name, but for MVP we just overwrite or load
    // For this MVP, let's create a new one if it's null, or update names if exists
    setProject(prev => {
      if (prev) return { ...prev, studentName, projectName };
      return {
        ...initialProjectState,
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
        studentName,
        projectName
      };
    });
  };

  const logout = () => {
    setProject(null);
  };

  const updatePhase1 = (data: Partial<ProjectData['phase1']>) => {
    setProject(prev => prev ? ({ ...prev, phase1: { ...prev.phase1, ...data } }) : null);
  };

  const updatePhase2 = (data: Partial<ProjectData['phase2']>) => {
    setProject(prev => prev ? ({ ...prev, phase2: { ...prev.phase2, ...data } }) : null);
  };

  const addIdea = (text: string) => {
    setProject(prev => {
      if (!prev) return null;
      const newIdea: Idea = { id: Date.now().toString(), text, isFavorite: false };
      return { ...prev, phase3: [...prev.phase3, newIdea] };
    });
  };

  const toggleIdeaFavorite = (id: string) => {
    setProject(prev => {
      if (!prev) return null;
      return {
        ...prev,
        phase3: prev.phase3.map(idea => 
          idea.id === id ? { ...idea, isFavorite: !idea.isFavorite } : idea
        )
      };
    });
  };

  const removeIdea = (id: string) => {
    setProject(prev => prev ? ({ ...prev, phase3: prev.phase3.filter(i => i.id !== id) }) : null);
  };

  const updatePhase4 = (data: Partial<ProjectData['phase4']>) => {
    setProject(prev => prev ? ({ ...prev, phase4: { ...prev.phase4, ...data } }) : null);
  };

  const updatePhase5 = (data: Partial<ProjectData['phase5']>) => {
    setProject(prev => prev ? ({ ...prev, phase5: { ...prev.phase5, ...data } }) : null);
  };

  return (
    <ProjectContext.Provider value={{
      project,
      isAuthenticated: !!project,
      login,
      logout,
      updatePhase1,
      updatePhase2,
      addIdea,
      toggleIdeaFavorite,
      removeIdea,
      updatePhase4,
      updatePhase5
    }}>
      {children}
    </ProjectContext.Provider>
  );
};

export const useProject = () => {
  const context = useContext(ProjectContext);
  if (!context) throw new Error("useProject must be used within ProjectProvider");
  return context;
};