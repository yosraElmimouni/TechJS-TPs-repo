import { BookData } from "./types.js";

export async function getBooks(): Promise<BookData[]> {
  const res = await fetch("http://localhost:5000/api/books");
  return await res.json();
}

export async function createBook(book: BookData): Promise<BookData> {
  const res = await fetch("http://localhost:5000/api/books", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(book)
  });
  return await res.json();
}
