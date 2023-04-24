import './App.scss';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import PageNotFound from './components/pageNotFound/PageNotFound';
import Home from './components/home/Home';
import MovieDetails from './components/movieDetails/MovieDetails';
import Header from './components/header/Header';
import Footer from './components/footer/Footer';

function App() {
  return (
    <div className="app">
      <Router>
        <Header />
        <div className="container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/movie/:imdbID" element={<MovieDetails />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </div>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
