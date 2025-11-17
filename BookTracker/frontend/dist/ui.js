var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import Book from "./Book.js";
export function displayBooks(books) {
    const container = document.getElementById("booksContainer");
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
        btn.addEventListener("click", () => __awaiter(this, void 0, void 0, function* () {
            const id = btn.getAttribute("data-id");
            yield fetch(`http://localhost:5000/api/books/${id}`, { method: "DELETE" });
            location.reload();
        }));
    });
}
