
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Clock } from 'lucide-react';

interface ActivityItem {
  id: string;
  user: string;
  action: string;
  time: string;
  status: 'success' | 'warning' | 'error';
  avatar?: string;
}

const recentActivities: ActivityItem[] = [
  {
    id: '1',
    user: 'John Smith',
    action: 'Checked in successfully',
    time: '2 minutes ago',
    status: 'success',
  },
  {
    id: '2',
    user: 'Sarah Johnson',
    action: 'Checked out',
    time: '5 minutes ago',
    status: 'success',
  },
  {
    id: '3',
    user: 'Unknown User',
    action: 'Unauthorized scan attempt',
    time: '8 minutes ago',
    status: 'error',
  },
  {
    id: '4',
    user: 'Mike Davis',
    action: 'Late check-in',
    time: '12 minutes ago',
    status: 'warning',
  },
  {
    id: '5',
    user: 'Emily Brown',
    action: 'Checked in successfully',
    time: '15 minutes ago',
    status: 'success',
  },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case 'success':
      return 'bg-green-100 text-green-800 border-green-200';
    case 'warning':
      return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    case 'error':
      return 'bg-red-100 text-red-800 border-red-200';
    default:
      return 'bg-gray-100 text-gray-800 border-gray-200';
  }
};

const RecentActivity = () => {
  return (
    <Card className="h-full">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2">
          <Clock className="h-5 w-5" />
          Recent Activity
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {recentActivities.map((activity) => (
          <div key={activity.id} className="flex items-center gap-4 p-3 rounded-lg hover:bg-accent/30 transition-colors duration-200">
            <Avatar className="h-10 w-10">
              <AvatarImage src={activity.avatar} alt={activity.user} />
              <AvatarFallback className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white text-sm">
                {activity.user.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <p className="font-medium text-sm truncate">{activity.user}</p>
                <Badge variant="outline" className={`text-xs ${getStatusColor(activity.status)}`}>
                  {activity.status}
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground truncate">{activity.action}</p>
              <p className="text-xs text-muted-foreground">{activity.time}</p>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default RecentActivity;
