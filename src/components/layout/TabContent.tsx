import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useTabs } from '@/contexts/TabContext';
import Dashboard from '@/pages/Dashboard';
import VesselMaster from '@/pages/masters/VesselMaster';
import UnitMaster from '@/pages/masters/UnitMaster';
import CommandMaster from '@/pages/masters/CommandMaster';
import DockyardMaster from '@/pages/masters/DockyardMaster';
import VesselTypeMaster from '@/pages/masters/VesselTypeMaster';
import ClassOfVesselMaster from '@/pages/masters/ClassOfVesselMaster';
import DamageTypeMaster from '@/pages/masters/DamageTypeMaster';
import SystemsMaster from '@/pages/masters/SystemsMaster';
import EquipmentsMaster from '@/pages/masters/EquipmentsMaster';
import SeveritiesMaster from '@/pages/masters/SeveritiesMaster';
import OperationalStatusMaster from '@/pages/masters/OperationalStatusMaster';
import CompartmentMaster from '@/pages/masters/CompartmentMaster';
import ModuleMaster from '@/pages/masters/ModuleMaster';
import SubModuleMaster from '@/pages/masters/SubModuleMaster';
import ManageUserRoles from '@/pages/users/ManageUserRoles';
import ManageUsers from '@/pages/users/ManageUsers';
import DrawingCanvas from '@/components/drawing/DrawingCanvas';
import { Shield, MapPin, Building, Wrench, Ship, AlertTriangle, Cpu, HardDrive, AlertOctagon, PlayCircle, Package, Box, Layers3, UserCheck } from 'lucide-react';
import HvacTrialForm from '@/pages/HvacTrialForm';
import DockingPlan from '@/pages/DockingPlan';
import QuarterlyHullSurvey from '@/pages/QuarterlyHullSurvey';
import Reports from '@/pages/Reports';

// Import all the placeholder components
const DockyardPlans = () => <div className="p-6"><h1 className="text-2xl font-bold">Dockyard Plan Approval</h1><p>Coming soon...</p></div>;
const DrawingCanvasPlaceholder = () => <div className="p-6"><h1 className="text-2xl font-bold">Interactive Drawing</h1><p>Coming soon...</p></div>;
const Surveys = () => <div className="p-6"><h1 className="text-2xl font-bold">Quarterly Hull Survey</h1><p>Coming soon...</p></div>;
// Reports component is now imported from @/pages/Reports
const Users = () => <div className="p-6"><h1 className="text-2xl font-bold">Users & Roles</h1><p>Coming soon...</p></div>;
const Settings = () => <div className="p-6"><h1 className="text-2xl font-bold">Settings</h1><p>Coming soon...</p></div>;
const Units = () => <div className="p-6"><h1 className="text-2xl font-bold">Units</h1><p>Coming soon...</p></div>;
const Commands = () => <div className="p-6"><h1 className="text-2xl font-bold">Commands</h1><p>Coming soon...</p></div>;
const Dockyards = () => <div className="p-6"><h1 className="text-2xl font-bold">Dockyards</h1><p>Coming soon...</p></div>;
const VesselTypes = () => <div className="p-6"><h1 className="text-2xl font-bold">Vessel Types</h1><p>Coming soon...</p></div>;
const ClassOfVessels = () => <div className="p-6"><h1 className="text-2xl font-bold">Class of Vessels</h1><p>Coming soon...</p></div>;
const DamageTypes = () => <div className="p-6"><h1 className="text-2xl font-bold">Damage Types</h1><p>Coming soon...</p></div>;

// Global Masters submenu items
const globalMastersItems = [
  { title: 'Units', url: '/masters/units', icon: Shield },
  { title: 'Commands', url: '/masters/commands', icon: MapPin },
  { title: 'Dockyards', url: '/masters/dockyards', icon: Building },
  { title: 'Vessel Types', url: '/masters/vessel-types', icon: Wrench },
  { title: 'Class of Vessels', url: '/masters/class-of-vessels', icon: Ship },
  { title: 'Vessels', url: '/masters/vessels', icon: Ship },
  { title: 'Damage Types', url: '/masters/damage-types', icon: AlertTriangle },
  { title: 'Systems', url: '/masters/systems', icon: Cpu },
  { title: 'Equipments', url: '/masters/equipments', icon: HardDrive },
  { title: 'Severities', url: '/masters/severities', icon: AlertOctagon },
  { title: 'Operational Status', url: '/masters/operationalstatuses', icon: PlayCircle },
  { title: 'Compartments', url: '/masters/compartments', icon: Package },
  { title: 'Modules', url: '/masters/modules', icon: Box },
  { title: 'Sub-Modules', url: '/masters/sub-modules', icon: Layers3 },
];

