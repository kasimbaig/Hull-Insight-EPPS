import React from 'react';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Tab {
  id: string;
  title: string;
  url: string;
  icon?: React.ComponentType<{ className?: string }>;
}

interface TabNavigationProps {
  tabs: Tab[];
  activeTab: string;
  onTabClick: (tabId: string) => void;
  onTabClose: (tabId: string) => void;
}

export function TabNavigation({ tabs, activeTab, onTabClick, onTabClose }: TabNavigationProps) {
  if (tabs.length === 0) return null;

  return (
    <div className="bg-background border-b border-border px-6 py-2">
      <div className="flex items-center gap-1 overflow-x-auto">
        <div className="flex items-center gap-1 min-w-max">
          {tabs.map((tab) => (
            <div
              key={tab.id}
              className={`flex items-center gap-2 px-3 py-2 rounded-t-lg border-b-2 transition-all duration-200 cursor-pointer group flex-shrink-0 ${
                activeTab === tab.id
                  ? 'bg-primary/10 border-primary text-primary'
                  : 'bg-muted/50 border-transparent hover:bg-muted hover:border-muted-foreground/30'
              }`}
              onClick={() => onTabClick(tab.id)}
            >
              {tab.icon && (
                <tab.icon className="h-4 w-4 flex-shrink-0" />
              )}
              <span className="text-sm font-medium whitespace-nowrap">{tab.title}</span>
              <Button
                variant="ghost"
                size="sm"
                className="h-4 w-4 p-0 opacity-0 group-hover:opacity-100 hover:bg-destructive/20 hover:text-destructive transition-all duration-200"
                onClick={(e) => {
                  e.stopPropagation();
                  onTabClose(tab.id);
                }}
              >
                <X className="h-3 w-3" />
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
