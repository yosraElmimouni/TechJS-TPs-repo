import { Request, Response } from "express";
import Book, { IBook } from "../models/Book";

export const getBooks = async (req: Request, res: Response): Promise<void> => {
  const books = await Book.find();
  res.json(books);
};

export const createBook = async (req: Request, res: Response): Promise<void> => {
  try {
    const data = req.body as IBook;

    if (data.pagesRead === data.numberOfPages) {
      data.finished = true;
    }

    const book = new Book(data);
    const savedBook = await book.save();

    res.json(savedBook);
  } catch (error) {
    res.status(400).json({ error });
  }
};

export const updateBook = async (req: Request, res: Response): Promise<void> => {
  try {
    const data = req.body;

    if (data.pagesRead === data.numberOfPages) {
      data.finished = true;
    }

    const updated = await Book.findByIdAndUpdate(req.params.id, data, { new: true });

    res.json(updated);
  } catch (e) {
    res.status(400).json({ error: e });
  }
};

export const deleteBook = async (req: Request, res: Response): Promise<void> => {
  await Book.findByIdAndDelete(req.params.id);
  res.json({ message: "Book deleted successfully" });
};
