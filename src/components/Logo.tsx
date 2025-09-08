import React from "react";
import { useTranslation } from '../locales';

interface LogoProps {
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
  showText?: boolean;
}

const sizeClasses = {
  sm: "w-8 h-8",
  md: "w-12 h-12", 
  lg: "w-16 h-16",
  xl: "w-24 h-24"
};

const Logo: React.FC<LogoProps> = ({ 
  size = "md", 
  className = "", 
  showText = false 
}) => {
  const { t } = useTranslation();
  const logoSize = sizeClasses[size];
  
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <img
        src="/favicon/android-chrome-192x192.png"
        alt={t('logo.altText')}
        className={`${logoSize} rounded-lg shadow-sm`}
      />
      {showText && (
        <div className="flex flex-col">
          <span className="font-medium text-gray-900">{t('logo.title')}</span>
          <span className="text-sm text-gray-600">{t('logo.subtitle')}</span>
        </div>
      )}
    </div>
  );
};

export default Logo;
