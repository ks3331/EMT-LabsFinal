import React from 'react';
import { Typography, Card, CardContent, Grid, Button } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import PersonIcon from '@mui/icons-material/Person';
import PublicIcon from '@mui/icons-material/Public';

const Home = () => {
    return (
        <div>
            <Typography variant="h4" gutterBottom>
                Welcome to EMT Library
            </Typography>
            <Typography variant="body1" paragraph>
                Manage your books, authors, and countries collection with ease.
            </Typography>

            <Grid container spacing={3} sx={{ mt: 2 }}>
                <Grid item xs={12} sm={4}>
                    <Card sx={{ height: '100%' }}>
                        <CardContent>
                            <LibraryBooksIcon fontSize="large" color="primary" />
                            <Typography variant="h5" component="div" sx={{ mt: 2 }}>
                                Books
                            </Typography>
                            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                                Browse and manage your book collection
                            </Typography>
                            <Button
                                variant="contained"
                                component={RouterLink}
                                to="/books"
                            >
                                View Books
                            </Button>
                        </CardContent>
                    </Card>
                </Grid>

                <Grid item xs={12} sm={4}>
                    <Card sx={{ height: '100%' }}>
                        <CardContent>
                            <PersonIcon fontSize="large" color="primary" />
                            <Typography variant="h5" component="div" sx={{ mt: 2 }}>
                                Authors
                            </Typography>
                            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                                Explore and manage authors
                            </Typography>
                            <Button
                                variant="contained"
                                component={RouterLink}
                                to="/authors"
                            >
                                View Authors
                            </Button>
                        </CardContent>
                    </Card>
                </Grid>

                <Grid item xs={12} sm={4}>
                    <Card sx={{ height: '100%' }}>
                        <CardContent>
                            <PublicIcon fontSize="large" color="primary" />
                            <Typography variant="h5" component="div" sx={{ mt: 2 }}>
                                Countries
                            </Typography>
                            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                                View and manage countries
                            </Typography>
                            <Button
                                variant="contained"
                                component={RouterLink}
                                to="/countries"
                            >
                                View Countries
                            </Button>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </div>
    );
};

export default Home;