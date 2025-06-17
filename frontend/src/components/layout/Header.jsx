import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

const Header = () => {
    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    EMT Library
                </Typography>
                <Box>
                    <Button color="inherit" component={RouterLink} to="/">
                        Home
                    </Button>
                    <Button color="inherit" component={RouterLink} to="/books">
                        Books
                    </Button>
                    <Button color="inherit" component={RouterLink} to="/authors">
                        Authors
                    </Button>
                    <Button color="inherit" component={RouterLink} to="/countries">
                        Countries
                    </Button>
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default Header;