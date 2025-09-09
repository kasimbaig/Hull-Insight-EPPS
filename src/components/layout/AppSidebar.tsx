import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useTabs } from '@/contexts/TabContext';
import {
  Ship,
  Users,
  FileText,
  BarChart3,
  Settings,
  Layers,
  ShieldCheck,
  MapPin,
  Activity,
  ChevronRight,
  Anchor,
  Compass,
  AlertTriangle,
  Wrench,
  Building,
  Shield,
  AlertCircle,
  Cpu,
  HardDrive,
  AlertOctagon,
  PlayCircle,
  Package,
  Box,
  Layers3,
} from 'lucide-react';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarHeader,
  useSidebar,
  SidebarTrigger,
} from '@/components/ui/sidebar';

// Define the structure for menu items, including grouping
interface MenuItem {
  title: string;
  url?: string;
  icon: React.ComponentType<{ className?: string }>;
  children?: MenuItem[];
  group?: string; // Add a group property
  permission?: { module: string; action: string };
}

// Define the master items separately as in the target code
const masterItems: MenuItem[] = [
  { title: 'Units', url: '/masters/units', icon: Shield, permission: { module: 'Global Masters', action: 'view' } },
  { title: 'Commands', url: '/masters/commands', icon: MapPin, permission: { module: 'Global Masters', action: 'view' } },
  { title: 'Dockyards', url: '/masters/dockyards', icon: Building, permission: { module: 'Global Masters', action: 'view' } },
  { title: 'Vessel Types', url: '/masters/vessel-types', icon: Wrench, permission: { module: 'Global Masters', action: 'view' } },
  { title: 'Class of Vessels', url: '/masters/class-of-vessels', icon: Ship, permission: { module: 'Global Masters', action: 'view' } },
  { title: 'Vessels', url: '/masters/vessels', icon: Ship, permission: { module: 'Global Masters', action: 'view' } },
  { title: 'Damage Types', url: '/masters/damage-types', icon: AlertTriangle, permission: { module: 'Global Masters', action: 'view' } },
  { title: 'Systems', url: '/masters/systems', icon: Cpu, permission: { module: 'Global Masters', action: 'view' } },
  { title: 'Equipments', url: '/masters/equipments', icon: HardDrive, permission: { module: 'Global Masters', action: 'view' } },
  { title: 'Severities', url: '/masters/severities', icon: AlertOctagon, permission: { module: 'Global Masters', action: 'view' } },
  { title: 'Operational Status', url: '/masters/operationalstatuses', icon: PlayCircle, permission: { module: 'Global Masters', action: 'view' } },
  { title: 'Compartments', url: '/masters/compartments', icon: Package, permission: { module: 'Global Masters', action: 'view' } },
  { title: 'Modules', url: '/masters/modules', icon: Box, permission: { module: 'Global Masters', action: 'view' } },
  { title: 'Sub-Modules', url: '/masters/sub-modules', icon: Layers3, permission: { module: 'Global Masters', action: 'view' } },
];

const navigationItems: MenuItem[] = [
  {
    title: 'Dashboards',
    url: '/dashboards',
    icon: BarChart3,
    group: 'Main',
    permission: { module: 'Reports', action: 'view' }
  },
  {
    title: 'Dockyard Plan Approval',
    url: '/dockyard-plans',
    icon: Anchor,
    group: 'Operations',
    permission: { module: 'Dockyard Plan', action: 'view' }
  },
  {
    title: 'Quarterly Hull Survey',
    url: '/surveys',
    icon: Compass,
    group: 'Operations',
    permission: { module: 'Survey', action: 'view' }
  },
  {
    title: 'Hvac Trial',
    url: '/hvac-trial',
    icon: Activity,
    group: 'Operations',
    permission: { module: 'Hvac Trial', action: 'view' }
  },
  {
    title: 'Interactive Drawing',
    url: '/drawing',
    icon: Layers,
    group: 'Operations',
    permission: { module: 'Drawing', action: 'view' }
  },
  {
    title: 'Reports',
    url: '/reports',
    icon: FileText,
    group: 'Analytics',
    permission: { module: 'Reports', action: 'view' }
  },
];

