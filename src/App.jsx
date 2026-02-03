import React from "react";
import { Route, Routes } from "react-router-dom";
import Navbar from "./pages/Navbar";
import Login from "./pages/Login";
import Register from "./pages/Register";
import MovieDetails from "./pages/MovieDetails";
import Footer from "./pages/Footer";
import Users from "./pages/Users";
import MovieDashboard from "./pages/MovieDashboard";
import Home from "./pages/Home";
import Movies from "./pages/Movies";


function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/movies/:id" element={<MovieDetails />} />
        <Route path="/footer" element={<Footer />} />
        <Route path="/users" element={<Users />} />
        <Route path="/dashboard" element={<MovieDashboard />} />
        
      </Routes>
    </>
  );
}

export default App;
