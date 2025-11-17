var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { getBooks, createBook } from "./api.js";
import { displayBooks } from "./ui.js";
function load() {
    return __awaiter(this, void 0, void 0, function* () {
        const books = yield getBooks();
        displayBooks(books);
    });
}
load();
document.getElementById("bookForm").addEventListener("submit", (e) => __awaiter(void 0, void 0, void 0, function* () {
    e.preventDefault();
    const data = {
        title: document.getElementById("title").value,
        author: document.getElementById("author").value,
        numberOfPages: Number(document.getElementById("pages").value),
        pagesRead: Number(document.getElementById("pagesRead").value),
        price: Number(document.getElementById("price").value),
        suggestedBy: document.getElementById("suggestedBy").value,
        status: document.getElementById("status").value,
        format: document.getElementById("format").value,
        finished: false
    };
    yield createBook(data);
    location.reload();
}));
