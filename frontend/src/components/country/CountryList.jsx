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
import { useCountries } from '../../hooks/useCountries';
import CountryDialog from './CountryDialog';
import DeleteConfirmDialog from '../common/DeleteConfirmDialog';

const CountriesList = () => {
    const { countries, loading, error, addCountry, updateCountry, deleteCountry } = useCountries();

    const [openDialog, setOpenDialog] = useState(false);
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
    const [currentCountry, setCurrentCountry] = useState(null);
    const [notification, setNotification] = useState({ open: false, message: '', severity: 'success' });

    const handleCloseNotification = () => {
        setNotification({ ...notification, open: false });
    };

    const handleAddClick = () => {
        setCurrentCountry(null);
        setOpenDialog(true);
    };

    const handleEditClick = (country) => {
        setCurrentCountry(country);
        setOpenDialog(true);
    };

    const handleDeleteClick = (country) => {
        setCurrentCountry(country);
        setOpenDeleteDialog(true);
    };

    const handleDialogClose = () => {
        setOpenDialog(false);
    };

    const handleDeleteDialogClose = () => {
        setOpenDeleteDialog(false);
    };

    const handleSaveCountry = async (country) => {
        let result;

        if (currentCountry) {

            result = await updateCountry(currentCountry.id, country);
            if (result.success) {
                setNotification({
                    open: true,
                    message: 'Country updated successfully!',
                    severity: 'success'
                });
            } else {
                setNotification({
                    open: true,
                    message: `Error updating country: ${result.error}`,
                    severity: 'error'
                });
            }
        } else {

            result = await addCountry(country);
            if (result.success) {
                setNotification({
                    open: true,
                    message: 'Country added successfully!',
                    severity: 'success'
                });
            } else {
                setNotification({
                    open: true,
                    message: `Error adding country: ${result.error}`,
                    severity: 'error'
                });
            }
        }

        setOpenDialog(false);
    };

    const handleConfirmDelete = async () => {
        const result = await deleteCountry(currentCountry.id);

        if (result.success) {
            setNotification({
                open: true,
                message: 'Country deleted successfully!',
                severity: 'success'
            });
        } else {
            setNotification({
                open: true,
                message: `Error deleting country: ${result.error}`,
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
                    Countries List
                </Typography>
                <Button
                    variant="contained"
                    color="primary"
                    startIcon={<AddIcon />}
                    onClick={handleAddClick}
                >
                    Add Country
                </Button>
            </Box>

            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell>Continent</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {countries.map((country) => (
                            <TableRow key={country.id}>
                                <TableCell>{country.name}</TableCell>
                                <TableCell>{country.continent}</TableCell>
                                <TableCell>
                                    <IconButton onClick={() => handleEditClick(country)} color="primary">
                                        <EditIcon />
                                    </IconButton>
                                    <IconButton onClick={() => handleDeleteClick(country)} color="error">
                                        <DeleteIcon />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                        {countries.length === 0 && (
                            <TableRow>
                                <TableCell colSpan={3} align="center">No countries found</TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>

            <CountryDialog
                open={openDialog}
                onClose={handleDialogClose}
                onSave={handleSaveCountry}
                country={currentCountry}
            />

            <DeleteConfirmDialog
                open={openDeleteDialog}
                onClose={handleDeleteDialogClose}
                onConfirm={handleConfirmDelete}
                title="Delete Country"
                content={`Are you sure you want to delete "${currentCountry?.name}"?`}
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

export default CountriesList;