import { getNextBookId } from './utils.mjs';

export default class Library {
    constructor() {
        this.books = [];
        this.users = [];
        this.registry = [];
        this.nextBookId = getNextBookId();
        this.queue = [];
        this.isOngoing = false;
    }

    addBook(title, author, availableCopies) {
        this.books.push({
            id: this.nextBookId(),
            title,
            author,
            availableCopies
        });
    }

    addUser(id, name) {
        if (this.users.find(u => u.id === id)) {
            return 'User already added';
        }
        this.users.push({ id, name });
    }

    async borrowBook(userId, bookId) {
        const isAlreadyBorrowed = this.registry.find(
            entry => entry.userId === userId && entry.bookId === bookId
        );
        if (isAlreadyBorrowed) return 'Already borrowed';

        this.queue.push({ userId, bookId, action: 'borrow' });
        await new Promise(res => setTimeout(res, 1500)); // simulate delay
        await this.processQueue();
    }

    async returnBook(userId, bookId) {
        this.queue.push({ userId, bookId, action: 'return' });
        await new Promise(res => setTimeout(res, 1500)); // simulate delay
        await this.processQueue();
    }

    async processQueue() {
        if (this.isOngoing) return;
        this.isOngoing = true;

        while (this.queue.length > 0) {
            const req = this.queue.shift();

            if (req.action === 'borrow') {
                const book = this.books.find(b => b.id === req.bookId);
                if (!book || book.availableCopies <= 0) continue;

                book.availableCopies--;
                this.registry.push({ userId: req.userId, bookId: req.bookId });
            } else if (req.action === 'return') {
                const book = this.books.find(b => b.id === req.bookId);
                if (!book) continue;

                const registryIndex = this.registry.findIndex(
                    r => r.userId === req.userId && r.bookId === req.bookId
                );
                if (registryIndex === -1) continue;

                book.availableCopies++;
                this.registry.splice(registryIndex, 1);
            }
        }

        this.isOngoing = false;
    }

    getBooks() {
        return this.books;
    }
}
