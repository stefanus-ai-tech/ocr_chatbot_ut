
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

const StudentDashboard = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Student Dashboard</h1>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Documents Submitted</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">3</p>
            <p className="text-sm text-muted-foreground">Last submitted 2 days ago</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Pending Verification</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">1</p>
            <p className="text-sm text-muted-foreground">Expected review in 24h</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Approved Documents</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">2</p>
            <p className="text-sm text-muted-foreground">Last approved yesterday</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default StudentDashboard;
