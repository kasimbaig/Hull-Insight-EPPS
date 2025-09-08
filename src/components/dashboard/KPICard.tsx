import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import { KPICard as KPICardType } from "@/types";
import { cn } from "@/lib/utils";

interface KPICardProps {
  data: KPICardType;
  className?: string;
}

export function KPICard({ data, className }: KPICardProps) {
  const { title, value, change, trend, color = 'primary' } = data;

  const getTrendIcon = () => {
    switch (trend) {
      case 'up':
        return <TrendingUp className="h-4 w-4 text-success" />;
      case 'down':
        return <TrendingDown className="h-4 w-4 text-destructive" />;
      default:
        return <Minus className="h-4 w-4 text-muted-foreground" />;
    }
  };

  const getColorClasses = () => {
    switch (color) {
      case 'primary':
        return {
          bg: 'bg-blue-50 hover:bg-blue-100',
          border: 'border-blue-200 hover:border-blue-400',
          leftBorder: 'border-l-blue-500',
          text: 'text-blue-700 group-hover:text-blue-800',
          overlay: 'from-blue-500/5 to-blue-600/10'
        };
      case 'success':
        return {
          bg: 'bg-green-50 hover:bg-green-100',
          border: 'border-green-200 hover:border-green-400',
          leftBorder: 'border-l-green-500',
          text: 'text-green-700 group-hover:text-green-800',
          overlay: 'from-green-500/5 to-green-600/10'
        };
      case 'warning':
        return {
          bg: 'bg-yellow-50 hover:bg-yellow-100',
          border: 'border-yellow-200 hover:border-yellow-400',
          leftBorder: 'border-l-yellow-500',
          text: 'text-yellow-700 group-hover:text-yellow-800',
          overlay: 'from-yellow-500/5 to-yellow-600/10'
        };
      case 'destructive':
        return {
          bg: 'bg-red-50 hover:bg-red-100',
          border: 'border-red-200 hover:border-red-400',
          leftBorder: 'border-l-red-500',
          text: 'text-red-700 group-hover:text-red-800',
          overlay: 'from-red-500/5 to-red-600/10'
        };
      default:
        return {
          bg: 'bg-gray-50 hover:bg-gray-100',
          border: 'border-gray-200 hover:border-gray-400',
          leftBorder: 'border-l-gray-500',
          text: 'text-gray-700 group-hover:text-gray-800',
          overlay: 'from-gray-500/5 to-gray-600/10'
        };
    }
  };

  const colorClasses = getColorClasses();

  return (
    <div className={cn(
      "hull-card p-4 hull-transition hover:hull-shadow group cursor-pointer relative overflow-hidden",
      "hover:scale-105 hover:shadow-lg transition-all duration-300 min-h-[60px] flex items-center justify-center",
      "border-l-4 border-transparent hover:border-l-4",
      colorClasses.bg,
      colorClasses.border,
      colorClasses.leftBorder,
      className
    )}>
      {/* Hover overlay */}
      <div className={cn(
        "absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-300",
        colorClasses.overlay
      )} />
      
      {/* Content */}
      <div className="relative z-10 w-full">
        {/* Label - Hidden on hover */}
        <div className="text-center opacity-100 group-hover:opacity-0 transition-opacity duration-300">
          <h3 className={cn(
            "text-base font-semibold transition-colors duration-300",
            colorClasses.text
          )}>
            {title}
          </h3>
        </div>
        
        {/* Value and change - Only visible on hover */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
          <div className="text-center space-y-2">
            <p className={cn(
              "text-2xl font-bold transition-colors duration-300",
              colorClasses.text
            )}>{value}</p>
            
            {change && (
              <div className="flex items-center justify-center gap-2">
                {getTrendIcon()}
                <span className={cn(
                  "text-xs font-medium",
                  trend === 'up' && "text-success",
                  trend === 'down' && "text-destructive",
                  trend === 'stable' && "text-muted-foreground"
                )}>
                  {change}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}