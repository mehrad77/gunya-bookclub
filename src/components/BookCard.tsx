import React from 'react';
import { Link } from 'gatsby';
import StatusBadge from './StatusBadge';
import { useTranslation } from '../locales';

interface BookInfo {
  slug: string;
  title: string;
  titleFarsi?: string;
  author: string;
  status: string;
  coverImage?: string;
}

interface BookCardProps {
  book: BookInfo;
  className?: string;
}

const BookCard: React.FC<BookCardProps> = ({ book, className = '' }) => {
  const { t } = useTranslation();
  
  return (
    <div className={`card card-hover group ${className}`}>
      <div className="p-8">
        <div className="flex items-start gap-6">
          {book.coverImage && (
            <div className="shrink-0">
              <img
                src={book.coverImage}
                alt={book.title}
                className="w-20 h-28 object-cover rounded-xl shadow-sm group-hover:shadow-md transition-shadow duration-300"
              />
            </div>
          )}

          <div className="flex-1 space-y-4">
            <div className="flex items-center gap-3">
              <StatusBadge status={book.status} type="book" />
            </div>

            <div className="space-y-2">
              <Link
                to={`/books/${book.slug}`}
                className="block text-xl font-medium text-gray-900 hover:text-blue-600 transition-colors duration-200 line-clamp-2"
              >
                {book.titleFarsi || book.title}
              </Link>

              {book.title && book.titleFarsi && (
                <p className="text-gray-500 font-light">
                  {book.title}
                </p>
              )}
            </div>

            <p className="text-gray-400 text-sm font-light">
              {t('common.author')}: {book.author}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookCard;
