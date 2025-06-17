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

const continents = ['EUROPE', 'ASIA', 'AFRICA', 'NORTH_AMERICA', 'SOUTH_AMERICA', 'AUSTRALIA', 'ANTARCTICA'];

const CountryDialog = ({ open, onClose, onSave, country }) => {
    const [formData, setFormData] = useState({
        name: '',
        continent: ''
    });

    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (country) {
            setFormData({
                name: country.name || '',
                continent: country.continent || ''
            });
        } else {
            setFormData({
                name: '',
                continent: ''
            });
        }
        setErrors({});
    }, [country, open]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });


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
            newErrors.name = 'Name is required';
        }

        if (!formData.continent) {
            newErrors.continent = 'Continent is required';
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
            <DialogTitle>{country ? 'Edit Country' : 'Add New Country'}</DialogTitle>
            <DialogContent>
                <Grid container spacing={2} sx={{ mt: 1 }}>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            error={!!errors.name}
                            helperText={errors.name}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <FormControl fullWidth error={!!errors.continent}>
                            <InputLabel>Continent</InputLabel>
                            <Select
                                name="continent"
                                value={formData.continent}
                                onChange={handleChange}
                                label="Continent"
                            >
                                {continents.map((continent) => (
                                    <MenuItem key={continent} value={continent}>
                                        {continent.replace('_', ' ')}
                                    </MenuItem>
                                ))}
                            </Select>
                            {errors.continent && (
                                <FormHelperText>{errors.continent}</FormHelperText>
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

export default CountryDialog;