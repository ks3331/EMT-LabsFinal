import api from './api';

const BookRepository = {
    getAll: () => {
        return api.get('/books');
    },
    getById: (id) => {
        return api.get(`/books/${id}`);
    },
    create: (book) => {
        return api.post('/books', book);
    },
    update: (id, book) => {
        return api.put(`/books/${id}`, book);
    },
    delete: (id) => {
        return api.delete(`/books/${id}`);
    }
};

export default BookRepository;