import React, { useState, useEffect } from "react";
import {
    Dialog, DialogTitle, DialogContent, DialogActions,
    Button, TextField, Select, MenuItem, InputLabel,
    FormControl, Box
} from "@mui/material";
import { useAuthors } from "../../hooks/useAuthors";
import { useCountries } from "../../hooks/useCountries";

const BookModal = ({ book, open, onClose, onSave }) => {
    const [formData, setFormData] = useState({
        title: "",
        year: "",
        authorId: "",
        countryId: ""
    });

    const { authors } = useAuthors();
    const { countries } = useCountries();

    useEffect(() => {
        if (book) {
            setFormData({
                title: book.title,
                year: book.year,
                authorId: book.author?.id || "",
                countryId: book.country?.id || ""
            });
        } else {
            setFormData({ title: "", year: "", authorId: "", countryId: "" });
        }
    }, [book]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = () => {
        const payload = { ...formData };
        if (book?.id) payload.id = book.id;
        onSave(payload);
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>{book ? "Edit Book" : "Add New Book"}</DialogTitle>
            <DialogContent>
                <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}>
                    <TextField
                        label="Title"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        fullWidth
                    />
                    <TextField
                        label="Year"
                        name="year"
                        type="number"
                        value={formData.year}
                        onChange={handleChange}
                        fullWidth
                    />
                    <FormControl fullWidth>
                        <InputLabel>Author</InputLabel>
                        <Select name="authorId" value={formData.authorId} onChange={handleChange}>
                            {authors.map(author => (
                                <MenuItem key={author.id} value={author.id}>{author.name}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <FormControl fullWidth>
                        <InputLabel>Country</InputLabel>
                        <Select name="countryId" value={formData.countryId} onChange={handleChange}>
                            {countries.map(country => (
                                <MenuItem key={country.id} value={country.id}>{country.name}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Box>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <Button variant="contained" onClick={handleSubmit}>Save</Button>
            </DialogActions>
        </Dialog>
    );
};

export default BookModal;
