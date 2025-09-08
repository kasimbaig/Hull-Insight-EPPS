import React, { createContext, useContext, useState, ReactNode } from 'react';

interface Tab {
  id: string;
  title: string;
  url: string;
  icon?: React.ComponentType<{ className?: string }>;
}

interface TabContextType {
  tabs: Tab[];
  activeTab: string;
  addTab: (tab: Tab) => void;
  removeTab: (tabId: string) => void;
  setActiveTab: (tabId: string) => void;
  clearTabs: () => void;
}

const TabContext = createContext<TabContextType | undefined>(undefined);

export function TabProvider({ children }: { children: ReactNode }) {
  const [tabs, setTabs] = useState<Tab[]>([]);
  const [activeTab, setActiveTab] = useState<string>('');

  const addTab = (tab: Tab) => {
    setTabs(prevTabs => {
      // Check if tab already exists
      const existingTab = prevTabs.find(t => t.id === tab.id);
      if (existingTab) {
        setActiveTab(tab.id);
        return prevTabs;
      }
      
      // Add new tab and set as active
      const newTabs = [...prevTabs, tab];
      setActiveTab(tab.id);
      return newTabs;
    });
  };

  const removeTab = (tabId: string) => {
    setTabs(prevTabs => {
      const newTabs = prevTabs.filter(tab => tab.id !== tabId);
      
      // If we're removing the active tab, set a new active tab
      if (activeTab === tabId) {
        if (newTabs.length > 0) {
          setActiveTab(newTabs[newTabs.length - 1].id);
        } else {
          setActiveTab('');
        }
      }
      
      return newTabs;
    });
  };

  const clearTabs = () => {
    setTabs([]);
    setActiveTab('');
  };

  return (
    <TabContext.Provider value={{
      tabs,
      activeTab,
      addTab,
      removeTab,
      setActiveTab,
      clearTabs
    }}>
      {children}
    </TabContext.Provider>
  );
}

export function useTabs() {
  const context = useContext(TabContext);
  if (context === undefined) {
    throw new Error('useTabs must be used within a TabProvider');
  }
  return context;
}
