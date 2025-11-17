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
import { Status } from "./types.js";
import { getStats } from "./api.js";
const booksContainer = document.getElementById("booksContainer");
const statsContainer = document.getElementById("stats");
/**
 * Affiche les statistiques globales.
 * @param stats Les données statistiques.
 */
export function displayStats(stats) {
    statsContainer.innerHTML = `
    <div class="flex justify-center space-x-8">
      <div class="p-4 bg-blue-200 rounded-lg shadow-md">
        <p class="text-2xl font-bold text-blue-800">${stats.totalBooks}</p>
        <p class="text-sm text-blue-600">Livres dans la bibliothèque</p>
      </div>
      <div class="p-4 bg-green-200 rounded-lg shadow-md">
        <p class="text-2xl font-bold text-green-800">${stats.totalBooksFinished}</p>
        <p class="text-sm text-green-600">Livres Terminés</p>
      </div>
      <div class="p-4 bg-yellow-200 rounded-lg shadow-md">
        <p class="text-2xl font-bold text-yellow-800">${stats.totalPagesRead}</p>
        <p class="text-sm text-yellow-600">Pages Lues au Total</p>
      </div>
    </div>
  `;
}
/**
 * Crée le HTML pour un seul livre.
 * @param book L'instance de la classe Book.
 * @returns L'élément HTML du livre.
 */
function createBookElement(book) {
    const div = document.createElement("div");
    div.className = "bg-white shadow p-4 rounded flex flex-col justify-between";
    const percentage = book.currentlyAt();
    const progressColor = percentage === 100 ? "bg-green-500" : "bg-blue-500";
    const statusColor = book.status === Status.Read || book.status === Status.Reread ? "text-green-600" : "text-yellow-600";
    div.innerHTML = `
    <div>
      <h2 class="text-xl font-bold text-gray-800">${book.title}</h2>
      <p class="text-gray-600">par ${book.author}</p>
      <p class="text-sm ${statusColor} font-semibold mt-1">Statut: ${book.status}</p>
      <p class="text-sm text-gray-500">Format: ${book.format} | Prix: ${book.price}€</p>
      <p class="text-sm text-gray-500">Suggéré par: ${book.suggestedBy}</p>
      
      <div class="mt-3">
        <p class="text-sm font-medium mb-1">Progression: ${book.pagesRead}/${book.numberOfPages} pages (${percentage}%)</p>
        <div class="w-full bg-gray-200 rounded-full h-2.5">
          <div class="h-2.5 rounded-full ${progressColor}" style="width: ${percentage}%"></div>
        </div>
      </div>
    </div>

    <div class="mt-4 pt-4 border-t border-gray-200">
      <div class="flex items-center space-x-2 mb-2">
        <label for="pagesRead-${book.id}" class="text-sm font-medium">Pages lues:</label>
        <input type="number" id="pagesRead-${book.id}" value="${book.pagesRead}" min="0" max="${book.numberOfPages}"
          class="w-20 p-1 border rounded text-sm text-center update-input" data-book-id="${book.id}">
        <button data-id="${book.id}" class="updateBtn bg-yellow-500 text-white p-1 text-sm rounded hover:bg-yellow-600">
          Mettre à jour
        </button>
      </div>
      <button data-id="${book.id}" class="deleteBtn bg-red-600 text-white p-2 rounded w-full hover:bg-red-700">
        Supprimer
      </button>
    </div>
  `;
    // Ajout des écouteurs d'événements pour la mise à jour et la suppression
    const deleteBtn = div.querySelector(".deleteBtn");
    deleteBtn.addEventListener("click", () => __awaiter(this, void 0, void 0, function* () {
        if (confirm(`Êtes-vous sûr de vouloir supprimer "\${book.title}" ?`)) {
            try {
                yield book.deleteBook();
                location.reload();
            }
            catch (error) {
                alert("Erreur lors de la suppression du livre.");
                console.error(error);
            }
        }
    }));
    const updateBtn = div.querySelector(".updateBtn");
    const pagesReadInput = div.querySelector(`#pagesRead-${book.id}`);
    updateBtn.addEventListener("click", () => __awaiter(this, void 0, void 0, function* () {
        const newPagesRead = Number(pagesReadInput.value);
        if (newPagesRead < 0 || newPagesRead > book.numberOfPages) {
            alert(`Le nombre de pages lues doit être entre 0 et \${book.numberOfPages}.`);
            return;
        }
        try {
            yield book.updatePagesRead(newPagesRead);
            location.reload();
        }
        catch (error) {
            alert("Erreur lors de la mise à jour du livre.");
            console.error(error);
        }
    }));
    return div;
}
/**
 * Affiche la liste des livres.
 * @param books Les données des livres.
 */
export function displayBooks(books) {
    booksContainer.innerHTML = "";
    if (books.length === 0) {
        booksContainer.innerHTML = "<p class='text-center text-gray-500'>Aucun livre enregistré. Ajoutez-en un ci-dessus !</p>";
        return;
    }
    books.forEach((b) => {
        const book = new Book(b);
        booksContainer.appendChild(createBookElement(book));
    });
}
/**
 * Charge et affiche les statistiques.
 */
export function loadStats() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const stats = yield getStats();
            displayStats(stats);
        }
        catch (error) {
            console.error("Erreur lors du chargement des statistiques:", error);
            statsContainer.innerHTML = "<p class='text-center text-red-500'>Erreur de chargement des statistiques.</p>";
        }
    });
}
