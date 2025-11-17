"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getStats = exports.deleteBook = exports.updateBook = exports.createBook = exports.getBooks = void 0;
const Book_1 = __importDefault(require("../models/Book"));
// Helper function for validation
const validateBookData = (data, isUpdate = false) => {
    const requiredFields = ['title', 'author', 'numberOfPages', 'pagesRead', 'status', 'price', 'format', 'suggestedBy'];
    for (const field of requiredFields) {
        if (!isUpdate && (data[field] === undefined || data[field] === null)) {
            return `Le champ '${field}' est requis.`;
        }
    }
    if (data.numberOfPages !== undefined && data.pagesRead !== undefined) {
        if (data.pagesRead > data.numberOfPages) {
            return "Le nombre de pages lues ne peut pas dépasser le nombre total de pages.";
        }
        if (data.pagesRead < 0 || data.numberOfPages <= 0) {
            return "Le nombre de pages et de pages lues doit être positif.";
        }
    }
    return null;
};
const getBooks = async (req, res) => {
    try {
        const books = await Book_1.default.find();
        res.json(books);
    }
    catch (error) {
        res.status(500).json({ message: "Erreur lors de la récupération des livres.", error });
    }
};
exports.getBooks = getBooks;
const createBook = async (req, res) => {
    try {
        const validationError = validateBookData(req.body);
        if (validationError) {
            res.status(400).json({ message: validationError });
            return;
        }
        const data = req.body;
        // Logic for 'finished' status
        data.finished = data.pagesRead === data.numberOfPages;
        const book = new Book_1.default(data);
        const savedBook = await book.save();
        res.json(savedBook);
    }
    catch (error) {
        res.status(400).json({ message: "Erreur lors de la création du livre.", error });
    }
};
exports.createBook = createBook;
const updateBook = async (req, res) => {
    try {
        const validationError = validateBookData(req.body, true);
        if (validationError) {
            res.status(400).json({ message: validationError });
            return;
        }
        const data = req.body;
        // Logic for 'finished' status
        if (data.pagesRead !== undefined && data.numberOfPages !== undefined) {
            data.finished = data.pagesRead === data.numberOfPages;
        }
        else if (data.pagesRead !== undefined) {
            // If only pagesRead is updated, fetch the book to check numberOfPages
            const existingBook = await Book_1.default.findById(req.params.id);
            if (existingBook) {
                data.finished = data.pagesRead === existingBook.numberOfPages;
            }
        }
        const updated = await Book_1.default.findByIdAndUpdate(req.params.id, data, { new: true });
        if (!updated) {
            res.status(404).json({ message: "Livre non trouvé." });
            return;
        }
        res.json(updated);
    }
    catch (e) {
        res.status(400).json({ message: "Erreur lors de la mise à jour du livre.", error: e });
    }
};
exports.updateBook = updateBook;
const deleteBook = async (req, res) => {
    try {
        const deleted = await Book_1.default.findByIdAndDelete(req.params.id);
        if (!deleted) {
            res.status(404).json({ message: "Livre non trouvé." });
            return;
        }
        res.json({ message: "Livre supprimé avec succès" });
    }
    catch (error) {
        res.status(500).json({ message: "Erreur lors de la suppression du livre.", error });
    }
};
exports.deleteBook = deleteBook;
const getStats = async (req, res) => {
    try {
        const stats = await Book_1.default.aggregate([
            {
                $group: {
                    _id: null,
                    totalBooks: { $sum: 1 },
                    totalBooksFinished: { $sum: { $cond: ["$finished", 1, 0] } },
                    totalPagesRead: { $sum: "$pagesRead" },
                    totalPagesInLibrary: { $sum: "$numberOfPages" },
                },
            },
        ]);
        if (stats.length === 0) {
            res.json({
                totalBooks: 0,
                totalBooksFinished: 0,
                totalPagesRead: 0,
                totalPagesInLibrary: 0,
            });
            return;
        }
        res.json(stats[0]);
    }
    catch (error) {
        res.status(500).json({ message: "Erreur lors de la récupération des statistiques.", error });
    }
};
exports.getStats = getStats;
