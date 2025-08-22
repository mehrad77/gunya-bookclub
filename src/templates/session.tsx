import React from "react";
import { graphql, Link, PageProps, HeadFC } from "gatsby";
import Seo from "../components/Seo";
import Logo from "../components/Logo";

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
  book: {
    frontmatter: {
      title: string;
      titleFarsi?: string;
      author: string;
      year: string;
      language: string;
      genre: string[];
      translator?: string;
      pages: string;
      coverImage?: string;
    };
  };
}

const SessionTemplate: React.FC<PageProps<SessionData, SessionPageContext>> = ({ data }) => {
  const { mdx } = data;
  const { frontmatter } = mdx;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50">
      <div className="max-w-5xl mx-auto px-6 py-12">
        {/* Header with Logo and Back Navigation */}
        <div className="flex items-center justify-between mb-8">
          <Link 
            to="/" 
            className="minimal-button group"
          >
            <span className="ml-2 transition-transform group-hover:-translate-x-1">←</span>
            بازگشت به صفحه اصلی
          </Link>
          
          <Logo size="sm" />
        </div>

        {/* Session Header */}
        <div className="card mb-12">
          <div className="p-10">
            <div className="flex flex-col lg:flex-row justify-between items-start gap-6 mb-8">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <span className="status-badge bg-blue-50 text-blue-700 border border-blue-200">
                    جلسه {frontmatter.sessionNumber}
                  </span>
                  <span className="text-gray-400 text-sm">
                    {new Date(frontmatter.date).toLocaleDateString('fa-IR')}
                  </span>
                </div>
                
                <h1 className="text-4xl font-light text-gray-900 leading-tight">
                  {frontmatter.title}
                </h1>
              </div>
              
              <Link 
                to={`/books/${frontmatter.bookSlug}`}
                className="primary-button shrink-0"
              >
                مشاهده کتاب
              </Link>
            </div>

            {/* Related Book Info */}
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-100 rounded-xl p-6 mb-8">
              <h3 className="font-medium text-blue-900 mb-2 text-lg">
                کتاب مرتبط: {frontmatter.bookSlug}
              </h3>
              <Link 
                to={`/books/${frontmatter.bookSlug}`}
                className="text-blue-700 hover:text-blue-800 transition-colors duration-200 font-medium"
              >
                مشاهده جزئیات کتاب ←
              </Link>
            </div>

            {/* Session Details */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Attendees */}
              {frontmatter.attendees && frontmatter.attendees.length > 0 && (
                <div className="space-y-4">
                  <h3 className="font-medium text-gray-900 text-lg flex items-center gap-3">
                    <span className="text-blue-500">👥</span>
                    شرکت‌کنندگان
                  </h3>
                  <ul className="space-y-2">
                    {frontmatter.attendees.map((attendee, index) => (
                      <li key={index} className="text-gray-600 flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-blue-400 rounded-full"></span>
                        {attendee}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Key Discussions */}
              {frontmatter.keyDiscussions && frontmatter.keyDiscussions.length > 0 && (
                <div className="space-y-4">
                  <h3 className="font-medium text-gray-900 text-lg flex items-center gap-3">
                    <span className="text-green-500">💬</span>
                    موضوعات کلیدی
                  </h3>
                  <ul className="space-y-2">
                    {frontmatter.keyDiscussions.map((discussion, index) => (
                      <li key={index} className="text-gray-600 flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-green-400 rounded-full"></span>
                        {discussion}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Next Actions */}
              {frontmatter.nextActions && frontmatter.nextActions.length > 0 && (
                <div className="space-y-4">
                  <h3 className="font-medium text-gray-900 text-lg flex items-center gap-3">
                    <span className="text-purple-500">📋</span>
                    اقدامات بعدی
                  </h3>
                  <ul className="space-y-2">
                    {frontmatter.nextActions.map((action, index) => (
                      <li key={index} className="text-gray-600 flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-purple-400 rounded-full"></span>
                        {action}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Session Content */}
        <div className="card">
          <div className="p-10">
            <h3 className="text-2xl font-light text-gray-900 mb-6 flex items-center gap-3">
              <span className="text-orange-500">📝</span>
              محتوای جلسه
            </h3>
            <div className="prose prose-lg text-gray-700">
              <p className="text-lg leading-relaxed">{mdx.excerpt}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const query = graphql`
  query($id: String!, $bookSlug: String!) {
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
    book: mdx(
      internal: { contentFilePath: { regex: "/books/" } }
      frontmatter: { slug: { eq: $bookSlug } }
    ) {
      frontmatter {
        title
        titleFarsi
        author
        year
        language
        genre
        translator
        pages
        coverImage
      }
    }
  }
`;

export const Head: HeadFC<SessionData, SessionPageContext> = ({ data, location }) => {
  const { mdx, book } = data;
  const { frontmatter } = mdx;
  
  const sessionTitle = `${frontmatter.title} | باشگاه کتابخوانی گونیا`;
  const description = mdx.excerpt || `جلسه ${frontmatter.sessionNumber} باشگاه کتابخوانی گونیا - بحث در مورد کتاب ${book?.frontmatter?.title || frontmatter.bookSlug}`;
  
  return (
    <Seo
      title={sessionTitle}
      description={description}
      pathname={location.pathname}
      article={true}
      publishedDate={frontmatter.date}
      eventSchema={{
        name: frontmatter.title,
        startDate: frontmatter.date,
        description: description,
        eventStatus: "EventScheduled",
        eventAttendanceMode: "OfflineEventAttendanceMode",
        organizer: {
          name: "باشگاه کتابخوانی گونیا",
          url: "https://bookclub.shab.boo"
        },
        ...(book && {
          about: {
            name: book.frontmatter.title,
            author: book.frontmatter.author,
            datePublished: book.frontmatter.year,
            genre: book.frontmatter.genre,
            language: book.frontmatter.language,
            numberOfPages: book.frontmatter.pages,
            translator: book.frontmatter.translator,
            image: book.frontmatter.coverImage,
            description: `کتاب ${book.frontmatter.titleFarsi || book.frontmatter.title} اثر ${book.frontmatter.author}`
          }
        })
      }}
    />
  );
};

export default SessionTemplate;
