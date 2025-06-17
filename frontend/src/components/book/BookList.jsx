import React, { useState } from 'react';
import {
    Typography,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Button,
    IconButton,
    Box,
    CircularProgress,
    Alert,
    Snackbar
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { useBooks } from '../../hooks/useBooks';
import { useAuthors } from '../../hooks/useAuthors';
import { useCountries } from '../../hooks/useCountries';
import BookDialog from './BookDialog';
import DeleteConfirmDialog from '../common/DeleteConfirmDialog';

const BooksList = () => {
    const { books, loading, error, addBook, updateBook, deleteBook } = useBooks();
    const { authors } = useAuthors();
    const { countries } = useCountries();

    const [openDialog, setOpenDialog] = useState(false);
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
    const [currentBook, setCurrentBook] = useState(null);
    const [notification, setNotification] = useState({ open: false, message: '', severity: 'success' });

    const handleCloseNotification = () => {
        setNotification({ ...notification, open: false });
    };

    const handleAddClick = () => {
        setCurrentBook(null);
        setOpenDialog(true);
    };

    const handleEditClick = (book) => {
        setCurrentBook(book);
        setOpenDialog(true);
    };

    const handleDeleteClick = (book) => {
        setCurrentBook(book);
        setOpenDeleteDialog(true);
    };

    const handleDialogClose = () => {
        setOpenDialog(false);
    };

    const handleDeleteDialogClose = () => {
        setOpenDeleteDialog(false);
    };

    const handleSaveBook = async (book) => {
        let result;

        if (currentBook) {
            // Update existing book
            result = await updateBook(currentBook.id, book);
            if (result.success) {
                setNotification({
                    open: true,
                    message: 'Book updated successfully!',
                    severity: 'success'
                });
            } else {
                setNotification({
                    open: true,
                    message: `Error updating book: ${result.error}`,
                    severity: 'error'
                });
            }
        } else {
            // Add new book
            result = await addBook(book);
            if (result.success) {
                setNotification({
                    open: true,
                    message: 'Book added successfully!',
                    severity: 'success'
                });
            } else {
                setNotification({
                    open: true,
                    message: `Error adding book: ${result.error}`,
                    severity: 'error'
                });
            }
        }

        setOpenDialog(false);
    };

    const handleConfirmDelete = async () => {
        const result = await deleteBook(currentBook.id);

        if (result.success) {
            setNotification({
                open: true,
                message: 'Book deleted successfully!',
                severity: 'success'
            });
        } else {
            setNotification({
                open: true,
                message: `Error deleting book: ${result.error}`,
                severity: 'error'
            });
        }

        setOpenDeleteDialog(false);
    };

    // Helper function to find author name by id
    const getAuthorName = (authorId) => {
        const author = authors.find(a => a.id === authorId);
        return author ? `${author.name} ${author.surname}` : 'Unknown Author';
    };

    // Helper function to find country name by id
    const getCountryName = (countryId) => {
        const country = countries.find(c => c.id === countryId);
        return country ? country.name : 'Unknown Country';
    };

    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                <CircularProgress />
            </Box>
        );
    }

    if (error) {
        return (
            <Alert severity="error" sx={{ mt: 2 }}>
                {error}
            </Alert>
        );
    }

    return (
        <div>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="h4" gutterBottom>
                    Books List
                </Typography>
                <Button
                    variant="contained"
                    color="primary"
                    startIcon={<AddIcon />}
                    onClick={handleAddClick}
                >
                    Add Book
                </Button>
            </Box>

            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Title</TableCell>
                            <TableCell>Author</TableCell>
                            <TableCell>Country</TableCell>
                            <TableCell>Available Copies</TableCell>
                            <TableCell>Category</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {books.map((book) => (
                            <TableRow key={book.id}>
                                <TableCell>{book.name}</TableCell>
                                <TableCell>{getAuthorName(book.authorId)}</TableCell>
                                <TableCell>{getCountryName(book.countryId)}</TableCell>
                                <TableCell>{book.availableCopies}</TableCell>
                                <TableCell>{book.category}</TableCell>
                                <TableCell>
                                    <IconButton onClick={() => handleEditClick(book)} color="primary">
                                        <EditIcon />
                                    </IconButton>
                                    <IconButton onClick={() => handleDeleteClick(book)} color="error">
                                        <DeleteIcon />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                        {books.length === 0 && (
                            <TableRow>
                                <TableCell colSpan={6} align="center">No books found</TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>

            <BookDialog
                open={openDialog}
                onClose={handleDialogClose}
                onSave={handleSaveBook}
                book={currentBook}
                authors={authors}
                countries={countries}
            />

            <DeleteConfirmDialog
                open={openDeleteDialog}
                onClose={handleDeleteDialogClose}
                onConfirm={handleConfirmDelete}
                title="Delete Book"
                content={`Are you sure you want to delete "${currentBook?.name}"?`}
            />

            <Snackbar
                open={notification.open}
                autoHideDuration={6000}
                onClose={handleCloseNotification}
            >
                <Alert onClose={handleCloseNotification} severity={notification.severity}>
                    {notification.message}
                </Alert>
            </Snackbar>
        </div>
    );
};

export default BooksList;