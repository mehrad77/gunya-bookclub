import * as React from "react";
import { graphql, Link, PageProps, HeadFC } from "gatsby";

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
      };
    }>;
  };
}

const IndexPage: React.FC<PageProps<IndexPageData>> = ({ data }) => {
  const { allBooks, allSessions } = data;
  
  // Sort books by status and number
  const sortedBooks = [...allBooks.nodes].sort((a, b) => {
    const statusOrder = { current: 0, upcoming: 1, completed: 2 };
    const statusA = statusOrder[a.frontmatter.status as keyof typeof statusOrder] ?? 3;
    const statusB = statusOrder[b.frontmatter.status as keyof typeof statusOrder] ?? 3;
    
    if (statusA !== statusB) return statusA - statusB;
    return b.frontmatter.bookNumber - a.frontmatter.bookNumber;
  });

  // Sort sessions by date (newest first)
  const sortedSessions = [...allSessions.nodes].sort((a, b) => 
    new Date(b.frontmatter.date).getTime() - new Date(a.frontmatter.date).getTime()
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <h1 className="text-4xl font-bold text-gray-900 text-center">
            باشگاه کتابخوانی گونیا
          </h1>
          <p className="text-gray-600 text-center mt-2">
            هر هفته، یک کتاب جدید
          </p>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Books Section */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">کتاب‌ها</h2>
            <div className="space-y-6">
              {sortedBooks.map((book) => (
                <div key={book.frontmatter.slug} className="bg-white rounded-lg shadow-md p-6">
                  <div className="flex items-start gap-4">
                    {book.frontmatter.coverImage && (
                      <img 
                        src={book.frontmatter.coverImage} 
                        alt={book.frontmatter.title}
                        className="w-16 h-24 object-cover rounded"
                      />
                    )}
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                          کتاب {book.frontmatter.bookNumber}
                        </span>
                        <span className={`text-xs px-2 py-1 rounded ${
                          book.frontmatter.status === 'completed' ? 'bg-green-100 text-green-800' :
                          book.frontmatter.status === 'current' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {book.frontmatter.status === 'completed' ? 'تکمیل شده' :
                           book.frontmatter.status === 'current' ? 'در حال خواندن' : 'آینده'}
                        </span>
                      </div>
                      
                      <Link 
                        to={`/books/${book.frontmatter.slug}`}
                        className="text-lg font-semibold text-gray-900 hover:text-blue-600 line-clamp-2"
                      >
                        {book.frontmatter.title}
                      </Link>
                      
                      {book.frontmatter.titleFarsi && (
                        <p className="text-gray-600 text-sm mt-1">
                          {book.frontmatter.titleFarsi}
                        </p>
                      )}
                      
                      <p className="text-gray-500 text-sm mt-1">
                        نویسنده: {book.frontmatter.author}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Sessions Section */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">جلسات اخیر</h2>
            <div className="space-y-6">
              {sortedSessions.slice(0, 10).map((session) => {
                const relatedBook = allBooks.nodes.find(
                  book => book.frontmatter.slug === session.frontmatter.bookSlug
                );
                
                return (
                  <div key={session.frontmatter.slug} className="bg-white rounded-lg shadow-md p-6">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <Link 
                          to={`/sessions/${session.frontmatter.slug}`}
                          className="text-lg font-semibold text-gray-900 hover:text-blue-600"
                        >
                          {session.frontmatter.title}
                        </Link>
                        <p className="text-gray-500 text-sm mt-1">
                          {new Date(session.frontmatter.date).toLocaleDateString('fa-IR')} • 
                          جلسه {session.frontmatter.sessionNumber}
                        </p>
                      </div>
                    </div>
                    
                    {relatedBook && (
                      <div className="bg-gray-50 rounded p-3 mt-3">
                        <Link 
                          to={`/books/${relatedBook.frontmatter.slug}`}
                          className="text-sm font-medium text-blue-600 hover:text-blue-800"
                        >
                          📚 {relatedBook.frontmatter.title}
                        </Link>
                        {relatedBook.frontmatter.titleFarsi && (
                          <p className="text-xs text-gray-600 mt-1">
                            {relatedBook.frontmatter.titleFarsi}
                          </p>
                        )}
                      </div>
                    )}
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

export const Head: HeadFC = () => <title>باشگاه کتابخوانی گونیا</title>;

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
    ) {
      nodes {
        frontmatter {
          slug
          title
          date
          sessionNumber
          bookSlug
        }
      }
    }
  }
`;
