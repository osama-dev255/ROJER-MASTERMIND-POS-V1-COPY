import { useState, useEffect } from "react";
import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Search, Plus, Edit, Trash2, User, Shield, Eye, AlertTriangle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { getUsers, createUser, updateUser, deleteUser, getUserByEmail } from "@/services/databaseService";
import type { User as Employee } from "@/services/databaseService";
import { useAuth } from "@/contexts/AuthContext";

// Extended interface for employee with additional properties
interface EmployeeExtended {
  id?: string;
  username: string;
  email?: string;
  first_name: string;
  last_name: string;
  role: string;
  is_active: boolean;
  created_at?: string;
  updated_at?: string;
  name: string;
  status: "active" | "inactive";
  hireDate: string;
  permissions: string[];
}

const roles = [
  { id: "admin", name: "Administrator", description: "Full access to all system features" },
  { id: "manager", name: "Manager", description: "Manage sales, inventory, and staff" },
  { id: "cashier", name: "Cashier", description: "Process sales and handle transactions" },
  { id: "staff", name: "Staff", description: "Limited access to basic functions" },
];

const permissionsList = [
  "manage_products",
  "process_sales",
  "view_reports",
  "manage_customers",
  "manage_employees",
  "manage_inventory",
  "view_financials",
  "refund_transactions",
  "manage_suppliers",
  "manage_expenses",
  "manage_discounts",
  "view_audit_logs"
];

