import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Calendar,
  TrendingUp,
  TrendingDown,
  Eye,
  Download,
  BarChart3,
  Clock,
  CheckCircle,
  AlertTriangle
} from 'lucide-react';
import { format } from 'date-fns';
import { useAuth } from '@/contexts/AuthContext';

interface HistoryItem {
  id: string;
  date: Date;
  image: string;
  disease: string;
  confidence: number;
  severity: 'low' | 'medium' | 'high';
  status: 'healthy' | 'diseased';
  crop: string;
  treatment_applied: boolean;
}

const mockHistory: HistoryItem[] = [
  {
    id: '1',
    date: new Date('2024-01-15T10:30:00'),
    image: 'https://images.pexels.com/photos/1407305/pexels-photo-1407305.jpeg?auto=compress&cs=tinysrgb&w=200',
    disease: 'Early Blight',
    confidence: 87,
    severity: 'medium',
    status: 'diseased',
    crop: 'Tomato',
    treatment_applied: true
  },
  {
    id: '2',
    date: new Date('2024-01-14T15:45:00'),
    image: 'https://images.pexels.com/photos/1407305/pexels-photo-1407305.jpeg?auto=compress&cs=tinysrgb&w=200',
    disease: 'Healthy',
    confidence: 94,
    severity: 'low',
    status: 'healthy',
    crop: 'Potato',
    treatment_applied: false
  },
  {
    id: '3',
    date: new Date('2024-01-12T08:20:00'),
    image: 'https://images.pexels.com/photos/1407305/pexels-photo-1407305.jpeg?auto=compress&cs=tinysrgb&w=200',
    disease: 'Late Blight',
    confidence: 92,
    severity: 'high',
    status: 'diseased',
    crop: 'Potato',
    treatment_applied: true
  },
  {
    id: '4',
    date: new Date('2024-01-10T14:15:00'),
    image: 'https://images.pexels.com/photos/1407305/pexels-photo-1407305.jpeg?auto=compress&cs=tinysrgb&w=200',
    disease: 'Bacterial Spot',
    confidence: 78,
    severity: 'medium',
    status: 'diseased',
    crop: 'Pepper',
    treatment_applied: false
  }
];

export function History() {
  const { user } = useAuth();
  const [selectedView, setSelectedView] = useState<'all' | 'healthy' | 'diseased'>('all');

  const filteredHistory = mockHistory.filter(item => {
    if (selectedView === 'all') return true;
    return item.status === selectedView;
  });

  const stats = {
    total: mockHistory.length,
    healthy: mockHistory.filter(item => item.status === 'healthy').length,
    diseased: mockHistory.filter(item => item.status === 'diseased').length,
    treated: mockHistory.filter(item => item.treatment_applied).length
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'low': return 'bg-green-100 text-green-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'high': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    return status === 'healthy' ? (
      <CheckCircle className="h-4 w-4 text-green-600" />
    ) : (
      <AlertTriangle className="h-4 w-4 text-orange-600" />
    );
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Detection History
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Track your plant health analysis history and monitor treatment progress over time.
        </p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <BarChart3 className="h-5 w-5 text-blue-600" />
              <div>
                <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
                <p className="text-sm text-gray-600">Total Scans</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-5 w-5 text-green-600" />
              <div>
                <p className="text-2xl font-bold text-gray-900">{stats.healthy}</p>
                <p className="text-sm text-gray-600">Healthy Plants</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <AlertTriangle className="h-5 w-5 text-orange-600" />
              <div>
                <p className="text-2xl font-bold text-gray-900">{stats.diseased}</p>
                <p className="text-sm text-gray-600">Diseased Plants</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <TrendingUp className="h-5 w-5 text-blue-600" />
              <div>
                <p className="text-2xl font-bold text-gray-900">{stats.treated}</p>
                <p className="text-sm text-gray-600">Treatments Applied</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* History Content */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>
                Your plant disease detection history and treatment progress
              </CardDescription>
            </div>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs value={selectedView} onValueChange={(value) => setSelectedView(value as any)}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="all">All Scans ({stats.total})</TabsTrigger>
              <TabsTrigger value="healthy">Healthy ({stats.healthy})</TabsTrigger>
              <TabsTrigger value="diseased">Diseased ({stats.diseased})</TabsTrigger>
            </TabsList>

            <TabsContent value={selectedView} className="mt-6">
              <div className="space-y-4">
                {filteredHistory.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center space-x-4 p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    {/* Image */}
                    <div className="w-16 h-16 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                      <img
                        src={item.image}
                        alt="Plant scan"
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2 mb-2">
                        {getStatusIcon(item.status)}
                        <h3 className="font-medium text-gray-900">{item.disease}</h3>
                        <Badge className={getSeverityColor(item.severity)}>
                          {item.severity}
                        </Badge>
                        {item.treatment_applied && (
                          <Badge variant="secondary">Treatment Applied</Badge>
                        )}
                      </div>
                      
                      <div className="flex items-center space-x-4 text-sm text-gray-600">
                        <div className="flex items-center space-x-1">
                          <Clock className="h-3 w-3" />
                          <span>{format(item.date, 'MMM dd, yyyy HH:mm')}</span>
                        </div>
                        <div>Crop: {item.crop}</div>
                        <div>Confidence: {item.confidence}%</div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex space-x-2">
                      <Button variant="ghost" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}

                {filteredHistory.length === 0 && (
                  <div className="text-center py-8">
                    <BarChart3 className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No history found</h3>
                    <p className="text-gray-600">
                      Start analyzing plant images to build your history.
                    </p>
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Health Trends */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Health Trends
          </CardTitle>
          <CardDescription>
            Monitor your plant health patterns over time
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
            <div className="text-center">
              <BarChart3 className="h-12 w-12 mx-auto mb-4 text-gray-400" />
              <p className="text-gray-600">Health trends chart coming soon</p>
              <p className="text-sm text-gray-500">Visualize your plant health data over time</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}