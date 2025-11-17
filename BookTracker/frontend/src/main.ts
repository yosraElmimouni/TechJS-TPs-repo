import { createBook } from "./api.js";
import { Status, Format, BookData } from "./types.js";
import { displayBooks, loadStats } from "./ui.js";
import { getBooks } from "./api.js";

async function load() {
  const books = await getBooks();
  displayBooks(books);
  loadStats();
}

load();

document.getElementById("bookForm")!.addEventListener("submit", async (e) => {
  e.preventDefault();

  const titleInput = document.getElementById("title") as HTMLInputElement;
  const authorInput = document.getElementById("author") as HTMLInputElement;
  const pagesInput = document.getElementById("pages") as HTMLInputElement;
  const pagesReadInput = document.getElementById("pagesRead") as HTMLInputElement;
  const priceInput = document.getElementById("price") as HTMLInputElement;
  const suggestedByInput = document.getElementById("suggestedBy") as HTMLInputElement;
  const statusSelect = document.getElementById("status") as HTMLSelectElement;
  const formatSelect = document.getElementById("format") as HTMLSelectElement;

  const numberOfPages = Number(pagesInput.value);
  const pagesRead = Number(pagesReadInput.value);

  // Validation Frontend
  if (pagesRead > numberOfPages) {
    alert("Le nombre de pages lues ne peut pas dépasser le nombre total de pages.");
    return;
  }
  if (pagesRead < 0 || numberOfPages <= 0) {
    alert("Le nombre de pages et de pages lues doit être positif.");
    return;
  }

  const data: Omit<BookData, '_id' | 'finished'> = {
    title: titleInput.value,
    author: authorInput.value,
    numberOfPages: numberOfPages,
    pagesRead: pagesRead,
    price: Number(priceInput.value),
    suggestedBy: suggestedByInput.value,
    status: statusSelect.value as Status,
    format: formatSelect.value as Format,
  };

  try {
    await createBook(data);
    // Réinitialiser le formulaire
    (document.getElementById("bookForm") as HTMLFormElement).reset();
    // Recharger les données et les statistiques
    await load();
  } catch (error) {
    alert(`Erreur lors de l'ajout du livre: \${error.message}`);
    console.error(error);
  }
});
