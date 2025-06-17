import React from 'react';
import { Box, Typography, Container } from '@mui/material';

const Footer = () => {
    return (
        <Box component="footer" sx={{ py: 3, px: 2, mt: 'auto', backgroundColor: (theme) => theme.palette.grey[200] }}>
            <Container maxWidth="sm">
                <Typography variant="body1" align="center">
                    EMT Library Application &copy; {new Date().getFullYear()}
                </Typography>
            </Container>
        </Box>
    );
};

export default Footer;