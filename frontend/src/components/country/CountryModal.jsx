import React, { useState, useEffect } from "react";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Button,
    Box
} from "@mui/material";

const CountryModal = ({ country, onClose, onSave }) => {
    const [name, setName] = useState("");

    useEffect(() => {
        if (country) {
            setName(country.name);
        }
    }, [country]);

    const handleSubmit = () => {
        onSave({ name });
    };

    return (
        <Dialog open={!!country} onClose={onClose}>
            <DialogTitle>{country ? "Edit Country" : "Add Country"}</DialogTitle>
            <DialogContent>
                <Box sx={{ mt: 1 }}>
                    <TextField
                        label="Country Name"
                        fullWidth
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </Box>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <Button onClick={handleSubmit} variant="contained">Save</Button>
            </DialogActions>
        </Dialog>
    );
};

export default CountryModal;
