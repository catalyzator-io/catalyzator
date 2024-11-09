import { ArrowRight, Rocket } from 'lucide-react';

interface ActiveProjectProps {
  title: string;
  progress: number;
}

export function ActiveProject({ title, progress }: ActiveProjectProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-purple-100 p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-gray-900">Continue Working</h2>
        <button className="text-purple-600 hover:text-purple-700 text-sm font-medium flex items-center gap-1">
          View All Projects <ArrowRight className="h-4 w-4" />
        </button>
      </div>
      <div className="flex items-center gap-4">
        <div className="flex-1">
          <h3 className="font-medium text-gray-900">{title}</h3>
          <div className="mt-1 flex items-center gap-2">
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-purple-600 h-2 rounded-full" 
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <span className="text-sm text-gray-600">{progress}%</span>
          </div>
        </div>
        <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors flex items-center gap-2">
          <Rocket className="h-4 w-4" />
          Resume
        </button>
      </div>
    </div>
  );
} 