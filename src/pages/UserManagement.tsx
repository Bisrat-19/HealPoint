import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Plus,
  Search,
  Trash2,
  Users,
  Stethoscope,
  UserCheck,
  Loader2
} from 'lucide-react';
import { toast } from 'sonner';
import { useUsers, useCreateUser, useDeleteUser } from '@/hooks/users';
import { CreateUserData } from '@/services/users';

const UserRow = React.memo(({
  user,
  onDelete,
  getRoleBadgeVariant,
  getRoleIcon
}: {
  user: any,
  onDelete: (id: number) => void,
  getRoleBadgeVariant: (role: string) => any,
  getRoleIcon: (role: string) => React.ReactNode
}) => (
  <TableRow>
    <TableCell>
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold">
          {(user.first_name?.[0] || user.username?.[0] || '').toUpperCase()}
          {(user.last_name?.[0] || '').toUpperCase()}
        </div>
        <span className="font-medium">{user.first_name} {user.last_name}</span>
      </div>
    </TableCell>
    <TableCell className="text-muted-foreground">{user.username}</TableCell>
    <TableCell className="text-muted-foreground">{user.email}</TableCell>
    <TableCell>
      <Badge variant={getRoleBadgeVariant(user.role)} className="capitalize gap-1">
        {getRoleIcon(user.role)}
        {user.role}
      </Badge>
    </TableCell>
    <TableCell className="text-right">
      <div className="flex justify-end gap-2">
        <Button
          variant="ghost"
          size="iconSm"
          onClick={() => onDelete(user.id)}
          disabled={user.id === 1}
        >
          <Trash2 className="w-4 h-4 text-destructive" />
        </Button>
      </div>
    </TableCell>
  </TableRow>
));

const UserManagement = () => {
  const { data: users = [], isLoading } = useUsers();
  const createUser = useCreateUser();
  const deleteUser = useDeleteUser();

  const [searchQuery, setSearchQuery] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState<CreateUserData>({
    username: '',
    first_name: '',
    last_name: '',
    email: '',
    role: 'doctor',
    password: '',
  });

  const filteredUsers = users.filter(user =>
    user.first_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.last_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.username.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createUser.mutate(formData, {
      onSuccess: () => {
        setIsDialogOpen(false);
        setFormData({
          username: '',
          first_name: '',
          last_name: '',
          email: '',
          role: 'doctor',
          password: '',
        });
      }
    });
  };

  const handleDelete = React.useCallback((userId: number) => {
    if (userId === 1) {
      toast.error('Cannot delete the primary admin');
      return;
    }
    if (confirm('Are you sure you want to delete this user?')) {
      deleteUser.mutate(userId);
    }
  }, [deleteUser]);

  const getRoleBadgeVariant = React.useCallback((role: string) => {
    switch (role) {
      case 'admin': return 'default';
      case 'doctor': return 'secondary';
      case 'receptionist': return 'outline';
      default: return 'secondary';
    }
  }, []);

  const getRoleIcon = React.useCallback((role: string) => {
    switch (role) {
      case 'admin': return <Users className="w-4 h-4" />;
      case 'doctor': return <Stethoscope className="w-4 h-4" />;
      case 'receptionist': return <UserCheck className="w-4 h-4" />;
      default: return <Users className="w-4 h-4" />;
    }
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">User Management</h1>
          <p className="text-muted-foreground">Manage doctors and receptionists</p>
        </div>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Add User
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <form onSubmit={handleSubmit}>
              <DialogHeader>
                <DialogTitle>Create New User</DialogTitle>
                <DialogDescription>
                  Add a new doctor or receptionist to the system.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="role">Role</Label>
                  <Select
                    value={formData.role}
                    onValueChange={(value: any) => setFormData({ ...formData, role: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="doctor">Doctor</SelectItem>
                      <SelectItem value="receptionist">Receptionist</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="first_name">First Name</Label>
                    <Input
                      id="first_name"
                      value={formData.first_name}
                      onChange={(e) => setFormData({ ...formData, first_name: e.target.value })}
                      required
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="last_name">Last Name</Label>
                    <Input
                      id="last_name"
                      value={formData.last_name}
                      onChange={(e) => setFormData({ ...formData, last_name: e.target.value })}
                      required
                    />
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="username">Username</Label>
                  <Input
                    id="username"
                    value={formData.username}
                    onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    required
                  />
                </div>
              </div>
              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" disabled={createUser.isPending}>
                  {createUser.isPending ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Creating...
                    </>
                  ) : (
                    'Create User'
                  )}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Search */}
      <Card>
        <CardContent className="pt-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search users..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Users Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Users ({filteredUsers.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead>Username</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Role</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.map((user) => (
                <UserRow
                  key={user.id}
                  user={user}
                  onDelete={handleDelete}
                  getRoleBadgeVariant={getRoleBadgeVariant}
                  getRoleIcon={getRoleIcon}
                />
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserManagement;
