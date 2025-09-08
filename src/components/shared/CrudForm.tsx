import React, { useState, useEffect } from "react";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { InputNumber } from "primereact/inputnumber";
import { InputTextarea } from "primereact/inputtextarea";
import { Calendar } from "primereact/calendar";
import { MultiSelect } from "primereact/multiselect";
import { Checkbox } from "primereact/checkbox";
import { FileUpload } from "primereact/fileupload";
import { FormConfig, FormField } from "@/types";
import { cn } from "@/lib/utils";

interface CrudFormProps {
  visible: boolean;
  onHide: () => void;
  config: FormConfig;
  data?: any;
  mode: 'create' | 'edit' | 'view';
  onSubmit?: (formData: any) => void;
  onDelete?: (id: string) => void;
  loading?: boolean;
  errors?: Record<string, string>;
}

export function CrudForm({
  visible,
  onHide,
  config,
  data = {},
  mode,
  onSubmit,
  onDelete,
  loading = false,
  errors = {}
}: CrudFormProps) {
  const [formData, setFormData] = useState<any>(data || {});
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});
  const [isMaximized, setIsMaximized] = useState(false);

  useEffect(() => {
    setFormData(data || {});
    setValidationErrors({});
  }, [data, visible]);

  const handleFieldChange = (fieldName: string, value: any) => {
    setFormData((prev: any) => ({
      ...prev,
      [fieldName]: value
    }));
    if (validationErrors[fieldName]) {
      setValidationErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[fieldName];
        return newErrors;
      });
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    config.fields.forEach(field => {
      const value = formData[field.name];
      if (field.required && (!value || (typeof value === 'string' && !value.trim()))) {
        newErrors[field.name] = `${field.label} is required`;
        return;
      }
      if (value && field.validation) {
        const { min, max, pattern, message } = field.validation;
        if (min !== undefined && typeof value === 'string' && value.length < min) {
          newErrors[field.name] = message || `Minimum ${min} characters required`;
        }
        if (max !== undefined && typeof value === 'string' && value.length > max) {
          newErrors[field.name] = message || `Maximum ${max} characters allowed`;
        }
        if (pattern && typeof value === 'string' && !new RegExp(pattern).test(value)) {
          newErrors[field.name] = message || `Invalid format`;
        }
      }
    });
    setValidationErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (mode === 'view') return;
    if (validateForm() && onSubmit) {
      onSubmit(formData);
    }
  };

  const handleDelete = () => {
    if (onDelete && data?.id) {
      onDelete(data.id);
    }
  };

  const renderField = (field: FormField) => {
    const value = formData[field.name];
    const hasError = validationErrors[field.name] || errors[field.name];
    const isReadOnly = mode === 'view';

    switch (field.type) {
      case 'text':
      case 'email':
        return (
          <div key={field.name} className="field">
            <label className="block font-semibold text-sm mb-2 text-foreground">
              {field.label} {field.required && <span className="text-destructive ml-1">*</span>}
            </label>
            <InputText
              value={value || ''}
              onChange={(e) => handleFieldChange(field.name, e.target.value)}
              placeholder={field.placeholder}
              className={cn(
                "w-full px-4 py-3 border-2 border-border rounded-xl hull-transition focus:border-[#00809D] focus:ring-2 focus:ring-[#00809D]/20 bg-background",
                hasError && "border-destructive focus:border-destructive focus:ring-destructive/20",
                isReadOnly && "bg-muted border-muted-foreground/20 text-muted-foreground"
              )}
              disabled={isReadOnly}
              type={field.type}
            />
            {hasError && (
              <div className="mt-2 p-2 bg-destructive/10 border border-destructive/20 rounded-lg">
                <p className="text-destructive text-sm font-medium">
                  {validationErrors[field.name] || errors[field.name]}
                </p>
              </div>
            )}
          </div>
        );

      case 'number':
        return (
          <div key={field.name} className="field">
            <label className="block font-semibold text-sm mb-2 text-foreground">
              {field.label} {field.required && <span className="text-destructive ml-1">*</span>}
            </label>
            <InputNumber
              value={value}
              onChange={(e) => handleFieldChange(field.name, e.value)}
              placeholder={field.placeholder}
              className={cn(
                "w-full [&>input]:px-4 [&>input]:py-3 [&>input]:border-2 [&>input]:border-border [&>input]:rounded-xl [&>input]:hull-transition [&>input]:focus:border-primary [&>input]:focus:ring-2 [&>input]:focus:ring-primary/20 [&>input]:bg-background",
                hasError && "[&>input]:border-destructive [&>input]:focus:border-destructive [&>input]:focus:ring-destructive/20",
                isReadOnly && "[&>input]:bg-muted [&>input]:border-muted-foreground/20 [&>input]:text-muted-foreground"
              )}
              disabled={isReadOnly}
              min={field.validation?.min}
              max={field.validation?.max}
            />
            {hasError && (
              <div className="mt-2 p-2 bg-destructive/10 border border-destructive/20 rounded-lg">
                <p className="text-destructive text-sm font-medium">
                  {validationErrors[field.name] || errors[field.name]}
                </p>
              </div>
            )}
          </div>
        );

      case 'textarea':
        return (
          <div key={field.name} className="field md:col-span-2">
            <label className="block font-semibold text-sm mb-2 text-foreground">
              {field.label} {field.required && <span className="text-destructive ml-1">*</span>}
            </label>
            <InputTextarea
              value={value || ''}
              onChange={(e) => handleFieldChange(field.name, e.target.value)}
              placeholder={field.placeholder}
              className={cn(
                "w-full px-4 py-3 border-2 border-border rounded-xl hull-transition focus:border-[#00809D] focus:ring-2 focus:ring-[#00809D]/20 bg-background resize-none",
                hasError && "border-destructive focus:border-destructive focus:ring-destructive/20",
                isReadOnly && "bg-muted border-muted-foreground/20 text-muted-foreground"
              )}
              disabled={isReadOnly}
              rows={4}
              autoResize
            />
            {hasError && (
              <div className="mt-2 p-2 bg-destructive/10 border border-destructive/20 rounded-lg">
                <p className="text-destructive text-sm font-medium">
                  {validationErrors[field.name] || errors[field.name]}
                </p>
              </div>
            )}
          </div>
        );

      case 'date':
        return (
          <div key={field.name} className="field">
            <label className="block font-semibold text-sm mb-2 text-foreground">
              {field.label} {field.required && <span className="text-destructive ml-1">*</span>}
            </label>
            <Calendar
              value={value ? new Date(value) : null}
              onChange={(e) => handleFieldChange(field.name, e.value?.toISOString().split('T')[0])}
              placeholder={field.placeholder}
              className={cn(
                "w-full [&>input]:px-4 [&>input]:py-3 [&>input]:border-2 [&>input]:border-border [&>input]:rounded-xl [&>input]:hull-transition [&>input]:focus:border-primary [&>input]:focus:ring-2 [&>input]:focus:ring-primary/20 [&>input]:bg-background",
                hasError && "[&>input]:border-destructive [&>input]:focus:border-destructive [&>input]:focus:ring-destructive/20",
                isReadOnly && "[&>input]:bg-muted [&>input]:border-muted-foreground/20 [&>input]:text-muted-foreground"
              )}
              disabled={isReadOnly}
              dateFormat="dd/mm/yy"
              showIcon
            />
            {hasError && (
              <div className="mt-2 p-2 bg-destructive/10 border border-destructive/20 rounded-lg">
                <p className="text-destructive text-sm font-medium">
                  {validationErrors[field.name] || errors[field.name]}
                </p>
              </div>
            )}
          </div>
        );

      case 'select':
        return (
          <div key={field.name} className="field">
            <label className="block font-semibold text-sm mb-2 text-foreground">
              {field.label} {field.required && <span className="text-destructive ml-1">*</span>}
            </label>
            <select
              value={value || ''}
              onChange={(e) => handleFieldChange(field.name, e.target.value)}
              className={cn(
                "w-full px-4 py-3 border-2 border-border rounded-xl hull-transition focus:border-[#00809D] focus:ring-2 focus:ring-[#00809D]/20 bg-background",
                hasError && "border-destructive focus:border-destructive focus:ring-destructive/20",
                isReadOnly && "bg-muted border-muted-foreground/20 text-muted-foreground"
              )}
              disabled={isReadOnly}
            >
              <option value="" disabled>{field.placeholder || `Select ${field.label}`}</option>
              {field.options?.map((opt: any) => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
            {hasError && (
              <div className="mt-2 p-2 bg-destructive/10 border border-destructive/20 rounded-lg">
                <p className="text-destructive text-sm font-medium">
                  {validationErrors[field.name] || errors[field.name]}
                </p>
              </div>
            )}
          </div>
        );

      case 'multiselect':
        return (
          <div key={field.name} className="field md:col-span-2">
            <label className="block font-semibold text-sm mb-2 text-foreground">
              {field.label} {field.required && <span className="text-destructive ml-1">*</span>}
            </label>
            <MultiSelect
              value={value || []}
              onChange={(e) => handleFieldChange(field.name, e.value)}
              options={field.options}
              placeholder={field.placeholder}
              className={cn(
                "w-full [&>div]:px-4 [&>div]:py-3 [&>div]:border-2 [&>div]:border-border [&>div]:rounded-xl [&>div]:hull-transition [&>div]:focus:border-primary [&>div]:focus:ring-2 [&>div]:focus:ring-primary/20 [&>div]:bg-background",
                hasError && "[&>div]:border-destructive [&>div]:focus:border-destructive [&>div]:focus:ring-destructive/20",
                isReadOnly && "[&>div]:bg-muted [&>div]:border-muted-foreground/20 [&>div]:text-muted-foreground"
              )}
              disabled={isReadOnly}
              filter
              display="chip"
            />
            {hasError && (
              <div className="mt-2 p-2 bg-destructive/10 border border-destructive/20 rounded-lg">
                <p className="text-destructive text-sm font-medium">
                  {validationErrors[field.name] || errors[field.name]}
                </p>
              </div>
            )}
          </div>
        );

      case 'checkbox':
        return (
          <div key={field.name} className="field">
            <label className="block font-semibold text-sm mb-2 text-foreground">
              {field.label} {field.required && <span className="text-destructive ml-1">*</span>}
            </label>
            <div className="flex items-center gap-3 px-4 py-3 bg-background rounded-xl border-2 border-border transition-all duration-200 hover:border-[#00809D]/30 focus-within:border-[#00809D] focus-within:ring-2 focus-within:ring-[#00809D]/20">
              <div className="flex-shrink-0">
                <Checkbox
                  checked={value || false}
                  onChange={(e) => handleFieldChange(field.name, e.checked)}
                  disabled={isReadOnly}
                  className={cn(
                    "w-6 h-5 border-2 border-border rounded transition-all duration-200",
                    hasError && "border-destructive",
                    !isReadOnly && "hover:border-[#00809D] focus:border-[#00809D] focus:ring-2 focus:ring-[#00809D]/20"
                  )}
                />
              </div>
              <label className="font-medium text-sm text-foreground cursor-pointer flex-1">
                {(field as any).checkboxLabel || 'Active'}
              </label>
            </div>
            {hasError && (
              <div className="mt-2 p-2 bg-destructive/10 border border-destructive/20 rounded-lg">
                <p className="text-destructive text-sm font-medium">
                  {validationErrors[field.name] || errors[field.name]}
                </p>
              </div>
            )}
          </div>
        );

      case 'file':
        return (
          <div key={field.name} className="field md:col-span-2">
            <label className="block font-semibold text-sm mb-2 text-foreground">
              {field.label} {field.required && <span className="text-destructive ml-1">*</span>}
            </label>
            <div className="border-2 border-dashed border-border rounded-xl p-6 hull-transition hover:border-[#00809D]/50 bg-muted/20">
              <FileUpload
                mode="basic"
                name={field.name}
                accept="image/*,application/pdf"
                maxFileSize={10000000}
                className="w-full"
                disabled={isReadOnly}
                chooseLabel="📎 Choose Files"
                onSelect={(e) => handleFieldChange(field.name, e.files)}
              />
            </div>
            {hasError && (
              <div className="mt-2 p-2 bg-destructive/10 border border-destructive/20 rounded-lg">
                <p className="text-destructive text-sm font-medium">
                  {validationErrors[field.name] || errors[field.name]}
                </p>
              </div>
            )}
          </div>
        );

      default:
        return null;
    }
  };

  const groupedFields = config.sections 
    ? config.sections.reduce((acc, section) => {
        acc[section] = config.fields.filter(field => field.section === section);
        return acc;
      }, {} as Record<string, FormField[]>)
    : { 'General': config.fields };

  const getDialogTitle = () => {
    const action = mode === 'create' ? 'Add' : mode === 'edit' ? 'Edit' : 'View';
    return `${action} ${config.title}`;
  };

  return (
    <Dialog
      visible={visible}
      onHide={onHide}
      header={null}
      style={{ width: isMaximized ? '95vw' : '80vw', maxWidth: isMaximized ? 'none' : '1200px' }}
      className="hull-card border-0 shadow-2xl"
      headerClassName="p-0 m-0 bg-[#00809D] rounded-t-2xl text-[#00809D]"
      modal
      draggable={false}
      resizable={false}
      contentClassName="p-0"
    >
      <div className="bg-[#00809D] text-white p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
              <span className="text-2xl">⚓</span>
            </div>
            <div>
              <h2 className="text-2xl font-bold">{getDialogTitle()}</h2>
              <p className="text-white/80 text-sm">{config.description}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button 
              onClick={() => setIsMaximized(!isMaximized)}
              className="w-8 h-8 bg-white/20 hover:bg-white/30 rounded-lg flex items-center justify-center hull-transition"
              title={isMaximized ? "Restore" : "Maximize"}
            >
              <span className="text-white text-lg">{isMaximized ? '⧉' : '⛶'}</span>
            </button>
            <button 
              onClick={onHide}
              className="w-8 h-8 bg-white/20 hover:bg-white/30 rounded-lg flex items-center justify-center hull-transition"
            >
              <span className="text-white text-xl">×</span>
            </button>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="p-6 space-y-6 bg-white">
        {config.sections && config.sections.length > 0 ? (
          config.sections.map((section, sectionIndex) => (
            <div key={section} className="space-y-4">
              <div className="flex items-center gap-3 pb-3 border-b border-border">
                <div className="w-8 h-8 bg-[#00809D]/10 rounded-lg flex items-center justify-center">
                  <span className="text-[#00809D] font-bold text-sm">{sectionIndex + 1}</span>
                </div>
                <h3 className="text-lg font-semibold text-foreground">{section}</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pl-11">
                {groupedFields[section]?.map(renderField)}
              </div>
            </div>
          ))
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Object.values(groupedFields)[0]?.map(renderField)}
          </div>
        )}

<div className="flex justify-end gap-4 pt-6 border-t border-border bg-muted/30 -mx-6 px-6 py-4 rounded-b-2xl">
  {/* Cancel Button */}
  <Button
    type="button"
    severity="secondary"
    outlined
    onClick={onHide}
    className="px-6 py-3 bg-muted text-muted-foreground border border-border rounded-lg hover:bg-muted/70 transition-all duration-200 font-semibold shadow-sm"
  >
    {config.cancelButtonText || 'Cancel'}
  </Button>

  {/* Submit / Update Button */}
  {mode !== 'view' && (
    <Button
      type="submit"
      loading={loading}
      className="px-8 py-3 bg-[#00809D] text-white rounded-lg hover:bg-[#00809D]/90 transition-all duration-200 font-semibold shadow-md"
    >
      {config.submitButtonText || (mode === 'create' ? '✓ Create' : '✓ Update')}
    </Button>
  )}
</div>

      </form>
    </Dialog>
  );
}
