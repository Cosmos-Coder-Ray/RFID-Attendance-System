
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const UserManagement = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">User Management</h1>
        <p className="text-muted-foreground">Manage RFID users and permissions</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>User Directory</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12">
            <p className="text-muted-foreground">User management features coming soon...</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserManagement;
