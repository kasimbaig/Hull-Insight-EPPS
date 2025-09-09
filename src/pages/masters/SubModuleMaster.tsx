import { useState, useEffect, useRef, useCallback, useMemo } from "react";
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

interface Module {
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

interface SubModule {
  id: number;
  name: string;
  code: string;
  module: Module;
  parent: number | null;
  active: number;
  created_on: string;
  created_ip: string;
  modified_on: string;
  modified_ip: string | null;
  created_by: number | null;
  modified_by: number | null;
}

interface ApiResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: SubModule[];
}

interface ApiError {
  response?: {
    data?: {
      message?: string;
    };
  };
  message?: string;
}

export default function SubModuleMaster() {
  const [subModules, setSubModules] = useState<SubModule[]>([]);
  const [modules, setModules] = useState<Module[]>([]);
  const [totalRecords, setTotalRecords] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const [formVisible, setFormVisible] = useState(false);
  const [viewDetailsVisible, setViewDetailsVisible] = useState(false);
  const [deleteDialogVisible, setDeleteDialogVisible] = useState(false);
  const [selectedSubModule, setSelectedSubModule] = useState<SubModule | null>(null);
  const [formMode, setFormMode] = useState<'create' | 'edit'>('create');
  const [globalFilter, setGlobalFilter] = useState('');
  const [loading, setLoading] = useState(false);

  const { toast } = useToast();
  const toastRef = useRef<Toast>(null);

  // Load modules from API for dropdown
  const loadModules = useCallback(async () => {
    try {
      const response = await getRequest('master/modules/');
      
      // Handle different possible response structures
      let modulesData = [];
      if (response && response.results && Array.isArray(response.results)) {
        modulesData = response.results;
      } else if (response && Array.isArray(response)) {
        modulesData = response;
      } else if (response && response.data && Array.isArray(response.data)) {
        modulesData = response.data;
      } else {
        modulesData = [];
      }
      
      setModules(modulesData);
    } catch (error: unknown) {
      console.error('Error loading modules:', error);
      const apiError = error as ApiError;
      const errorMessage = apiError?.response?.data?.message || apiError?.message || 'Failed to load modules';
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
    }
  }, [toast]);

  // Load sub-modules from API
  const loadSubModules = useCallback(async (page = 0, search = '') => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        page: (page + 1).toString(),
        ...(search && { search })
      });
      
      const response = await getRequest(`master/submodules/?${params}`);
      setSubModules(response.results);
      setTotalRecords(response.count);
      setCurrentPage(page);
    } catch (error: unknown) {
      console.error('Error loading sub-modules:', error);
      const apiError = error as ApiError;
      const errorMessage = apiError?.response?.data?.message || apiError?.message || 'Failed to load sub-modules';
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }, [toast]);

  // Load data on component mount
  useEffect(() => {
    loadModules();
    loadSubModules();
  }, [loadModules, loadSubModules]);

  const subModuleFormConfig: FormConfig = useMemo(() => {
    const moduleOptions = modules?.map(module => ({
      value: module.id,
      label: module.name,
      data: module
    })) || [];
    
    return {
      title: "Sub-Module",
      description: "Manage sub-module information",
      sections: ["Basic Information"],
      fields: [
        {
          name: "name",
          label: "Sub-Module Name",
          type: "text",
          required: true,
          placeholder: "e.g., GPS Navigation",
          section: "Basic Information",
          validation: { min: 2, max: 100, message: "Name must be between 2-100 characters" }
        },
        {
          name: "code",
          label: "Sub-Module Code",
          type: "text",
          required: true,
          placeholder: "e.g., GPS001",
          section: "Basic Information",
          validation: { pattern: "^[A-Z0-9]+$", message: "Code must be alphanumeric uppercase" }
        },
        {
          name: "module",
          label: "Module",
          type: "select",
          required: true,
          placeholder: "Select Module",
          section: "Basic Information",
          options: moduleOptions
        },
        {
          name: "active",
          label: "Active Status",
          type: "checkbox",
          section: "Basic Information",
          checkboxLabel: "Active"
        }
      ]
    };
  }, [modules]);

  const subModuleViewConfig = {
    title: "Sub-Module Details",
    description: "View sub-module information",
    fields: [
      { key: 'name', label: 'Sub-Module Name', type: 'text' as const },
      { key: 'code', label: 'Sub-Module Code', type: 'text' as const },
      { key: 'module.name', label: 'Module Name', type: 'text' as const },
      { key: 'active', label: 'Active Status', type: 'boolean' as const },
      { key: 'created_on', label: 'Created On', type: 'date' as const },
      { key: 'modified_on', label: 'Modified On', type: 'date' as const }
    ],
    sections: [
      {
        title: 'Basic Information',
        fields: ['name', 'code', 'module.name', 'active']
      },
      {
        title: 'Audit Information',
        fields: ['created_on', 'modified_on']
      }
    ]
  };

  const openForm = (mode: 'create' | 'edit', subModule?: SubModule) => {
    setFormMode(mode);
    setSelectedSubModule(subModule || null);
    setFormVisible(true);
  };

  const openViewDetails = (subModule: SubModule) => {
    setSelectedSubModule(subModule);
    setViewDetailsVisible(true);
  };

  const openDeleteDialog = (subModule: SubModule) => {
    setSelectedSubModule(subModule);
    setDeleteDialogVisible(true);
  };

  const handleSubmit = async (formData: Record<string, unknown>) => {
    setLoading(true);
    try {
      if (formMode === 'create') {
        const payload = {
          name: formData.name as string,
          code: formData.code as string,
          module: typeof formData.module === 'object' ? (formData.module as { id: number }).id : formData.module as number
        };
        await postRequest('master/submodules/', payload);
        toast({
          title: "Success",
          description: "Sub-module created successfully",
        });
      } else if (formMode === 'edit' && selectedSubModule) {
        // Send same payload as create, just with ID added
        const payload = {
          name: formData.name as string,
          code: formData.code as string,
          module: typeof formData.module === 'object' ? (formData.module as { id: number }).id : formData.module as number,
          id: selectedSubModule.id
        };
        await postRequest('master/submodules/', payload);
        toast({
          title: "Success",
          description: "Sub-module updated successfully",
        });
      }
      setFormVisible(false);
      // Reload the data
      await loadSubModules(currentPage, globalFilter);
    } catch (error: unknown) {
      console.error('Error saving sub-module:', error);
      const apiError = error as ApiError;
      const errorMessage = apiError?.response?.data?.message || apiError?.message || 'Failed to save sub-module';
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
    if (!selectedSubModule) return;
    
    setLoading(true);
    try {
      await postRequest('master/submodules/', {
        id: selectedSubModule.id,
        delete: true
      });
      toast({
        title: "Success",
        description: "Sub-module deleted successfully",
      });
      setDeleteDialogVisible(false);
      setSelectedSubModule(null);
      // Reload the data
      await loadSubModules(currentPage, globalFilter);
    } catch (error: unknown) {
      console.error('Error deleting sub-module:', error);
      const apiError = error as ApiError;
      const errorMessage = apiError?.response?.data?.message || apiError?.message || 'Failed to delete sub-module';
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const actionBodyTemplate = (rowData: SubModule) => {
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

  const statusBodyTemplate = (rowData: SubModule) => {
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
      await loadSubModules(0, value);
    } catch (error) {
      // Error is already handled in loadSubModules function
      console.error('Search error:', error);
    }
  };

  const header = (
    <div className="flex flex-wrap gap-4 items-center justify-between p-6 bg-gradient-to-r from-[#8B3A3A]/5 to-[#8B3A3A]/10 rounded-xl border border-[#8B3A3A]/20">
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-[#8B3A3A] rounded-lg flex items-center justify-center">
            <span className="text-white text-lg">📦</span>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-foreground">Sub-Module Master</h2>
            <p className="text-sm text-muted-foreground">Manage vessel sub-modules and components</p>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="h-4 w-4 text-muted-foreground absolute left-3 top-1/2 transform -translate-y-1/2" />
            <InputText
              value={globalFilter}
              onChange={(e) => handleSearch(e.target.value)}
              placeholder="Search sub-modules, names, codes, modules..."
              className="w-80 pl-10 pr-4 py-3 border-2 border-border rounded-xl focus:border-[#8B3A3A] focus:ring-2 focus:ring-[#8B3A3A]/20 bg-background transition-all duration-200"
            />
          </div>
        </div>
      </div>
      
      <Button
        icon={<Plus className="h-4 w-4" />}
        label="Add Sub-Module"
        onClick={() => openForm('create')}
        className="bg-[#8B3A3A] text-white hover:bg-[#8B3A3A]/90 px-6 py-3 rounded-xl font-semibold shadow-md hover:shadow-lg transition-all duration-200"
      />
    </div>
  );

  return (
    <div className="p-6 space-y-6">
      <div className="bg-white rounded-xl shadow-lg border border-border overflow-hidden">
        <DataTable
          value={subModules}
          header={header}
          paginator
          rows={rowsPerPage}
          totalRecords={totalRecords}
          first={currentPage * rowsPerPage}
          lazy
          onPage={async (e) => {
            try {
              await loadSubModules(e.page, globalFilter);
            } catch (error) {
              // Error is already handled in loadSubModules function
              console.error('Pagination error:', error);
            }
          }}
          loading={loading}
          emptyMessage="No sub-modules found"
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
            field="module.name" 
            header="Module" 
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
        config={subModuleFormConfig}
        data={selectedSubModule}
        mode={formMode}
        onSubmit={handleSubmit}
        loading={loading}
      />

      <ViewDetailsForm
        visible={viewDetailsVisible}
        onHide={() => setViewDetailsVisible(false)}
        title={subModuleViewConfig.title}
        description={subModuleViewConfig.description}
        data={selectedSubModule || {}}
        fields={subModuleViewConfig.fields}
        sections={subModuleViewConfig.sections}
      />

      <DeleteConfirmationDialog
        visible={deleteDialogVisible}
        onHide={() => setDeleteDialogVisible(false)}
        onConfirm={handleDelete}
        title="Delete Sub-Module"
        message="Are you sure you want to delete this sub-module? This action cannot be undone."
        itemName={selectedSubModule?.name}
        loading={loading}
      />

      <Toast ref={toastRef} />
    </div>
  );
}
