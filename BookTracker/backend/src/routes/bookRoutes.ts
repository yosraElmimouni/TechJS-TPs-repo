import { Router } from "express";
import { getBooks, createBook, deleteBook, updateBook, getStats } from "../controllers/bookController";

const router = Router();

router.get("/", getBooks);
router.post("/", createBook);
router.put("/:id", updateBook);
router.delete("/:id", deleteBook);
router.get("/stats", getStats); // Nouvelle route pour les statistiques

export default router;
