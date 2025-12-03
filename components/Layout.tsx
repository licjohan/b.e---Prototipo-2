import React from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useProject } from '../context/ProjectContext';
import { 
  LayoutDashboard, 
  Heart, 
  Target, 
  Lightbulb, 
  Wrench, 
  ClipboardCheck, 
  FileText, 
  LogOut,
  Menu,
  X
} from 'lucide-react';

const Layout: React.FC = () => {
  const { project, logout } = useProject();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  if (!project) return null;

  const navItems = [
    { to: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { to: '/phase1', icon: Heart, label: '1. Empatizar' },
    { to: '/phase2', icon: Target, label: '2. Definir' },
    { to: '/phase3', icon: Lightbulb, label: '3. Idear' },
    { to: '/phase4', icon: Wrench, label: '4. Prototipar' },
    { to: '/phase5', icon: ClipboardCheck, label: '5. Testear' },
    { to: '/report', icon: FileText, label: 'Reporte Final' },
  ];

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {/* Sidebar - Hidden on print */}
      <aside className={`
        print:hidden
        fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 transform transition-transform duration-300 ease-in-out
        md:relative md:translate-x-0
        ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="flex flex-col h-full">
          <div className="h-16 flex items-center justify-between px-6 border-b border-gray-100">
            <span className="text-xl font-bold text-brand-600">b.e</span>
            <button 
              className="md:hidden text-gray-500"
              onClick={() => setMobileMenuOpen(false)}
            >
              <X size={24} />
            </button>
          </div>

          <div className="p-4 border-b border-gray-100 bg-gray-50">
            <h3 className="font-semibold text-gray-800 truncate">{project.projectName}</h3>
            <p className="text-sm text-gray-500 truncate">{project.studentName}</p>
          </div>

          <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                onClick={() => setMobileMenuOpen(false)}
                className={({ isActive }) => `
                  flex items-center px-3 py-2.5 rounded-lg text-sm font-medium transition-colors
                  ${isActive 
                    ? 'bg-brand-50 text-brand-700' 
                    : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'}
                `}
              >
                <item.icon size={18} className="mr-3 flex-shrink-0" />
                {item.label}
              </NavLink>
            ))}
          </nav>

          <div className="p-4 border-t border-gray-200">
            <button
              onClick={handleLogout}
              className="flex items-center w-full px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            >
              <LogOut size={18} className="mr-3" />
              Cerrar Sesión
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Mobile Header - Hidden on print */}
        <header className="print:hidden md:hidden h-16 flex items-center px-4 bg-white border-b border-gray-200">
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="text-gray-500 hover:text-gray-700 focus:outline-none"
          >
            <Menu size={24} />
          </button>
          <span className="ml-4 font-bold text-gray-900">b.e Emprendimiento</span>
        </header>

        <main className="flex-1 overflow-auto p-4 md:p-8 print:p-0 print:overflow-visible">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;