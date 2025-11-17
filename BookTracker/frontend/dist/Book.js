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
        this.finished = data.finished;
    }
    // Pourcentage de lecture
    currentlyAt() {
        return Math.round((this.pagesRead / this.numberOfPages) * 100);
    }
    // Suppression (appel backend)
    deleteBook() {
        return fetch(`http://localhost:5000/api/books/${this.id}`, {
            method: "DELETE"
        });
    }
}
