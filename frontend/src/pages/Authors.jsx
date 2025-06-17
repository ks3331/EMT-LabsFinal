import React, { useState } from "react";
import { useAuthors } from "../hooks/useAuthors";
import { Box, Typography, TextField, Button, List, ListItem, ListItemText, IconButton, CircularProgress } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

const Authors = () => {
    const { authors, loading, addAuthor, deleteAuthor } = useAuthors();
    const [newAuthor, setNewAuthor] = useState({ name: "", bio: "" });

    const handleAdd = async () => {
        await addAuthor(newAuthor);
        setNewAuthor({ name: "", bio: "" });
    };

    return (
        <Box>
            <Typography variant="h4" gutterBottom>Authors</Typography>

            {loading ? (
                <CircularProgress />
            ) : (
                <List>
                    {authors.map((author) => (
                        <ListItem
                            key={author.id}
                            secondaryAction={
                                <IconButton edge="end" onClick={() => deleteAuthor(author.id)}>
                                    <DeleteIcon />
                                </IconButton>
                            }
                        >
                            <ListItemText primary={author.name} secondary={author.bio} />
                        </ListItem>
                    ))}
                </List>
            )}

            <Box sx={{ mt: 3 }}>
                <TextField
                    label="Author Name"
                    value={newAuthor.name}
                    onChange={(e) => setNewAuthor({ ...newAuthor, name: e.target.value })}
                    sx={{ mr: 2 }}
                />
                <TextField
                    label="Author Bio"
                    value={newAuthor.bio}
                    onChange={(e) => setNewAuthor({ ...newAuthor, bio: e.target.value })}
                    sx={{ mr: 2 }}
                />
                <Button variant="contained" onClick={handleAdd}>Add Author</Button>
            </Box>
        </Box>
    );
};

export default Authors;
