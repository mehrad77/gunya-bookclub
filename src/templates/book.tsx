import React from "react";
import { graphql, Link, PageProps, type HeadFC } from "gatsby";
import Seo from "../components/Seo";
import Logo from "../components/Logo";

interface BookPageContext {
  id: string;
  slug: string;
}

interface BookData {
  mdx: {
    frontmatter: {
      slug: string;
      title: string;
      titleFarsi?: string;
      author: string;
      year: string;
      language: string;
      genre: string[];
      translator?: string;
      pages: string;
      coverImage?: string;
      bookNumber: number;
      status: string;
      links?: {
        wikipediaFarsi?: string;
        wikipediaEnglish?: string;
        wikisource?: string;
        goodreadsEnglish?: string;
        goodreadsFarsi?: string;
        audiobook?: string;
      };
    };
    excerpt: string;
  };
  relatedSessions: {
    nodes: Array<{
      frontmatter: {
        slug: string;
        title: string;
        date: string;
        sessionNumber: number;
        status?: 'upcoming' | 'held' | 'cancelled';
      };
    }>;
  };
}

const BookTemplate: React.FC<PageProps<BookData, BookPageContext>> = ({ data }) => {
  const { mdx, relatedSessions } = data;
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

        {/* Book Header */}
        <div className="card mb-12">
          <div className="p-10">
            <div className="flex flex-col lg:flex-row gap-10">
              {frontmatter.coverImage && (
                <div className="lg:w-1/3 flex justify-center lg:justify-start">
                  <div className="relative">
                    <img 
                      src={frontmatter.coverImage} 
                      alt={frontmatter.title}
                      className="w-64 rounded-2xl shadow-2xl"
                    />
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-black/20 to-transparent"></div>
                  </div>
                </div>
              )}
              
              <div className="lg:w-2/3 space-y-6">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="status-badge bg-blue-50 text-blue-700 border border-blue-200">
                    کتاب {frontmatter.bookNumber}
                  </span>
                  <span className={`status-badge ${
                    frontmatter.status === 'completed' ? 'status-completed' :
                    frontmatter.status === 'current' ? 'status-current' :
                    'status-upcoming'
                  }`}>
                    {frontmatter.status === 'completed' ? 'تکمیل شده' :
                     frontmatter.status === 'current' ? 'در حال خواندن' : 'آینده'}
                  </span>
                </div>

                <div className="space-y-3">
                  <h1 className="text-4xl font-light text-gray-900 leading-tight">
                    {frontmatter.title}
                  </h1>
                  
                  {frontmatter.titleFarsi && (
                    <h2 className="text-2xl font-light text-gray-600">
                      {frontmatter.titleFarsi}
                    </h2>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <span className="text-gray-400">✍️</span>
                      <span className="font-medium text-gray-600">نویسنده:</span>
                      <span className="text-gray-900">{frontmatter.author}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-gray-400">🗓️</span>
                      <span className="font-medium text-gray-600">سال انتشار:</span>
                      <span className="text-gray-900">{frontmatter.year}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-gray-400">🗣️</span>
                      <span className="font-medium text-gray-600">زبان:</span>
                      <span className="text-gray-900">{frontmatter.language}</span>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <span className="text-gray-400">📄</span>
                      <span className="font-medium text-gray-600">تعداد صفحات:</span>
                      <span className="text-gray-900">{frontmatter.pages}</span>
                    </div>
                    {frontmatter.translator && (
                      <div className="flex items-center gap-3">
                        <span className="text-gray-400">👤</span>
                        <span className="font-medium text-gray-600">مترجم:</span>
                        <span className="text-gray-900">{frontmatter.translator}</span>
                      </div>
                    )}
                    <div className="flex items-center gap-3">
                      <span className="text-gray-400">🏷️</span>
                      <span className="font-medium text-gray-600">ژانر:</span>
                      <span className="text-gray-900">{frontmatter.genre.join('، ')}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Book Description */}
        <div className="card mb-12">
          <div className="p-10">
            <h3 className="text-2xl font-light text-gray-900 mb-6 flex items-center gap-3">
              <span className="text-blue-500">📖</span>
              درباره کتاب
            </h3>
            <div className="prose prose-lg text-gray-700">
              <p className="text-lg leading-relaxed">{mdx.excerpt}</p>
            </div>
          </div>
        </div>

        {/* Links */}
        {frontmatter.links && (
          <div className="card mb-12">
            <div className="p-10">
              <h3 className="text-2xl font-light text-gray-900 mb-6 flex items-center gap-3">
                <span className="text-purple-500">🔗</span>
                منابع و پیوندها
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {frontmatter.links.wikipediaFarsi && (
                  <a 
                    href={frontmatter.links.wikipediaFarsi} 
                    className="minimal-button justify-start hover:bg-blue-50 hover:text-blue-700 hover:border-blue-200"
                  >
                    🌐 ویکی‌پدیای فارسی
                  </a>
                )}
                {frontmatter.links.wikipediaEnglish && (
                  <a 
                    href={frontmatter.links.wikipediaEnglish} 
                    className="minimal-button justify-start hover:bg-blue-50 hover:text-blue-700 hover:border-blue-200"
                  >
                    🌐 ویکی‌پدیای انگلیسی
                  </a>
                )}
                {frontmatter.links.wikisource && (
                  <a 
                    href={frontmatter.links.wikisource} 
                    className="minimal-button justify-start hover:bg-orange-50 hover:text-orange-700 hover:border-orange-200"
                  >
                    📜 ویکی‌نبشته
                  </a>
                )}
                {frontmatter.links.goodreadsEnglish && (
                  <a 
                    href={frontmatter.links.goodreadsEnglish} 
                    className="minimal-button justify-start hover:bg-green-50 hover:text-green-700 hover:border-green-200"
                  >
                    📚 گودریدز انگلیسی
                  </a>
                )}
                {frontmatter.links.goodreadsFarsi && (
                  <a 
                    href={frontmatter.links.goodreadsFarsi} 
                    className="minimal-button justify-start hover:bg-green-50 hover:text-green-700 hover:border-green-200"
                  >
                    📚 گودریدز فارسی
                  </a>
                )}
                {frontmatter.links.audiobook && (
                  <a 
                    href={frontmatter.links.audiobook} 
                    className="minimal-button justify-start hover:bg-purple-50 hover:text-purple-700 hover:border-purple-200"
                  >
                    🎧 نسخه صوتی
                  </a>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Related Sessions */}
        {relatedSessions.nodes.length > 0 && (
          <div className="card">
            <div className="p-10">
              <h3 className="text-2xl font-light text-gray-900 mb-6 flex items-center gap-3">
                <span className="text-green-500">💬</span>
                جلسات مرتبط
              </h3>
              <div className="space-y-6">
                {relatedSessions.nodes.map((session) => {
                  // Helper function to get status badge
                  const getStatusBadge = () => {
                    const sessionDate = new Date(session.frontmatter.date);
                    const now = new Date();
                    
                    let status = session.frontmatter.status;
                    
                    // If no explicit status, determine based on date
                    if (!status) {
                      status = sessionDate < now ? 'held' : 'upcoming';
                    }
                    
                    switch (status) {
                      case 'held':
                        return {
                          text: 'برگزار شده',
                          className: 'inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-green-50 text-green-700 border border-green-200'
                        };
                      case 'upcoming':
                        return {
                          text: 'آینده',
                          className: 'inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-blue-50 text-blue-700 border border-blue-200'
                        };
                      case 'cancelled':
                        return {
                          text: 'لغو شده',
                          className: 'inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-red-50 text-red-700 border border-red-200'
                        };
                      default:
                        return {
                          text: 'نامشخص',
                          className: 'inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-gray-50 text-gray-700 border border-gray-200'
                        };
                    }
                  };

                  const statusBadge = getStatusBadge();

                  return (
                    <div key={session.frontmatter.slug} className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 border border-blue-100">
                      <div className="flex items-center gap-3 mb-2">
                        <span className={statusBadge.className}>
                          {statusBadge.text}
                        </span>
                        <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-gray-50 text-gray-700 border border-gray-200">
                          جلسه {session.frontmatter.sessionNumber}
                        </span>
                      </div>
                      <Link 
                        to={`/sessions/${session.frontmatter.slug}`}
                        className="block text-xl font-medium text-blue-700 hover:text-blue-800 transition-colors duration-200"
                      >
                        {session.frontmatter.title}
                      </Link>
                      <p className="text-blue-600 font-light mt-2">
                        {new Date(session.frontmatter.date).toLocaleDateString('fa-IR')}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export const query = graphql`
  query($id: String!, $slug: String!) {
    mdx(id: { eq: $id }) {
      frontmatter {
        slug
        title
        titleFarsi
        author
        year
        language
        genre
        translator
        pages
        coverImage
        bookNumber
        status
        links {
          wikipediaFarsi
          wikipediaEnglish
          wikisource
          goodreadsEnglish
          goodreadsFarsi
          audiobook
        }
      }
      excerpt(pruneLength: 500)
    }
    relatedSessions: allMdx(
      filter: { 
        internal: { contentFilePath: { regex: "/sessions/" } }
        frontmatter: { bookSlug: { eq: $slug } }
      }
      sort: { frontmatter: { sessionNumber: ASC } }
    ) {
      nodes {
        frontmatter {
          slug
          title
          date
          sessionNumber
          status
        }
      }
    }
  }
`;

export const Head: HeadFC<BookData, BookPageContext> = ({ data, location }) => {
  const { mdx } = data;
  const { frontmatter } = mdx;
  
  const bookTitle = frontmatter.titleFarsi || frontmatter.title;
  const pageTitle = `${bookTitle} - ${frontmatter.author} | باشگاه کتابخوانی گونیا`;
  const description = mdx.excerpt || `کتاب ${bookTitle} اثر ${frontmatter.author} - یکی از کتاب‌های مطالعه شده در باشگاه کتابخوانی گونیا`;
  
  return (
    <Seo
      title={pageTitle}
      description={description}
      pathname={location.pathname}
      image={frontmatter.coverImage}
      article={true}
      publishedDate={frontmatter.year}
      author={frontmatter.author}
      bookSchema={{
        name: frontmatter.title,
        author: frontmatter.author,
        bookEdition: frontmatter.translator ? `ترجمه ${frontmatter.translator}` : undefined,
        datePublished: frontmatter.year,
        sameAs: frontmatter.links ? Object.values(frontmatter.links).filter(Boolean) : undefined,
        genre: frontmatter.genre,
        language: frontmatter.language,
        numberOfPages: frontmatter.pages,
        translator: frontmatter.translator,
        image: frontmatter.coverImage,
        description: description
      }}
    />
  );
};

export default BookTemplate;
