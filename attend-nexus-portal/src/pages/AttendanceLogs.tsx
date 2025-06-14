
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import DateCalendar from '@/components/attendance/DateCalendar';

const AttendanceLogs = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Attendance Logs</h1>
        <p className="text-muted-foreground">View and manage attendance records</p>
      </div>

      <DateCalendar />

      <Card>
        <CardHeader>
          <CardTitle>All Logs</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12">
            <p className="text-muted-foreground">Complete attendance logs feature coming soon...</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AttendanceLogs;
