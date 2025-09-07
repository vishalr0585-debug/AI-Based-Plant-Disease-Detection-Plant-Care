import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Search,
  Leaf,
  Bug,
  Shield,
  Droplets,
  Sun,
  Calendar
} from 'lucide-react';

interface Disease {
  id: string;
  name: string;
  category: string;
  severity: 'low' | 'medium' | 'high';
  symptoms: string[];
  causes: string[];
  treatment: string[];
  prevention: string[];
  affectedCrops: string[];
}

const diseases: Disease[] = [
  {
    id: '1',
    name: 'Early Blight',
    category: 'Fungal',
    severity: 'medium',
    symptoms: [
      'Dark brown spots with concentric rings on leaves',
      'Yellowing of leaves around spots',
      'Premature leaf drop',
      'Spots may appear on stems and fruits'
    ],
    causes: [
      'High humidity conditions',
      'Warm temperatures (24-29°C)',
      'Poor air circulation',
      'Overhead watering'
    ],
    treatment: [
      'Apply copper-based fungicide every 7-10 days',
      'Remove and destroy affected plant parts',
      'Improve air circulation around plants',
      'Use drip irrigation instead of overhead watering'
    ],
    prevention: [
      'Use disease-resistant varieties',
      'Rotate crops annually',
      'Apply organic mulch around plants',
      'Avoid working with wet plants'
    ],
    affectedCrops: ['Tomato', 'Potato', 'Pepper', 'Eggplant']
  },
  {
    id: '2',
    name: 'Late Blight',
    category: 'Fungal',
    severity: 'high',
    symptoms: [
      'Water-soaked spots on leaves',
      'White fuzzy growth on leaf undersides',
      'Rapid browning and death of foliage',
      'Brown patches on stems and fruits'
    ],
    causes: [
      'Cool, wet weather conditions',
      'High humidity (>90%)',
      'Temperature around 15-20°C',
      'Poor ventilation'
    ],
    treatment: [
      'Apply protective fungicides immediately',
      'Remove all affected plant material',
      'Improve drainage and air circulation',
      'Consider destroying severely infected plants'
    ],
    prevention: [
      'Plant in well-draining soil',
      'Space plants for good air circulation',
      'Use resistant varieties when available',
      'Apply preventive fungicide sprays'
    ],
    affectedCrops: ['Potato', 'Tomato']
  },
  {
    id: '3',
    name: 'Bacterial Spot',
    category: 'Bacterial',
    severity: 'medium',
    symptoms: [
      'Small, dark brown spots with yellow halos',
      'Spots may have a greasy appearance',
      'Leaf yellowing and drop',
      'Fruit spotting and cracking'
    ],
    causes: [
      'High humidity and temperature',
      'Splashing water during irrigation',
      'Contaminated seeds or tools',
      'Wounds from insects or handling'
    ],
    treatment: [
      'Apply copper-based bactericides',
      'Remove affected leaves and fruits',
      'Disinfect tools between plants',
      'Reduce humidity around plants'
    ],
    prevention: [
      'Use pathogen-free seeds',
      'Avoid overhead irrigation',
      'Disinfect tools regularly',
      'Practice crop rotation'
    ],
    affectedCrops: ['Tomato', 'Pepper', 'Bean']
  }
];

export function CareGuide() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = ['all', 'fungal', 'bacterial', 'viral', 'pest'];

  const filteredDiseases = diseases.filter(disease => {
    const matchesSearch = disease.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         disease.affectedCrops.some(crop => 
                           crop.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === 'all' || 
                           disease.category.toLowerCase() === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'low': return 'bg-green-100 text-green-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'high': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category.toLowerCase()) {
      case 'fungal': return <Leaf className="h-4 w-4" />;
      case 'bacterial': return <Bug className="h-4 w-4" />;
      case 'viral': return <Shield className="h-4 w-4" />;
      default: return <Leaf className="h-4 w-4" />;
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Plant Care Guide
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Comprehensive guide to plant diseases, treatments, and prevention strategies for healthy crops.
        </p>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search diseases or crops..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2 flex-wrap">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                  className="capitalize"
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Disease Cards */}
      <div className="grid gap-6">
        {filteredDiseases.map((disease) => (
          <Card key={disease.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    {getCategoryIcon(disease.category)}
                    {disease.name}
                  </CardTitle>
                  <CardDescription className="mt-2">
                    Affects: {disease.affectedCrops.join(', ')}
                  </CardDescription>
                </div>
                <div className="flex gap-2">
                  <Badge variant="secondary" className="capitalize">
                    {disease.category}
                  </Badge>
                  <Badge className={getSeverityColor(disease.severity)}>
                    {disease.severity} severity
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="symptoms" className="w-full">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="symptoms" className="flex items-center gap-1">
                    <Bug className="h-3 w-3" />
                    <span className="hidden sm:inline">Symptoms</span>
                  </TabsTrigger>
                  <TabsTrigger value="causes" className="flex items-center gap-1">
                    <Sun className="h-3 w-3" />
                    <span className="hidden sm:inline">Causes</span>
                  </TabsTrigger>
                  <TabsTrigger value="treatment" className="flex items-center gap-1">
                    <Droplets className="h-3 w-3" />
                    <span className="hidden sm:inline">Treatment</span>
                  </TabsTrigger>
                  <TabsTrigger value="prevention" className="flex items-center gap-1">
                    <Shield className="h-3 w-3" />
                    <span className="hidden sm:inline">Prevention</span>
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="symptoms" className="mt-4">
                  <div className="space-y-2">
                    <h4 className="font-medium text-gray-900">Symptoms to Look For:</h4>
                    <ul className="grid gap-2">
                      {disease.symptoms.map((symptom, index) => (
                        <li key={index} className="flex items-start space-x-2">
                          <div className="w-1.5 h-1.5 bg-red-500 rounded-full mt-2 flex-shrink-0" />
                          <span className="text-sm text-gray-700">{symptom}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </TabsContent>

                <TabsContent value="causes" className="mt-4">
                  <div className="space-y-2">
                    <h4 className="font-medium text-gray-900">Common Causes:</h4>
                    <ul className="grid gap-2">
                      {disease.causes.map((cause, index) => (
                        <li key={index} className="flex items-start space-x-2">
                          <div className="w-1.5 h-1.5 bg-orange-500 rounded-full mt-2 flex-shrink-0" />
                          <span className="text-sm text-gray-700">{cause}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </TabsContent>

                <TabsContent value="treatment" className="mt-4">
                  <div className="space-y-2">
                    <h4 className="font-medium text-gray-900">Treatment Steps:</h4>
                    <ul className="grid gap-2">
                      {disease.treatment.map((step, index) => (
                        <li key={index} className="flex items-start space-x-2">
                          <div className="w-5 h-5 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-medium flex-shrink-0 mt-0.5">
                            {index + 1}
                          </div>
                          <span className="text-sm text-gray-700">{step}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </TabsContent>

                <TabsContent value="prevention" className="mt-4">
                  <div className="space-y-2">
                    <h4 className="font-medium text-gray-900">Prevention Measures:</h4>
                    <ul className="grid gap-2">
                      {disease.prevention.map((measure, index) => (
                        <li key={index} className="flex items-start space-x-2">
                          <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 flex-shrink-0" />
                          <span className="text-sm text-gray-700">{measure}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredDiseases.length === 0 && (
        <Card>
          <CardContent className="p-8 text-center">
            <Search className="h-12 w-12 mx-auto mb-4 text-gray-400" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No diseases found</h3>
            <p className="text-gray-600">
              Try adjusting your search terms or category filters.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}