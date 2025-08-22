# باشگاه کتابخوانی گونیا (Gunya Book Club)

A Gatsby-based website for managing the book club with weekly book discussions.

## Features

- 📚 **Book Management**: Display book information with Persian and original titles
- 📝 **Session Summaries**: Track discussion sessions with attendees and key points  
- 🏠 **Homepage**: Overview of all books and recent sessions
- 🔗 **Navigation**: Easy links between books and their related sessions
- 📱 **Responsive Design**: Works on desktop and mobile devices
- 🎨 **Persian Typography**: Proper RTL support with Vazirmatn font

## Content Structure

### Books (`/content/books/`)
Each book is a `.mdx` file with frontmatter:

```yaml
---
slug: "book-slug"
title: "Original Title"
titleFarsi: "عنوان فارسی"
author: "نویسنده"
year: 1900
language: "زبان"
genre: ["ژانر۱", "ژانر۲"]
translator: "مترجم"
pages: "تعداد صفحات"
coverImage: "path/to/image"
bookNumber: 1
status: "upcoming" | "current" | "completed"
links:
  wikipediaFarsi: "link"
  wikipediaEnglish: "link"
  # ... other links
---

Book description in Persian...
```

### Sessions (`/content/sessions/`)
Each session is a `.mdx` file with frontmatter:

```yaml
---
slug: "session-slug"
title: "عنوان جلسه"
date: "2025-08-01"
bookSlug: "related-book-slug"
sessionNumber: 1
attendees: ["نام۱", "نام۲"]
---

Session summary and discussion details...
```

## Development

1. **Install dependencies**:
   ```bash
   pnpm install
   ```

2. **Start development server**:
   ```bash
   pnpm run develop
   ```

3. **Build for production**:
   ```bash
   pnpm run build
   ```

## Adding New Content

### Adding a New Book
1. Create a new `.mdx` file in `/content/books/`
2. Use the frontmatter structure shown above
3. Write the book description in Persian

### Adding a Session Summary
1. Create a new `.mdx` file in `/content/sessions/`
2. Set the `bookSlug` to match an existing book
3. Write the session summary in Persian

## URL Structure

- Homepage: `/`
- Book pages: `/books/{slug}`
- Session pages: `/sessions/{slug}`

## Technologies Used

- **Gatsby** - Static site generator
- **TypeScript** - Type safety
- **MDX** - Markdown with React components
- **Tailwind CSS** - Styling
- **Vazirmatn** - Persian web font

## Future Enhancements

- [ ] Multi-session books support
- [ ] Search functionality
- [ ] Book ratings and reviews
- [ ] Calendar integration
- [ ] Member profiles
- [ ] Email notifications
