/**
 * Énumération des statuts possibles d'un livre
 */
export enum BookStatus {
    Read = "Read",
    ReRead = "Re-read",
    DNF = "DNF",
    CurrentlyReading = "Currently reading",
    ReturnedUnread = "Returned Unread",
    WantToRead = "Want to read"
}

/**
 * Énumération des formats possibles d'un livre
 */
export enum BookFormat {
    Print = "Print",
    PDF = "PDF",
    Ebook = "Ebook",
    AudioBook = "AudioBook"
}

/**
 * Interface pour les données d'un livre
 */
export interface IBook {
    id: number;
    title: string;
    author: string;
    pages: number;
    status: BookStatus;
    price: number;
    pagesRead: number;
    format: BookFormat;
    suggestedBy: string;
    finished: 0 | 1;
    createdAt: string;
}

/**
 * Classe Book - Représente un livre dans la bibliothèque
 */
export class Book implements IBook {
    id: number;
    title: string;
    author: string;
    pages: number;
    status: BookStatus;
    price: number;
    pagesRead: number;
    format: BookFormat;
    suggestedBy: string;
    finished: 0 | 1;
    createdAt: string;

    /**
     * Constructeur de la classe Book
     * @param title - Titre du livre
     * @param author - Auteur du livre
     * @param pages - Nombre total de pages
     * @param status - Statut du livre
     * @param price - Prix du livre
     * @param pagesRead - Nombre de pages lues
     * @param format - Format du livre
     * @param suggestedBy - Personne qui a suggéré le livre
     */
    constructor(
        title: string,
        author: string,
        pages: number,
        status: BookStatus,
        price: number,
        pagesRead: number,
        format: BookFormat,
        suggestedBy: string
    ) {
        this.id = Date.now();
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.status = status;
        this.price = price;
        this.pagesRead = pagesRead;
        this.format = format;
        this.suggestedBy = suggestedBy;
        this.finished = pagesRead >= pages ? 1 : 0;
        this.createdAt = new Date().toISOString();
    }

    /**
     * Retourne la position actuelle de lecture au format "X/Y pages"
     * @returns Position formatée
     */
    currentlyAt(): string {
        return `${this.pagesRead}/${this.pages} pages`;
    }

    /**
     * Retourne le pourcentage de lecture
     * @returns Pourcentage entre 0 et 100
     */
    getProgress(): number {
        return Math.round((this.pagesRead / this.pages) * 100);
    }

    /**
     * Supprime le livre (marque pour suppression)
     * @returns true si la suppression est possible
     */
    deleteBook(): boolean {
        return true;
    }

    /**
     * Met à jour les pages lues et le statut finished automatiquement
     * @param pagesRead - Nombre de pages lues
     */
    updateProgress(pagesRead: number): void {
        this.pagesRead = Math.min(pagesRead, this.pages);
        this.finished = this.pagesRead >= this.pages ? 1 : 0;
    }
}
