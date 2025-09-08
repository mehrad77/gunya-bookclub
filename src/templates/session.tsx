import React from "react";
import { graphql, Link, PageProps, HeadFC } from "gatsby";
import { MDXProvider } from "@mdx-js/react";
import Seo from "../components/Seo";
import Logo from "../components/Logo";
import BookInfoCard from "../components/BookInfoCard";
import StatusBadge from "../components/StatusBadge";
import MeetingInfo from "../components/MeetingInfo";
import { useTranslation } from "../locales";

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
  meetingInfo: {
    frontmatter: {
      clubName: string;
      time: string;
      timezone: string;
      meetingInfo: string;
      meetLink: string;
    };
  };
}

const SessionTemplate: React.FC<PageProps<SessionData, SessionPageContext>> = ({
  data,
  children,
}) => {
  const { mdx } = data;
  const { frontmatter } = mdx;
  const { t } = useTranslation();

  // Helper function to get session status
  const getSessionStatus = () => {
    const sessionDate = new Date(frontmatter.date);
    const now = new Date();

    let status = frontmatter.status;

    // If no explicit status, determine based on date
    if (!status) {
      status = sessionDate < now ? "held" : "upcoming";
    }

    return status;
  };

  const sessionStatus = getSessionStatus();

  // Determine event status based on session status for SEO
  const getEventStatus = () => {
    if (sessionStatus === "cancelled") return "EventCancelled";
    if (sessionStatus === "held") return "EventCompleted";
    return "EventScheduled";
  };

  return (
    <div className="min-h-screen">
      <div className="max-w-5xl mx-auto px-6 py-12">
        {/* Header with Logo and Back Navigation */}
        <div className="flex items-center justify-between mb-8">
          <Link to="/" className="minimal-button group">
            <span className="ml-2 transition-transform group-hover:-translate-x-1">
              ←
            </span>
            {t("common.backToHome")}
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
                    <StatusBadge status={sessionStatus} />
                    <span className="status-badge bg-gray-50 text-gray-700 border border-gray-200">
                      {t("common.session")} {frontmatter.sessionNumber}
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
                      {t("session.attendees")}
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

                {/* Meeting Information - Only for upcoming sessions */}
                {sessionStatus === "upcoming" && data.meetingInfo && (
                  <MeetingInfo
                    meetingInfo={data.meetingInfo.frontmatter}
                    sessionDate={frontmatter.date}
                  />
                )}
              </div>

              {/* Related Book Card - Left Side */}
              {data.book && (
                <div className="lg:w-1/3 w-full">
                  <BookInfoCard book={data.book.frontmatter} />
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
              {t("session.sessionContent")}
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
        slug
        author
        year
        language
        genre
        translator
        pages
        coverImage
      }
    }
    meetingInfo: mdx(
      internal: { contentFilePath: { regex: "/constants/upcoming-meeting/" } }
    ) {
      frontmatter {
        clubName
        time
        timezone
        meetingInfo
        meetLink
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
  const { t } = useTranslation();

  const sessionTitle = `${frontmatter.title} | ${t("seo.organizationName")}`;
  const description =
    mdx.excerpt ||
    `${t("session.sessionNumber")} ${frontmatter.sessionNumber} ${t(
      "seo.organizationName"
    )} - ${t("session.sessionDescription")} ${
      book?.frontmatter?.title || frontmatter.bookSlug
    }`;

  // Helper function to get session status for Head component
  const getSessionStatus = () => {
    const sessionDate = new Date(frontmatter.date);
    const now = new Date();

    let status = frontmatter.status;

    // If no explicit status, determine based on date
    if (!status) {
      status = sessionDate < now ? "held" : "upcoming";
    }

    return status;
  };

  const sessionStatus = getSessionStatus();

  // Determine event status based on session status for SEO
  const getEventStatus = () => {
    if (sessionStatus === "cancelled") return "EventCancelled";
    if (sessionStatus === "held") return "EventCompleted";
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
          name: t("seo.organizationName"),
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
            description: `${t("common.book")} ${
              book.frontmatter.titleFarsi || book.frontmatter.title
            } ${t("book.bookBy")} ${book.frontmatter.author}`,
          },
        }),
      }}
    />
  );
};

export default SessionTemplate;
