import Book from "./Book.js";
import { BookData } from "./types.js";

export function displayBooks(books: BookData[]): void {
  const container = document.getElementById("booksContainer")!;
  container.innerHTML = "";

  books.forEach((b) => {
    const book = new Book(b);

    const div = document.createElement("div");
    div.className = "bg-white shadow p-4 rounded";

    div.innerHTML = `
      <h2 class="text-xl font-bold">${book.title}</h2>
      <p>${book.author}</p>
      <p>${book.pagesRead}/${book.numberOfPages} pages (${book.currentlyAt()}%)</p>
      <button data-id="${book.id}" class="deleteBtn bg-red-600 text-white p-2 rounded">Delete</button>
    `;

    container.appendChild(div);
  });

  document.querySelectorAll(".deleteBtn").forEach((btn) => {
    btn.addEventListener("click", async () => {
      const id = (btn as HTMLElement).getAttribute("data-id")!;
      await fetch(`http://localhost:5000/api/books/${id}`, { method: "DELETE" });
      location.reload();
    });
  });
}
