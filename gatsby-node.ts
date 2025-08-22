import type { GatsbyNode } from "gatsby";
import path from "path";

export const createPages: GatsbyNode["createPages"] = async ({
  graphql,
  actions,
  reporter,
}) => {
  const { createPage } = actions;

  // Define templates
  const bookTemplate = path.resolve(`src/templates/book.tsx`);
  const sessionTemplate = path.resolve(`src/templates/session.tsx`);

  // Query for all books
  const booksResult = await graphql(`
    query {
      allMdx(filter: { internal: { contentFilePath: { regex: "/books/" } } }) {
        nodes {
          id
          frontmatter {
            slug
          }
          internal {
            contentFilePath
          }
        }
      }
    }
  `);

  if (booksResult.errors) {
    reporter.panicOnBuild(`Error while running GraphQL query for books.`);
    return;
  }

  // Create book pages
  const books = (booksResult.data as any)?.allMdx?.nodes || [];
  books.forEach((book: any) => {
    if (book.frontmatter?.slug) {
      createPage({
        path: `/books/${book.frontmatter.slug}`,
        component: bookTemplate,
        context: {
          id: book.id,
          slug: book.frontmatter.slug,
        },
      });
    }
  });

  // Query for all sessions
  const sessionsResult = await graphql(`
    query {
      allMdx(filter: { internal: { contentFilePath: { regex: "/sessions/" } } }) {
        nodes {
          id
          frontmatter {
            slug
            bookSlug
          }
          internal {
            contentFilePath
          }
        }
      }
    }
  `);

  if (sessionsResult.errors) {
    reporter.panicOnBuild(`Error while running GraphQL query for sessions.`);
    return;
  }

  // Create session pages
  const sessions = (sessionsResult.data as any)?.allMdx?.nodes || [];
  sessions.forEach((session: any) => {
    if (session.frontmatter?.slug) {
      createPage({
        path: `/sessions/${session.frontmatter.slug}`,
        component: sessionTemplate,
        context: {
          id: session.id,
          slug: session.frontmatter.slug,
          bookSlug: session.frontmatter.bookSlug,
        },
      });
    }
  });
};

export const onCreateNode: GatsbyNode["onCreateNode"] = ({ node, actions }) => {
  const { createNodeField } = actions;

  if (node.internal.type === `Mdx`) {
    // Add content type field based on file path
    const contentFilePath = node.internal.contentFilePath as string;
    if (contentFilePath?.includes('/books/')) {
      createNodeField({
        node,
        name: `contentType`,
        value: `book`,
      });
    } else if (contentFilePath?.includes('/sessions/')) {
      createNodeField({
        node,
        name: `contentType`,
        value: `session`,
      });
    }
  }
};
