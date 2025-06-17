import React, { useState, useEffect } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    TextField,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    FormHelperText,
    Grid
} from '@mui/material';

const categories = ['NOVEL', 'THRILLER', 'HISTORY', 'FANTASY', 'BIOGRAPHY', 'CLASSICS', 'DRAMA'];

const BookDialog = ({ open, onClose, onSave, book, authors, countries }) => {
    const [formData, setFormData] = useState({
        name: '',
        authorId: '',
        countryId: '',
        availableCopies: 0,
        category: ''
    });

    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (book) {
            setFormData({
                name: book.name || '',
                authorId: book.authorId || '',
                countryId: book.countryId || '',
                availableCopies: book.availableCopies || 0,
                category: book.category || ''
            });
        } else {
            setFormData({
                name: '',
                authorId: '',
                countryId: '',
                availableCopies: 0,
                category: ''
            });
        }
        setErrors({});
    }, [book, open]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });

        // Clear error when field is changed
        if (errors[name]) {
            setErrors({
                ...errors,
                [name]: undefined
            });
        }
    };

    const validateForm = () => {
        const newErrors = {};

        if (!formData.name.trim()) {
            newErrors.name = 'Title is required';
        }

        if (!formData.authorId) {
            newErrors.authorId = 'Author is required';
        }

        if (!formData.countryId) {
            newErrors.countryId = 'Country is required';
        }

        if (formData.availableCopies < 0) {
            newErrors.availableCopies = 'Cannot be negative';
        }

        if (!formData.category) {
            newErrors.category = 'Category is required';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = () => {
        if (validateForm()) {
            onSave(formData);
        }
    };

    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
            <DialogTitle>{book ? 'Edit Book' : 'Add New Book'}</DialogTitle>
            <DialogContent>
                <Grid container spacing={2} sx={{ mt: 1 }}>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Title"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            error={!!errors.name}
                            helperText={errors.name}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <FormControl fullWidth error={!!errors.authorId}>
                            <InputLabel>Author</InputLabel>
                            <Select
                                name="authorId"
                                value={formData.authorId}
                                onChange={handleChange}
                                label="Author"
                            >
                                {authors.map((author) => (
                                    <MenuItem key={author.id} value={author.id}>
                                        {`${author.name} ${author.surname}`}
                                    </MenuItem>
                                ))}
                            </Select>
                            {errors.authorId && (
                                <FormHelperText>{errors.authorId}</FormHelperText>
                            )}
                        </FormControl>
                    </Grid>

                    <Grid item xs={12}>
                        <FormControl fullWidth error={!!errors.countryId}>
                            <InputLabel>Country</InputLabel>
                            <Select
                                name="countryId"
                                value={formData.countryId}
                                onChange={handleChange}
                                label="Country"
                            >
                                {countries.map((country) => (
                                    <MenuItem key={country.id} value={country.id}>
                                        {country.name}
                                    </MenuItem>
                                ))}
                            </Select>
                            {errors.countryId && (
                                <FormHelperText>{errors.countryId}</FormHelperText>
                            )}
                        </FormControl>
                    </Grid>

                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            type="number"
                            label="Available Copies"
                            name="availableCopies"
                            value={formData.availableCopies}
                            onChange={handleChange}
                            error={!!errors.availableCopies}
                            helperText={errors.availableCopies}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <FormControl fullWidth error={!!errors.category}>
                            <InputLabel>Category</InputLabel>
                            <Select
                                name="category"
                                value={formData.category}
                                onChange={handleChange}
                                label="Category"
                            >
                                {categories.map((category) => (
                                    <MenuItem key={category} value={category}>
                                        {category}
                                    </MenuItem>
                                ))}
                            </Select>
                            {errors.category && (
                                <FormHelperText>{errors.category}</FormHelperText>
                            )}
                        </FormControl>
                    </Grid>
                </Grid>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <Button onClick={handleSubmit} variant="contained" color="primary">
                    Save
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default BookDialog;