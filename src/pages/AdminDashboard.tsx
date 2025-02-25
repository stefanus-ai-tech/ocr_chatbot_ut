
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

const AdminDashboard = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Admin Dashboard</h1>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Documents Pending Review</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">12</p>
            <p className="text-sm text-muted-foreground">4 urgent reviews</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Processed Today</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">45</p>
            <p className="text-sm text-muted-foreground">↑ 12% from yesterday</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Active Students</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">284</p>
            <p className="text-sm text-muted-foreground">23 new this week</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;
