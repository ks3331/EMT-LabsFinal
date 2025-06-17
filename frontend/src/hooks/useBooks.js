import { useState, useEffect } from 'react';
import BookRepository from '../repositories/BookRepository';

export const useBooks = () => {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchBooks = async () => {
        setLoading(true);
        try {
            const response = await BookRepository.getAll();
            setBooks(response.data);
            setError(null);
        } catch (err) {
            console.error('Error fetching books:', err);
            setError('Failed to fetch books');
        } finally {
            setLoading(false);
        }
    };

    const addBook = async (book) => {
        try {
            await BookRepository.create(book);
            fetchBooks();
            return { success: true };
        } catch (err) {
            console.error('Error adding book:', err);
            return { success: false, error: err.message };
        }
    };

    const updateBook = async (id, book) => {
        try {
            await BookRepository.update(id, book);
            fetchBooks();
            return { success: true };
        } catch (err) {
            console.error('Error updating book:', err);
            return { success: false, error: err.message };
        }
    };

    const deleteBook = async (id) => {
        try {
            await BookRepository.delete(id);
            fetchBooks();
            return { success: true };
        } catch (err) {
            console.error('Error deleting book:', err);
            return { success: false, error: err.message };
        }
    };

    useEffect(() => {
        fetchBooks();
    }, []);

    return {
        books,
        loading,
        error,
        fetchBooks,
        addBook,
        updateBook,
        deleteBook
    };
};
