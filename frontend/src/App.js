import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Home from './components/layout/Home';
import BooksList from './components/book/BookList';
import AuthorsList from './components/author/AuthorList';
import CountriesList from './components/country/CountryList';
import './App.css';

function App() {
    return (
        <Router>
            <Layout>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/books" element={<BooksList />} />
                    <Route path="/authors" element={<AuthorsList />} />
                    <Route path="/countries" element={<CountriesList />} />
                </Routes>
            </Layout>
        </Router>
    );
}

export default App;