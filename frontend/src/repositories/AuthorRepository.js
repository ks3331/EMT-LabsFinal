import api from './api';

const AuthorRepository = {
    getAll: () => {
        return api.get('/authors');
    },
    getById: (id) => {
        return api.get(`/authors/${id}`);
    },
    create: (author) => {
        return api.post('/authors', author);
    },
    update: (id, author) => {
        return api.put(`/authors/${id}`, author);
    },
    delete: (id) => {
        return api.delete(`/authors/${id}`);
    }
};

export default AuthorRepository;