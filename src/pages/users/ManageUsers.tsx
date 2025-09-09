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
  loginname: string;
  email: string;
  first_name: string;
  last_name: string;
  status: number;
  phone_no: string | null;
  unit: number | null;
  vessel: number | null;
  role: number | null;
  role_name: string | null;
  created_on: string;
  last_login: string | null;
  hrcdf_designation: string | null;
  rankCode: string | null;
  rankName: string | null;
  process: number | null;
  process_name: string | null;
  unit_name: string | null;
  vessel_name: string | null;
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

  // Dropdown data states
  const [units, setUnits] = useState<{ id: number; name: string }[]>([]);
  const [vessels, setVessels] = useState<{ id: number; name: string }[]>([]);
  const [processes, setProcesses] = useState<{ id: number; name: string }[]>([]);
  const [roles, setRoles] = useState<{ id: number; name: string }[]>([]);

  const [formVisible, setFormVisible] = useState(false);
  const [viewDetailsVisible, setViewDetailsVisible] = useState(false);
  const [deleteDialogVisible, setDeleteDialogVisible] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [formMode, setFormMode] = useState<'create' | 'edit'>('create');
  const [globalFilter, setGlobalFilter] = useState('');
  const [loading, setLoading] = useState(false);

  const { toast } = useToast();
  const toastRef = useRef<Toast>(null);

  // Load dropdown data from APIs
  const loadUnits = useCallback(async () => {
    try {
      const response = await getRequest('master/units/');
      let unitsData = [];
      if (response && response.results && Array.isArray(response.results)) {
        unitsData = response.results;
      } else if (response && Array.isArray(response)) {
        unitsData = response;
      } else if (response && response.data && Array.isArray(response.data)) {
        unitsData = response.data;
      }
      setUnits(unitsData);
    } catch (error: unknown) {
      console.error('Error loading units:', error);
    }
  }, []);

  const loadVessels = useCallback(async () => {
    try {
      const response = await getRequest('master/vessels/');
      let vesselsData = [];
      if (response && response.results && Array.isArray(response.results)) {
        vesselsData = response.results;
      } else if (response && Array.isArray(response)) {
        vesselsData = response;
      } else if (response && response.data && Array.isArray(response.data)) {
        vesselsData = response.data;
      }
      setVessels(vesselsData);
    } catch (error: unknown) {
      console.error('Error loading vessels:', error);
    }
  }, []);

  const loadProcesses = useCallback(async () => {
    try {
      const response = await getRequest('access/processes/');
      let processesData = [];
      if (response && response.results && Array.isArray(response.results)) {
        processesData = response.results;
      } else if (response && Array.isArray(response)) {
        processesData = response;
      } else if (response && response.data && Array.isArray(response.data)) {
        processesData = response.data;
      }
      setProcesses(processesData);
    } catch (error: unknown) {
      console.error('Error loading processes:', error);
    }
  }, []);

  const loadRoles = useCallback(async () => {
    try {
      const response = await getRequest('access/user-roles/');
      let rolesData = [];
      if (response && response.results && Array.isArray(response.results)) {
        rolesData = response.results;
      } else if (response && Array.isArray(response)) {
        rolesData = response;
      } else if (response && response.data && Array.isArray(response.data)) {
        rolesData = response.data;
      }
      setRoles(rolesData);
    } catch (error: unknown) {
      console.error('Error loading roles:', error);
    }
  }, []);

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
             (user.process_name && user.process_name.toLowerCase().includes(search.toLowerCase())) ||
             (user.vessel_name && user.vessel_name.toLowerCase().includes(search.toLowerCase())) ||
             (user.unit_name && user.unit_name.toLowerCase().includes(search.toLowerCase())) ||
             (user.rankCode && user.rankCode.toLowerCase().includes(search.toLowerCase())) ||
             (user.rankName && user.rankName.toLowerCase().includes(search.toLowerCase())) ||
             (user.hrcdf_designation && user.hrcdf_designation.toLowerCase().includes(search.toLowerCase()))
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

  // Load data on component mount
  useEffect(() => {
    loadUsers();
    loadUnits();
    loadVessels();
    loadProcesses();
    loadRoles();
  }, [loadUsers, loadUnits, loadVessels, loadProcesses, loadRoles]);

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
        placeholder: "Enter first name",
        section: "Basic Information",
        validation: { min: 2, max: 50, message: "First name must be between 2-50 characters" }
      },
      {
        name: "last_name",
        label: "Last Name",
        type: "text",
        required: true,
        placeholder: "Enter last name",
        section: "Basic Information",
        validation: { min: 2, max: 50, message: "Last name must be between 2-50 characters" }
      },
      {
        name: "loginname",
        label: "Login Name",
        type: "text",
        required: true,
        placeholder: "Enter login name",
        section: "Basic Information",
        validation: { min: 3, max: 30, message: "Login name must be between 3-30 characters" }
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
        name: "email",
        label: "Email",
        type: "email",
        required: true,
        placeholder: "Enter email address",
        section: "Basic Information",
        validation: { pattern: "^[^@]+@[^@]+\\.[^@]+$", message: "Please enter a valid email address" }
      },
       {
         name: "phone_no",
         label: "Phone Number",
         type: "text",
         required: false,
         placeholder: "Enter phone number",
         section: "Basic Information"
       },
       {
         name: "rankCode",
         label: "Rank Code",
         type: "text",
         required: false,
         placeholder: "Enter rank code",
         section: "Basic Information"
       },
       {
         name: "rankName",
         label: "Rank Name",
         type: "text",
         required: false,
         placeholder: "Enter rank name",
         section: "Basic Information"
       },
       {
         name: "hrcdf_designation",
         label: "HRCDF Designation",
         type: "text",
         required: false,
         placeholder: "Enter HRCDF designation",
         section: "Basic Information"
       },
      {
        name: "unit",
        label: "Unit",
        type: "select",
        required: true,
        placeholder: "Select a unit",
        section: "Role & Process Information",
        options: units.map(unit => ({ label: unit.name, value: unit.id }))
      },
      {
        name: "vessel",
        label: "Vessel",
        type: "select",
        required: false,
        placeholder: "Select a vessel",
        section: "Role & Process Information",
        options: vessels.map(vessel => ({ label: vessel.name, value: vessel.id }))
      },
      {
        name: "process",
        label: "Process",
        type: "select",
        required: false,
        placeholder: "Select a process",
        section: "Role & Process Information",
        options: processes.map(process => ({ label: process.name, value: process.id }))
      },
      {
        name: "role",
        label: "Role",
        type: "select",
        required: true,
        placeholder: "Select a role",
        section: "Role & Process Information",
        options: roles.map(role => ({ label: role.name, value: role.id }))
      },
      {
        name: "status",
        label: "Active Status",
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
       { key: 'rankCode', label: 'Rank Code', type: 'text' as const },
       { key: 'rankName', label: 'Rank Name', type: 'text' as const },
       { key: 'hrcdf_designation', label: 'HRCDF Designation', type: 'text' as const },
      { key: 'role_name', label: 'Role', type: 'text' as const },
      { key: 'unit', label: 'Unit', type: 'text' as const },
      { key: 'vessel', label: 'Vessel', type: 'text' as const },
      { key: 'process_name', label: 'Process', type: 'text' as const },
      { key: 'status', label: 'Status', type: 'boolean' as const },
      { key: 'last_login', label: 'Last Login', type: 'date' as const },
      { key: 'created_on', label: 'Created On', type: 'date' as const }
    ],
    sections: [
       {
         title: 'Basic Information',
         fields: ['loginname', 'email', 'first_name', 'last_name', 'phone_no', 'rankCode', 'rankName', 'hrcdf_designation']
       },
      {
        title: 'Role & Process Information',
        fields: ['role_name', 'unit', 'vessel', 'process_name']
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
           password: formData.password as string,
           email: formData.email as string,
           phone_no: formData.phone_no as string || null,
           rankCode: formData.rankCode as string || null,
           rankName: formData.rankName as string || null,
           hrcdf_designation: formData.hrcdf_designation as string || null,
           unit: formData.unit as number,
           vessel: formData.vessel as number || null,
           process: formData.process as number || null,
           role: formData.role as number,
           status: formData.status ? 1 : 0
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
           phone_no: formData.phone_no as string || null,
           rankCode: formData.rankCode as string || null,
           rankName: formData.rankName as string || null,
           hrcdf_designation: formData.hrcdf_designation as string || null,
           unit: formData.unit as number,
           vessel: formData.vessel as number || null,
           process: formData.process as number || null,
           role: formData.role as number,
           status: formData.status ? 1 : 0
         };
        // Only include password if it's provided (for edit mode)
        if (formData.password) {
          (payload as Record<string, unknown>).password = formData.password as string;
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
           (user.process_name && user.process_name.toLowerCase().includes(value.toLowerCase())) ||
           (user.vessel_name && user.vessel_name.toLowerCase().includes(value.toLowerCase())) ||
           (user.unit_name && user.unit_name.toLowerCase().includes(value.toLowerCase())) ||
           (user.rankCode && user.rankCode.toLowerCase().includes(value.toLowerCase())) ||
           (user.rankName && user.rankName.toLowerCase().includes(value.toLowerCase())) ||
           (user.hrcdf_designation && user.hrcdf_designation.toLowerCase().includes(value.toLowerCase()))
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
    <div className="flex flex-wrap gap-4 items-center justify-between p-6 bg-gradient-to-r from-[#8B3A3A]/5 to-[#8B3A3A]/10 rounded-xl border border-[#8B3A3A]/20">
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-[#8B3A3A] rounded-lg flex items-center justify-center">
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
              className="w-80 pl-10 pr-4 py-3 border-2 border-border rounded-xl focus:border-[#8B3A3A] focus:ring-2 focus:ring-[#8B3A3A]/20 bg-background transition-all duration-200"
            />
          </div>
        </div>
      </div>
      
      <Button
        icon={<Plus className="h-4 w-4" />}
        label="Add User"
        onClick={() => openForm('create')}
        className="bg-[#8B3A3A] text-white hover:bg-[#8B3A3A]/90 px-6 py-3 rounded-xl font-semibold shadow-md hover:shadow-lg transition-all duration-200"
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
                   (user.process_name && user.process_name.toLowerCase().includes(globalFilter.toLowerCase())) ||
                   (user.vessel_name && user.vessel_name.toLowerCase().includes(globalFilter.toLowerCase())) ||
                   (user.unit_name && user.unit_name.toLowerCase().includes(globalFilter.toLowerCase())) ||
                   (user.rankCode && user.rankCode.toLowerCase().includes(globalFilter.toLowerCase())) ||
                   (user.rankName && user.rankName.toLowerCase().includes(globalFilter.toLowerCase())) ||
                   (user.hrcdf_designation && user.hrcdf_designation.toLowerCase().includes(globalFilter.toLowerCase()))
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
             field="phone_no" 
             header="Phone" 
             className="min-w-[120px]"
             headerClassName="master-table-header"
             body={(rowData: User) => rowData.phone_no || '-'}
           />
           <Column 
             body={roleBodyTemplate} 
             header="Role & Process" 
             className="min-w-[180px]"
             headerClassName="master-table-header"
           />
           <Column 
             body={(rowData: User) => (
               <div className="flex flex-col">
                 {rowData.rankCode && (
                   <span className="text-sm font-medium">{rowData.rankCode}</span>
                 )}
                 {rowData.rankName && (
                   <span className="text-xs text-muted-foreground">{rowData.rankName}</span>
                 )}
                 {!rowData.rankCode && !rowData.rankName && (
                   <span className="text-muted-foreground">-</span>
                 )}
               </div>
             )} 
             header="Rank" 
             className="min-w-[120px]"
             headerClassName="master-table-header"
           />
           <Column 
             body={(rowData: User) => rowData.unit_name || '-'} 
             header="Unit" 
             className="min-w-[100px]"
             headerClassName="master-table-header"
           />
           <Column 
             body={(rowData: User) => rowData.vessel_name || '-'} 
             header="Vessel" 
             className="min-w-[150px]"
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
