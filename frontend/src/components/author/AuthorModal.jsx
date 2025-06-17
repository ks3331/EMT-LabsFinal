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

const AuthorModal = ({ author, onClose, onSave }) => {
  const [name, setName] = useState("");

  useEffect(() => {
    if (author) {
      setName(author.name);
    }
  }, [author]);

  const handleSubmit = () => {
    onSave({ name });
  };

  return (
      <Dialog open={!!author} onClose={onClose}>
        <DialogTitle>{author ? "Edit Author" : "Add Author"}</DialogTitle>
        <DialogContent>
          <Box sx={{ mt: 1 }}>
            <TextField
                label="Author Name"
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

export default AuthorModal;
