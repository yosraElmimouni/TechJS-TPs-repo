import { Router } from "express";
import { getBooks, createBook, deleteBook, updateBook } from "../controllers/bookController";

const router = Router();

router.get("/", getBooks);
router.post("/", createBook);
router.put("/:id", updateBook);
router.delete("/:id", deleteBook);

export default router;
