import { BookData } from "./types.js";

const API_URL = "http://localhost:5000/api/books";

export interface Stats {
  _id: null;
  totalBooks: number;
  totalBooksFinished: number;
  totalPagesRead: number;
  totalPagesInLibrary: number;
}

export async function getBooks(): Promise<BookData[]> {
  const res = await fetch(API_URL);
  if (!res.ok) throw new Error("Erreur lors de la récupération des livres.");
  return await res.json();
}

export async function createBook(book: Omit<BookData, '_id' | 'finished'>): Promise<BookData> {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(book)
  });
  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || "Erreur lors de la création du livre.");
  }
  return await res.json();
}

export async function updateBook(id: string, data: Partial<BookData>): Promise<BookData> {
  const res = await fetch(`\${API_URL}/\${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });
  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || "Erreur lors de la mise à jour du livre.");
  }
  return await res.json();
}

export async function getStats(): Promise<Stats> {
  const res = await fetch(`\${API_URL}/stats`);
  if (!res.ok) throw new Error("Erreur lors de la récupération des statistiques.");
  return await res.json();
}
