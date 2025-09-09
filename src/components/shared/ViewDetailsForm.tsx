import React, { useState } from 'react';
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { Eye, X, Maximize2, Minimize2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface ViewDetailsFormProps {
  visible: boolean;
  onHide: () => void;
  title: string;
  description?: string;
  data: Record<string, any>;
  fields: Array<{
    key: string;
    label: string;
    type?: 'text' | 'number' | 'date' | 'boolean' | 'object';
    format?: (value: any) => string;
  }>;
  sections?: Array<{
    title: string;
    fields: string[];
  }>;
}

export function ViewDetailsForm({
  visible,
  onHide,
  title,
  description,
  data,
  fields,
  sections
}: ViewDetailsFormProps) {
  const [isMaximized, setIsMaximized] = useState(false);
  const formatValue = (field: any, value: any) => {
    if (field.format) {
      return field.format(value);
    }
    
    if (field.type === 'date' && value) {
      return new Date(value).toLocaleDateString();
    }
    
    if (field.type === 'boolean') {
      return value ? 'Yes' : 'No';
    }
    
    if (field.type === 'object' && value) {
      return value.name || value.code || JSON.stringify(value);
    }
    
    if (field.type === 'number' && value) {
      return value.toLocaleString();
    }
    
    return value || 'N/A';
  };

  const getFieldValue = (key: string) => {
    const keys = key.split('.');
    let value = data;
    for (const k of keys) {
      value = value?.[k];
    }
    return value;
  };

  const renderFields = (fieldKeys: string[]) => {
    return fieldKeys.map((key) => {
      const field = fields.find(f => f.key === key);
      if (!field) return null;
      
      const value = getFieldValue(key);
      const formattedValue = formatValue(field, value);
      
      return (
        <div key={key} className="field">
          <label className="block font-semibold text-sm mb-2 text-muted-foreground">
            {field.label}
          </label>
          <div className="p-3 bg-muted/30 border border-border rounded-lg text-foreground">
            {formattedValue}
          </div>
        </div>
      );
    });
  };

  return (
    <Dialog
      visible={visible}
      onHide={onHide}
      header={null}
      style={{ 
        width: isMaximized ? '95vw' : '80vw', 
        maxWidth: isMaximized ? 'none' : '1200px',
        height: isMaximized ? '98vh' : 'auto',
        maxHeight: isMaximized ? '98vh' : '90vh'
      }}
      className="hull-card border-0 shadow-2xl"
      modal
      headerClassName="p-0 m-0 bg-[#8B3A3A] rounded-t-2xl text-[#8B3A3A]"
      draggable={false}
      resizable={false}
      contentClassName="p-0"
    >
      <div className="bg-[#8B3A3A] text-white p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
              <Eye className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold">{title}</h2>
              {description && (
                <p className="text-white/80 text-sm">{description}</p>
              )}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button 
              onClick={() => setIsMaximized(!isMaximized)}
              className="w-8 h-8 bg-white/20 hover:bg-white/30 rounded-lg flex items-center justify-center transition-all duration-200"
              title={isMaximized ? "Restore" : "Maximize"}
            >
              {isMaximized ? <Minimize2 className="w-4 h-4 text-white" /> : <Maximize2 className="w-4 h-4 text-white" />}
            </button>
            <button 
              onClick={onHide}
              className="w-8 h-8 bg-white/20 hover:bg-white/30 rounded-lg flex items-center justify-center transition-all duration-200"
            >
              <X className="w-4 h-4 text-white" />
            </button>
          </div>
        </div>
      </div>

      <div className={`p-6 space-y-6 bg-white ${isMaximized ? 'overflow-y-auto max-h-[calc(98vh-200px)]' : ''}`}>
        {sections && sections.length > 0 ? (
          sections.map((section, sectionIndex) => (
            <div key={section.title} className="space-y-4">
              <div className="flex items-center gap-3 pb-3 border-b border-border">
                <div className="w-8 h-8 bg-[#8B3A3A]/10 rounded-lg flex items-center justify-center">
                  <span className="text-[#8B3A3A] font-bold text-sm">{sectionIndex + 1}</span>
                </div>
                <h3 className="text-lg font-semibold text-foreground">{section.title}</h3>
              </div>
              <div className={`grid gap-4 pl-11 ${isMaximized ? 'grid-cols-1 lg:grid-cols-3 xl:grid-cols-4' : 'grid-cols-1 md:grid-cols-2'}`}>
                {renderFields(section.fields)}
              </div>
            </div>
          ))
        ) : (
          <div className={`grid gap-4 ${isMaximized ? 'grid-cols-1 lg:grid-cols-3 xl:grid-cols-4' : 'grid-cols-1 md:grid-cols-2'}`}>
            {renderFields(fields.map(f => f.key))}
          </div>
        )}

        <div className="flex justify-end gap-4 pt-6 border-t border-border bg-muted/30 -mx-6 px-6 py-4 rounded-b-2xl">
          <Button
            type="button"
            severity="secondary"
            outlined
            onClick={onHide}
            className="px-6 py-3 bg-muted text-muted-foreground border border-border rounded-lg hover:bg-muted/70 transition-all duration-200 font-semibold shadow-sm"
          >
            Close
          </Button>
        </div>
      </div>
    </Dialog>
  );
}
