import React from "react";
import { graphql, Link, PageProps, HeadFC } from "gatsby";
import { MDXProvider } from "@mdx-js/react";
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
      status?: "upcoming" | "held" | "cancelled";
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

const SessionTemplate: React.FC<PageProps<SessionData, SessionPageContext>> = ({
  data,
  children,
}) => {
  const { mdx } = data;
  const { frontmatter } = mdx;

  // Helper function to get status badge
  const getStatusBadge = () => {
    const sessionDate = new Date(frontmatter.date);
    const now = new Date();

    let status = frontmatter.status;

    // If no explicit status, determine based on date
    if (!status) {
      status = sessionDate < now ? "held" : "upcoming";
    }

    switch (status) {
      case "held":
        return {
          text: "برگزار شده",
          className:
            "status-badge bg-green-50 text-green-700 border border-green-200",
        };
      case "upcoming":
        return {
          text: "آینده",
          className:
            "status-badge bg-blue-50 text-blue-700 border border-blue-200",
        };
      case "cancelled":
        return {
          text: "لغو شده",
          className:
            "status-badge bg-red-50 text-red-700 border border-red-200",
        };
      default:
        return {
          text: "نامشخص",
          className:
            "status-badge bg-gray-50 text-gray-700 border border-gray-200",
        };
    }
  };

  const statusBadge = getStatusBadge();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50">
      <div className="max-w-5xl mx-auto px-6 py-12">
        {/* Header with Logo and Back Navigation */}
        <div className="flex items-center justify-between mb-8">
          <Link to="/" className="minimal-button group">
            <span className="ml-2 transition-transform group-hover:-translate-x-1">
              ←
            </span>
            بازگشت به صفحه اصلی
          </Link>

          <Logo size="sm" />
        </div>

        {/* Session Header */}
        <div className="card mb-12">
          <div className="p-10">
            <div className="flex flex-col lg:flex-row gap-8 items-start">
              {/* Session Details - Right Side */}
              <div className={`${data.book ? "lg:w-2/3" : "w-full"} space-y-6`}>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <span className={statusBadge.className}>
                      {statusBadge.text}
                    </span>
                    <span className="status-badge bg-gray-50 text-gray-700 border border-gray-200">
                      جلسه {frontmatter.sessionNumber}
                    </span>
                    <span className="text-gray-400 text-sm">
                      {new Date(frontmatter.date).toLocaleDateString("fa-IR")}
                    </span>
                  </div>

                  <h1 className="text-4xl font-light text-gray-900 leading-tight">
                    {frontmatter.title}
                  </h1>
                </div>

                {/* Attendees */}
                {frontmatter.attendees && frontmatter.attendees.length > 0 && (
                  <div className="space-y-4">
                    <h3 className="font-medium text-gray-900 text-lg flex items-center gap-3">
                      <span className="text-blue-500">👥</span>
                      شرکت‌کنندگان
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {frontmatter.attendees.map((attendee, index) => (
                        <div
                          key={index}
                          className="inline-flex text-gray-600 items-center gap-2 bg-gray-50 px-3 py-1 rounded-md"
                        >
                          <span className="w-1.5 h-1.5 bg-blue-400 rounded-full"></span>
                          {attendee}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Related Book Card - Left Side */}
              {data.book && (
                <div className="lg:w-1/3 w-full">
                  <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-100 rounded-xl p-6 h-full">
                    <div className="space-y-4">
                      {data.book.frontmatter.coverImage && (
                        <div className="flex justify-center">
                          <img
                            src={data.book.frontmatter.coverImage}
                            alt={data.book.frontmatter.title}
                            className="w-24 h-32 object-cover rounded-xl shadow-sm"
                          />
                        </div>
                      )}

                      <div className="space-y-3 text-center">
                        <div className="flex justify-center">
                          <span className="status-badge bg-blue-100 text-blue-700 border border-blue-200">
                            📚 کتاب مرتبط
                          </span>
                        </div>

                        <div className="space-y-2">
                          <Link
                            to={`/books/${frontmatter.bookSlug}`}
                            className="block text-lg font-medium text-blue-900 hover:text-blue-700 transition-colors duration-200"
                          >
                            {data.book.frontmatter.titleFarsi ||
                              data.book.frontmatter.title}
                          </Link>

                          {data.book.frontmatter.title &&
                            data.book.frontmatter.titleFarsi && (
                              <p className="text-blue-700 font-light text-sm">
                                {data.book.frontmatter.title}
                              </p>
                            )}
                        </div>

                        <div className="space-y-1 text-sm text-blue-600">
                          <p>نویسنده: {data.book.frontmatter.author}</p>
                          {data.book.frontmatter.translator && (
                            <p>مترجم: {data.book.frontmatter.translator}</p>
                          )}
                          <p>سال انتشار: {data.book.frontmatter.year}</p>
                          {data.book.frontmatter.pages && (
                            <p>تعداد صفحات: {data.book.frontmatter.pages}</p>
                          )}
                        </div>

                        <div className="pt-2">
                          <Link
                            to={`/books/${frontmatter.bookSlug}`}
                            className="inline-flex items-center text-blue-700 hover:text-blue-800 transition-colors duration-200 font-medium text-sm"
                          >
                            مشاهده جزئیات کتاب
                            <span className="mr-2">←</span>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
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
            <div className="prose prose-lg max-w-none text-gray-700">
              <MDXProvider>{children}</MDXProvider>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const query = graphql`
  query ($id: String!, $bookSlug: String!) {
    mdx(id: { eq: $id }) {
      frontmatter {
        slug
        title
        date
        bookSlug
        sessionNumber
        attendees
        status
      }
      excerpt(pruneLength: 800)
      body
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

export const Head: HeadFC<SessionData, SessionPageContext> = ({
  data,
  location,
}) => {
  const { mdx, book } = data;
  const { frontmatter } = mdx;

  const sessionTitle = `${frontmatter.title} | باشگاه کتابخوانی گونیا`;
  const description =
    mdx.excerpt ||
    `جلسه ${
      frontmatter.sessionNumber
    } باشگاه کتابخوانی گونیا - بحث در مورد کتاب ${
      book?.frontmatter?.title || frontmatter.bookSlug
    }`;

  // Determine event status based on session status and date
  const getEventStatus = () => {
    if (frontmatter.status === "cancelled") return "EventCancelled";
    if (frontmatter.status === "held") return "EventCompleted";

    // If no explicit status, check if the date has passed
    const sessionDate = new Date(frontmatter.date);
    const now = new Date();

    if (sessionDate < now && frontmatter.status !== "upcoming") {
      return "EventCompleted";
    }

    return "EventScheduled";
  };

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
        eventStatus: getEventStatus(),
        eventAttendanceMode: "OfflineEventAttendanceMode",
        organizer: {
          name: "باشگاه کتابخوانی گونیا",
          url: "https://bookclub.shab.boo",
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
            description: `کتاب ${
              book.frontmatter.titleFarsi || book.frontmatter.title
            } اثر ${book.frontmatter.author}`,
          },
        }),
      }}
    />
  );
};

export default SessionTemplate;
