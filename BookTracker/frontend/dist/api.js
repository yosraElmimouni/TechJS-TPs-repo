var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const API_URL = "http://localhost:5000/api/books";
export function getBooks() {
    return __awaiter(this, void 0, void 0, function* () {
        const res = yield fetch(API_URL);
        if (!res.ok)
            throw new Error("Erreur lors de la récupération des livres.");
        return yield res.json();
    });
}
export function createBook(book) {
    return __awaiter(this, void 0, void 0, function* () {
        const res = yield fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(book)
        });
        if (!res.ok) {
            const error = yield res.json();
            throw new Error(error.message || "Erreur lors de la création du livre.");
        }
        return yield res.json();
    });
}
export function updateBook(id, data) {
    return __awaiter(this, void 0, void 0, function* () {
        const res = yield fetch(`\${API_URL}/\${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        });
        if (!res.ok) {
            const error = yield res.json();
            throw new Error(error.message || "Erreur lors de la mise à jour du livre.");
        }
        return yield res.json();
    });
}
export function getStats() {
    return __awaiter(this, void 0, void 0, function* () {
        const res = yield fetch(`\${API_URL}/stats`);
        if (!res.ok)
            throw new Error("Erreur lors de la récupération des statistiques.");
        return yield res.json();
    });
}
