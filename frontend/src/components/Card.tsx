import { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  padding?: 'sm' | 'md' | 'lg';
  onClick?: () => void;
}

export default function Card({ 
  children, 
  className = '', 
  hover = false, 
  padding = 'md',
  onClick 
}: CardProps) {
  const paddingClasses = {
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8'
  };

  const baseClasses = `
    bg-white rounded-xl border border-slate-200 shadow-sm transition-all duration-200
    ${hover ? 'hover:shadow-lg hover:-translate-y-1 cursor-pointer' : ''}
    ${paddingClasses[padding]}
    ${className}
  `;

  if (onClick) {
    return (
      <div className={baseClasses} onClick={onClick}>
        {children}
      </div>
    );
  }

  return (
    <div className={baseClasses}>
      {children}
    </div>
  );
}

interface CardHeaderProps {
  title: string;
  subtitle?: string;
  icon?: ReactNode;
  badge?: ReactNode;
}

export function CardHeader({ title, subtitle, icon, badge }: CardHeaderProps) {
  return (
    <div className="flex items-start justify-between mb-4">
      <div className="flex items-start space-x-3">
        {icon && (
          <div className="flex-shrink-0 w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
            {icon}
          </div>
        )}
        <div>
          <h3 className="text-lg font-semibold text-slate-900 mb-1">{title}</h3>
          {subtitle && (
            <p className="text-sm text-slate-600">{subtitle}</p>
          )}
        </div>
      </div>
      {badge && badge}
    </div>
  );
}

interface CardContentProps {
  children: ReactNode;
}

export function CardContent({ children }: CardContentProps) {
  return (
    <div className="text-slate-700 leading-relaxed">
      {children}
    </div>
  );
}

interface CardFooterProps {
  children: ReactNode;
  className?: string;
}

export function CardFooter({ children, className = '' }: CardFooterProps) {
  return (
    <div className={`mt-6 pt-4 border-t border-slate-100 ${className}`}>
      {children}
    </div>
  );
}