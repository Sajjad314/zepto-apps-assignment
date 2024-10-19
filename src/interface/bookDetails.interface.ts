export interface IBookDetails {
    id: number
    title: string
    authors: Author[]
    translators: any[]
    subjects: string[]
    bookshelves: string[]
    languages: string[]
    copyright: boolean
    media_type: string
    formats: Formats
    download_count: number
  }
  
   interface Author {
    name: string
    birth_year: number
    death_year: number
  }
  
   interface Formats {
    "text/html": string
    "application/epub+zip": string
    "application/x-mobipocket-ebook": string
    "application/rdf+xml": string
    "image/jpeg": string
    "text/plain; charset=us-ascii": string
    "application/octet-stream": string
  }
  