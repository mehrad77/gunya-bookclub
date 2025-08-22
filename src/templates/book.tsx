import React from "react";
import { graphql, Link, PageProps } from "gatsby";

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
      year: number;
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
      };
    }>;
  };
}

const BookTemplate: React.FC<PageProps<BookData, BookPageContext>> = ({ data }) => {
  const { mdx, relatedSessions } = data;
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

        {/* Book Header */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <div className="flex flex-col md:flex-row gap-8">
            {frontmatter.coverImage && (
              <div className="md:w-1/3">
                <img 
                  src={frontmatter.coverImage} 
                  alt={frontmatter.title}
                  className="w-full rounded-lg shadow-md"
                />
              </div>
            )}
            
            <div className="md:w-2/3">
              <div className="mb-4">
                <span className="inline-block bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full">
                  کتاب {frontmatter.bookNumber}
                </span>
                <span className={`inline-block ml-2 text-sm px-3 py-1 rounded-full ${
                  frontmatter.status === 'completed' ? 'bg-green-100 text-green-800' :
                  frontmatter.status === 'current' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {frontmatter.status === 'completed' ? 'تکمیل شده' :
                   frontmatter.status === 'current' ? 'در حال خواندن' : 'آینده'}
                </span>
              </div>

              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {frontmatter.title}
              </h1>
              
              {frontmatter.titleFarsi && (
                <h2 className="text-xl text-gray-600 mb-4">
                  {frontmatter.titleFarsi}
                </h2>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div><strong>✍️ نویسنده:</strong> {frontmatter.author}</div>
                <div><strong>🗓️ سال انتشار:</strong> {frontmatter.year}</div>
                <div><strong>🗣️ زبان:</strong> {frontmatter.language}</div>
                <div><strong>📄 تعداد صفحات:</strong> {frontmatter.pages}</div>
                {frontmatter.translator && (
                  <div><strong>👤 مترجم:</strong> {frontmatter.translator}</div>
                )}
                <div><strong>🏷️ ژانر:</strong> {frontmatter.genre.join('، ')}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Book Description */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h3 className="text-xl font-semibold mb-4">درباره کتاب</h3>
          <div className="prose prose-lg max-w-none text-gray-700">
            <p>{mdx.excerpt}</p>
          </div>
        </div>

        {/* Links */}
        {frontmatter.links && (
          <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
            <h3 className="text-xl font-semibold mb-4">منابع و پیوندها</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {frontmatter.links.wikipediaFarsi && (
                <a href={frontmatter.links.wikipediaFarsi} className="text-blue-600 hover:text-blue-800">
                  🌐 ویکی‌پدیای فارسی
                </a>
              )}
              {frontmatter.links.wikipediaEnglish && (
                <a href={frontmatter.links.wikipediaEnglish} className="text-blue-600 hover:text-blue-800">
                  🌐 ویکی‌پدیای انگلیسی
                </a>
              )}
              {frontmatter.links.wikisource && (
                <a href={frontmatter.links.wikisource} className="text-blue-600 hover:text-blue-800">
                  📜 ویکی‌نبشته
                </a>
              )}
              {frontmatter.links.goodreadsEnglish && (
                <a href={frontmatter.links.goodreadsEnglish} className="text-blue-600 hover:text-blue-800">
                  📚 گودریدز انگلیسی
                </a>
              )}
              {frontmatter.links.goodreadsFarsi && (
                <a href={frontmatter.links.goodreadsFarsi} className="text-blue-600 hover:text-blue-800">
                  📚 گودریدز فارسی
                </a>
              )}
              {frontmatter.links.audiobook && (
                <a href={frontmatter.links.audiobook} className="text-blue-600 hover:text-blue-800">
                  🎧 نسخه صوتی
                </a>
              )}
            </div>
          </div>
        )}

        {/* Related Sessions */}
        {relatedSessions.nodes.length > 0 && (
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h3 className="text-xl font-semibold mb-4">جلسات مرتبط</h3>
            <div className="space-y-4">
              {relatedSessions.nodes.map((session) => (
                <div key={session.frontmatter.slug} className="border-l-4 border-blue-500 pl-4">
                  <Link 
                    to={`/sessions/${session.frontmatter.slug}`}
                    className="text-lg font-medium text-blue-600 hover:text-blue-800"
                  >
                    {session.frontmatter.title}
                  </Link>
                  <p className="text-sm text-gray-600">
                    جلسه {session.frontmatter.sessionNumber} • {new Date(session.frontmatter.date).toLocaleDateString('fa-IR')}
                  </p>
                </div>
              ))}
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
        }
      }
    }
  }
`;

export default BookTemplate;
