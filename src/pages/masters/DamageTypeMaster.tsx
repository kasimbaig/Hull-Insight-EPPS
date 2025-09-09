import { useState, useEffect, useRef, useCallback } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Toast } from "primereact/toast";
import { Plus, Search, Edit, Trash2, Eye } from "lucide-react";
import { CrudForm } from "@/components/shared/CrudForm";
import { ViewDetailsForm } from "@/components/shared/ViewDetailsForm";
import { DeleteConfirmationDialog } from "@/components/shared/DeleteConfirmationDialog";
import { FormConfig } from "@/types";
import { getRequest, postRequest } from "@/services/apiService";
import { useToast } from "@/hooks/use-toast";

interface DamageType {
  id: number;
  name: string;
  code: string;
  active: number;
  created_on: string;
  created_ip: string;
  modified_on: string;
  modified_ip: string | null;
  created_by: number;
  modified_by: number | null;
}

interface ApiResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: DamageType[];
}

interface ApiError {
  response?: {
    data?: {
      message?: string;
    };
  };
  message?: string;
}

export default function DamageTypeMaster() {
  const [damageTypes, setDamageTypes] = useState<DamageType[]>([]);
  const [totalRecords, setTotalRecords] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const [formVisible, setFormVisible] = useState(false);
  const [viewDetailsVisible, setViewDetailsVisible] = useState(false);
  const [deleteDialogVisible, setDeleteDialogVisible] = useState(false);
  const [selectedDamageType, setSelectedDamageType] = useState<DamageType | null>(null);
  const [formMode, setFormMode] = useState<'create' | 'edit'>('create');
  const [globalFilter, setGlobalFilter] = useState('');
  const [loading, setLoading] = useState(false);

  const { toast } = useToast();
  const toastRef = useRef<Toast>(null);

  // Load damage types from API
  const loadDamageTypes = useCallback(async (page = 0, search = '') => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        page: (page + 1).toString(),
        ...(search && { search })
      });
      
      const response = await getRequest(`master/damagetypes/?${params}`);
      setDamageTypes(response.results);
      setTotalRecords(response.count);
      setCurrentPage(page);
    } catch (error: unknown) {
      console.error('Error loading damage types:', error);
      const apiError = error as ApiError;
      const errorMessage = apiError?.response?.data?.message || apiError?.message || 'Failed to load damage types';
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }, [toast]);

  // Load damage types on component mount
  useEffect(() => {
    loadDamageTypes();
  }, [loadDamageTypes]);

  const damageTypeFormConfig: FormConfig = {
    title: "Damage Type",
    description: "Manage hull damage type classifications",
    sections: ["Basic Information"],
    fields: [
      {
        name: "name",
        label: "Damage Type Name",
        type: "text",
        required: true,
        placeholder: "e.g., Corrosion",
        section: "Basic Information",
        validation: { min: 3, max: 100, message: "Name must be between 3-100 characters" }
      },
      {
        name: "code",
        label: "Damage Type Code",
        type: "text",
        required: true,
        placeholder: "e.g., Corrosion",
        section: "Basic Information",
        validation: { pattern: "^[A-Za-z0-9_]+$", message: "Code must be alphanumeric with underscores" }
      },
      {
        name: "active",
        label: "Active Status",
        type: "checkbox",
        section: "Basic Information"
      }
    ]
  };

  const damageTypeViewConfig = {
    title: "Damage Type Details",
    description: "View hull damage type classification information",
    fields: [
      { key: 'name', label: 'Damage Type Name', type: 'text' as const },
      { key: 'code', label: 'Damage Type Code', type: 'text' as const },
      { key: 'active', label: 'Active Status', type: 'boolean' as const },
      { key: 'created_on', label: 'Created On', type: 'date' as const },
      { key: 'modified_on', label: 'Modified On', type: 'date' as const }
    ],
    sections: [
      {
        title: 'Basic Information',
        fields: ['name', 'code', 'active']
      },
      {
        title: 'Audit Information',
        fields: ['created_on', 'modified_on']
      }
    ]
  };

  const openForm = (mode: 'create' | 'edit', damageType?: DamageType) => {
    setFormMode(mode);
    setSelectedDamageType(damageType || null);
    setFormVisible(true);
  };

  const openViewDetails = (damageType: DamageType) => {
    setSelectedDamageType(damageType);
    setViewDetailsVisible(true);
  };

  const openDeleteDialog = (damageType: DamageType) => {
    setSelectedDamageType(damageType);
    setDeleteDialogVisible(true);
  };

  const handleSubmit = async (formData: Record<string, unknown>) => {
    setLoading(true);
    try {
      if (formMode === 'create') {
        // Only send name and code for create
        const payload = {
          name: formData.name as string,
          code: formData.code as string
        };
        await postRequest('master/damagetypes/', payload);
        toast({
          title: "Success",
          description: "Damage type created successfully",
        });
      } else if (formMode === 'edit' && selectedDamageType) {
        // Only send name, code, and id for edit
        const payload = {
          name: formData.name as string,
          code: formData.code as string,
          id: selectedDamageType.id
        };
        await postRequest('master/damagetypes/', payload);
        toast({
          title: "Success",
          description: "Damage type updated successfully",
        });
      }
      setFormVisible(false);
      // Reload the data
      await loadDamageTypes(currentPage, globalFilter);
    } catch (error: unknown) {
      console.error('Error saving damage type:', error);
      const apiError = error as ApiError;
      const errorMessage = apiError?.response?.data?.message || apiError?.message || 'Failed to save damage type';
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!selectedDamageType) return;
    
    setLoading(true);
    try {
      await postRequest('master/damagetypes/', {
        id: selectedDamageType.id,
        delete: true
      });
      toast({
        title: "Success",
        description: "Damage type deleted successfully",
      });
      setDeleteDialogVisible(false);
      setSelectedDamageType(null);
      // Reload the data
      await loadDamageTypes(currentPage, globalFilter);
    } catch (error: unknown) {
      console.error('Error deleting damage type:', error);
      const apiError = error as ApiError;
      const errorMessage = apiError?.response?.data?.message || apiError?.message || 'Failed to delete damage type';
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const actionBodyTemplate = (rowData: DamageType) => {
    return (
      <div className="flex gap-2">
        <Button
          icon={<Eye className="h-4 w-4" />}
          onClick={() => openViewDetails(rowData)}
          className="p-button-text p-button-rounded w-8 h-8 hover:bg-[#8B3A3A]/10 hover:text-[#8B3A3A] transition-all duration-200"
          tooltip="View Details"
        />
        <Button
          icon={<Edit className="h-4 w-4" />}
          onClick={() => openForm('edit', rowData)}
          className="p-button-text p-button-rounded w-8 h-8 hover:bg-[#8B3A3A]/10 hover:text-[#8B3A3A] transition-all duration-200"
          tooltip="Edit"
        />
        <Button
          icon={<Trash2 className="h-4 w-4" />}
          onClick={() => openDeleteDialog(rowData)}
          className="p-button-text p-button-rounded w-8 h-8 hover:bg-destructive/10 hover:text-destructive transition-all duration-200"
          tooltip="Delete"
        />
      </div>
    );
  };

  const statusBodyTemplate = (rowData: DamageType) => {
    return (
      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${
        rowData.active === 1 
          ? 'bg-green-100 text-green-800 border border-green-200' 
          : 'bg-red-100 text-red-800 border border-red-200'
      }`}>
        <div className={`w-2 h-2 rounded-full mr-2 ${
          rowData.active === 1 ? 'bg-green-500' : 'bg-red-500'
        }`}></div>
        {rowData.active === 1 ? 'Active' : 'Inactive'}
      </span>
    );
  };

  // Handle search
  const handleSearch = async (value: string) => {
    setGlobalFilter(value);
    try {
      await loadDamageTypes(0, value);
    } catch (error) {
      // Error is already handled in loadDamageTypes function
      console.error('Search error:', error);
    }
  };

  const header = (
    <div className="flex flex-wrap gap-4 items-center justify-between p-6 bg-gradient-to-r from-[#8B3A3A]/5 to-[#8B3A3A]/10 rounded-xl border border-[#8B3A3A]/20">
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-[#8B3A3A] rounded-lg flex items-center justify-center">
            <span className="text-white text-lg">⚠️</span>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-foreground">Damage Type Master</h2>
            <p className="text-sm text-muted-foreground">Manage hull damage type classifications</p>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="h-4 w-4 text-muted-foreground absolute left-3 top-1/2 transform -translate-y-1/2" />
            <InputText
              value={globalFilter}
              onChange={(e) => handleSearch(e.target.value)}
              placeholder="Search damage types, names, codes..."
              className="w-80 pl-10 pr-4 py-3 border-2 border-border rounded-xl focus:border-[#8B3A3A] focus:ring-2 focus:ring-[#8B3A3A]/20 bg-background transition-all duration-200"
            />
          </div>
        </div>
      </div>
      
      <Button
        icon={<Plus className="h-4 w-4" />}
        label="Add Damage Type"
        onClick={() => openForm('create')}
        className="bg-[#8B3A3A] text-white hover:bg-[#8B3A3A]/90 px-6 py-3 rounded-xl font-semibold shadow-md hover:shadow-lg transition-all duration-200"
      />
    </div>
  );

  return (
    <div className="p-6 space-y-6">
      <div className="bg-white rounded-xl shadow-lg border border-border overflow-hidden">
        <DataTable
          value={damageTypes}
          header={header}
          paginator
          rows={rowsPerPage}
          totalRecords={totalRecords}
          first={currentPage * rowsPerPage}
          lazy
          onPage={async (e) => {
            try {
              await loadDamageTypes(e.page, globalFilter);
            } catch (error) {
              // Error is already handled in loadDamageTypes function
              console.error('Pagination error:', error);
            }
          }}
          loading={loading}
          emptyMessage="No damage types found"
          className="vessel-datatable"
        >
          <Column 
            field="name" 
            header="Name" 
            className="min-w-[300px]"
            headerClassName="master-table-header"
          />
          <Column 
            field="code" 
            header="Code" 
            className="min-w-[150px]"
            headerClassName="master-table-header"
          />
          <Column 
            body={statusBodyTemplate} 
            header="Status" 
            className="min-w-[120px]"
            headerClassName="master-table-header"
          />
          <Column 
            body={actionBodyTemplate} 
            header="Actions" 
            className="w-[140px] text-center"
            headerClassName="master-table-header-no-border"
          />
        </DataTable>
      </div>

      <CrudForm
        visible={formVisible}
        onHide={() => setFormVisible(false)}
        config={damageTypeFormConfig}
        data={selectedDamageType}
        mode={formMode}
        onSubmit={handleSubmit}
        loading={loading}
      />

      <ViewDetailsForm
        visible={viewDetailsVisible}
        onHide={() => setViewDetailsVisible(false)}
        title={damageTypeViewConfig.title}
        description={damageTypeViewConfig.description}
        data={selectedDamageType || {}}
        fields={damageTypeViewConfig.fields}
        sections={damageTypeViewConfig.sections}
      />

      <DeleteConfirmationDialog
        visible={deleteDialogVisible}
        onHide={() => setDeleteDialogVisible(false)}
        onConfirm={handleDelete}
        title="Delete Damage Type"
        message="Are you sure you want to delete this damage type? This action cannot be undone."
        itemName={selectedDamageType?.name}
        loading={loading}
      />

      <Toast ref={toastRef} />
    </div>
  );
}
