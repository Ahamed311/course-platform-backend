import { ReactNode } from 'react';
import Card from './Card';

interface StatsCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: ReactNode;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  color?: 'blue' | 'green' | 'purple' | 'yellow' | 'red';
}

export default function StatsCard({ 
  title, 
  value, 
  subtitle, 
  icon, 
  trend,
  color = 'blue' 
}: StatsCardProps) {
  const colorClasses = {
    blue: 'bg-blue-100 text-blue-600',
    green: 'bg-green-100 text-green-600',
    purple: 'bg-purple-100 text-purple-600',
    yellow: 'bg-yellow-100 text-yellow-600',
    red: 'bg-red-100 text-red-600'
  };

  return (
    <Card>
      <div className="flex items-center">
        <div className={`w-12 h-12 rounded-lg flex items-center justify-center mr-4 ${colorClasses[color]}`}>
          {icon}
        </div>
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <p className="text-2xl font-bold text-slate-900">{value}</p>
            {trend && (
              <div className={`flex items-center text-sm ${
                trend.isPositive ? 'text-green-600' : 'text-red-600'
              }`}>
                <svg 
                  className={`w-4 h-4 mr-1 ${trend.isPositive ? '' : 'rotate-180'}`} 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17l9.2-9.2M17 17V7H7" />
                </svg>
                {Math.abs(trend.value)}%
              </div>
            )}
          </div>
          <p className="text-sm text-slate-600">{title}</p>
          {subtitle && (
            <p className="text-xs text-slate-500 mt-1">{subtitle}</p>
          )}
        </div>
      </div>
    </Card>
  );
}