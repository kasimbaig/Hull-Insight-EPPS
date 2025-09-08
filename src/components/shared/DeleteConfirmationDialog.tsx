import React from 'react';
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { AlertTriangle, X } from "lucide-react";

interface DeleteConfirmationDialogProps {
  visible: boolean;
  onHide: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  itemName?: string;
  loading?: boolean;
}

export function DeleteConfirmationDialog({
  visible,
  onHide,
  onConfirm,
  title,
  message,
  itemName,
  loading = false
}: DeleteConfirmationDialogProps) {
  return (
    <Dialog
      visible={visible}
      onHide={onHide}
      header={null}
      style={{ width: '500px' }}
      className="hull-card border-0 shadow-2xl"
      headerClassName="p-0 m-0 bg-destructive rounded-t-2xl text-destructive"
      modal
      draggable={false}
      resizable={false}
      contentClassName="p-0"
    >
      <div className="bg-destructive text-white p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
              <AlertTriangle className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold">{title}</h2>
              <p className="text-white/80 text-sm">This action cannot be undone</p>
            </div>
          </div>
          <button 
            onClick={onHide}
            className="w-8 h-8 bg-white/20 hover:bg-white/30 rounded-lg flex items-center justify-center transition-all duration-200"
          >
            <X className="w-4 h-4 text-white" />
          </button>
        </div>
      </div>

      <div className="p-6 bg-white">
        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 bg-destructive/10 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
              <AlertTriangle className="w-4 h-4 text-destructive" />
            </div>
            <div className="space-y-2">
              <p className="text-foreground font-medium">{message}</p>
              {itemName && (
                <div className="p-3 bg-muted/30 border border-border rounded-lg">
                  <p className="text-sm text-muted-foreground">
                    <span className="font-semibold">Item:</span> {itemName}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-3 pt-6 border-t border-border mt-6">
          <Button
            type="button"
            severity="secondary"
            outlined
            onClick={onHide}
            className="px-6 py-3 bg-muted text-muted-foreground border border-border rounded-lg hover:bg-muted/70 transition-all duration-200 font-semibold shadow-sm"
            disabled={loading}
          >
            Cancel
          </Button>
          <Button
            type="button"
            severity="danger"
            onClick={onConfirm}
            loading={loading}
            className="px-6 py-3 bg-destructive text-white rounded-lg hover:bg-destructive/90 transition-all duration-200 font-semibold shadow-md"
          >
            {loading ? 'Deleting...' : 'Delete'}
          </Button>
        </div>
      </div>
    </Dialog>
  );
}
