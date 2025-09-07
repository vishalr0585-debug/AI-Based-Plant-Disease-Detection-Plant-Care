import { Loader2, Leaf } from 'lucide-react';

export function LoadingSpinner() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <div className="relative">
          <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mb-4 mx-auto">
            <Leaf className="h-8 w-8 text-white" />
          </div>
          <Loader2 className="absolute inset-0 h-16 w-16 animate-spin text-green-600 mx-auto" />
        </div>
        <h2 className="text-xl font-semibold text-gray-900 mb-2">PlantCare AI</h2>
        <p className="text-gray-600">Loading your dashboard...</p>
      </div>
    </div>
  );
}