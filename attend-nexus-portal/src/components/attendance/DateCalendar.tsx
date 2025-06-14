
import { useState } from 'react';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';
import { CalendarIcon, Clock, User, CheckCircle, XCircle } from 'lucide-react';

interface CheckInRecord {
  id: string;
  uid: string;
  userName: string;
  time: string;
  status: 'authorized' | 'unauthorized';
}

// Sample data for the selected date
const mockCheckIns: CheckInRecord[] = [
  {
    id: '1',
    uid: 'A1B2C3D4',
    userName: 'John Smith',
    time: '09:15 AM',
    status: 'authorized'
  },
  {
    id: '2',
    uid: 'E5F6G7H8',
    userName: 'Sarah Johnson',
    time: '09:30 AM',
    status: 'authorized'
  },
  {
    id: '3',
    uid: 'I9J0K1L2',
    userName: 'Unknown User',
    time: '10:45 AM',
    status: 'unauthorized'
  }
];

const DateCalendar = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());

  const getStatusIcon = (status: string) => {
    return status === 'authorized' 
      ? <CheckCircle className="h-4 w-4 text-green-600" />
      : <XCircle className="h-4 w-4 text-red-600" />;
  };

  const getStatusBadge = (status: string) => {
    return status === 'authorized'
      ? <Badge className="bg-green-100 text-green-800 border-green-200">Authorized</Badge>
      : <Badge className="bg-red-100 text-red-800 border-red-200">Unauthorized</Badge>;
  };

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      {/* Calendar */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CalendarIcon className="h-5 w-5" />
            Select Date
          </CardTitle>
        </CardHeader>
        <CardContent className="flex justify-center">
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={setSelectedDate}
            className="rounded-md border"
          />
        </CardContent>
      </Card>

      {/* Check-ins for Selected Date */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Check-ins for {selectedDate ? format(selectedDate, 'PPP') : 'Selected Date'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {selectedDate ? (
            <div className="space-y-4">
              {mockCheckIns.length > 0 ? (
                mockCheckIns.map((record) => (
                  <div key={record.id} className="flex items-center justify-between p-4 rounded-lg border hover:bg-accent/30 transition-colors">
                    <div className="flex items-center gap-3">
                      {getStatusIcon(record.status)}
                      <div>
                        <div className="flex items-center gap-2">
                          <User className="h-4 w-4 text-muted-foreground" />
                          <span className="font-medium">{record.userName}</span>
                        </div>
                        <div className="text-sm text-muted-foreground">
                          UID: {record.uid}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium text-sm">{record.time}</div>
                      {getStatusBadge(record.status)}
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">No check-ins found for this date</p>
                </div>
              )}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-muted-foreground">Please select a date to view check-ins</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default DateCalendar;
