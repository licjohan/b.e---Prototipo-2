import React from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ProjectProvider, useProject } from './context/ProjectContext';
import Layout from './components/Layout';
import Auth from './views/Auth';
import Dashboard from './views/Dashboard';
import Phase1Empathize from './views/Phase1Empathize';
import Phase2Define from './views/Phase2Define';
import Phase3Ideate from './views/Phase3Ideate';
import Phase4Prototype from './views/Phase4Prototype';
import Phase5Test from './views/Phase5Test';
import Report from './views/Report';

// Protected Route Wrapper
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useProject();
  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }
  return <>{children}</>;
};

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Auth />} />
      
      <Route element={
        <ProtectedRoute>
          <Layout />
        </ProtectedRoute>
      }>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/phase1" element={<Phase1Empathize />} />
        <Route path="/phase2" element={<Phase2Define />} />
        <Route path="/phase3" element={<Phase3Ideate />} />
        <Route path="/phase4" element={<Phase4Prototype />} />
        <Route path="/phase5" element={<Phase5Test />} />
        <Route path="/report" element={<Report />} />
      </Route>
    </Routes>
  );
};

const App: React.FC = () => {
  return (
    <ProjectProvider>
      <Router>
        <AppRoutes />
      </Router>
    </ProjectProvider>
  );
};

export default App;