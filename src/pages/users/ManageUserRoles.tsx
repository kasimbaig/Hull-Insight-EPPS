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
import { getRequest, postRequest, putRequest, deleteRequest } from "@/services/apiService";
import { useToast } from "@/hooks/use-toast";

interface UserRole {
  id: number;
  code: string;
  name: string;
  description: string;
  active: number;
}

// API response can be either a direct array or paginated response
type ApiResponse = UserRole[] | {
  count: number;
  next: string | null;
  previous: string | null;
  results: UserRole[];
};

interface ApiError {
  response?: {
    data?: {
      message?: string;
    };
  };
  message?: string;
}

export default function ManageUserRoles() {
  const [userRoles, setUserRoles] = useState<UserRole[]>([]);
  const [allUserRoles, setAllUserRoles] = useState<UserRole[]>([]); // Store all roles for client-side filtering
  const [totalRecords, setTotalRecords] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const [formVisible, setFormVisible] = useState(false);
  const [viewDetailsVisible, setViewDetailsVisible] = useState(false);
  const [deleteDialogVisible, setDeleteDialogVisible] = useState(false);
  const [selectedUserRole, setSelectedUserRole] = useState<UserRole | null>(null);
  const [formMode, setFormMode] = useState<'create' | 'edit'>('create');
  const [globalFilter, setGlobalFilter] = useState('');
  const [loading, setLoading] = useState(false);

  const { toast } = useToast();
  const toastRef = useRef<Toast>(null);

  // Load user roles from API
  const loadUserRoles = useCallback(async (page = 0, search = '') => {
    setLoading(true);
    try {
      const response = await getRequest(`access/user-roles/`);
      
      // Handle both direct array response and paginated response
      if (Array.isArray(response)) {
        // Direct array response - store all roles and implement client-side filtering and pagination
        setAllUserRoles(response);
        
        let filteredRoles = response;
        
        // Apply search filter if provided
        if (search) {
          filteredRoles = response.filter(role => 
            role.name.toLowerCase().includes(search.toLowerCase()) ||
            role.code.toLowerCase().includes(search.toLowerCase()) ||
            role.description.toLowerCase().includes(search.toLowerCase())
          );
        }
        
        // Apply pagination
        const startIndex = page * rowsPerPage;
        const endIndex = startIndex + rowsPerPage;
        const paginatedRoles = filteredRoles.slice(startIndex, endIndex);
        
        setUserRoles(paginatedRoles);
        setTotalRecords(filteredRoles.length);
        setCurrentPage(page);
      } else {
        // Paginated response
        setUserRoles(response.results);
        setTotalRecords(response.count);
        setCurrentPage(page);
      }
    } catch (error: unknown) {
      console.error('Error loading user roles:', error);
      const apiError = error as ApiError;
      const errorMessage = apiError?.response?.data?.message || apiError?.message || 'Failed to load user roles';
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }, [rowsPerPage, toast]);

  // Load user roles on component mount
  useEffect(() => {
    loadUserRoles();
  }, [loadUserRoles]);

  const userRoleFormConfig: FormConfig = {
    title: "User Role",
    description: "Manage user role information",
    sections: ["Basic Information"],
    fields: [
      {
        name: "name",
        label: "Role Name",
        type: "text",
        required: true,
        placeholder: "e.g., Super Admin",
        section: "Basic Information",
        validation: { min: 2, max: 50, message: "Name must be between 2-50 characters" }
      },
      {
        name: "code",
        label: "Role Code",
        type: "text",
        required: true,
        placeholder: "e.g., SUPER_ADMIN",
        section: "Basic Information",
        validation: { pattern: "^[A-Z0-9_]+$", message: "Code must be alphanumeric uppercase with underscores" }
      },
      {
        name: "description",
        label: "Description",
        type: "textarea",
        required: true,
        placeholder: "e.g., With all Access",
        section: "Basic Information",
        validation: { min: 5, max: 200, message: "Description must be between 5-200 characters" }
      },
      {
        name: "active",
        label: "Active Status",
        type: "checkbox",
        section: "Basic Information"
      }
    ]
  };

  const userRoleViewConfig = {
    title: "User Role Details",
    description: "View user role information",
    fields: [
      { key: 'name', label: 'Role Name', type: 'text' as const },
      { key: 'code', label: 'Role Code', type: 'text' as const },
      { key: 'description', label: 'Description', type: 'text' as const },
      { key: 'active', label: 'Active Status', type: 'boolean' as const }
    ],
    sections: [
      {
        title: 'Basic Information',
        fields: ['name', 'code', 'description', 'active']
      }
    ]
  };

  const openForm = (mode: 'create' | 'edit', userRole?: UserRole) => {
    setFormMode(mode);
    setSelectedUserRole(userRole || null);
    setFormVisible(true);
  };

  const openViewDetails = (userRole: UserRole) => {
    setSelectedUserRole(userRole);
    setViewDetailsVisible(true);
  };

  const openDeleteDialog = (userRole: UserRole) => {
    setSelectedUserRole(userRole);
    setDeleteDialogVisible(true);
  };

  const handleSubmit = async (formData: Record<string, unknown>) => {
    setLoading(true);
    try {
      if (formMode === 'create') {
        // Send name, code, and description for create
        const payload = {
          name: formData.name as string,
          code: formData.code as string,
          description: formData.description as string
        };
        await postRequest('access/user-roles/', payload);
        toast({
          title: "Success",
          description: "User role created successfully",
        });
      } else if (formMode === 'edit' && selectedUserRole) {
        // Send name, code, and description for edit using PUT method
        const payload = {
          name: formData.name as string,
          code: formData.code as string,
          description: formData.description as string
        };
        await putRequest(`access/user-roles/${selectedUserRole.id}/`, payload);
        toast({
          title: "Success",
          description: "User role updated successfully",
        });
      }
      setFormVisible(false);
      // Reload the data
      await loadUserRoles(currentPage, globalFilter);
    } catch (error: unknown) {
      console.error('Error saving user role:', error);
      const apiError = error as ApiError;
      const errorMessage = apiError?.response?.data?.message || apiError?.message || 'Failed to save user role';
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
    if (!selectedUserRole) return;
    
    setLoading(true);
    try {
      await deleteRequest(`access/user-roles/${selectedUserRole.id}/`);
      toast({
        title: "Success",
        description: "User role deleted successfully",
      });
      setDeleteDialogVisible(false);
      setSelectedUserRole(null);
      // Reload the data
      await loadUserRoles(currentPage, globalFilter);
    } catch (error: unknown) {
      console.error('Error deleting user role:', error);
      const apiError = error as ApiError;
      const errorMessage = apiError?.response?.data?.message || apiError?.message || 'Failed to delete user role';
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const actionBodyTemplate = (rowData: UserRole) => {
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

  const statusBodyTemplate = (rowData: UserRole) => {
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
  const handleSearch = (value: string) => {
    setGlobalFilter(value);
    
    // Use client-side filtering if we have allUserRoles stored
    if (allUserRoles.length > 0) {
      let filteredRoles = allUserRoles;
      
      // Apply search filter if provided
      if (value) {
        filteredRoles = allUserRoles.filter(role => 
          role.name.toLowerCase().includes(value.toLowerCase()) ||
          role.code.toLowerCase().includes(value.toLowerCase()) ||
          role.description.toLowerCase().includes(value.toLowerCase())
        );
      }
      
      // Apply pagination
      const startIndex = 0;
      const endIndex = rowsPerPage;
      const paginatedRoles = filteredRoles.slice(startIndex, endIndex);
      
      setUserRoles(paginatedRoles);
      setTotalRecords(filteredRoles.length);
      setCurrentPage(0);
    } else {
      // Fallback to API search if allUserRoles is not available
      loadUserRoles(0, value);
    }
  };

  const header = (
    <div className="flex flex-wrap gap-4 items-center justify-between p-6 bg-gradient-to-r from-[#8B3A3A]/5 to-[#8B3A3A]/10 rounded-xl border border-[#8B3A3A]/20">
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-[#8B3A3A] rounded-lg flex items-center justify-center">
            <span className="text-white text-lg">👥</span>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-foreground">Manage User Roles</h2>
            <p className="text-sm text-muted-foreground">Manage user roles and their permissions</p>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="h-4 w-4 text-muted-foreground absolute left-3 top-1/2 transform -translate-y-1/2" />
            <InputText
              value={globalFilter}
              onChange={(e) => handleSearch(e.target.value)}
              placeholder="Search roles, names, codes..."
              className="w-80 pl-10 pr-4 py-3 border-2 border-border rounded-xl focus:border-[#8B3A3A] focus:ring-2 focus:ring-[#8B3A3A]/20 bg-background transition-all duration-200"
            />
          </div>
        </div>
      </div>
      
      <Button
        icon={<Plus className="h-4 w-4" />}
        label="Add Role"
        onClick={() => openForm('create')}
        className="bg-[#8B3A3A] text-white hover:bg-[#8B3A3A]/90 px-6 py-3 rounded-xl font-semibold shadow-md hover:shadow-lg transition-all duration-200"
      />
    </div>
  );

  return (
    <div className="p-6 space-y-6">
      <div className="bg-white rounded-xl shadow-lg border border-border overflow-hidden">
        <DataTable
          value={userRoles}
          header={header}
          paginator
          rows={rowsPerPage}
          totalRecords={totalRecords}
          first={currentPage * rowsPerPage}
          lazy
          onPage={(e) => {
            // Use client-side pagination if we have allUserRoles stored
            if (allUserRoles.length > 0) {
              let filteredRoles = allUserRoles;
              
              // Apply search filter if provided
              if (globalFilter) {
                filteredRoles = allUserRoles.filter(role => 
                  role.name.toLowerCase().includes(globalFilter.toLowerCase()) ||
                  role.code.toLowerCase().includes(globalFilter.toLowerCase()) ||
                  role.description.toLowerCase().includes(globalFilter.toLowerCase())
                );
              }
              
              // Apply pagination
              const startIndex = e.page * rowsPerPage;
              const endIndex = startIndex + rowsPerPage;
              const paginatedRoles = filteredRoles.slice(startIndex, endIndex);
              
              setUserRoles(paginatedRoles);
              setTotalRecords(filteredRoles.length);
              setCurrentPage(e.page);
            } else {
              // Fallback to API pagination if allUserRoles is not available
              loadUserRoles(e.page, globalFilter);
            }
          }}
          loading={loading}
          emptyMessage="No user roles found"
          className="vessel-datatable"
        >
          <Column 
            field="name" 
            header="Role Name" 
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
            field="description" 
            header="Description" 
            className="min-w-[250px]"
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
        config={userRoleFormConfig}
        data={selectedUserRole}
        mode={formMode}
        onSubmit={handleSubmit}
        loading={loading}
      />

      <ViewDetailsForm
        visible={viewDetailsVisible}
        onHide={() => setViewDetailsVisible(false)}
        title={userRoleViewConfig.title}
        description={userRoleViewConfig.description}
        data={selectedUserRole || {}}
        fields={userRoleViewConfig.fields}
        sections={userRoleViewConfig.sections}
      />

      <DeleteConfirmationDialog
        visible={deleteDialogVisible}
        onHide={() => setDeleteDialogVisible(false)}
        onConfirm={handleDelete}
        title="Delete User Role"
        message="Are you sure you want to delete this user role? This action cannot be undone."
        itemName={selectedUserRole?.name}
        loading={loading}
      />

      <Toast ref={toastRef} />
    </div>
  );
}
