export interface Book {
  id: string;
  slug: string;
  title: string;
  titleFarsi?: string;
  author: string;
  year: number;
  language: string;
  genre: string[];
  translator?: string;
  pages: string;
  description: string;
  coverImage?: string;
  bookNumber: number;
  status: 'upcoming' | 'current' | 'completed';
  links?: {
    wikipediaFarsi?: string;
    wikipediaEnglish?: string;
    wikisource?: string;
    goodreadsEnglish?: string;
    goodreadsFarsi?: string;
    audiobook?: string;
  };
}

export interface Session {
  id: string;
  slug: string;
  title: string;
  date: string;
  bookSlug: string;
  sessionNumber: number;
  attendees?: string[];
  summary: string;
  keyDiscussions?: string[];
  nextActions?: string[];
}

export interface BookWithSessions extends Book {
  sessions: Session[];
}