// Group navigation items based on the 'group' property
const groupedItems = navigationItems.reduce((acc, item) => {
  if (!acc[item.group!]) {
    acc[item.group!] = [];
  }
  acc[item.group!].push(item);
  return acc;
}, {} as Record<string, MenuItem[]>);

export function AppSidebar() {
  const { state } = useSidebar();
  const { addTab, activeTab } = useTabs();
  const navigate = useNavigate();
  const location = useLocation();
  const collapsed = state === 'collapsed';

  // Force the sidebar to always be visible with custom width
  const sidebarWidth = collapsed ? '80px' : '288px';

  // Load default tab on component mount only if user is authenticated
  useEffect(() => {
    if (activeTab === '' && location.pathname !== '/') {
      // Add dashboard as default tab only if not on login page
      addTab({
        id: '/dashboards',
        title: 'Dashboards',
        url: '/dashboards',
        icon: BarChart3
      });
    }
  }, [activeTab, addTab, location.pathname]);

  // Determine if a link is active based on current URL
  const isActive = (path: string) => location.pathname === path;

  // Determine if the masters group is active
  const isMasterGroupActive = () => location.pathname.startsWith('/masters');
  
  // Determine if the users group is active
  const isUsersGroupActive = () => location.pathname.startsWith('/users');

  // Handle menu item click - navigate to URL and add tab
  const handleMenuClick = (item: MenuItem) => {
    if (item.url) {
      // Navigate to the URL
      navigate(item.url);
      
      // Add tab for the URL
      addTab({
        id: item.url,
        title: item.title,
        url: item.url,
        icon: item.icon
      });
    }
  };

  const getNavClassName = (active: boolean) =>
    active
      ? 'bg-white/20 text-white font-semibold rounded-lg mx-2 border-l-4 border-white'
      : 'text-white/70 hover:bg-white/10 hover:text-white rounded-lg mx-2 transition-all duration-200';

  // Filter menu items based on user permissions (simplified for now)
  const filterByPermission = (items: MenuItem[]) => {
    return items; // For now, return all items
  };

  const filteredMasterItems = filterByPermission(masterItems);
  const filteredGroupedItems = Object.fromEntries(
    Object.entries(groupedItems).map(([groupName, items]) => [
      groupName,
      filterByPermission(items)
    ])
  );

  return (
    <div 
      className={`shadow-xl transition-all duration-300 flex-shrink-0 bg-[#8B3A3A] h-screen flex flex-col`}
      style={{ width: sidebarWidth }}
    >
      <div className={`${collapsed ? 'p-2' : 'p-6'} border-b border-sidebar-border bg-[#8B3A3A] relative`}>
        <div className={`flex items-center ${collapsed ? 'justify-between' : 'gap-3'}`}>
          <div className={`${collapsed ? 'w-8 h-8' : 'w-10 h-10'} bg-gradient-to-br from-primary to-primary/80 rounded-xl flex items-center justify-center shadow-md`}>
            <Ship className={`${collapsed ? 'w-5 h-5' : 'w-6 h-6'} text-white`} />
          </div>
          {!collapsed && (
            <div className="flex-1">
              <h2 className="text-xl font-bold text-white">Hull Insight</h2>
              <p className="text-sm text-white/80 font-medium">Naval Management</p>
            </div>
          )}
          {/* Collapse/Expand Button */}
          <SidebarTrigger className={`${collapsed ? 'h-6 w-6' : 'h-8 w-8'} p-0 hover:bg-white/20 rounded-lg transition-colors`}>
            <ChevronRight className={`${collapsed ? 'h-3 w-3' : 'h-4 w-4'} text-white transition-transform duration-200 ${collapsed ? 'rotate-0' : 'rotate-180'}`} />
          </SidebarTrigger>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto py-4">
        {/* Main/Dashboard Group */}
        {filteredGroupedItems['Main']?.length > 0 && (
          <div className="mb-4">
            <div>
              <div className="space-y-1">
                {filteredGroupedItems['Main'].map(item => (
                  <div key={item.title} className={`${collapsed ? 'px-1' : 'px-2'}`}>
                    <button
                      onClick={() => handleMenuClick(item)}
                      className={`${getNavClassName(isActive(item.url!))} flex items-center ${collapsed ? 'justify-center' : 'gap-3'} w-full ${collapsed ? 'py-2 px-1' : 'py-3 px-4'} rounded-lg`}
                      title={collapsed ? item.title : undefined}
                    >
                      <div className={`${collapsed ? 'p-1' : 'p-1.5'} rounded-lg ${isActive(item.url!) ? 'bg-white/30' : 'bg-white/10'}`}>
                        <item.icon className={`${collapsed ? 'w-4 h-4' : 'w-5 h-5'} flex-shrink-0 text-white`} />
                      </div>
                      {!collapsed && <span className="font-medium">{item.title}</span>}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Global Masters - Single Click */}
        {filteredMasterItems.length > 0 && (
          <div className="mb-4">
            <div>
              <div className="space-y-1">
                <div className={`${collapsed ? 'px-1' : 'px-2'}`}>
                  <button
                    onClick={() => handleMenuClick({ title: 'Global Masters', url: '/masters/units', icon: Shield })}
                    className={`${getNavClassName(isMasterGroupActive())} flex items-center ${collapsed ? 'justify-center' : 'gap-3'} w-full ${collapsed ? 'py-2 px-1' : 'py-3 px-4'} rounded-lg transition-all duration-200`}
                    title={collapsed ? 'Global Masters' : undefined}
                  >
                    <div className={`${collapsed ? 'p-1' : 'p-1.5'} rounded-lg ${isMasterGroupActive() ? 'bg-white/30' : 'bg-white/10'}`}>
                      <Shield className={`${collapsed ? 'w-4 h-4' : 'w-5 h-5'} flex-shrink-0 text-white`} />
                    </div>
                    {!collapsed && (
                      <span className="font-medium">Global Masters</span>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Users & Roles - Single Click */}
        <div className="mb-4">
          <div>
            <div className="space-y-1">
              <div className={`${collapsed ? 'px-1' : 'px-2'}`}>
                <button
                  onClick={() => handleMenuClick({ title: 'Users & Roles', url: '/users/manage-users', icon: Users })}
                  className={`${getNavClassName(isUsersGroupActive())} flex items-center ${collapsed ? 'justify-center' : 'gap-3'} w-full ${collapsed ? 'py-2 px-1' : 'py-3 px-4'} rounded-lg transition-all duration-200`}
                  title={collapsed ? 'Users & Roles' : undefined}
                >
                  <div className={`${collapsed ? 'p-1' : 'p-1.5'} rounded-lg ${isUsersGroupActive() ? 'bg-white/30' : 'bg-white/10'}`}>
                    <Users className={`${collapsed ? 'w-4 h-4' : 'w-5 h-5'} flex-shrink-0 text-white`} />
                  </div>
                  {!collapsed && (
                    <span className="font-medium">Users & Roles</span>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Other Navigation Groups */}
        {Object.entries(filteredGroupedItems).map(([groupName, items]) => {
          if (groupName !== 'Main' && items.length > 0) {
            return (
              <div key={groupName} className="mb-4">
                <div>
                  <div className="space-y-1">
                    {items.map((item) => (
                      <div key={item.title} className={`${collapsed ? 'px-1' : 'px-2'}`}>
                        <button
                          onClick={() => handleMenuClick(item)}
                          className={`${getNavClassName(isActive(item.url!))} flex items-center ${collapsed ? 'justify-center' : 'gap-3'} w-full ${collapsed ? 'py-2 px-1' : 'py-3 px-4'} rounded-lg`}
                          title={collapsed ? item.title : undefined}
                        >
                          <div className={`${collapsed ? 'p-1' : 'p-1.5'} rounded-lg ${isActive(item.url!) ? 'bg-white/30' : 'bg-white/10'}`}>
                            <item.icon className={`${collapsed ? 'w-4 h-4' : 'w-5 h-5'} flex-shrink-0 text-white`} />
                          </div>
                          {!collapsed && <span className="font-medium">{item.title}</span>}
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          }
          return null;
        })}
      </div>
    </div>
  );
}