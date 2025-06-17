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
import { useAuthors } from '../../hooks/useAuthors';
import AuthorDialog from './AuthorDialog';
import DeleteConfirmDialog from '../common/DeleteConfirmDialog';

const AuthorsList = () => {
    const { authors, loading, error, addAuthor, updateAuthor, deleteAuthor } = useAuthors();

    const [openDialog, setOpenDialog] = useState(false);
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
    const [currentAuthor, setCurrentAuthor] = useState(null);
    const [notification, setNotification] = useState({ open: false, message: '', severity: 'success' });

    const handleCloseNotification = () => {
        setNotification({ ...notification, open: false });
    };

    const handleAddClick = () => {
        setCurrentAuthor(null);
        setOpenDialog(true);
    };

    const handleEditClick = (author) => {
        setCurrentAuthor(author);
        setOpenDialog(true);
    };

    const handleDeleteClick = (author) => {
        setCurrentAuthor(author);
        setOpenDeleteDialog(true);
    };

    const handleDialogClose = () => {
        setOpenDialog(false);
    };

    const handleDeleteDialogClose = () => {
        setOpenDeleteDialog(false);
    };

    const handleSaveAuthor = async (author) => {
        let result;

        if (currentAuthor) {
            // Update existing author
            result = await updateAuthor(currentAuthor.id, author);
            if (result.success) {
                setNotification({
                    open: true,
                    message: 'Author updated successfully!',
                    severity: 'success'
                });
            } else {
                setNotification({
                    open: true,
                    message: `Error updating author: ${result.error}`,
                    severity: 'error'
                });
            }
        } else {
            // Add new author
            result = await addAuthor(author);
            if (result.success) {
                setNotification({
                    open: true,
                    message: 'Author added successfully!',
                    severity: 'success'
                });
            } else {
                setNotification({
                    open: true,
                    message: `Error adding author: ${result.error}`,
                    severity: 'error'
                });
            }
        }

        setOpenDialog(false);
    };

    const handleConfirmDelete = async () => {
        const result = await deleteAuthor(currentAuthor.id);

        if (result.success) {
            setNotification({
                open: true,
                message: 'Author deleted successfully!',
                severity: 'success'
            });
        } else {
            setNotification({
                open: true,
                message: `Error deleting author: ${result.error}`,
                severity: 'error'
            });
        }

        setOpenDeleteDialog(false);
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
                    Authors List
                </Typography>
                <Button
                    variant="contained"
                    color="primary"
                    startIcon={<AddIcon />}
                    onClick={handleAddClick}
                >
                    Add Author
                </Button>
            </Box>

            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell>Surname</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {authors.map((author) => (
                            <TableRow key={author.id}>
                                <TableCell>{author.name}</TableCell>
                                <TableCell>{author.surname}</TableCell>
                                <TableCell>
                                    <IconButton onClick={() => handleEditClick(author)} color="primary">
                                        <EditIcon />
                                    </IconButton>
                                    <IconButton onClick={() => handleDeleteClick(author)} color="error">
                                        <DeleteIcon />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                        {authors.length === 0 && (
                            <TableRow>
                                <TableCell colSpan={3} align="center">No authors found</TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>

            <AuthorDialog
                open={openDialog}
                onClose={handleDialogClose}
                onSave={handleSaveAuthor}
                author={currentAuthor}
            />

            <DeleteConfirmDialog
                open={openDeleteDialog}
                onClose={handleDeleteDialogClose}
                onConfirm={handleConfirmDelete}
                title="Delete Author"
                content={`Are you sure you want to delete "${currentAuthor?.name} ${currentAuthor?.surname}"?`}
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

export default AuthorsList;