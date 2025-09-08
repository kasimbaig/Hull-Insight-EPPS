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

interface Compartment {
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
  results: Compartment[];
}

interface ApiError {
  response?: {
    data?: {
      message?: string;
    };
  };
  message?: string;
}

export default function CompartmentMaster() {
  const [compartments, setCompartments] = useState<Compartment[]>([]);
  const [totalRecords, setTotalRecords] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const [formVisible, setFormVisible] = useState(false);
  const [viewDetailsVisible, setViewDetailsVisible] = useState(false);
  const [deleteDialogVisible, setDeleteDialogVisible] = useState(false);
  const [selectedCompartment, setSelectedCompartment] = useState<Compartment | null>(null);
  const [formMode, setFormMode] = useState<'create' | 'edit'>('create');
  const [globalFilter, setGlobalFilter] = useState('');
  const [loading, setLoading] = useState(false);

  const { toast } = useToast();
  const toastRef = useRef<Toast>(null);

  // Load compartments from API
  const loadCompartments = useCallback(async (page = 0, search = '') => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        page: (page + 1).toString(),
        ...(search && { search })
      });
      
      const response = await getRequest(`master/compartments/?${params}`);
      setCompartments(response.results);
      setTotalRecords(response.count);
      setCurrentPage(page);
    } catch (error: unknown) {
      console.error('Error loading compartments:', error);
      const apiError = error as ApiError;
      const errorMessage = apiError?.response?.data?.message || apiError?.message || 'Failed to load compartments';
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }, [toast]);

  // Load compartments on component mount
  useEffect(() => {
    loadCompartments();
  }, [loadCompartments]);

  const compartmentFormConfig: FormConfig = {
    title: "Compartment",
    description: "Manage compartment information",
    sections: ["Basic Information"],
    fields: [
      {
        name: "name",
        label: "Compartment Name",
        type: "text",
        required: true,
        placeholder: "e.g., Engine Room",
        section: "Basic Information",
        validation: { min: 2, max: 100, message: "Name must be between 2-100 characters" }
      },
      {
        name: "code",
        label: "Compartment Code",
        type: "text",
        required: true,
        placeholder: "e.g., ER001",
        section: "Basic Information",
        validation: { pattern: "^[A-Z0-9]+$", message: "Code must be alphanumeric uppercase" }
      },
      {
        name: "active",
        label: "Active Status",
        type: "checkbox",
        section: "Basic Information"
      }
    ]
  };

  const compartmentViewConfig = {
    title: "Compartment Details",
    description: "View compartment information",
    fields: [
      { key: 'name', label: 'Compartment Name', type: 'text' as const },
      { key: 'code', label: 'Compartment Code', type: 'text' as const },
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

  const openForm = (mode: 'create' | 'edit', compartment?: Compartment) => {
    setFormMode(mode);
    setSelectedCompartment(compartment || null);
    setFormVisible(true);
  };

  const openViewDetails = (compartment: Compartment) => {
    setSelectedCompartment(compartment);
    setViewDetailsVisible(true);
  };

  const openDeleteDialog = (compartment: Compartment) => {
    setSelectedCompartment(compartment);
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
        await postRequest('master/compartments/', payload);
        toast({
          title: "Success",
          description: "Compartment created successfully",
        });
      } else if (formMode === 'edit' && selectedCompartment) {
        // Only send name, code, and id for edit
        const payload = {
          name: formData.name as string,
          code: formData.code as string,
          id: selectedCompartment.id
        };
        await postRequest('master/compartments/', payload);
        toast({
          title: "Success",
          description: "Compartment updated successfully",
        });
      }
      setFormVisible(false);
      // Reload the data
      await loadCompartments(currentPage, globalFilter);
    } catch (error: unknown) {
      console.error('Error saving compartment:', error);
      const apiError = error as ApiError;
      const errorMessage = apiError?.response?.data?.message || apiError?.message || 'Failed to save compartment';
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
    if (!selectedCompartment) return;
    
    setLoading(true);
    try {
      await postRequest('master/compartments/', {
        id: selectedCompartment.id,
        delete: true
      });
      toast({
        title: "Success",
        description: "Compartment deleted successfully",
      });
      setDeleteDialogVisible(false);
      setSelectedCompartment(null);
      // Reload the data
      await loadCompartments(currentPage, globalFilter);
    } catch (error: unknown) {
      console.error('Error deleting compartment:', error);
      const apiError = error as ApiError;
      const errorMessage = apiError?.response?.data?.message || apiError?.message || 'Failed to delete compartment';
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const actionBodyTemplate = (rowData: Compartment) => {
    return (
      <div className="flex gap-2">
        <Button
          icon={<Eye className="h-4 w-4" />}
          onClick={() => openViewDetails(rowData)}
          className="p-button-text p-button-rounded w-8 h-8 hover:bg-[#00809D]/10 hover:text-[#00809D] transition-all duration-200"
          tooltip="View Details"
        />
        <Button
          icon={<Edit className="h-4 w-4" />}
          onClick={() => openForm('edit', rowData)}
          className="p-button-text p-button-rounded w-8 h-8 hover:bg-[#00809D]/10 hover:text-[#00809D] transition-all duration-200"
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

  const statusBodyTemplate = (rowData: Compartment) => {
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
      await loadCompartments(0, value);
    } catch (error) {
      // Error is already handled in loadCompartments function
      console.error('Search error:', error);
    }
  };

  const header = (
    <div className="flex flex-wrap gap-4 items-center justify-between p-6 bg-gradient-to-r from-[#00809D]/5 to-[#00809D]/10 rounded-xl border border-[#00809D]/20">
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-[#00809D] rounded-lg flex items-center justify-center">
            <span className="text-white text-lg">🏗️</span>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-foreground">Compartment Master</h2>
            <p className="text-sm text-muted-foreground">Manage vessel compartments and spaces</p>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="h-4 w-4 text-muted-foreground absolute left-3 top-1/2 transform -translate-y-1/2" />
            <InputText
              value={globalFilter}
              onChange={(e) => handleSearch(e.target.value)}
              placeholder="Search compartments, names, codes..."
              className="w-80 pl-10 pr-4 py-3 border-2 border-border rounded-xl focus:border-[#00809D] focus:ring-2 focus:ring-[#00809D]/20 bg-background transition-all duration-200"
            />
          </div>
        </div>
      </div>
      
      <Button
        icon={<Plus className="h-4 w-4" />}
        label="Add Compartment"
        onClick={() => openForm('create')}
        className="bg-[#00809D] text-white hover:bg-[#00809D]/90 px-6 py-3 rounded-xl font-semibold shadow-md hover:shadow-lg transition-all duration-200"
      />
    </div>
  );

  return (
    <div className="p-6 space-y-6">
      <div className="bg-white rounded-xl shadow-lg border border-border overflow-hidden">
        <DataTable
          value={compartments}
          header={header}
          paginator
          rows={rowsPerPage}
          totalRecords={totalRecords}
          first={currentPage * rowsPerPage}
          lazy
          onPage={async (e) => {
            try {
              await loadCompartments(e.page, globalFilter);
            } catch (error) {
              // Error is already handled in loadCompartments function
              console.error('Pagination error:', error);
            }
          }}
          loading={loading}
          emptyMessage="No compartments found"
          className="vessel-datatable"
        >
          <Column 
            field="name" 
            header="Name" 
            className="min-w-[200px]"
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
        config={compartmentFormConfig}
        data={selectedCompartment}
        mode={formMode}
        onSubmit={handleSubmit}
        loading={loading}
      />

      <ViewDetailsForm
        visible={viewDetailsVisible}
        onHide={() => setViewDetailsVisible(false)}
        title={compartmentViewConfig.title}
        description={compartmentViewConfig.description}
        data={selectedCompartment || {}}
        fields={compartmentViewConfig.fields}
        sections={compartmentViewConfig.sections}
      />

      <DeleteConfirmationDialog
        visible={deleteDialogVisible}
        onHide={() => setDeleteDialogVisible(false)}
        onConfirm={handleDelete}
        title="Delete Compartment"
        message="Are you sure you want to delete this compartment? This action cannot be undone."
        itemName={selectedCompartment?.name}
        loading={loading}
      />

      <Toast ref={toastRef} />
    </div>
  );
}