// Users & Roles submenu items
const usersRolesItems = [
  { title: 'Manage Users', url: '/users/manage-users', icon: Users },
  { title: 'Manage Roles', url: '/users/manage-roles', icon: UserCheck },
];

const componentMap: Record<string, React.ComponentType> = {
  '/dashboards': Dashboard,
  '/dockyard-plans': DockingPlan,
  '/surveys': QuarterlyHullSurvey,
  '/reports': Reports,
  '/users/manage-users': ManageUsers,
  '/users/manage-roles': ManageUserRoles,
  '/drawing': DrawingCanvas,
  '/hvac-trial': HvacTrialForm, 
  '/masters/units': UnitMaster,
  '/masters/commands': CommandMaster,
  '/masters/dockyards': DockyardMaster,
  '/masters/vessel-types': VesselTypeMaster,
  '/masters/class-of-vessels': ClassOfVesselMaster,
  '/masters/vessels': VesselMaster,
  '/masters/damage-types': DamageTypeMaster,
  '/masters/systems': SystemsMaster,
  '/masters/equipments': EquipmentsMaster,
  '/masters/severities': SeveritiesMaster,
  '/masters/operationalstatuses': OperationalStatusMaster,
  '/masters/compartments': CompartmentMaster,
  '/masters/modules': ModuleMaster,
  '/masters/sub-modules': SubModuleMaster,
};