export const EmployeeManagement = ({ username, onBack, onLogout }: { username: string; onBack: () => void; onLogout: () => void }) => {
  const { user: authUser } = useAuth();
  const [currentUserRole, setCurrentUserRole] = useState<string | null>(null);
  const [employees, setEmployees] = useState<EmployeeExtended[]>([]);
  const [loading, setLoading] = useState(true);
  const [accessDenied, setAccessDenied] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState<EmployeeExtended | null>(null);
  const [newEmployee, setNewEmployee] = useState<Omit<Employee, "id">>({
    username: "",
    email: "",
    first_name: "",
    last_name: "",
    role: "staff",
    is_active: true
  });
  const { toast } = useToast();

  // Check user role on component mount
  useEffect(() => {
    checkUserRole();
  }, [authUser]);

  // Load employees from Supabase
  useEffect(() => {
    if (currentUserRole === "admin") {
      loadEmployees();
    }
  }, [currentUserRole]);

  const checkUserRole = async () => {
    if (!authUser?.email) {
      setAccessDenied(true);
      return;
    }

    try {
      const user = await getUserByEmail(authUser.email);
      if (user) {
        setCurrentUserRole(user.role);
        if (user.role !== "admin") {
          setAccessDenied(true);
        }
      } else {
        setAccessDenied(true);
      }
    } catch (error) {
      console.error("Error checking user role:", error);
      setAccessDenied(true);
    }
  };

  const loadEmployees = async () => {
    try {
      setLoading(true);
      const users = await getUsers();
      // Convert users to employees format
      const employeesData: EmployeeExtended[] = users.map(user => ({
        ...user,
        name: `${user.first_name} ${user.last_name}`,
        status: user.is_active ? "active" : "inactive",
        hireDate: user.created_at ? user.created_at.split('T')[0] : new Date().toISOString().split('T')[0],
        permissions: [] // We'll need to adjust this based on role or add a permissions field to the database
      }));
      setEmployees(employeesData);
    } catch (error) {
      console.error("Error loading employees:", error);
      toast({
        title: "Error",
        description: "Failed to load employees",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleAddEmployee = async () => {
    if (!newEmployee.username || !newEmployee.email) {
      toast({
        title: "Error",
        description: "Please fill in required fields",
        variant: "destructive"
      });
      return;
    }

    // Check if username or email already exists
    if (employees.some(emp => emp.username === newEmployee.username || emp.email === newEmployee.email)) {
      toast({
        title: "Error",
        description: "An employee with this username or email already exists",
        variant: "destructive"
      });
      return;
    }

    try {
      // Convert employee data to user format
      const userData = {
        username: newEmployee.username,
        email: newEmployee.email,
        first_name: newEmployee.first_name,
        last_name: newEmployee.last_name,
        role: newEmployee.role,
        is_active: newEmployee.is_active
      };

      const user = await createUser(userData);
      
      if (user) {
        // Convert user to employee format
        const employee: EmployeeExtended = {
          ...user,
          name: `${user.first_name} ${user.last_name}`,
          status: user.is_active ? "active" : "inactive",
          hireDate: user.created_at ? user.created_at.split('T')[0] : new Date().toISOString().split('T')[0],
          permissions: []
        };
        
        setEmployees([...employees, employee]);
        resetForm();
        setIsDialogOpen(false);
        
        toast({
          title: "Success",
          description: "Employee added successfully"
        });
      } else {
        throw new Error("Failed to create user");
      }
    } catch (error) {
      console.error("Error adding employee:", error);
      toast({
        title: "Error",
        description: "Failed to add employee",
        variant: "destructive"
      });
    }
  };

  const handleUpdateEmployee = async () => {
    if (!editingEmployee || !editingEmployee.username || !editingEmployee.email) {
      toast({
        title: "Error",
        description: "Please fill in required fields",
        variant: "destructive"
      });
      return;
    }

    // Check if username or email already exists (excluding current employee)
    if (employees.some(emp => 
      (emp.username === editingEmployee.username || emp.email === editingEmployee.email) && 
      emp.id !== editingEmployee.id
    )) {
      toast({
        title: "Error",
        description: "An employee with this username or email already exists",
        variant: "destructive"
      });
      return;
    }

    try {
      // Convert employee data to user format
      const userData = {
        username: editingEmployee.username,
        email: editingEmployee.email,
        first_name: editingEmployee.first_name,
        last_name: editingEmployee.last_name,
        role: editingEmployee.role,
        is_active: editingEmployee.status === "active"
      };

      const user = await updateUser(editingEmployee.id!, userData);
      
      if (user) {
        // Convert user to employee format
        const updatedEmployee: EmployeeExtended = {
          ...user,
          name: `${user.first_name} ${user.last_name}`,
          status: user.is_active ? "active" : "inactive",
          hireDate: user.created_at ? user.created_at.split('T')[0] : new Date().toISOString().split('T')[0],
          permissions: []
        };
        
        setEmployees(employees.map(emp => emp.id === editingEmployee.id ? updatedEmployee : emp));
        resetForm();
        setIsDialogOpen(false);
        
        toast({
          title: "Success",
          description: "Employee updated successfully"
        });
      } else {
        throw new Error("Failed to update user");
      }
    } catch (error) {
      console.error("Error updating employee:", error);
      toast({
        title: "Error",
        description: "Failed to update employee",
        variant: "destructive"
      });
    }
  };

  const handleDeleteEmployee = async (id: string) => {
    // Prevent deleting the current user
    if (employees.find(emp => emp.id === id)?.email === username) {
      toast({
        title: "Error",
        description: "You cannot delete your own account",
        variant: "destructive"
      });
      return;
    }
    
    try {
      const success = await deleteUser(id);
      
      if (success) {
        setEmployees(employees.filter(emp => emp.id !== id));
        toast({
          title: "Success",
          description: "Employee deleted successfully"
        });
      } else {
        throw new Error("Failed to delete user");
      }
    } catch (error) {
      console.error("Error deleting employee:", error);
      toast({
        title: "Error",
        description: "Failed to delete employee",
        variant: "destructive"
      });
    }
  };

  const resetForm = () => {
    setNewEmployee({
      username: "",
      email: "",
      first_name: "",
      last_name: "",
      role: "staff",
      is_active: true
    });
    setEditingEmployee(null);
  };

  const openEditDialog = (employee: EmployeeExtended) => {
    setEditingEmployee(employee);
    setIsDialogOpen(true);
  };

  const filteredEmployees = employees.filter(employee =>
    employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (employee.email && employee.email.toLowerCase().includes(searchTerm.toLowerCase())) ||
    employee.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getRoleName = (roleId: string) => {
    const role = roles.find(r => r.id === roleId);
    return role ? role.name : roleId;
  };

  const getStatusVariant = (status: string) => {
    return status === "active" ? "default" : "secondary";
  };

  // Show access denied message if user is not admin
  if (accessDenied) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation 
          title="Employee Management" 
          onBack={onBack} 
          onLogout={onLogout} 
          username={username} 
        />
        
        <div className="container mx-auto px-4 py-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Access Denied</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <AlertTriangle className="h-16 w-16 text-destructive mb-4" />
                <h3 className="text-xl font-semibold mb-2">Insufficient Permissions</h3>
                <p className="text-muted-foreground mb-6">
                  You do not have permission to access the Employee Management section. 
                  Only administrators can manage employee records.
                </p>
                <Button onClick={onBack}>Return to Dashboard</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation 
        title="Employee Management" 
        onBack={onBack} 
        onLogout={onLogout} 
        username={username} 
      />
      
      <div className="container mx-auto px-4 py-6">
        <Card>
          <CardHeader>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <CardTitle className="text-2xl">Employee Management</CardTitle>
                <p className="text-muted-foreground mt-1">
                  Manage your team members and their access permissions
                </p>
              </div>
              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <Button onClick={resetForm}>
                    <Plus className="mr-2 h-4 w-4" />
                    Add Employee
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-md">
                  <DialogHeader>
                    <DialogTitle>
                      {editingEmployee ? "Edit Employee" : "Add New Employee"}
                    </DialogTitle>
                  </DialogHeader>
                  
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">First Name</Label>
                        <Input
                          id="firstName"
                          value={editingEmployee ? editingEmployee.first_name : newEmployee.first_name}
                          onChange={(e) => 
                            editingEmployee 
                              ? setEditingEmployee({...editingEmployee, first_name: e.target.value})
                              : setNewEmployee({...newEmployee, first_name: e.target.value})
                          }
                          placeholder="Enter first name"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input
                          id="lastName"
                          value={editingEmployee ? editingEmployee.last_name : newEmployee.last_name}
                          onChange={(e) => 
                            editingEmployee 
                              ? setEditingEmployee({...editingEmployee, last_name: e.target.value})
                              : setNewEmployee({...newEmployee, last_name: e.target.value})
                          }
                          placeholder="Enter last name"
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="username">Username *</Label>
                      <Input
                        id="username"
                        value={editingEmployee ? editingEmployee.username : newEmployee.username}
                        onChange={(e) => 
                          editingEmployee 
                            ? setEditingEmployee({...editingEmployee, username: e.target.value})
                            : setNewEmployee({...newEmployee, username: e.target.value})
                        }
                        placeholder="Enter username"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="email">Email *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={editingEmployee ? editingEmployee.email || "" : newEmployee.email || ""}
                        onChange={(e) => 
                          editingEmployee 
                            ? setEditingEmployee({...editingEmployee, email: e.target.value})
                            : setNewEmployee({...newEmployee, email: e.target.value})
                        }
                        placeholder="Enter email"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="role">Role</Label>
                      <Select
                        value={editingEmployee ? editingEmployee.role : newEmployee.role}
                        onValueChange={(value) => 
                          editingEmployee 
                            ? setEditingEmployee({...editingEmployee, role: value})
                            : setNewEmployee({...newEmployee, role: value})
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select role" />
                        </SelectTrigger>
                        <SelectContent>
                          {roles.map((role) => (
                            <SelectItem key={role.id} value={role.id}>
                              {role.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <p className="text-xs text-muted-foreground">
                        {roles.find(r => r.id === (editingEmployee ? editingEmployee.role : newEmployee.role))?.description}
                      </p>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Switch
                        id="status"
                        checked={editingEmployee 
                          ? editingEmployee.status === "active"
                          : newEmployee.is_active
                        }
                        onCheckedChange={(checked) => 
                          editingEmployee 
                            ? setEditingEmployee({...editingEmployee, status: checked ? "active" : "inactive"})
                            : setNewEmployee({...newEmployee, is_active: checked})
                        }
                      />
                      <Label htmlFor="status">Active Employee</Label>
                    </div>
                    
                    <div className="flex justify-end space-x-2 pt-4">
                      <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                        Cancel
                      </Button>
                      <Button 
                        onClick={editingEmployee ? handleUpdateEmployee : handleAddEmployee}
                      >
                        {editingEmployee ? "Update Employee" : "Add Employee"}
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 mt-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search employees..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
          </CardHeader>
          
          <CardContent>
            {loading ? (
              <div className="flex justify-center items-center h-32">
                <p>Loading employees...</p>
              </div>
            ) : (
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Hire Date</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredEmployees.length > 0 ? (
                      filteredEmployees.map((employee) => (
                        <TableRow key={employee.id}>
                          <TableCell className="font-medium">
                            <div className="flex items-center">
                              <User className="mr-2 h-4 w-4 text-muted-foreground" />
                              {employee.name}
                            </div>
                          </TableCell>
                          <TableCell>{employee.email}</TableCell>
                          <TableCell>
                            <Badge variant="secondary">
                              {getRoleName(employee.role)}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Badge variant={getStatusVariant(employee.status)}>
                              {employee.status}
                            </Badge>
                          </TableCell>
                          <TableCell>{employee.hireDate}</TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end space-x-2">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => openEditDialog(employee)}
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => employee.id && handleDeleteEmployee(employee.id)}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={6} className="text-center py-8">
                          <User className="mx-auto h-12 w-12 text-muted-foreground" />
                          <h3 className="mt-4 font-medium">No employees found</h3>
                          <p className="text-sm text-muted-foreground">
                            {searchTerm ? "No employees match your search." : "Get started by adding a new employee."}
                          </p>
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};