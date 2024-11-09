import { ArrowDown, ArrowUp } from 'lucide-react';

interface StatsCardProps {
  title: string;
  value: string;
  change: string;
  trend: 'up' | 'down';
}

export function StatsCard({ title, value, change, trend }: StatsCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-purple-100 p-6">
      <h3 className="text-sm font-medium text-gray-600">{title}</h3>
      <div className="mt-2 flex items-baseline gap-2">
        <span className="text-2xl font-semibold text-gray-900">{value}</span>
        <span className={`text-sm flex items-center gap-0.5 ${trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
          {trend === 'up' ? <ArrowUp className="h-4 w-4" /> : <ArrowDown className="h-4 w-4" />}
          {change}
        </span>
      </div>
    </div>
  );
} 