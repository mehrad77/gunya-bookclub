import * as React from "react";
import { graphql, Link, PageProps, HeadFC } from "gatsby";
import Seo from "../components/Seo";
import Logo from "../components/Logo";
import BookCard from "../components/BookCard";
import SessionCard from "../components/SessionCard";
import BookInfoCard from "../components/BookInfoCard";
import StatusBadge from "../components/StatusBadge";
import UpcomingSessionCard from "../components/UpcomingSessionCard";

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
      <header className="backdrop-blur-glass border-b border-white/20 top-0 z-10">
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
                  <UpcomingSessionCard
                    key={session.frontmatter.slug}
                    session={session.frontmatter}
                    relatedBook={relatedBook?.frontmatter}
                  />
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
                <BookCard
                  key={book.frontmatter.slug}
                  book={book.frontmatter}
                />
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
                const relatedBook = allBooks.nodes.find(
                  (book) =>
                    book.frontmatter.slug === session.frontmatter.bookSlug
                );

                return (
                  <SessionCard
                    key={session.frontmatter.slug}
                    session={session.frontmatter}
                    relatedBook={relatedBook?.frontmatter}
                  />
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
