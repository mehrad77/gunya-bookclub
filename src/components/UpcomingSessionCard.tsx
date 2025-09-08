import React from 'react';
import { Link } from 'gatsby';

interface SessionInfo {
  slug: string;
  title: string;
  date: string;
  sessionNumber: number;
  status?: 'upcoming' | 'held' | 'cancelled';
}

interface BookInfo {
  slug: string;
  title: string;
  titleFarsi?: string;
  author: string;
  coverImage?: string;
}

interface MeetingInfo {
  clubName: string;
  time: string;
  timezone: string;
  meetingInfo: string;
  meetLink: string;
}

interface UpcomingSessionCardProps {
  session: SessionInfo;
  relatedBook?: BookInfo;
  meetingInfo?: MeetingInfo;
  className?: string;
}

const UpcomingSessionCard: React.FC<UpcomingSessionCardProps> = ({ 
  session, 
  relatedBook,
  meetingInfo,
  className = ''
}) => {
  return (
    <div
      className={`w-full card card-hover group bg-gradient-to-br from-blue-50 via-white to-purple-50 border-2 border-blue-200 ${className}`}
    >
      <div className="p-8">
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          {/* Session Details - Right Side */}
          <div
            className={`${
              relatedBook ? "lg:w-2/3" : "w-full"
            } space-y-6`}
          >
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <span className="status-badge bg-blue-100 text-blue-800 border border-blue-300 text-lg px-4 py-2">
                  آینده
                </span>
                <span className="status-badge bg-gray-100 text-gray-700 border border-gray-300 text-lg px-4 py-2">
                  جلسه {session.sessionNumber}
                </span>
              </div>

              <Link
                to={`/sessions/${session.slug}`}
                className="block text-3xl font-medium text-gray-900 hover:text-blue-600 transition-colors duration-200"
              >
                {session.title}
              </Link>

              <p className="text-gray-500 text-lg flex items-center gap-2">
                📅{" "}
                {new Date(session.date).toLocaleDateString("fa-IR", {
                  weekday: "long",
                  year: undefined,
                  month: "long",
                  day: "numeric"
                })}
              </p>

              {/* Meeting Information */}
              {meetingInfo && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 space-y-3">
                  <div className="flex items-center gap-2 text-blue-800 font-medium">
                    🎯 {meetingInfo.clubName}
                  </div>
                  <div className="text-blue-700 text-sm space-y-1">
                    <div className="flex items-center gap-2">
                      🕐 {meetingInfo.time}
                    </div>
                    <div className="flex items-center gap-2">
                      🌍 منطقه زمانی: {meetingInfo.timezone}
                    </div>
                    <div className="flex items-center gap-2">
                      📞 {meetingInfo.meetingInfo}
                    </div>
                    <div className="flex items-start gap-2">
                      🔗 پیوند تماس تصویری:{" "}
                      <a 
                        href={meetingInfo.meetLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800 underline break-all"
                      >
                        {meetingInfo.meetLink}
                      </a>
                    </div>
                  </div>
                </div>
              )}
            </div>

          </div>

          {/* Related Book - Left Side */}
          {relatedBook && (
            <div className="lg:w-1/3 w-full">
              <div className="bg-white rounded-xl p-6 border border-blue-100 shadow-sm h-full">
                <div className="text-center space-y-4">
                  {relatedBook.coverImage && (
                    <div className="flex justify-center">
                      <img
                        src={relatedBook.coverImage}
                        alt={relatedBook.title}
                        className="w-24 h-32 object-cover rounded-lg shadow-sm"
                      />
                    </div>
                  )}
                  <div className="space-y-2">
                    <Link
                      to={`/books/${relatedBook.slug}`}
                      className="block font-medium text-blue-700 hover:text-blue-800 transition-colors duration-200 text-lg"
                    >
                      📚 {relatedBook.titleFarsi}
                    </Link>
                    {relatedBook.title && (
                      <p className="text-blue-600 text-sm">
                        {relatedBook.title}
                      </p>
                    )}
                    <p className="text-gray-500 text-sm">
                      نویسنده: {relatedBook.author}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UpcomingSessionCard;
