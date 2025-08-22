import React from "react";

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
  const logoSize = sizeClasses[size];
  
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <img
        src="/favicon/android-chrome-192x192.png"
        alt="لوگو باشگاه کتابخوانی گونیا"
        className={`${logoSize} rounded-lg shadow-sm`}
      />
      {showText && (
        <div className="flex flex-col">
          <span className="font-medium text-gray-900">باشگاه کتابخوانی گونیا</span>
          <span className="text-sm text-gray-600">هر هفته، یک کتاب جدید</span>
        </div>
      )}
    </div>
  );
};

export default Logo;
