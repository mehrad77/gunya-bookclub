import React from "react";

interface BookSchema {
  name: string;
  author: string | string[];
  isbn?: string;
  bookEdition?: string;
  datePublished?: string;
  sameAs?: string[];
  workExample?: string[];
  genre?: string[];
  language?: string;
  numberOfPages?: string;
  translator?: string;
  image?: string;
  description?: string;
}

interface EventSchema {
  name: string;
  startDate: string;
  endDate?: string;
  location?: {
    name: string;
    address?: string;
  };
  description?: string;
  eventStatus?: "EventScheduled" | "EventRescheduled" | "EventCancelled" | "EventCompleted";
  eventAttendanceMode?:
    | "OfflineEventAttendanceMode"
    | "OnlineEventAttendanceMode"
    | "MixedEventAttendanceMode";
  organizer?: {
    name: string;
    url?: string;
  };
  about?: BookSchema;
}

interface OrganizationSchema {
  name: string;
  logo?: string;
  url?: string;
  contactPoint?: {
    telephone?: string;
    email?: string;
    contactType: string;
  };
  description?: string;
  foundingDate?: string;
  address?: {
    addressCountry: string;
    addressLocality?: string;
  };
}

interface SeoProps {
  title: string;
  description: string;
  pathname: string;
  image?: string;
  article?: boolean;
  bookSchema?: BookSchema;
  eventSchema?: EventSchema;
  organizationSchema?: OrganizationSchema;
  publishedDate?: string;
  modifiedDate?: string;
  author?: string;
  lang?: string;
}

const defaultOrganization: OrganizationSchema = {
  name: "باشگاه کتابخوانی گونیا",
  url: "https://bookclub.shab.boo",
  logo: "https://bookclub.shab.boo/favicon/android-chrome-512x512.png",
  description: "باشگاه کتابخوانی که هر هفته یک کتاب جدید مطالعه و بحث می‌کند",
  foundingDate: "2024",
  address: {
    addressCountry: "IR",
  },
};

const Seo: React.FC<SeoProps> = ({
  title,
  description,
  pathname,
  image,
  article = false,
  bookSchema,
  eventSchema,
  organizationSchema = defaultOrganization,
  publishedDate,
  modifiedDate,
  author = "باشگاه کتابخوانی گونیا",
  lang = "fa",
}) => {
  const siteUrl = "https://bookclub.shab.boo";
  const fullUrl = `${siteUrl}${pathname}`;
  const defaultImage = `${siteUrl}/favicon/android-chrome-512x512.png`;
  const seoImage = image || defaultImage;

  // Generate JSON-LD structured data
  const generateBookSchema = (book: BookSchema) => ({
    "@context": "https://schema.org",
    "@type": "Book",
    name: book.name,
    author: Array.isArray(book.author)
      ? book.author.map((a) => ({ "@type": "Person", name: a }))
      : { "@type": "Person", name: book.author },
    ...(book.isbn && { isbn: book.isbn }),
    ...(book.bookEdition && { bookEdition: book.bookEdition }),
    ...(book.datePublished && { datePublished: book.datePublished }),
    ...(book.sameAs && { sameAs: book.sameAs }),
    ...(book.workExample && { workExample: book.workExample }),
    ...(book.genre && { genre: book.genre }),
    ...(book.language && { inLanguage: book.language }),
    ...(book.numberOfPages && { numberOfPages: book.numberOfPages }),
    ...(book.translator && {
      translator: { "@type": "Person", name: book.translator },
    }),
    ...(book.image && { image: book.image }),
    ...(book.description && { description: book.description }),
    publisher: {
      "@type": "Organization",
      name: organizationSchema.name,
      url: organizationSchema.url,
    },
  });

  const generateEventSchema = (event: EventSchema) => ({
    "@context": "https://schema.org",
    "@type": "Event",
    name: event.name,
    startDate: event.startDate,
    ...(event.endDate && { endDate: event.endDate }),
    ...(event.location && {
      location: {
        "@type": "Place",
        name: event.location.name,
        ...(event.location.address && { address: event.location.address }),
      },
    }),
    ...(event.description && { description: event.description }),
    eventStatus: `https://schema.org/${event.eventStatus || "EventScheduled"}`,
    eventAttendanceMode: `https://schema.org/${
      event.eventAttendanceMode || "OfflineEventAttendanceMode"
    }`,
    organizer: {
      "@type": "Organization",
      name: event.organizer?.name || organizationSchema.name,
      url: event.organizer?.url || organizationSchema.url,
    },
    ...(event.about && { about: generateBookSchema(event.about) }),
  });

  const generateOrganizationSchema = (org: OrganizationSchema) => ({
    "@context": "https://schema.org",
    "@type": "Organization",
    name: org.name,
    ...(org.logo && { logo: org.logo }),
    ...(org.url && { url: org.url }),
    ...(org.description && { description: org.description }),
    ...(org.foundingDate && { foundingDate: org.foundingDate }),
    ...(org.address && {
      address: {
        "@type": "PostalAddress",
        addressCountry: org.address.addressCountry,
        ...(org.address.addressLocality && {
          addressLocality: org.address.addressLocality,
        }),
      },
    }),
  });

  const jsonLdSchemas = [];

  // Always include organization schema
  jsonLdSchemas.push(generateOrganizationSchema(organizationSchema));

  // Add book schema if provided
  if (bookSchema) {
    jsonLdSchemas.push(generateBookSchema(bookSchema));
  }

  // Add event schema if provided
  if (eventSchema) {
    jsonLdSchemas.push(generateEventSchema(eventSchema));
  }
  return (
    <>
      <html lang={lang} dir="rtl" />
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="image" content={seoImage} />

      {/* Open Graph */}
      <meta property="og:url" content={fullUrl} />
      <meta property="og:type" content={article ? "article" : "website"} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={seoImage} />
      <meta property="og:image:alt" content={title} />
      <meta property="og:site_name" content="باشگاه کتابخوانی گونیا" />
      <meta property="og:locale" content="fa_IR" />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={seoImage} />
      <meta name="twitter:image:alt" content={title} />

      {/* Article specific meta tags */}
      {article && publishedDate && (
        <meta property="article:published_time" content={publishedDate} />
      )}
      {article && modifiedDate && (
        <meta property="article:modified_time" content={modifiedDate} />
      )}
      {article && <meta property="article:author" content={author} />}

      {/* Additional SEO meta tags */}
      <meta name="robots" content="index, follow" />
      <meta name="googlebot" content="index, follow" />
      <meta name="author" content={author} />
      <link rel="canonical" href={fullUrl} />

      {/* Favicon and App Icons */}
      <link rel="icon" type="image/x-icon" href="/favicon/favicon.ico" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon/favicon-16x16.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon/favicon-32x32.png" />
      <link rel="apple-touch-icon" sizes="180x180" href="/favicon/apple-touch-icon.png" />
      <link rel="icon" type="image/png" sizes="192x192" href="/favicon/android-chrome-192x192.png" />
      <link rel="icon" type="image/png" sizes="512x512" href="/favicon/android-chrome-512x512.png" />
      <link rel="manifest" href="/favicon/site.webmanifest" />
      <meta name="theme-color" content="#ffffff" />
      <meta name="msapplication-TileColor" content="#ffffff" />

      {/* Structured Data JSON-LD */}
      {jsonLdSchemas.map((schema, index) => (
        <script
          key={`json-ld-${index}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(schema, null, 2),
          }}
        />
      ))}
    </>
  );
};

export default Seo;
