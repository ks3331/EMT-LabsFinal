import api from './api';

const CountryRepository = {
    getAll: () => {
        return api.get('/countries');
    },
    getById: (id) => {
        return api.get(`/countries/${id}`);
    },
    create: (country) => {
        return api.post('/countries', country);
    },
    update: (id, country) => {
        return api.put(`/countries/${id}`, country);
    },
    delete: (id) => {
        return api.delete(`/countries/${id}`);
    }
};

export default CountryRepository;