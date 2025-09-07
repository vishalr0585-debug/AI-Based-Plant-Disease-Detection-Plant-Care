import { useState, useCallback } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { 
  Upload, 
  Camera, 
  Image as ImageIcon, 
  CheckCircle, 
  AlertTriangle,
  Loader2,
  X
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuth } from '@/contexts/AuthContext';

interface DetectionResult {
  disease: string;
  confidence: number;
  severity: 'low' | 'medium' | 'high';
  status: 'healthy' | 'diseased';
  treatment: string[];
  prevention: string[];
}

export function HomePage() {
  const { user } = useAuth();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<DetectionResult | null>(null);

  const handleFileSelect = useCallback((file: File) => {
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target?.result as string);
        setResult(null);
      };
      reader.readAsDataURL(file);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
    
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFileSelect(files[0]);
    }
  }, [handleFileSelect]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
  }, []);

  const handleAnalyze = async () => {
    if (!selectedImage) return;
    
    setIsAnalyzing(true);
    
    // Simulate AI analysis - replace with actual API call
    setTimeout(() => {
      const mockResult: DetectionResult = {
        disease: "Early Blight",
        confidence: 87,
        severity: "medium",
        status: "diseased",
        treatment: [
          "Apply copper-based fungicide every 7-10 days",
          "Remove affected leaves and dispose properly",
          "Improve air circulation around plants",
          "Water at soil level to avoid wetting leaves"
        ],
        prevention: [
          "Use disease-resistant varieties",
          "Rotate crops annually",
          "Apply mulch to prevent soil splashing",
          "Monitor plants regularly for early detection"
        ]
      };
      
      setResult(mockResult);
      setIsAnalyzing(false);
    }, 3000);
  };

  const handleReset = () => {
    setSelectedImage(null);
    setResult(null);
    setIsAnalyzing(false);
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'low': return 'text-yellow-600 bg-yellow-50';
      case 'medium': return 'text-orange-600 bg-orange-50';
      case 'high': return 'text-red-600 bg-red-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      {/* Header */}
      <div className="text-center">
        <div className="mb-4">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome back, {user?.name?.split(' ')[0]}!
          </h1>
          <h2 className="text-xl text-gray-700 mb-2">Plant Disease Detection</h2>
        </div>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Upload a clear photo of a plant leaf to detect diseases and get expert treatment recommendations.
        </p>
      </div>

      {/* Upload Section */}
      {!selectedImage && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Camera className="h-5 w-5" />
              Upload Plant Image
            </CardTitle>
            <CardDescription>
              Take or upload a clear photo of the plant leaf you want to analyze
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div
              className={cn(
                "border-2 border-dashed rounded-lg p-8 text-center transition-colors",
                dragActive 
                  ? "border-green-500 bg-green-50" 
                  : "border-gray-300 hover:border-green-400"
              )}
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
            >
              <div className="space-y-4">
                <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                  <Upload className="h-8 w-8 text-green-600" />
                </div>
                <div>
                  <p className="text-lg font-medium text-gray-900">
                    Drop your image here, or click to browse
                  </p>
                  <p className="text-sm text-gray-500 mt-1">
                    Supports JPG, PNG, WEBP up to 10MB
                  </p>
                </div>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) handleFileSelect(file);
                  }}
                  className="hidden"
                  id="file-upload"
                />
                <Button asChild className="bg-green-600 hover:bg-green-700">
                  <label htmlFor="file-upload" className="cursor-pointer">
                    <ImageIcon className="h-4 w-4 mr-2" />
                    Choose Image
                  </label>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Image Preview and Analysis */}
      {selectedImage && (
        <div className="grid md:grid-cols-2 gap-6">
          {/* Image Preview */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">Uploaded Image</CardTitle>
                <Button variant="ghost" size="sm" onClick={handleReset}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="aspect-square rounded-lg overflow-hidden bg-gray-100">
                <img
                  src={selectedImage}
                  alt="Uploaded plant leaf"
                  className="w-full h-full object-cover"
                />
              </div>
              {!isAnalyzing && !result && (
                <Button 
                  className="w-full mt-4 bg-green-600 hover:bg-green-700"
                  onClick={handleAnalyze}
                >
                  <Camera className="h-4 w-4 mr-2" />
                  Analyze Plant Health
                </Button>
              )}
            </CardContent>
          </Card>

          {/* Analysis Results */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Analysis Results</CardTitle>
            </CardHeader>
            <CardContent>
              {isAnalyzing && (
                <div className="text-center py-8 space-y-4">
                  <Loader2 className="h-8 w-8 animate-spin mx-auto text-green-600" />
                  <div>
                    <p className="font-medium text-gray-900">Analyzing your plant...</p>
                    <p className="text-sm text-gray-500">This may take a few moments</p>
                  </div>
                  <Progress value={75} className="w-full" />
                </div>
              )}

              {result && (
                <div className="space-y-6">
                  {/* Disease Status */}
                  <div className="flex items-center justify-between p-4 rounded-lg border">
                    <div className="flex items-center space-x-3">
                      {result.status === 'healthy' ? (
                        <CheckCircle className="h-6 w-6 text-green-600" />
                      ) : (
                        <AlertTriangle className="h-6 w-6 text-orange-600" />
                      )}
                      <div>
                        <p className="font-medium text-gray-900">{result.disease}</p>
                        <p className="text-sm text-gray-500">
                          {result.confidence}% confidence
                        </p>
                      </div>
                    </div>
                    <Badge className={getSeverityColor(result.severity)}>
                      {result.severity} severity
                    </Badge>
                  </div>

                  {/* Treatment */}
                  <div>
                    <h4 className="font-medium text-gray-900 mb-3">Treatment Recommendations</h4>
                    <ul className="space-y-2">
                      {result.treatment.map((item, index) => (
                        <li key={index} className="flex items-start space-x-2">
                          <div className="w-1.5 h-1.5 bg-green-600 rounded-full mt-2 flex-shrink-0" />
                          <span className="text-sm text-gray-700">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Prevention */}
                  <div>
                    <h4 className="font-medium text-gray-900 mb-3">Prevention Tips</h4>
                    <ul className="space-y-2">
                      {result.prevention.map((item, index) => (
                        <li key={index} className="flex items-start space-x-2">
                          <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0" />
                          <span className="text-sm text-gray-700">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={handleReset}
                  >
                    Analyze Another Image
                  </Button>
                </div>
              )}

              {!isAnalyzing && !result && (
                <div className="text-center py-8 text-gray-500">
                  <Camera className="h-12 w-12 mx-auto mb-3 opacity-50" />
                  <p>Click "Analyze Plant Health" to start detection</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}