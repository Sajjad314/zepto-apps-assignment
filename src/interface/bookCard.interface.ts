export interface Book {
    id: number;
    title: string;
    authors: { name: string }[];
    formats: { "image/jpeg"?: string }; // Cover image
    subjects: string[];
  }