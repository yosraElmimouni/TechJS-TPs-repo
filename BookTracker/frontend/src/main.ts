import { getBooks, createBook } from "./api.js";
import { Status, Format } from "./types.js";
import { displayBooks } from "./ui.js";

async function load() {
  const books = await getBooks();
  displayBooks(books);
}

load();

document.getElementById("bookForm")!.addEventListener("submit", async (e) => {
  e.preventDefault();

  const data = {
    title: (document.getElementById("title") as HTMLInputElement).value,
    author: (document.getElementById("author") as HTMLInputElement).value,
    numberOfPages: Number((document.getElementById("pages") as HTMLInputElement).value),
    pagesRead: Number((document.getElementById("pagesRead") as HTMLInputElement).value),
    price: Number((document.getElementById("price") as HTMLInputElement).value),
    suggestedBy: (document.getElementById("suggestedBy") as HTMLInputElement).value,
    status: (document.getElementById("status") as HTMLSelectElement).value as Status,
    format: (document.getElementById("format") as HTMLSelectElement).value as Format,
    finished: false
  };

  await createBook(data);
  location.reload();
});
