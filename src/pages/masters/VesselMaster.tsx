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

interface Vessel {
  id: number;
  name: string;
  code: string;
  classofvessel: { id: number; code: string; name: string; active: number; created_on: string; created_ip: string; modified_on: string; modified_ip: string | null; created_by: number; modified_by: number | null };
  vesseltype: { id: number; code: string; name: string; active: number; created_on: string; created_ip: string; modified_on: string; modified_ip: string | null; created_by: number; modified_by: number | null };
  yard: { id: number; code: string; name: string; active: number; created_on: string; created_ip: string; modified_on: string; modified_ip: string | null; created_by: number; modified_by: number | null };
  command: { id: number; code: string; name: string; active: number; created_on: string; created_ip: string; modified_on: string; modified_ip: string | null; created_by: number; modified_by: number | null };
  year_of_build: number;
  year_of_delivery: number;
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
  results: Vessel[];
}

interface ApiError {
  response?: {
    data?: {
      message?: string;
    };
  };
  message?: string;
}

export default function VesselMaster() {
  const [vessels, setVessels] = useState<Vessel[]>([]);
  const [vesselTypes, setVesselTypes] = useState<any[]>([]);
  const [classOfVessels, setClassOfVessels] = useState<any[]>([]);
  const [dockyards, setDockyards] = useState<any[]>([]);
  const [commands, setCommands] = useState<any[]>([]);
  const [totalRecords, setTotalRecords] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const [formVisible, setFormVisible] = useState(false);
  const [viewDetailsVisible, setViewDetailsVisible] = useState(false);
  const [deleteDialogVisible, setDeleteDialogVisible] = useState(false);
  const [selectedVessel, setSelectedVessel] = useState<Vessel | null>(null);
  const [formMode, setFormMode] = useState<'create' | 'edit'>('create');
  const [globalFilter, setGlobalFilter] = useState('');
  const [loading, setLoading] = useState(false);

  const { toast } = useToast();
  const toastRef = useRef<Toast>(null);

  // Load dropdown data from APIs
  const loadVesselTypes = useCallback(async () => {
    try {
      const response = await getRequest('master/vesseltypes/');
      let vesselTypesData = [];
      if (response && response.results && Array.isArray(response.results)) {
        vesselTypesData = response.results;
      } else if (response && Array.isArray(response)) {
        vesselTypesData = response;
      } else if (response && response.data && Array.isArray(response.data)) {
        vesselTypesData = response.data;
      }
      setVesselTypes(vesselTypesData);
    } catch (error: unknown) {
      console.error('Error loading vessel types:', error);
    }
  }, []);

  const loadClassOfVessels = useCallback(async () => {
    try {
      const response = await getRequest('master/classofvessels/');
      let classOfVesselsData = [];
      if (response && response.results && Array.isArray(response.results)) {
        classOfVesselsData = response.results;
      } else if (response && Array.isArray(response)) {
        classOfVesselsData = response;
      } else if (response && response.data && Array.isArray(response.data)) {
        classOfVesselsData = response.data;
      }
      setClassOfVessels(classOfVesselsData);
    } catch (error: unknown) {
      console.error('Error loading class of vessels:', error);
    }
  }, []);

  const loadDockyards = useCallback(async () => {
    try {
      const response = await getRequest('master/dockyards/');
      let dockyardsData = [];
      if (response && response.results && Array.isArray(response.results)) {
        dockyardsData = response.results;
      } else if (response && Array.isArray(response)) {
        dockyardsData = response;
      } else if (response && response.data && Array.isArray(response.data)) {
        dockyardsData = response.data;
      }
      setDockyards(dockyardsData);
    } catch (error: unknown) {
      console.error('Error loading dockyards:', error);
    }
  }, []);

  const loadCommands = useCallback(async () => {
    try {
      const response = await getRequest('master/commands/');
      let commandsData = [];
      if (response && response.results && Array.isArray(response.results)) {
        commandsData = response.results;
      } else if (response && Array.isArray(response)) {
        commandsData = response;
      } else if (response && response.data && Array.isArray(response.data)) {
        commandsData = response.data;
      }
      setCommands(commandsData);
    } catch (error: unknown) {
      console.error('Error loading commands:', error);
    }
  }, []);

  // Load vessels from API
  const loadVessels = useCallback(async (page = 0, search = '') => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        page: (page + 1).toString(),
        ...(search && { search })
      });
      
      const response = await getRequest(`master/vessels/?${params}`);
      setVessels(response.results);
      setTotalRecords(response.count);
      setCurrentPage(page);
    } catch (error: unknown) {
      console.error('Error loading vessels:', error);
      const apiError = error as ApiError;
      const errorMessage = apiError?.response?.data?.message || apiError?.message || 'Failed to load vessels';
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
    loadVesselTypes();
    loadClassOfVessels();
    loadDockyards();
    loadCommands();
    loadVessels();
  }, [loadVesselTypes, loadClassOfVessels, loadDockyards, loadCommands, loadVessels]);

  const vesselFormConfig: FormConfig = useMemo(() => ({
    title: "Vessel",
    description: "Manage vessel information and specifications",
    sections: ["Basic Information", "Specifications", "Administrative"],
    fields: [
      {
        name: "name",
        label: "Vessel Name",
        type: "text",
        required: true,
        placeholder: "e.g., INS Vikrant",
        section: "Basic Information",
        validation: { min: 2, max: 100, message: "Name must be between 2-100 characters" }
      },
      {
        name: "vesseltype",
        label: "Vessel Type",
        type: "select",
        required: true,
        section: "Basic Information",
        options: vesselTypes?.map(item => ({
          value: item.id,
          label: item.name,
          data: item
        })) || []
      },
      {
        name: "classofvessel",
        label: "Class of Vessel",
        type: "select",
        required: true,
        section: "Basic Information",
        options: classOfVessels?.map(item => ({
          value: item.id,
          label: item.name,
          data: item
        })) || []
      },
      {
        name: "yard",
        label: "Dockyard",
        type: "select",
        required: true,
        section: "Basic Information",
        options: dockyards?.map(item => ({
          value: item.id,
          label: item.name,
          data: item
        })) || []
      },
      {
        name: "command",
        label: "Naval Command",
        type: "select",
        required: true,
        section: "Administrative",
        options: commands?.map(item => ({
          value: item.id,
          label: item.name,
          data: item
        })) || []
      },
      {
        name: "year_of_build",
        label: "Year of Build",
        type: "text",
        required: true,
        placeholder: "e.g., 2015",
        section: "Specifications",
        validation: { pattern: "^[0-9]{4}$", message: "Please enter a valid 4-digit year" }
      },
      {
        name: "year_of_delivery",
        label: "Year of Delivery",
        type: "text",
        required: true,
        placeholder: "e.g., 2022",
        section: "Specifications",
        validation: { pattern: "^[0-9]{4}$", message: "Please enter a valid 4-digit year" }
      },
      {
        name: "active",
        label: "Status",
        type: "checkbox",
        section: "Administrative",
        checkboxLabel: "Active"
      }
    ]
  }), [vesselTypes, classOfVessels, dockyards, commands]);

  const vesselViewConfig = {
    title: "Vessel Details",
    description: "View vessel information and specifications",
    fields: [
      { key: 'name', label: 'Vessel Name', type: 'text' as const },
      { key: 'code', label: 'Vessel Code', type: 'text' as const },
      { key: 'vesseltype.name', label: 'Vessel Type', type: 'object' as const },
      { key: 'classofvessel.name', label: 'Class of Vessel', type: 'object' as const },
      { key: 'yard.name', label: 'Dockyard', type: 'object' as const },
      { key: 'command.name', label: 'Naval Command', type: 'object' as const },
      { key: 'year_of_build', label: 'Year of Build', type: 'number' as const },
      { key: 'year_of_delivery', label: 'Year of Delivery', type: 'number' as const },
      { key: 'active', label: 'Active Status', type: 'boolean' as const },
      { key: 'created_on', label: 'Created On', type: 'date' as const },
      { key: 'modified_on', label: 'Modified On', type: 'date' as const }
    ],
    sections: [
      {
        title: 'Basic Information',
        fields: ['name', 'code', 'vesseltype.name', 'classofvessel.name', 'yard.name']
      },
      {
        title: 'Specifications',
        fields: ['year_of_build', 'year_of_delivery']
      },
      {
        title: 'Administrative',
        fields: ['command.name', 'active']
      },
      {
        title: 'Audit Information',
        fields: ['created_on', 'modified_on']
      }
    ]
  };

  const openForm = (mode: 'create' | 'edit', vessel?: Vessel) => {
    setFormMode(mode);
    setSelectedVessel(vessel || null);
    setFormVisible(true);
  };

  const openViewDetails = (vessel: Vessel) => {
    setSelectedVessel(vessel);
    setViewDetailsVisible(true);
  };

  const openDeleteDialog = (vessel: Vessel) => {
    setSelectedVessel(vessel);
    setDeleteDialogVisible(true);
  };

  const handleSubmit = async (formData: Record<string, unknown>) => {
    setLoading(true);
    try {
      if (formMode === 'create') {
        // Send payload according to API structure
        const payload = {
          name: formData.name as string,
          classofvessel: typeof formData.classofvessel === 'object' ? (formData.classofvessel as any).id : formData.classofvessel as number,
          vesseltype: typeof formData.vesseltype === 'object' ? (formData.vesseltype as any).id : formData.vesseltype as number,
          yard: typeof formData.yard === 'object' ? (formData.yard as any).id : formData.yard as number,
          command: typeof formData.command === 'object' ? (formData.command as any).id : formData.command as number,
          year_of_build: parseInt(formData.year_of_build as string),
          year_of_delivery: parseInt(formData.year_of_delivery as string)
        };
        await postRequest('master/vessels/', payload);
        toast({
          title: "Success",
          description: "Vessel created successfully",
        });
      } else if (formMode === 'edit' && selectedVessel) {
        // Send same payload as create, just with ID added
        const payload = {
          name: formData.name as string,
          classofvessel: typeof formData.classofvessel === 'object' ? (formData.classofvessel as any).id : formData.classofvessel as number,
          vesseltype: typeof formData.vesseltype === 'object' ? (formData.vesseltype as any).id : formData.vesseltype as number,
          yard: typeof formData.yard === 'object' ? (formData.yard as any).id : formData.yard as number,
          command: typeof formData.command === 'object' ? (formData.command as any).id : formData.command as number,
          year_of_build: parseInt(formData.year_of_build as string),
          year_of_delivery: parseInt(formData.year_of_delivery as string),
          id: selectedVessel.id
        };
        await postRequest('master/vessels/', payload);
        toast({
          title: "Success",
          description: "Vessel updated successfully",
        });
      }
      setFormVisible(false);
      // Reload the data
      await loadVessels(currentPage, globalFilter);
    } catch (error: unknown) {
      console.error('Error saving vessel:', error);
      const apiError = error as ApiError;
      const errorMessage = apiError?.response?.data?.message || apiError?.message || 'Failed to save vessel';
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
    if (!selectedVessel) return;
    
    setLoading(true);
    try {
      await postRequest('master/vessels/', {
        id: selectedVessel.id,
        delete: true
      });
      toast({
        title: "Success",
        description: "Vessel deleted successfully",
      });
      setDeleteDialogVisible(false);
      setSelectedVessel(null);
      // Reload the data
      await loadVessels(currentPage, globalFilter);
    } catch (error: unknown) {
      console.error('Error deleting vessel:', error);
      const apiError = error as ApiError;
      const errorMessage = apiError?.response?.data?.message || apiError?.message || 'Failed to delete vessel';
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const actionBodyTemplate = (rowData: Vessel) => {
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

  const statusBodyTemplate = (rowData: Vessel) => {
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
      await loadVessels(0, value);
    } catch (error) {
      // Error is already handled in loadVessels function
      console.error('Search error:', error);
    }
  };

  const header = (
    <div className="flex flex-wrap gap-4 items-center justify-between p-6 bg-gradient-to-r from-[#00809D]/5 to-[#00809D]/10 rounded-xl border border-[#00809D]/20">
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-[#00809D] rounded-lg flex items-center justify-center">
            <span className="text-white text-lg">⚓</span>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-foreground">Vessel Master</h2>
            <p className="text-sm text-muted-foreground">Manage naval vessels and specifications</p>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="h-4 w-4 text-muted-foreground absolute left-3 top-1/2 transform -translate-y-1/2" />
            <InputText
              value={globalFilter}
              onChange={(e) => handleSearch(e.target.value)}
              placeholder="Search vessels, names, codes, shipyards..."
              className="w-80 pl-10 pr-4 py-3 border-2 border-border rounded-xl focus:border-[#00809D] focus:ring-2 focus:ring-[#00809D]/20 bg-background transition-all duration-200"
            />
          </div>
        </div>
      </div>
      
      <Button
        icon={<Plus className="h-4 w-4" />}
        label="Add Vessel"
        onClick={() => openForm('create')}
        className="bg-[#00809D] text-white hover:bg-[#00809D]/90 px-6 py-3 rounded-xl font-semibold shadow-md hover:shadow-lg transition-all duration-200"
      />
    </div>
  );

  return (
    <div className="p-6 space-y-6">
      <div className="bg-white rounded-xl shadow-lg border border-border overflow-hidden">
        <DataTable
          value={vessels}
          header={header}
          paginator
          rows={rowsPerPage}
          totalRecords={totalRecords}
          first={currentPage * rowsPerPage}
          lazy
          onPage={async (e) => {
            try {
              await loadVessels(e.page, globalFilter);
            } catch (error) {
              // Error is already handled in loadVessels function
              console.error('Pagination error:', error);
            }
          }}
          loading={loading}
          emptyMessage="No vessels found"
          className="vessel-datatable"
        >
          <Column 
            field="name" 
            header="Vessel Name" 
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
            field="vesseltype.name" 
            header="Type" 
            className="min-w-[150px]"
            headerClassName="master-table-header"
          />
          <Column 
            field="classofvessel.name" 
            header="Class" 
            className="min-w-[150px]"
            headerClassName="master-table-header"
          />
          <Column 
            field="yard.name" 
            header="Dockyard" 
            className="min-w-[180px]"
            headerClassName="master-table-header"
          />
          <Column 
            field="command.name" 
            header="Command" 
            className="min-w-[150px]"
            headerClassName="master-table-header"
          />
          <Column 
            field="year_of_build" 
            header="Year of Build" 
            className="min-w-[120px]"
            headerClassName="master-table-header"
          />
          <Column 
            field="year_of_delivery" 
            header="Year of Delivery" 
            className="min-w-[130px]"
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
        config={vesselFormConfig}
        data={selectedVessel}
        mode={formMode}
        onSubmit={handleSubmit}
        loading={loading}
      />

      <ViewDetailsForm
        visible={viewDetailsVisible}
        onHide={() => setViewDetailsVisible(false)}
        title={vesselViewConfig.title}
        description={vesselViewConfig.description}
        data={selectedVessel || {}}
        fields={vesselViewConfig.fields}
        sections={vesselViewConfig.sections}
      />

      <DeleteConfirmationDialog
        visible={deleteDialogVisible}
        onHide={() => setDeleteDialogVisible(false)}
        onConfirm={handleDelete}
        title="Delete Vessel"
        message="Are you sure you want to delete this vessel? This action cannot be undone."
        itemName={selectedVessel?.name}
        loading={loading}
      />

      <Toast ref={toastRef} />
    </div>
  );
}