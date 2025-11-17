import { BookData } from "./types.js";
import { updateBook } from "./api.js";

export default class Book {
  id?: string;
  title: string;
  author: string;
  numberOfPages: number;
  pagesRead: number;
  status: string;
  price: number;
  format: string;
  suggestedBy: string;
  finished: boolean;

  constructor(data: BookData) {
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
  currentlyAt(): number {
    if (this.numberOfPages === 0) return 0;
    return Math.min(100, Math.round((this.pagesRead / this.numberOfPages) * 100));
  }

  /**
   * Supprime le livre via l'API.
   * @returns Une promesse de la réponse de l'API.
   */
  deleteBook(): Promise<Response> {
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
  async updatePagesRead(newPagesRead: number): Promise<BookData> {
    if (!this.id) {
      throw new Error("Impossible de mettre à jour un livre sans ID.");
    }
    if (newPagesRead < 0 || newPagesRead > this.numberOfPages) {
      throw new Error(`Le nombre de pages lues (\${newPagesRead}) doit être entre 0 et \${this.numberOfPages}.`);
    }

    this.pagesRead = newPagesRead;
    this.finished = newPagesRead === this.numberOfPages;

    const updatedData = await updateBook(this.id, { pagesRead: newPagesRead, finished: this.finished });
    return updatedData;
  }
}
