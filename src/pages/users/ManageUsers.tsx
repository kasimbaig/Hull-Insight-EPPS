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

interface User {
  id: number;
  last_login: string | null;
  loginname: string;
  email: string;
  first_name: string;
  last_name: string;
  status: number;
  hrcdf_designation: string | null;
  hrcdf_desig?: string | null; // For form compatibility
  rankCode: string | null;
  rankName: string | null;
  created_on: string;
  phone_no: string | null;
  unit: number | null;
  vessel: number | null;
  process: number | null;
  role: number | null;
  user_role?: number; // For form compatibility
  role_name: string | null;
  process_name: string | null;
  ad_user?: string | boolean; // For form compatibility
}

interface ApiResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: {
    status: number;
    data: User[];
  };
}

interface ApiError {
  response?: {
    data?: {
      message?: string;
    };
  };
  message?: string;
}

export default function ManageUsers() {
  const [users, setUsers] = useState<User[]>([]);
  const [allUsers, setAllUsers] = useState<User[]>([]); // Store all users for client-side filtering
  const [totalRecords, setTotalRecords] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const [formVisible, setFormVisible] = useState(false);
  const [viewDetailsVisible, setViewDetailsVisible] = useState(false);
  const [deleteDialogVisible, setDeleteDialogVisible] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [formMode, setFormMode] = useState<'create' | 'edit'>('create');
  const [globalFilter, setGlobalFilter] = useState('');
  const [loading, setLoading] = useState(false);

  const { toast } = useToast();
  const toastRef = useRef<Toast>(null);

  // Load users from API
  const loadUsers = useCallback(async (page = 0, search = '') => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        page: (page + 1).toString(),
        ...(search && { search })
      });
      
      const response = await getRequest(`api/auth/users/?${params}`);
      
      // Handle the nested response structure
      if (response.results && response.results.data) {
        const userData = response.results.data;
        setAllUsers(userData);
        
        let filteredUsers = userData;
        
        // Apply search filter if provided
        if (search) {
          filteredUsers = userData.filter(user => 
            user.loginname.toLowerCase().includes(search.toLowerCase()) ||
            user.email.toLowerCase().includes(search.toLowerCase()) ||
            user.first_name.toLowerCase().includes(search.toLowerCase()) ||
            user.last_name.toLowerCase().includes(search.toLowerCase()) ||
            (user.role_name && user.role_name.toLowerCase().includes(search.toLowerCase())) ||
            (user.process_name && user.process_name.toLowerCase().includes(search.toLowerCase()))
          );
        }
        
        // Apply pagination
        const startIndex = page * rowsPerPage;
        const endIndex = startIndex + rowsPerPage;
        const paginatedUsers = filteredUsers.slice(startIndex, endIndex);
        
        setUsers(paginatedUsers);
        setTotalRecords(filteredUsers.length);
        setCurrentPage(page);
      } else {
        // Fallback for different response structure
        setUsers([]);
        setTotalRecords(0);
        setCurrentPage(page);
      }
    } catch (error: unknown) {
      console.error('Error loading users:', error);
      const apiError = error as ApiError;
      const errorMessage = apiError?.response?.data?.message || apiError?.message || 'Failed to load users';
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }, [rowsPerPage, toast]);

  // Load users on component mount
  useEffect(() => {
    loadUsers();
  }, [loadUsers]);

  const userFormConfig: FormConfig = {
    title: "User",
    description: "Manage user information",
    sections: ["Basic Information", "Role & Process Information", "Additional Information"],
    fields: [
      {
        name: "first_name",
        label: "First Name",
        type: "text",
        required: true,
        placeholder: "e.g., John",
        section: "Basic Information",
        validation: { min: 2, max: 50, message: "First name must be between 2-50 characters" }
      },
      {
        name: "last_name",
        label: "Last Name",
        type: "text",
        required: true,
        placeholder: "e.g., Doe",
        section: "Basic Information",
        validation: { min: 2, max: 50, message: "Last name must be between 2-50 characters" }
      },
      {
        name: "loginname",
        label: "Login Name",
        type: "text",
        required: true,
        placeholder: "e.g., john.doe",
        section: "Basic Information",
        validation: { min: 3, max: 30, message: "Login name must be between 3-30 characters" }
      },
      {
        name: "email",
        label: "Email",
        type: "email",
        required: true,
        placeholder: "e.g., john.doe@example.com",
        section: "Basic Information",
        validation: { pattern: "^[^@]+@[^@]+\\.[^@]+$", message: "Please enter a valid email address" }
      },
      {
        name: "password",
        label: "Password",
        type: "text",
        required: true,
        placeholder: "Enter password",
        section: "Basic Information",
        validation: { min: 6, message: "Password must be at least 6 characters" }
      },
      {
        name: "phone_no",
        label: "Phone Number",
        type: "text",
        required: false,
        placeholder: "e.g., +1234567890",
        section: "Basic Information"
      },
      {
        name: "user_role",
        label: "User Role",
        type: "number",
        required: true,
        placeholder: "e.g., 2",
        section: "Role & Process Information",
        validation: { min: 1, message: "Please select a valid role" }
      },
      {
        name: "unit",
        label: "Unit",
        type: "number",
        required: true,
        placeholder: "e.g., 1",
        section: "Role & Process Information",
        validation: { min: 1, message: "Please select a valid unit" }
      },
      {
        name: "hrcdf_desig",
        label: "HRCDF Designation",
        type: "text",
        required: false,
        placeholder: "e.g., Manager",
        section: "Role & Process Information"
      },
      {
        name: "rankCode",
        label: "Rank Code",
        type: "text",
        required: false,
        placeholder: "e.g., CAPT",
        section: "Role & Process Information"
      },
      {
        name: "rankName",
        label: "Rank Name",
        type: "text",
        required: false,
        placeholder: "e.g., Captain",
        section: "Role & Process Information"
      },
      {
        name: "status",
        label: "Active Status",
        type: "checkbox",
        section: "Additional Information"
      },
      {
        name: "ad_user",
        label: "AD User",
        type: "checkbox",
        section: "Additional Information"
      }
    ]
  };

  const userViewConfig = {
    title: "User Details",
    description: "View user information",
    fields: [
      { key: 'loginname', label: 'Login Name', type: 'text' as const },
      { key: 'email', label: 'Email', type: 'text' as const },
      { key: 'first_name', label: 'First Name', type: 'text' as const },
      { key: 'last_name', label: 'Last Name', type: 'text' as const },
      { key: 'phone_no', label: 'Phone Number', type: 'text' as const },
      { key: 'role_name', label: 'Role', type: 'text' as const },
      { key: 'process_name', label: 'Process', type: 'text' as const },
      { key: 'rankCode', label: 'Rank Code', type: 'text' as const },
      { key: 'rankName', label: 'Rank Name', type: 'text' as const },
      { key: 'hrcdf_designation', label: 'HRCDF Designation', type: 'text' as const },
      { key: 'status', label: 'Status', type: 'boolean' as const },
      { key: 'last_login', label: 'Last Login', type: 'date' as const },
      { key: 'created_on', label: 'Created On', type: 'date' as const }
    ],
    sections: [
      {
        title: 'Basic Information',
        fields: ['loginname', 'email', 'first_name', 'last_name', 'phone_no']
      },
      {
        title: 'Role & Process Information',
        fields: ['role_name', 'process_name', 'rankCode', 'rankName', 'hrcdf_designation']
      },
      {
        title: 'Status & Activity',
        fields: ['status', 'last_login', 'created_on']
      }
    ]
  };

  const openForm = (mode: 'create' | 'edit', user?: User) => {
    setFormMode(mode);
    setSelectedUser(user || null);
    setFormVisible(true);
  };

  const openViewDetails = (user: User) => {
    setSelectedUser(user);
    setViewDetailsVisible(true);
  };

  const openDeleteDialog = (user: User) => {
    setSelectedUser(user);
    setDeleteDialogVisible(true);
  };

  const handleSubmit = async (formData: Record<string, unknown>) => {
    setLoading(true);
    try {
      if (formMode === 'create') {
        // Send user data for create
        const payload = {
          first_name: formData.first_name as string,
          last_name: formData.last_name as string,
          loginname: formData.loginname as string,
          email: formData.email as string,
          password: formData.password as string,
          user_role: formData.user_role as number,
          hrcdf_desig: formData.hrcdf_desig as string || "",
          unit: formData.unit as number,
          status: 1,
          ad_user: formData.ad_user ? "true" : "false",
          rankCode: formData.rankCode as string || "",
          rankName: formData.rankName as string || "",
          phone_no: formData.phone_no as string || null
        };
        await postRequest('api/auth/users/', payload);
        toast({
          title: "Success",
          description: "User created successfully",
        });
      } else if (formMode === 'edit' && selectedUser) {
        // Send user data for edit using PUT method
        const payload = {
          first_name: formData.first_name as string,
          last_name: formData.last_name as string,
          loginname: formData.loginname as string,
          email: formData.email as string,
          user_role: formData.user_role as number,
          hrcdf_desig: formData.hrcdf_desig as string || "",
          unit: formData.unit as number,
          status: 1,
          ad_user: formData.ad_user ? "true" : "false",
          rankCode: formData.rankCode as string || "",
          rankName: formData.rankName as string || "",
          phone_no: formData.phone_no as string || null
        };
        // Only include password if it's provided (for edit mode)
        if (formData.password) {
          (payload as any).password = formData.password as string;
        }
        await putRequest(`api/auth/users/${selectedUser.id}/`, payload);
        toast({
          title: "Success",
          description: "User updated successfully",
        });
      }
      setFormVisible(false);
      // Reload the data
      await loadUsers(currentPage, globalFilter);
    } catch (error: unknown) {
      console.error('Error saving user:', error);
      const apiError = error as ApiError;
      const errorMessage = apiError?.response?.data?.message || apiError?.message || 'Failed to save user';
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
    if (!selectedUser) return;
    
    setLoading(true);
    try {
      await deleteRequest(`api/auth/users/${selectedUser.id}/`);
      toast({
        title: "Success",
        description: "User deleted successfully",
      });
      setDeleteDialogVisible(false);
      setSelectedUser(null);
      // Reload the data
      await loadUsers(currentPage, globalFilter);
    } catch (error: unknown) {
      console.error('Error deleting user:', error);
      const apiError = error as ApiError;
      const errorMessage = apiError?.response?.data?.message || apiError?.message || 'Failed to delete user';
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const actionBodyTemplate = (rowData: User) => {
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

  const statusBodyTemplate = (rowData: User) => {
    return (
      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${
        rowData.status === 1 
          ? 'bg-green-100 text-green-800 border border-green-200' 
          : 'bg-red-100 text-red-800 border border-red-200'
      }`}>
        <div className={`w-2 h-2 rounded-full mr-2 ${
          rowData.status === 1 ? 'bg-green-500' : 'bg-red-500'
        }`}></div>
        {rowData.status === 1 ? 'Active' : 'Inactive'}
      </span>
    );
  };

  const nameBodyTemplate = (rowData: User) => {
    return (
      <div className="flex flex-col">
        <span className="font-medium text-foreground">{rowData.first_name} {rowData.last_name}</span>
        <span className="text-sm text-muted-foreground">@{rowData.loginname}</span>
      </div>
    );
  };

  const roleBodyTemplate = (rowData: User) => {
    return (
      <div className="flex flex-col">
        <span className="font-medium text-foreground">{rowData.role_name || 'No Role'}</span>
        {rowData.process_name && (
          <span className="text-sm text-muted-foreground">{rowData.process_name}</span>
        )}
      </div>
    );
  };

  const lastLoginBodyTemplate = (rowData: User) => {
    if (!rowData.last_login) {
      return <span className="text-muted-foreground">Never</span>;
    }
    
    const lastLogin = new Date(rowData.last_login);
    return (
      <div className="flex flex-col">
        <span className="text-sm">{lastLogin.toLocaleDateString()}</span>
        <span className="text-xs text-muted-foreground">{lastLogin.toLocaleTimeString()}</span>
      </div>
    );
  };

  // Handle search
  const handleSearch = (value: string) => {
    setGlobalFilter(value);
    
    // Use client-side filtering if we have allUsers stored
    if (allUsers.length > 0) {
      let filteredUsers = allUsers;
      
      // Apply search filter if provided
      if (value) {
        filteredUsers = allUsers.filter(user => 
          user.loginname.toLowerCase().includes(value.toLowerCase()) ||
          user.email.toLowerCase().includes(value.toLowerCase()) ||
          user.first_name.toLowerCase().includes(value.toLowerCase()) ||
          user.last_name.toLowerCase().includes(value.toLowerCase()) ||
          (user.role_name && user.role_name.toLowerCase().includes(value.toLowerCase())) ||
          (user.process_name && user.process_name.toLowerCase().includes(value.toLowerCase()))
        );
      }
      
      // Apply pagination
      const startIndex = 0;
      const endIndex = rowsPerPage;
      const paginatedUsers = filteredUsers.slice(startIndex, endIndex);
      
      setUsers(paginatedUsers);
      setTotalRecords(filteredUsers.length);
      setCurrentPage(0);
    } else {
      // Fallback to API search if allUsers is not available
      loadUsers(0, value);
    }
  };

  const header = (
    <div className="flex flex-wrap gap-4 items-center justify-between p-6 bg-gradient-to-r from-[#00809D]/5 to-[#00809D]/10 rounded-xl border border-[#00809D]/20">
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-[#00809D] rounded-lg flex items-center justify-center">
            <span className="text-white text-lg">👤</span>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-foreground">Manage Users</h2>
            <p className="text-sm text-muted-foreground">Manage system users and their access</p>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="h-4 w-4 text-muted-foreground absolute left-3 top-1/2 transform -translate-y-1/2" />
            <InputText
              value={globalFilter}
              onChange={(e) => handleSearch(e.target.value)}
              placeholder="Search users, names, emails..."
              className="w-80 pl-10 pr-4 py-3 border-2 border-border rounded-xl focus:border-[#00809D] focus:ring-2 focus:ring-[#00809D]/20 bg-background transition-all duration-200"
            />
          </div>
        </div>
      </div>
      
      <Button
        icon={<Plus className="h-4 w-4" />}
        label="Add User"
        onClick={() => openForm('create')}
        className="bg-[#00809D] text-white hover:bg-[#00809D]/90 px-6 py-3 rounded-xl font-semibold shadow-md hover:shadow-lg transition-all duration-200"
      />
    </div>
  );

  return (
    <div className="p-6 space-y-6">
      <div className="bg-white rounded-xl shadow-lg border border-border overflow-hidden">
        <DataTable
          value={users}
          header={header}
          paginator
          rows={rowsPerPage}
          totalRecords={totalRecords}
          first={currentPage * rowsPerPage}
          lazy
          onPage={(e) => {
            // Use client-side pagination if we have allUsers stored
            if (allUsers.length > 0) {
              let filteredUsers = allUsers;
              
              // Apply search filter if provided
              if (globalFilter) {
                filteredUsers = allUsers.filter(user => 
                  user.loginname.toLowerCase().includes(globalFilter.toLowerCase()) ||
                  user.email.toLowerCase().includes(globalFilter.toLowerCase()) ||
                  user.first_name.toLowerCase().includes(globalFilter.toLowerCase()) ||
                  user.last_name.toLowerCase().includes(globalFilter.toLowerCase()) ||
                  (user.role_name && user.role_name.toLowerCase().includes(globalFilter.toLowerCase())) ||
                  (user.process_name && user.process_name.toLowerCase().includes(globalFilter.toLowerCase()))
                );
              }
              
              // Apply pagination
              const startIndex = e.page * rowsPerPage;
              const endIndex = startIndex + rowsPerPage;
              const paginatedUsers = filteredUsers.slice(startIndex, endIndex);
              
              setUsers(paginatedUsers);
              setTotalRecords(filteredUsers.length);
              setCurrentPage(e.page);
            } else {
              // Fallback to API pagination if allUsers is not available
              loadUsers(e.page, globalFilter);
            }
          }}
          loading={loading}
          emptyMessage="No users found"
          className="vessel-datatable"
        >
          <Column 
            body={nameBodyTemplate} 
            header="Name" 
            className="min-w-[200px]"
            headerClassName="master-table-header"
          />
          <Column 
            field="email" 
            header="Email" 
            className="min-w-[200px]"
            headerClassName="master-table-header"
          />
          <Column 
            body={roleBodyTemplate} 
            header="Role & Process" 
            className="min-w-[180px]"
            headerClassName="master-table-header"
          />
          <Column 
            body={lastLoginBodyTemplate} 
            header="Last Login" 
            className="min-w-[120px]"
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
        config={userFormConfig}
        data={selectedUser}
        mode={formMode}
        onSubmit={handleSubmit}
        loading={loading}
      />

      <ViewDetailsForm
        visible={viewDetailsVisible}
        onHide={() => setViewDetailsVisible(false)}
        title={userViewConfig.title}
        description={userViewConfig.description}
        data={selectedUser || {}}
        fields={userViewConfig.fields}
        sections={userViewConfig.sections}
      />

      <DeleteConfirmationDialog
        visible={deleteDialogVisible}
        onHide={() => setDeleteDialogVisible(false)}
        onConfirm={handleDelete}
        title="Delete User"
        message="Are you sure you want to delete this user? This action cannot be undone."
        itemName={selectedUser?.first_name + ' ' + selectedUser?.last_name}
        loading={loading}
      />

      <Toast ref={toastRef} />
    </div>
  );
}
