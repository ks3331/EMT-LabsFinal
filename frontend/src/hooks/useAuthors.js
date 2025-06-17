import { useState, useEffect } from 'react';
import AuthorRepository from '../repositories/AuthorRepository';

export const useAuthors = () => {
    const [authors, setAuthors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchAuthors = async () => {
        setLoading(true);
        try {
            const response = await AuthorRepository.getAll();
            setAuthors(response.data);
            setError(null);
        } catch (err) {
            console.error('Error fetching authors:', err);
            setError('Failed to fetch authors');
        } finally {
            setLoading(false);
        }
    };

    const addAuthor = async (author) => {
        try {
            await AuthorRepository.create(author);
            fetchAuthors();
            return { success: true };
        } catch (err) {
            console.error('Error adding author:', err);
            return { success: false, error: err.message };
        }
    };

    const updateAuthor = async (id, author) => {
        try {
            await AuthorRepository.update(id, author);
            fetchAuthors();
            return { success: true };
        } catch (err) {
            console.error('Error updating author:', err);
            return { success: false, error: err.message };
        }
    };

    const deleteAuthor = async (id) => {
        try {
            await AuthorRepository.delete(id);
            fetchAuthors();
            return { success: true };
        } catch (err) {
            console.error('Error deleting author:', err);
            return { success: false, error: err.message };
        }
    };

    useEffect(() => {
        fetchAuthors();
    }, []);

    return {
        authors,
        loading,
        error,
        fetchAuthors,
        addAuthor,
        updateAuthor,
        deleteAuthor
    };
};