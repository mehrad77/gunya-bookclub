import React from 'react';
import { useTranslation } from '../locales';

interface StatusBadgeProps {
  status: 'held' | 'upcoming' | 'cancelled' | 'completed' | 'current' | string;
  type?: 'session' | 'book';
  size?: 'sm' | 'md' | 'lg';
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status, type = 'session', size = 'md' }) => {
  const { t } = useTranslation();
  
  const getStatusConfig = () => {
    if (type === 'book') {
      switch (status) {
        case 'completed':
          return {
            text: t('status.completed'),
            className: 'status-completed'
          };
        case 'current':
          return {
            text: t('status.current'),
            className: 'status-current'
          };
        case 'upcoming':
          return {
            text: t('status.upcoming'),
            className: 'status-upcoming'
          };
        default:
          return {
            text: t('status.unknown'),
            className: 'status-badge bg-gray-50 text-gray-700 border border-gray-200'
          };
      }
    } else {
      // Session status
      switch (status) {
        case 'held':
          return {
            text: t('status.held'),
            className: 'status-badge bg-green-50 text-green-700 border border-green-200'
          };
        case 'upcoming':
          return {
            text: t('status.upcoming'),
            className: 'status-badge bg-blue-50 text-blue-700 border border-blue-200'
          };
        case 'cancelled':
          return {
            text: t('status.cancelled'),
            className: 'status-badge bg-red-50 text-red-700 border border-red-200'
          };
        default:
          return {
            text: t('status.unknown'),
            className: 'status-badge bg-gray-50 text-gray-700 border border-gray-200'
          };
      }
    }
  };

  const getSizeClass = () => {
    switch (size) {
      case 'sm':
        return 'inline-flex items-center px-2 py-1 rounded-md text-xs font-medium';
      case 'lg':
        return 'status-badge text-lg px-4 py-2';
      default:
        return 'status-badge';
    }
  };

  const config = getStatusConfig();
  const sizeClass = getSizeClass();
  
  // Merge size class with status class, removing any existing size classes from status class
  const finalClassName = config.className.includes('status-badge') 
    ? config.className.replace('status-badge', sizeClass)
    : `${sizeClass} ${config.className}`;

  return (
    <span className={finalClassName}>
      {config.text}
    </span>
  );
};

export default StatusBadge;
