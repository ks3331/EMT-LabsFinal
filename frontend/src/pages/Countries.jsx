import React, { useState } from "react";
import { useCountries } from "../hooks/useCountries";
import { Box, Typography, TextField, Button, List, ListItem, ListItemText, IconButton, CircularProgress } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

const Countries = () => {
    const { countries, loading, addCountry, deleteCountry } = useCountries();
    const [newCountry, setNewCountry] = useState({ name: "", capital: "" });

    const handleAdd = async () => {
        await addCountry(newCountry);
        setNewCountry({ name: "", capital: "" });
    };

    return (
        <Box>
            <Typography variant="h4" gutterBottom>Countries</Typography>

            {loading ? (
                <CircularProgress />
            ) : (
                <List>
                    {countries.map((country) => (
                        <ListItem
                            key={country.id}
                            secondaryAction={
                                <IconButton edge="end" onClick={() => deleteCountry(country.id)}>
                                    <DeleteIcon />
                                </IconButton>
                            }
                        >
                            <ListItemText
                                primary={country.name}
                                secondary={`Capital: ${country.capital}`}
                            />
                        </ListItem>
                    ))}
                </List>
            )}

            <Box sx={{ mt: 3 }}>
                <TextField
                    label="Country Name"
                    value={newCountry.name}
                    onChange={(e) => setNewCountry({ ...newCountry, name: e.target.value })}
                    sx={{ mr: 2 }}
                />
                <TextField
                    label="Capital"
                    value={newCountry.capital}
                    onChange={(e) => setNewCountry({ ...newCountry, capital: e.target.value })}
                    sx={{ mr: 2 }}
                />
                <Button variant="contained" onClick={handleAdd}>Add Country</Button>
            </Box>
        </Box>
    );
};

export default Countries;
