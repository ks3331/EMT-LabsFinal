import React, { useState } from "react";
import BookModal from "../components/book/BookModal";
import BookItem from "../components/book/BookItem";
import { useBooks } from "../hooks/useBooks";
import { Box, Button, Typography, Grid, CircularProgress } from "@mui/material";

const Books = () => {
    const { books, loading, addBook, updateBook, deleteBook } = useBooks();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedBook, setSelectedBook] = useState(null);

    const handleAddBook = () => {
        setSelectedBook(null);
        setIsModalOpen(true);
    };

    const handleEditBook = (book) => {
        setSelectedBook(book);
        setIsModalOpen(true);
    };

    const handleSave = async (bookData) => {
        if (selectedBook) {
            await updateBook(selectedBook.id, bookData);
        } else {
            await addBook(bookData);
        }
        setIsModalOpen(false);
    };

    return (
        <Box>
            <Typography variant="h4" gutterBottom>Books</Typography>
            <Button variant="contained" color="primary" onClick={handleAddBook}>
                Add New Book
            </Button>

            {loading ? (
                <CircularProgress sx={{ mt: 3 }} />
            ) : (
                <Grid container spacing={2} sx={{ mt: 2 }}>
                    {books.map((book) => (
                        <Grid item xs={12} md={6} lg={4} key={book.id}>
                            <BookItem
                                book={book}
                                onEdit={() => handleEditBook(book)}
                                onDelete={() => deleteBook(book.id)}
                            />
                        </Grid>
                    ))}
                </Grid>
            )}

            {isModalOpen && (
                <BookModal
                    book={selectedBook}
                    onClose={() => setIsModalOpen(false)}
                    onSave={handleSave}
                />
            )}
        </Box>
    );
};

export default Books;
