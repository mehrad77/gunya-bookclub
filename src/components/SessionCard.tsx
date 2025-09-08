import React from 'react';
import { Link } from 'gatsby';
import StatusBadge from './StatusBadge';
import { useTranslation } from '../locales';

interface SessionInfo {
  slug: string;
  title: string;
  date: string;
  sessionNumber: number;
  status?: 'upcoming' | 'held' | 'cancelled';
}

interface SessionCardProps {
  session: SessionInfo;
  relatedBook?: {
    slug: string;
    title: string;
    titleFarsi?: string;
    author: string;
  };
  variant?: 'default' | 'compact';
  className?: string;
}

const SessionCard: React.FC<SessionCardProps> = ({ 
  session, 
  relatedBook,
  variant = 'default',
  className = ''
}) => {
  const { t } = useTranslation();
  
  // Helper function to get session status
  const getSessionStatus = () => {
    const sessionDate = new Date(session.date);
    const now = new Date();
    
    let status = session.status;
    
    // If no explicit status, determine based on date
    if (!status) {
      status = sessionDate < now ? 'held' : 'upcoming';
    }
    
    return status;
  };

  const status = getSessionStatus();
  const badgeSize = variant === 'compact' ? 'sm' : 'md';

  const renderBadges = () => (
    <div className="flex items-center gap-3 mb-2">
      <StatusBadge status={status} type="session" size={badgeSize} />
      <span className={`status-badge bg-gray-50 text-gray-700 border border-gray-200 ${
        variant === 'compact' ? 'inline-flex items-center px-2 py-1 rounded-md text-xs font-medium' : ''
      }`}>
        {t('common.session')} {session.sessionNumber}
      </span>
    </div>
  );

  const renderTitle = () => {
    const titleClass = variant === 'compact' ? 'text-lg' : 'text-xl';
    
    return (
      <Link
        to={`/sessions/${session.slug}`}
        className={`block ${titleClass} font-medium text-gray-900 hover:text-blue-600 transition-colors duration-200`}
      >
        {session.title}
      </Link>
    );
  };

  const renderDate = () => (
    <p className="text-gray-400 text-sm font-light">
      {new Date(session.date).toLocaleDateString("fa-IR")}
    </p>
  );

  const renderRelatedBook = () => {
    if (!relatedBook) return null;

    return (
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-4 border border-blue-100">
        <Link
          to={`/books/${relatedBook.slug}`}
          className="block font-medium text-blue-700 hover:text-blue-800 transition-colors duration-200"
        >
          📚 {relatedBook.titleFarsi || relatedBook.title}
        </Link>
        {relatedBook.title && relatedBook.titleFarsi && (
          <p className="text-blue-600 text-sm font-light mt-1">
            {relatedBook.title}
          </p>
        )}
      </div>
    );
  };

  if (variant === 'compact') {
    return (
      <div className={`bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 border border-blue-100 ${className}`}>
        {renderBadges()}
        <Link 
          to={`/sessions/${session.slug}`}
          className="block text-xl font-medium text-blue-700 hover:text-blue-800 transition-colors duration-200"
        >
          {session.title}
        </Link>
        <p className="text-blue-600 font-light mt-2">
          {new Date(session.date).toLocaleDateString('fa-IR')}
        </p>
      </div>
    );
  }

  return (
    <div className={`card card-hover group ${className}`}>
      <div className="p-8">
        <div className="space-y-4">
          <div className="space-y-2">
            {renderBadges()}
            {renderTitle()}
            {renderDate()}
          </div>
          {renderRelatedBook()}
        </div>
      </div>
    </div>
  );
};

export default SessionCard;
