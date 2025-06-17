import React from "react";
import {
    Card,
    CardContent,
    CardActions,
    Typography,
    Button,
    Stack
} from "@mui/material";

const BookItem = ({ book, onEdit, onDelete }) => {
    return (
        <Card variant="outlined">
            <CardContent>
                <Typography variant="h6">{book.title}</Typography>
                <Typography variant="body2" color="text.secondary">
                    Author: {book.author?.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Country: {book.country?.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Year: {book.year}
                </Typography>
            </CardContent>
            <CardActions>
                <Stack direction="row" spacing={1}>
                    <Button size="small" onClick={() => onEdit(book)}>Edit</Button>
                    <Button size="small" color="error" onClick={() => onDelete(book.id)}>Delete</Button>
                </Stack>
            </CardActions>
        </Card>
    );
};

export default BookItem;
