import React from "react";
import { graphql, Link, PageProps, type HeadFC } from "gatsby";
import Seo from "../components/Seo";
import Logo from "../components/Logo";
import SessionCard from "../components/SessionCard";
import { useTranslation } from "../locales";

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
  const { t } = useTranslation();

  return (
    <div className="min-h-screen">
      <div className="max-w-5xl mx-auto px-6 py-12">
        {/* Header with Logo and Back Navigation */}
        <div className="flex items-center justify-between mb-8">
          <Link 
            to="/" 
            className="minimal-button group"
          >
            <span className="ml-2 transition-transform group-hover:-translate-x-1">←</span>
            {t('common.backToHome')}
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
                  <span className={`status-badge ${
                    frontmatter.status === 'completed' ? 'status-completed' :
                    frontmatter.status === 'current' ? 'status-current' :
                    'status-upcoming'
                  }`}>
                    {frontmatter.status === 'completed' ? t('status.completed') :
                     frontmatter.status === 'current' ? t('status.current') : t('status.upcoming')}
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
                      <span className="font-medium text-gray-600">{t('common.author')}:</span>
                      <span className="text-gray-900">{frontmatter.author}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-gray-400">🗓️</span>
                      <span className="font-medium text-gray-600">{t('common.yearPublished')}:</span>
                      <span className="text-gray-900">{frontmatter.year}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-gray-400">🗣️</span>
                      <span className="font-medium text-gray-600">{t('common.language')}:</span>
                      <span className="text-gray-900">{frontmatter.language}</span>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <span className="text-gray-400">📄</span>
                      <span className="font-medium text-gray-600">{t('common.pages')}:</span>
                      <span className="text-gray-900">{frontmatter.pages}</span>
                    </div>
                    {frontmatter.translator && (
                      <div className="flex items-center gap-3">
                        <span className="text-gray-400">👤</span>
                        <span className="font-medium text-gray-600">{t('common.translator')}:</span>
                        <span className="text-gray-900">{frontmatter.translator}</span>
                      </div>
                    )}
                    <div className="flex items-center gap-3">
                      <span className="text-gray-400">🏷️</span>
                      <span className="font-medium text-gray-600">{t('common.genre')}:</span>
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
              {t('book.aboutBook')}
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
                {t('book.linksAndResources')}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {frontmatter.links.wikipediaFarsi && (
                  <a 
                    href={frontmatter.links.wikipediaFarsi}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="minimal-button justify-start hover:bg-blue-50 hover:text-blue-700 hover:border-blue-200"
                  >
                    🌐 {t('links.wikipediaFarsi')}
                  </a>
                )}
                {frontmatter.links.wikipediaEnglish && (
                  <a 
                    href={frontmatter.links.wikipediaEnglish}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="minimal-button justify-start hover:bg-blue-50 hover:text-blue-700 hover:border-blue-200"
                  >
                    🌐 {t('links.wikipediaEnglish')}
                  </a>
                )}
                {frontmatter.links.wikisource && (
                  <a 
                    href={frontmatter.links.wikisource}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="minimal-button justify-start hover:bg-orange-50 hover:text-orange-700 hover:border-orange-200"
                  >
                    📜 {t('links.wikisource')}
                  </a>
                )}
                {frontmatter.links.goodreadsEnglish && (
                  <a 
                    href={frontmatter.links.goodreadsEnglish}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="minimal-button justify-start hover:bg-green-50 hover:text-green-700 hover:border-green-200"
                  >
                    📚 {t('links.goodreadsEnglish')}
                  </a>
                )}
                {frontmatter.links.goodreadsFarsi && (
                  <a 
                    href={frontmatter.links.goodreadsFarsi}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="minimal-button justify-start hover:bg-green-50 hover:text-green-700 hover:border-green-200"
                  >
                    📚 {t('links.goodreadsFarsi')}
                  </a>
                )}
                {frontmatter.links.audiobook && (
                  <a 
                    href={frontmatter.links.audiobook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="minimal-button justify-start hover:bg-purple-50 hover:text-purple-700 hover:border-purple-200"
                  >
                    🎧 {t('links.audiobook')}
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
                {t('book.relatedSessions')}
              </h3>
              <div className="space-y-6">
                {relatedSessions.nodes.map((session) => (
                  <SessionCard 
                    key={session.frontmatter.slug}
                    session={session.frontmatter}
                    variant="default"
                  />
                ))}
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
  const { t } = useTranslation();
  
  const bookTitle = frontmatter.titleFarsi || frontmatter.title;
  const pageTitle = `${bookTitle} - ${frontmatter.author} | ${t('seo.organizationName')}`;
  const description = mdx.excerpt || `${t('common.book')} ${bookTitle} ${t('book.bookBy')} ${frontmatter.author} - ${t('book.bookDescription')}`;
  
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
        bookEdition: frontmatter.translator ? `${t('book.translationBy')} ${frontmatter.translator}` : undefined,
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
