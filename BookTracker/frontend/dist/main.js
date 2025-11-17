var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { createBook } from "./api.js";
import { displayBooks, loadStats } from "./ui.js";
import { getBooks } from "./api.js";
function load() {
    return __awaiter(this, void 0, void 0, function* () {
        const books = yield getBooks();
        displayBooks(books);
        loadStats();
    });
}
load();
document.getElementById("bookForm").addEventListener("submit", (e) => __awaiter(void 0, void 0, void 0, function* () {
    e.preventDefault();
    const titleInput = document.getElementById("title");
    const authorInput = document.getElementById("author");
    const pagesInput = document.getElementById("pages");
    const pagesReadInput = document.getElementById("pagesRead");
    const priceInput = document.getElementById("price");
    const suggestedByInput = document.getElementById("suggestedBy");
    const statusSelect = document.getElementById("status");
    const formatSelect = document.getElementById("format");
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
    const data = {
        title: titleInput.value,
        author: authorInput.value,
        numberOfPages: numberOfPages,
        pagesRead: pagesRead,
        price: Number(priceInput.value),
        suggestedBy: suggestedByInput.value,
        status: statusSelect.value,
        format: formatSelect.value,
    };
    try {
        yield createBook(data);
        // Réinitialiser le formulaire
        document.getElementById("bookForm").reset();
        // Recharger les données et les statistiques
        yield load();
    }
    catch (error) {
        alert(`Erreur lors de l'ajout du livre: \${error.message}`);
        console.error(error);
    }
}));
