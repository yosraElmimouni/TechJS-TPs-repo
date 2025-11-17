var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { updateBook } from "./api.js";
export default class Book {
    constructor(data) {
        this.id = data._id;
        this.title = data.title;
        this.author = data.author;
        this.numberOfPages = data.numberOfPages;
        this.pagesRead = data.pagesRead;
        this.status = data.status;
        this.price = data.price;
        this.format = data.format;
        this.suggestedBy = data.suggestedBy;
        // La valeur 'finished' est gérée par le backend, mais on la met à jour localement pour l'affichage
        this.finished = data.pagesRead === data.numberOfPages;
    }
    /**
     * Calcule le pourcentage de lecture.
     * @returns Le pourcentage de lecture (0 à 100).
     */
    currentlyAt() {
        if (this.numberOfPages === 0)
            return 0;
        return Math.min(100, Math.round((this.pagesRead / this.numberOfPages) * 100));
    }
    /**
     * Supprime le livre via l'API.
     * @returns Une promesse de la réponse de l'API.
     */
    deleteBook() {
        if (!this.id) {
            return Promise.reject(new Error("Impossible de supprimer un livre sans ID."));
        }
        return fetch(`http://localhost:5000/api/books/${this.id}`, {
            method: "DELETE"
        });
    }
    /**
     * Met à jour le nombre de pages lues et le statut 'finished' si nécessaire.
     * @param newPagesRead Le nouveau nombre de pages lues.
     * @returns Une promesse du livre mis à jour.
     */
    updatePagesRead(newPagesRead) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.id) {
                throw new Error("Impossible de mettre à jour un livre sans ID.");
            }
            if (newPagesRead < 0 || newPagesRead > this.numberOfPages) {
                throw new Error(`Le nombre de pages lues (\${newPagesRead}) doit être entre 0 et \${this.numberOfPages}.`);
            }
            this.pagesRead = newPagesRead;
            this.finished = newPagesRead === this.numberOfPages;
            const updatedData = yield updateBook(this.id, { pagesRead: newPagesRead, finished: this.finished });
            return updatedData;
        });
    }
}
