import { useEffect, useState } from 'react';
import LiveClock from '@/components/dashboard/LiveClock';
import StatCard from '@/components/dashboard/StatCard';
import { Badge } from '@/components/ui/badge';
import { Database, CheckCircle, Users, Clock, UserCheck, UserX } from 'lucide-react';
import { subscribeToAttendance } from '@/lib/firebase';

interface AttendanceData {
  uid: string;
  timestamp: number;
}

const Dashboard = () => {
  const [isConnected, setIsConnected] = useState(true);
  const [totalUsers, setTotalUsers] = useState(0);
  const [todayCheckins, setTodayCheckins] = useState(0);
  const [presentToday, setPresentToday] = useState(0);
  const [absentToday, setAbsentToday] = useState(0);
  const [lastScan, setLastScan] = useState<AttendanceData | null>(null);

  useEffect(() => {
    const unsubscribe = subscribeToAttendance((data) => {
      if (!data) return;

      // Convert data to array and sort by timestamp
      const attendanceArray = Object.entries(data).map(([key, value]: [string, any]) => ({
        uid: value.uid,
        timestamp: value.timestamp
      })).sort((a, b) => b.timestamp - a.timestamp);

      // Update last scan
      if (attendanceArray.length > 0) {
        setLastScan(attendanceArray[0]);
      }

      // Calculate statistics
      const uniqueUsers = new Set(attendanceArray.map(entry => entry.uid));
      setTotalUsers(uniqueUsers.size);

      // Get today's date at midnight
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const todayTimestamp = today.getTime();

      // Filter today's check-ins
      const todayEntries = attendanceArray.filter(entry => entry.timestamp >= todayTimestamp);
      setTodayCheckins(todayEntries.length);

      // Calculate present and absent users
      const presentUsers = new Set(todayEntries.map(entry => entry.uid));
      setPresentToday(presentUsers.size);
      setAbsentToday(totalUsers - presentUsers.size);
    });

    return () => unsubscribe();
  }, [totalUsers]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">Welcome back! Here's your attendance overview.</p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className={`${isConnected ? 'bg-green-50 text-green-700 border-green-200' : 'bg-red-50 text-red-700 border-red-200'}`}>
            <Database className="h-3 w-3 mr-1" />
            {isConnected ? 'Connected' : 'Disconnected'}
          </Badge>
          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
            <CheckCircle className="h-3 w-3 mr-1" />
            System Operational
          </Badge>
        </div>
      </div>

      {/* Live Clock */}
      <LiveClock />

      {/* Last Scan Display */}
      {lastScan && (
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-2">Last Scan</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500">UID</p>
              <p className="font-mono">{lastScan.uid}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Time</p>
              <p>{new Date(lastScan.timestamp).toLocaleString()}</p>
            </div>
          </div>
        </div>
      )}

      {/* Statistics Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Users"
          value={totalUsers.toString()}
          icon={Users}
          gradient="from-blue-500 to-blue-600"
        />
        <StatCard
          title="Today's Check-ins"
          value={todayCheckins.toString()}
          icon={Clock}
          gradient="from-green-500 to-green-600"
        />
        <StatCard
          title="Present Today"
          value={presentToday.toString()}
          icon={UserCheck}
          gradient="from-emerald-500 to-emerald-600"
        />
        <StatCard
          title="Absentees"
          value={absentToday.toString()}
          icon={UserX}
          gradient="from-red-500 to-red-600"
        />
      </div>
    </div>
  );
};

export default Dashboard;
