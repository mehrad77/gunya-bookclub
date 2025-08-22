import React from "react";
import { graphql, Link, PageProps } from "gatsby";

interface SessionPageContext {
  id: string;
  slug: string;
}

interface SessionData {
  mdx: {
    frontmatter: {
      slug: string;
      title: string;
      date: string;
      bookSlug: string;
      sessionNumber: number;
      attendees?: string[];
      keyDiscussions?: string[];
      nextActions?: string[];
    };
    excerpt: string;
  };
}

const SessionTemplate: React.FC<PageProps<SessionData, SessionPageContext>> = ({ data }) => {
  const { mdx } = data;
  const { frontmatter } = mdx;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Back to home */}
        <Link 
          to="/" 
          className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-6"
        >
          ← بازگشت به صفحه اصلی
        </Link>

        {/* Session Header */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {frontmatter.title}
              </h1>
              <p className="text-gray-600">
                {new Date(frontmatter.date).toLocaleDateString('fa-IR')} • جلسه {frontmatter.sessionNumber}
              </p>
            </div>
            
            <Link 
              to={`/books/${frontmatter.bookSlug}`}
              className="bg-blue-100 hover:bg-blue-200 text-blue-800 px-4 py-2 rounded-lg transition-colors"
            >
              مشاهده کتاب
            </Link>
          </div>

          {/* Related Book Info */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <h3 className="font-semibold text-blue-900 mb-1">
              کتاب مرتبط: {frontmatter.bookSlug}
            </h3>
            <Link 
              to={`/books/${frontmatter.bookSlug}`}
              className="text-blue-700 text-sm hover:underline"
            >
              مشاهده جزئیات کتاب
            </Link>
          </div>

          {/* Session Details */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Attendees */}
            {frontmatter.attendees && frontmatter.attendees.length > 0 && (
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">👥 شرکت‌کنندگان</h3>
                <ul className="text-sm text-gray-700 space-y-1">
                  {frontmatter.attendees.map((attendee, index) => (
                    <li key={index}>• {attendee}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Key Discussions */}
            {frontmatter.keyDiscussions && frontmatter.keyDiscussions.length > 0 && (
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">💬 موضوعات کلیدی</h3>
                <ul className="text-sm text-gray-700 space-y-1">
                  {frontmatter.keyDiscussions.map((discussion, index) => (
                    <li key={index}>• {discussion}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Next Actions */}
            {frontmatter.nextActions && frontmatter.nextActions.length > 0 && (
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">📋 اقدامات بعدی</h3>
                <ul className="text-sm text-gray-700 space-y-1">
                  {frontmatter.nextActions.map((action, index) => (
                    <li key={index}>• {action}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* Session Content */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="prose prose-lg max-w-none text-gray-700">
            <p>{mdx.excerpt}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export const query = graphql`
  query($id: String!) {
    mdx(id: { eq: $id }) {
      frontmatter {
        slug
        title
        date
        bookSlug
        sessionNumber
        attendees
        keyDiscussions
        nextActions
      }
      excerpt(pruneLength: 800)
    }
  }
`;

export default SessionTemplate;