// Wrapper component for master pages that includes Global Masters tabs
const MasterPageWrapper = ({ children, currentPage }: { children: React.ReactNode, currentPage: string }) => {
  const { addTab } = useTabs();
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedTab, setSelectedTab] = useState(currentPage);

  // Sync selected tab with current URL
  useEffect(() => {
    const currentPath = location.pathname;
    const tabKey = currentPath.split('/').pop() || 'units';
    setSelectedTab(tabKey);
  }, [location.pathname]);

  const handleTabClick = (item: typeof globalMastersItems[0]) => {
    const tabKey = item.url.split('/').pop() || 'units';
    setSelectedTab(tabKey);
    
    // Navigate to the URL
    navigate(item.url);
    
    // Add tab for the URL
    addTab({
      id: item.url,
      title: item.title,
      url: item.url,
      icon: item.icon
    });
  };

  return (
    <div className="p-6">
      {/* Tab Navigation with Fixed Container and Horizontal Scroll */}
      <div className="mb-6 border-b border-border">
        <div className="overflow-x-auto">
          <div className="flex gap-2 min-w-max pb-2">
            {globalMastersItems.map((item) => {
              const tabKey = item.url.split('/').pop() || 'units';
              const isActive = selectedTab === tabKey;
              
              return (
                <button
                  key={item.url}
                  onClick={() => handleTabClick(item)}
                  className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors whitespace-nowrap flex-shrink-0 ${
                    isActive
                      ? 'border-[#00809D] text-[#00809D] bg-[#00809D]/5'
                      : 'border-transparent text-muted-foreground hover:text-foreground hover:border-muted-foreground'
                  }`}
                >
                  {item.title}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Tab Content */}
      <div className="mt-4">
        {children}
      </div>
    </div>
  );
};

// Wrapper component for Users & Roles pages that includes Users & Roles tabs
const UsersRolesPageWrapper = ({ children, currentPage }: { children: React.ReactNode, currentPage: string }) => {
  const { addTab } = useTabs();
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedTab, setSelectedTab] = useState(currentPage);

  // Sync selected tab with current URL
  useEffect(() => {
    const currentPath = location.pathname;
    const tabKey = currentPath.split('/').pop() || 'manage-users';
    setSelectedTab(tabKey);
  }, [location.pathname]);

  const handleTabClick = (item: typeof usersRolesItems[0]) => {
    const tabKey = item.url.split('/').pop() || 'manage-users';
    setSelectedTab(tabKey);
    
    // Navigate to the URL
    navigate(item.url);
    
    // Add tab for the URL
    addTab({
      id: item.url,
      title: item.title,
      url: item.url,
      icon: item.icon
    });
  };

  return (
    <div className="p-6">
      {/* Tab Navigation with Fixed Container and Horizontal Scroll */}
      <div className="mb-6 border-b border-border">
        <div className="overflow-x-auto">
          <div className="flex gap-2 min-w-max pb-2">
            {usersRolesItems.map((item) => {
              const tabKey = item.url.split('/').pop() || 'manage-users';
              const isActive = selectedTab === tabKey;
              
              return (
                <button
                  key={item.url}
                  onClick={() => handleTabClick(item)}
                  className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors whitespace-nowrap flex-shrink-0 ${
                    isActive
                      ? 'border-[#00809D] text-[#00809D] bg-[#00809D]/5'
                      : 'border-transparent text-muted-foreground hover:text-foreground hover:border-muted-foreground'
                  }`}
                >
                  {item.title}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Tab Content */}
      <div className="mt-4">
        {children}
      </div>
    </div>
  );
};

export function TabContent() {
  const { activeTab, tabs, addTab, setActiveTab } = useTabs();
  const location = useLocation();
  const navigate = useNavigate();
  
  // Get current URL path
  const currentPath = location.pathname;
  
  // Effect to handle URL changes and sync with tab system
  useEffect(() => {
    // If we have a valid path and it's not already in tabs, add it
    if (currentPath && currentPath !== '/') {
      const existingTab = tabs.find(tab => tab.url === currentPath);
      
      if (!existingTab) {
        // Find the component for this path
        const Component = componentMap[currentPath];
        if (Component) {
          // Create tab data based on the path
          let tabData = {
            id: currentPath,
            title: getTitleFromPath(currentPath),
            url: currentPath,
            icon: getIconFromPath(currentPath)
          };
          
          addTab(tabData);
        }
      } else {
        // Set the existing tab as active
        setActiveTab(currentPath);
      }
    }
  }, [currentPath, tabs, addTab, setActiveTab]);
  
  // If no active tab or no tabs, show welcome message
  if (!activeTab || tabs.length === 0) {
    return (
      <div className="flex items-center justify-center h-full bg-muted/20">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-muted-foreground mb-2">Welcome to Hull Insight</h2>
          <p className="text-muted-foreground">Select a menu item to get started</p>
        </div>
      </div>
    );
  }

  // Use current path to determine which component to render
  const Component = componentMap[currentPath];
  if (!Component) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-muted-foreground mb-2">Page Not Found</h2>
          <p className="text-muted-foreground">The requested page could not be found</p>
        </div>
      </div>
    );
  }

  // Check if this is a master page that should show Global Masters tabs
  const isMasterPage = currentPath.startsWith('/masters/');
  
  // Check if this is a users & roles page that should show Users & Roles tabs
  const isUsersRolesPage = currentPath.startsWith('/users/');
  
  if (isMasterPage) {
    const currentPage = currentPath.split('/').pop() || 'units';
    return (
      <MasterPageWrapper currentPage={currentPage}>
        <Component />
      </MasterPageWrapper>
    );
  }
  
  if (isUsersRolesPage) {
    const currentPage = currentPath.split('/').pop() || 'manage-users';
    return (
      <UsersRolesPageWrapper currentPage={currentPage}>
        <Component />
      </UsersRolesPageWrapper>
    );
  }

  return <Component />;
}

// Helper function to get title from path
function getTitleFromPath(path: string): string {
  const pathMap: Record<string, string> = {
    '/dashboards': 'Dashboard',
    '/dockyard-plans': 'Dockyard Plans',
    '/surveys': 'Quarterly Hull Survey',
    '/reports': 'Reports',
    '/hvac-trial': 'HVAC Trial',
    '/drawing': 'Interactive Drawing',
    '/masters/units': 'Units',
    '/masters/commands': 'Commands',
    '/masters/dockyards': 'Dockyards',
    '/masters/vessel-types': 'Vessel Types',
    '/masters/class-of-vessels': 'Class of Vessels',
    '/masters/vessels': 'Vessels',
    '/masters/damage-types': 'Damage Types',
    '/masters/systems': 'Systems',
    '/masters/equipments': 'Equipments',
    '/masters/severities': 'Severities',
    '/masters/operationalstatuses': 'Operational Status',
    '/masters/compartments': 'Compartments',
    '/masters/modules': 'Modules',
    '/masters/sub-modules': 'Sub-Modules',
    '/users/manage-users': 'Manage Users',
    '/users/manage-roles': 'Manage Roles'
  };
  
  return pathMap[path] || path.split('/').pop() || 'Page';
}

// Helper function to get icon from path
function getIconFromPath(path: string): React.ComponentType<{ className?: string }> {
  // Return a default icon component - you can customize this based on your needs
  return () => <div className="w-4 h-4" />;
}
