import { useState, useEffect } from 'react';
import CountryRepository from '../repositories/CountryRepository';

export const useCountries = () => {
    const [countries, setCountries] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchCountries = async () => {
        setLoading(true);
        try {
            const response = await CountryRepository.getAll();
            setCountries(response.data);
            setError(null);
        } catch (err) {
            console.error('Error fetching countries:', err);
            setError('Failed to fetch countries');
        } finally {
            setLoading(false);
        }
    };

    const addCountry = async (country) => {
        try {
            await CountryRepository.create(country);
            fetchCountries();
            return { success: true };
        } catch (err) {
            console.error('Error adding country:', err);
            return { success: false, error: err.message };
        }
    };

    const updateCountry = async (id, country) => {
        try {
            await CountryRepository.update(id, country);
            fetchCountries();
            return { success: true };
        } catch (err) {
            console.error('Error updating country:', err);
            return { success: false, error: err.message };
        }
    };

    const deleteCountry = async (id) => {
        try {
            await CountryRepository.delete(id);
            fetchCountries();
            return { success: true };
        } catch (err) {
            console.error('Error deleting country:', err);
            return { success: false, error: err.message };
        }
    };

    useEffect(() => {
        fetchCountries();
    }, []);

    return {
        countries,
        loading,
        error,
        fetchCountries,
        addCountry,
        updateCountry,
        deleteCountry
    };
};