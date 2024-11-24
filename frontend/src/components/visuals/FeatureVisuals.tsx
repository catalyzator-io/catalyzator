import { Mic, Compass, HandshakeIcon } from 'lucide-react';

export const PitchToGrantVisual = () => (
  <div className="aspect-video rounded-lg bg-gradient-to-br from-purple-50 to-purple-100 flex items-center justify-center relative overflow-hidden">
    <div className="absolute inset-0 flex items-center justify-center p-4">
      <div className="w-full sm:w-3/4 h-full sm:h-3/4 bg-white rounded-lg shadow-lg p-3 sm:p-4">
        <div className="h-2 w-16 sm:w-24 bg-purple-200 rounded mb-2 sm:mb-3"></div>
        <div className="h-2 w-20 sm:w-32 bg-purple-100 rounded mb-2 sm:mb-3"></div>
        <div className="h-2 w-14 sm:w-20 bg-purple-100 rounded"></div>
        <div className="mt-3 sm:mt-4 flex items-center space-x-2">
          <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-soft-orange flex items-center justify-center">
            <Mic className="h-3 w-3 sm:h-4 sm:w-4 text-white" />
          </div>
          <div className="flex-1 h-2 bg-purple-100 rounded animate-pulse"></div>
        </div>
      </div>
    </div>
  </div>
);

export const CompassVisual = () => (
  <div className="aspect-video rounded-lg bg-gradient-to-br from-purple-50 to-purple-100 flex items-center justify-center relative overflow-hidden">
    <div className="absolute inset-0 flex items-center justify-center p-4">
      <div className="w-full sm:w-3/4 h-full sm:h-3/4 bg-white rounded-lg shadow-lg p-3 sm:p-4">
        <div className="flex space-x-3">
          <div className="flex-1 h-24 bg-purple-50 rounded-lg p-2 border border-purple-200">
            <div className="h-2 w-16 bg-purple-200 rounded mb-2"></div>
            <div className="h-2 w-24 bg-purple-100 rounded mb-4"></div>
            <div className="flex items-center">
              <div className="h-4 w-4 rounded-full bg-green-400"></div>
              <div className="h-2 w-12 bg-purple-100 rounded ml-2"></div>
            </div>
          </div>
          <div className="flex-1 h-24 bg-purple-50 rounded-lg p-2 border border-purple-200">
            <div className="h-2 w-16 bg-purple-200 rounded mb-2"></div>
            <div className="h-2 w-24 bg-purple-100 rounded mb-4"></div>
            <div className="flex items-center">
              <div className="h-4 w-4 rounded-full bg-yellow-400"></div>
              <div className="h-2 w-12 bg-purple-100 rounded ml-2"></div>
            </div>
          </div>
        </div>
        <div className="mt-4 flex items-center space-x-2">
          <Compass className="h-6 w-6 text-purple-600" />
          <div className="flex-1 h-2 bg-gradient-to-r from-purple-200 to-purple-400 rounded animate-pulse"></div>
        </div>
      </div>
    </div>
  </div>
);

export const FundMatchVisual = () => (
  <div className="aspect-video rounded-lg bg-gradient-to-br from-purple-50 to-purple-100 flex items-center justify-center relative overflow-hidden">
    <div className="absolute inset-0 flex items-center justify-center p-4">
      <div className="w-full sm:w-3/4 h-full sm:h-3/4 bg-white rounded-lg shadow-lg p-3 sm:p-4">
        <div className="space-y-3">
          <div className="flex items-center justify-between bg-purple-50 rounded-lg p-2 border border-purple-200">
            <div className="flex items-center space-x-2">
              <div className="h-8 w-8 rounded-full bg-soft-orange"></div>
              <div>
                <div className="h-2 w-24 bg-purple-200 rounded mb-1"></div>
                <div className="h-2 w-16 bg-purple-100 rounded"></div>
              </div>
            </div>
            <div className="flex items-center space-x-1">
              <div className="h-6 w-6 rounded-full bg-green-100 flex items-center justify-center">
                <div className="h-3 w-3 rounded-full bg-green-400"></div>
              </div>
              <div className="h-2 w-12 bg-green-200 rounded"></div>
            </div>
          </div>
          <div className="flex items-center justify-between bg-purple-50 rounded-lg p-2 border border-purple-200">
            <div className="flex items-center space-x-2">
              <div className="h-8 w-8 rounded-full bg-purple-300"></div>
              <div>
                <div className="h-2 w-24 bg-purple-200 rounded mb-1"></div>
                <div className="h-2 w-16 bg-purple-100 rounded"></div>
              </div>
            </div>
            <div className="flex items-center space-x-1">
              <div className="h-6 w-6 rounded-full bg-yellow-100 flex items-center justify-center">
                <div className="h-3 w-3 rounded-full bg-yellow-400"></div>
              </div>
              <div className="h-2 w-12 bg-yellow-200 rounded"></div>
            </div>
          </div>
        </div>
        <div className="mt-3 flex items-center space-x-2">
          <HandshakeIcon className="h-6 w-6 text-purple-600" />
          <div className="flex-1 h-2 bg-gradient-to-r from-green-200 to-green-400 rounded animate-pulse"></div>
        </div>
      </div>
    </div>
  </div>
); 