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

interface Unit {
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
  results: Unit[];
}

interface ApiError {
  response?: {
    data?: {
      message?: string;
    };
  };
  message?: string;
}

export default function UnitMaster() {
  const [units, setUnits] = useState<Unit[]>([]);
  const [totalRecords, setTotalRecords] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const [formVisible, setFormVisible] = useState(false);
  const [viewDetailsVisible, setViewDetailsVisible] = useState(false);
  const [deleteDialogVisible, setDeleteDialogVisible] = useState(false);
  const [selectedUnit, setSelectedUnit] = useState<Unit | null>(null);
  const [formMode, setFormMode] = useState<'create' | 'edit'>('create');
  const [globalFilter, setGlobalFilter] = useState('');
  const [loading, setLoading] = useState(false);

  const { toast } = useToast();
  const toastRef = useRef<Toast>(null);

  // Load units from API
  const loadUnits = useCallback(async (page = 0, search = '') => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        page: (page + 1).toString(),
        ...(search && { search })
      });
      
      const response = await getRequest(`master/units/?${params}`);
      setUnits(response.results);
      setTotalRecords(response.count);
      setCurrentPage(page);
    } catch (error: unknown) {
      console.error('Error loading units:', error);
      const apiError = error as ApiError;
      const errorMessage = apiError?.response?.data?.message || apiError?.message || 'Failed to load units';
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }, [rowsPerPage, toast]);

  // Load units on component mount
  useEffect(() => {
    loadUnits();
  }, [loadUnits]);

  const unitFormConfig: FormConfig = {
    title: "Unit",
    description: "Manage unit information",
    sections: ["Basic Information"],
    fields: [
      {
        name: "name",
        label: "Unit Name",
        type: "text",
        required: true,
        placeholder: "e.g., DNA",
        section: "Basic Information",
        validation: { min: 2, max: 50, message: "Name must be between 2-50 characters" }
      },
      {
        name: "code",
        label: "Unit Code",
        type: "text",
        required: true,
        placeholder: "e.g., DNA",
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

  const unitViewConfig = {
    title: "Unit Details",
    description: "View unit information",
    fields: [
      { key: 'name', label: 'Unit Name', type: 'text' as const },
      { key: 'code', label: 'Unit Code', type: 'text' as const },
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

  const openForm = (mode: 'create' | 'edit', unit?: Unit) => {
    setFormMode(mode);
    setSelectedUnit(unit || null);
    setFormVisible(true);
  };

  const openViewDetails = (unit: Unit) => {
    setSelectedUnit(unit);
    setViewDetailsVisible(true);
  };

  const openDeleteDialog = (unit: Unit) => {
    setSelectedUnit(unit);
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
        await postRequest('master/units/', payload);
        toast({
          title: "Success",
          description: "Unit created successfully",
        });
      } else if (formMode === 'edit' && selectedUnit) {
        // Only send name, code, and id for edit
        const payload = {
          name: formData.name as string,
          code: formData.code as string,
          id: selectedUnit.id
        };
        await postRequest('master/units/', payload);
        toast({
          title: "Success",
          description: "Unit updated successfully",
        });
      }
      setFormVisible(false);
      // Reload the data
      await loadUnits(currentPage, globalFilter);
    } catch (error: unknown) {
      console.error('Error saving unit:', error);
      const apiError = error as ApiError;
      const errorMessage = apiError?.response?.data?.message || apiError?.message || 'Failed to save unit';
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
    if (!selectedUnit) return;
    
    setLoading(true);
    try {
      await postRequest('master/units/', {
        id: selectedUnit.id,
        delete: true
      });
      toast({
        title: "Success",
        description: "Unit deleted successfully",
      });
      setDeleteDialogVisible(false);
      setSelectedUnit(null);
      // Reload the data
      await loadUnits(currentPage, globalFilter);
    } catch (error: unknown) {
      console.error('Error deleting unit:', error);
      const apiError = error as ApiError;
      const errorMessage = apiError?.response?.data?.message || apiError?.message || 'Failed to delete unit';
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const actionBodyTemplate = (rowData: Unit) => {
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

  const statusBodyTemplate = (rowData: Unit) => {
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
      await loadUnits(0, value);
    } catch (error) {
      // Error is already handled in loadUnits function
      console.error('Search error:', error);
    }
  };

  const header = (
    <div className="flex flex-wrap gap-4 items-center justify-between p-6 bg-gradient-to-r from-[#00809D]/5 to-[#00809D]/10 rounded-xl border border-[#00809D]/20">
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-[#00809D] rounded-lg flex items-center justify-center">
            <span className="text-white text-lg">🏢</span>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-foreground">Unit Master</h2>
            <p className="text-sm text-muted-foreground">Manage naval units and their configurations</p>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="h-4 w-4 text-muted-foreground absolute left-3 top-1/2 transform -translate-y-1/2" />
            <InputText
              value={globalFilter}
              onChange={(e) => handleSearch(e.target.value)}
              placeholder="Search units, names, codes..."
              className="w-80 pl-10 pr-4 py-3 border-2 border-border rounded-xl focus:border-[#00809D] focus:ring-2 focus:ring-[#00809D]/20 bg-background transition-all duration-200"
            />
          </div>
        </div>
      </div>
      
      <Button
        icon={<Plus className="h-4 w-4" />}
        label="Add Unit"
        onClick={() => openForm('create')}
        className="bg-[#00809D] text-white hover:bg-[#00809D]/90 px-6 py-3 rounded-xl font-semibold shadow-md hover:shadow-lg transition-all duration-200"
      />
    </div>
  );

  return (
    <div className="p-6 space-y-6">
      <div className="bg-white rounded-xl shadow-lg border border-border overflow-hidden">
        <DataTable
          value={units}
          header={header}
          paginator
          rows={rowsPerPage}
          totalRecords={totalRecords}
          first={currentPage * rowsPerPage}
          lazy
          onPage={async (e) => {
            try {
              await loadUnits(e.page, globalFilter);
            } catch (error) {
              // Error is already handled in loadUnits function
              console.error('Pagination error:', error);
            }
          }}
          loading={loading}
          emptyMessage="No units found"
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
        config={unitFormConfig}
        data={selectedUnit}
        mode={formMode}
        onSubmit={handleSubmit}
        loading={loading}
      />

      <ViewDetailsForm
        visible={viewDetailsVisible}
        onHide={() => setViewDetailsVisible(false)}
        title={unitViewConfig.title}
        description={unitViewConfig.description}
        data={selectedUnit || {}}
        fields={unitViewConfig.fields}
        sections={unitViewConfig.sections}
      />

      <DeleteConfirmationDialog
        visible={deleteDialogVisible}
        onHide={() => setDeleteDialogVisible(false)}
        onConfirm={handleDelete}
        title="Delete Unit"
        message="Are you sure you want to delete this unit? This action cannot be undone."
        itemName={selectedUnit?.name}
        loading={loading}
      />

      <Toast ref={toastRef} />
    </div>
  );
}
