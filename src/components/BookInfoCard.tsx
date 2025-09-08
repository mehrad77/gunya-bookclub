import React from 'react';
import { Link } from 'gatsby';
import { useTranslation } from '../locales';

interface BookInfo {
  slug?: string;
  title: string;
  titleFarsi?: string;
  author: string;
  year: string;
  translator?: string;
  pages?: string;
  coverImage?: string;
}

interface BookInfoCardProps {
  book: BookInfo;
  variant?: 'default' | 'compact' | 'detailed';
  className?: string;
}

const BookInfoCard: React.FC<BookInfoCardProps> = ({ 
  book, 
  variant = 'default',
  className = ''
}) => {
  const { t } = useTranslation();
  
  const renderCover = () => {
    if (!book.coverImage) return null;
    
    const sizeClass = variant === 'compact' ? 'w-16 h-22' : 'w-24 h-32';
    
    return (
      <div className="flex justify-center">
        <img
          src={book.coverImage}
          alt={book.title}
          className={`${sizeClass} object-cover rounded-lg shadow-sm`}
        />
      </div>
    );
  };

  const renderTitle = () => {
    const titleClass = variant === 'compact' ? 'text-base' : 'text-lg';
    const displayTitle = book.titleFarsi || book.title;
    
    if (book.slug) {
      return (
        <Link
          to={`/books/${book.slug}`}
          className={`block font-medium text-blue-700 hover:text-blue-800 transition-colors duration-200 ${titleClass}`}
        >
          📚 {displayTitle}
        </Link>
      );
    }
    
    return (
      <h3 className={`font-medium text-blue-700 ${titleClass}`}>
        📚 {displayTitle}
      </h3>
    );
  };

  const renderSubtitle = () => {
    if (!book.title || !book.titleFarsi) return null;
    
    const subtitleClass = variant === 'compact' ? 'text-xs' : 'text-sm';
    
    return (
      <p className={`text-blue-600 ${subtitleClass}`}>
        {book.title}
      </p>
    );
  };

  const renderDetails = () => {
    const textClass = variant === 'compact' ? 'text-xs' : 'text-sm';
    
    return (
      <div className={`space-y-1 ${textClass} text-blue-600`}>
        <p>{t('common.author')}: {book.author}</p>
        {book.translator && (
          <p>{t('common.translator')}: {book.translator}</p>
        )}
        <p>{t('common.yearPublished')}: {book.year}</p>
        {book.pages && (
          <p>{t('common.pages')}: {book.pages}</p>
        )}
      </div>
    );
  };

  const renderLink = () => {
    const linkClass = variant === 'compact' ? 'text-xs' : 'text-sm';
    
    return (
      <div className="pt-2">
        <Link 
          to={`/books/${book.slug}`}
          className={`inline-flex items-center text-blue-700 hover:text-blue-800 transition-colors duration-200 font-medium ${linkClass}`}
        >
          {t('common.viewBookDetails')}
          <span className="mr-2">←</span>
        </Link>
      </div>
    );
  };

  if (variant === 'detailed') {
    return (
      <div className={`bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-100 rounded-xl p-6 h-full ${className}`}>
        <div className="space-y-4">
          {renderCover()}
          <div className="space-y-3 text-center">
            <div className="flex justify-center">
              <span className="status-badge bg-blue-100 text-blue-700 border border-blue-200">
                📚 {t('common.relatedBook')}
              </span>
            </div>
            <div className="space-y-2">
              {renderTitle()}
              {renderSubtitle()}
            </div>
            {renderDetails()}
            {renderLink()}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`bg-white rounded-xl p-6 border border-blue-100 shadow-sm h-full ${className}`}>
      <div className="text-center space-y-4">
        {renderCover()}
        <div className="space-y-2">
          {renderTitle()}
          {renderSubtitle()}
          <p className="text-gray-500 text-sm">
            {t('common.author')}: {book.author}
          </p>
          {renderLink()}
        </div>
      </div>
    </div>
  );
};

export default BookInfoCard;
