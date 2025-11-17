export enum Status {
  Read = "Read",
  Reread = "Re-read",
  DNF = "DNF",
  CurrentlyReading = "Currently reading",
  ReturnedUnread = "Returned Unread",
  WantToRead = "Want to read"
}

export enum Format {
  Print = "Print",
  PDF = "PDF",
  Ebook = "Ebook",
  AudioBook = "AudioBook"
}

export interface BookData {
  _id?: string;
  title: string;
  author: string;
  numberOfPages: number;
  pagesRead: number;
  status: Status;
  price: number;
  format: Format;
  suggestedBy: string;
  finished: boolean;
}
