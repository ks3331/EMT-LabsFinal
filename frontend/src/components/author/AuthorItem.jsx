import React from "react";
import {
    Card,
    CardContent,
    CardActions,
    Typography,
    Button,
    Stack
} from "@mui/material";

const AuthorItem = ({ author, onEdit, onDelete }) => {
    return (
        <Card variant="outlined">
            <CardContent>
                <Typography variant="h6" gutterBottom>
                    {author.name}
                </Typography>
            </CardContent>
            <CardActions>
                <Stack direction="row" spacing={1}>
                    <Button size="small" variant="outlined" onClick={onEdit}>Edit</Button>
                    <Button size="small" variant="outlined" color="error" onClick={onDelete}>Delete</Button>
                </Stack>
            </CardActions>
        </Card>
    );
};

export default AuthorItem;
