import * as React from "react";
import { graphql, Link, PageProps, HeadFC } from "gatsby";
import Seo from "../components/Seo";
import Logo from "../components/Logo";

interface IndexPageData {
  allBooks: {
    nodes: Array<{
      frontmatter: {
        slug: string;
        title: string;
        titleFarsi?: string;
        author: string;
        bookNumber: number;
        status: string;
        coverImage?: string;
      };
    }>;
  };
  allSessions: {
    nodes: Array<{
      frontmatter: {
        slug: string;
        title: string;
        date: string;
        sessionNumber: number;
        bookSlug: string;
        status?: "upcoming" | "held" | "cancelled";
      };
    }>;
  };
}

const IndexPage: React.FC<PageProps<IndexPageData>> = ({ data }) => {
  const { allBooks, allSessions } = data;

  // Sort books by status and number
  const sortedBooks = [...allBooks.nodes].sort((a, b) => {
    const statusOrder = { current: 0, upcoming: 1, completed: 2 };
    const statusA =
      statusOrder[a.frontmatter.status as keyof typeof statusOrder] ?? 3;
    const statusB =
      statusOrder[b.frontmatter.status as keyof typeof statusOrder] ?? 3;

    if (statusA !== statusB) return statusA - statusB;
    return b.frontmatter.bookNumber - a.frontmatter.bookNumber;
  });

  // Helper function to get session status
  const getSessionStatus = (session: any) => {
    const sessionDate = new Date(session.frontmatter.date);
    const now = new Date();

    let status = session.frontmatter.status;

    // If no explicit status, determine based on date
    if (!status) {
      status = sessionDate < now ? "held" : "upcoming";
    }

    return status;
  };

  // Separate upcoming sessions from others
  const upcomingSessions = allSessions.nodes.filter(
    (session) => getSessionStatus(session) === "upcoming"
  );
  const otherSessions = allSessions.nodes.filter(
    (session) => getSessionStatus(session) !== "upcoming"
  );

  // Sort sessions by date (newest first) for the regular list
  const sortedSessions = otherSessions;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50">
      {/* Header */}
      <header className="backdrop-blur-glass border-b border-white/20 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-6 py-8">
          <div className="text-center space-y-4">
            <Logo size="lg" className="justify-center" />
            <div className="space-y-3">
              <h1 className="text-5xl font-light text-gray-900 tracking-tight">
                باشگاه کتابخوانی گونیا
              </h1>
              <p className="text-gray-600 text-lg font-light">
                هر هفته، یک کتاب جدید
              </p>
              <div className="w-16 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full"></div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-6 py-12">
        {/* Upcoming Sessions - Prominent Section */}
        {upcomingSessions.length > 0 && (
          <section className="mb-16">
            <div className="flex items-center space-x-reverse space-x-4 mb-4">
              <h2 className="text-3xl font-light text-gray-900">نشست پیش رو</h2>
              <div className="flex-1 h-px bg-gradient-to-l from-gray-200 to-transparent"></div>
            </div>

            <div className="space-y-6">
              {upcomingSessions.map((session) => {
                const relatedBook = allBooks.nodes.find(
                  (book) =>
                    book.frontmatter.slug === session.frontmatter.bookSlug
                );

                return (
                  <div
                    key={session.frontmatter.slug}
                    className="w-full card card-hover group bg-gradient-to-br from-blue-50 via-white to-purple-50 border-2 border-blue-200"
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
                                جلسه {session.frontmatter.sessionNumber}
                              </span>
                            </div>

                            <Link
                              to={`/sessions/${session.frontmatter.slug}`}
                              className="block text-3xl font-medium text-gray-900 hover:text-blue-600 transition-colors duration-200"
                            >
                              {session.frontmatter.title}
                            </Link>

                            <p className="text-gray-500 text-lg flex items-center gap-2">
                              📅{" "}
                              {new Date(
                                session.frontmatter.date
                              ).toLocaleDateString("fa-IR")}
                            </p>
                          </div>

                          <div className="flex justify-start">
                            <Link
                              to={`/sessions/${session.frontmatter.slug}`}
                              className="primary-button inline-flex items-center gap-2"
                            >
                              مشاهده جزئیات جلسه
                              <span>←</span>
                            </Link>
                          </div>
                        </div>

                        {/* Related Book - Left Side */}
                        {relatedBook && (
                          <div className="lg:w-1/3 w-full">
                            <div className="bg-white rounded-xl p-6 border border-blue-100 shadow-sm h-full">
                              <div className="text-center space-y-4">
                                {relatedBook.frontmatter.coverImage && (
                                  <div className="flex justify-center">
                                    <img
                                      src={relatedBook.frontmatter.coverImage}
                                      alt={relatedBook.frontmatter.title}
                                      className="w-24 h-32 object-cover rounded-lg shadow-sm"
                                    />
                                  </div>
                                )}
                                <div className="space-y-2">
                                  <Link
                                    to={`/books/${relatedBook.frontmatter.slug}`}
                                    className="block font-medium text-blue-700 hover:text-blue-800 transition-colors duration-200 text-lg"
                                  >
                                    📚 {relatedBook.frontmatter.titleFarsi}
                                  </Link>
                                  {relatedBook.frontmatter.title && (
                                    <p className="text-blue-600 text-sm">
                                      {relatedBook.frontmatter.title}
                                    </p>
                                  )}
                                  <p className="text-gray-500 text-sm">
                                    نویسنده: {relatedBook.frontmatter.author}
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
              })}
            </div>
          </section>
        )}

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-12">
          {/* Books Section */}
          <section className="space-y-8">
            <div className="flex items-center space-x-reverse space-x-4">
              <h2 className="text-3xl font-light text-gray-900">کتاب‌ها</h2>
              <div className="flex-1 h-px bg-gradient-to-l from-gray-200 to-transparent"></div>
            </div>

            <div className="space-y-6">
              {sortedBooks.map((book) => (
                <div
                  key={book.frontmatter.slug}
                  className="card card-hover group"
                >
                  <div className="p-8">
                    <div className="flex items-start gap-6">
                      {book.frontmatter.coverImage && (
                        <div className="shrink-0">
                          <img
                            src={book.frontmatter.coverImage}
                            alt={book.frontmatter.title}
                            className="w-20 h-28 object-cover rounded-xl shadow-sm group-hover:shadow-md transition-shadow duration-300"
                          />
                        </div>
                      )}

                      <div className="flex-1 space-y-4">
                        <div className="flex items-center gap-3">
                          <span className="status-badge bg-gray-50 text-gray-600 border border-gray-200">
                            کتاب {book.frontmatter.bookNumber}
                          </span>
                          <span
                            className={`status-badge ${
                              book.frontmatter.status === "completed"
                                ? "status-completed"
                                : book.frontmatter.status === "current"
                                ? "status-current"
                                : "status-upcoming"
                            }`}
                          >
                            {book.frontmatter.status === "completed"
                              ? "تکمیل شده"
                              : book.frontmatter.status === "current"
                              ? "در حال خواندن"
                              : "آینده"}
                          </span>
                        </div>

                        <div className="space-y-2">
                          <Link
                            to={`/books/${book.frontmatter.slug}`}
                            className="block text-xl font-medium text-gray-900 hover:text-blue-600 transition-colors duration-200 line-clamp-2"
                          >
                            {book.frontmatter.titleFarsi}
                          </Link>

                          {book.frontmatter.title && (
                            <p className="text-gray-500 font-light">
                              {book.frontmatter.title}
                            </p>
                          )}
                        </div>

                        <p className="text-gray-400 text-sm font-light">
                          نویسنده: {book.frontmatter.author}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Sessions Section */}
          <section className="space-y-8">
            <div className="flex items-center space-x-reverse space-x-4">
              <h2 className="text-3xl font-light text-gray-900">جلسات گذشته</h2>
              <div className="flex-1 h-px bg-gradient-to-l from-gray-200 to-transparent"></div>
            </div>

            <div className="space-y-6">
              {sortedSessions.slice(0, 10).map((session) => {
                // Helper function to get status badge
                const getStatusBadge = () => {
                  const status = getSessionStatus(session);

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

                const relatedBook = allBooks.nodes.find(
                  (book) =>
                    book.frontmatter.slug === session.frontmatter.bookSlug
                );

                return (
                  <div
                    key={session.frontmatter.slug}
                    className="card card-hover group"
                  >
                    <div className="p-8">
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <div className="flex items-center gap-3 mb-2">
                            <span className={statusBadge.className}>
                              {statusBadge.text}
                            </span>
                            <span className="status-badge bg-gray-50 text-gray-700 border border-gray-200">
                              جلسه {session.frontmatter.sessionNumber}
                            </span>
                          </div>
                          <Link
                            to={`/sessions/${session.frontmatter.slug}`}
                            className="block text-xl font-medium text-gray-900 hover:text-blue-600 transition-colors duration-200"
                          >
                            {session.frontmatter.title}
                          </Link>
                          <p className="text-gray-400 text-sm font-light">
                            {new Date(
                              session.frontmatter.date
                            ).toLocaleDateString("fa-IR")}
                          </p>
                        </div>

                        {relatedBook && (
                          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-4 border border-blue-100">
                            <Link
                              to={`/books/${relatedBook.frontmatter.slug}`}
                              className="block font-medium text-blue-700 hover:text-blue-800 transition-colors duration-200"
                            >
                              📚 {relatedBook.frontmatter.titleFarsi}
                            </Link>
                            {relatedBook.frontmatter.title && (
                              <p className="text-blue-600 text-sm font-light mt-1">
                                {relatedBook.frontmatter.title}
                              </p>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default IndexPage;

export const Head: HeadFC<IndexPageData> = ({ data, location }) => {
  return (
    <Seo
      title="باشگاه کتابخوانی گونیا - هر هفته، یک کتاب جدید"
      description="باشگاه کتابخوانی گونیا - مکانی برای عاشقان کتاب که هر هفته یک کتاب جدید مطالعه و در مورد آن بحث می‌کنیم. به ما بپیوندید و تجربه خواندن خود را به اشتراک بگذارید."
      pathname={location.pathname}
      organizationSchema={{
        name: "باشگاه کتابخوانی گونیا",
        url: "https://bookclub.shab.boo",
        logo: "https://bookclub.shab.boo/favicon/android-chrome-512x512.png",
        description:
          "باشگاه کتابخوانی که هر هفته یک کتاب جدید مطالعه و بحث می‌کند",
        foundingDate: "2024",
        address: {
          addressCountry: "IR",
        },
        contactPoint: {
          contactType: "customer service",
          email: "info@shab.boo",
        },
      }}
    />
  );
};

export const query = graphql`
  query {
    allBooks: allMdx(
      filter: { internal: { contentFilePath: { regex: "/books/" } } }
    ) {
      nodes {
        frontmatter {
          slug
          title
          titleFarsi
          author
          bookNumber
          status
          coverImage
        }
      }
    }
    allSessions: allMdx(
      filter: { internal: { contentFilePath: { regex: "/sessions/" } } }
      sort: { frontmatter: { sessionNumber: DESC } }
    ) {
      nodes {
        frontmatter {
          slug
          title
          date
          sessionNumber
          bookSlug
          status
        }
      }
    }
  }
`;
