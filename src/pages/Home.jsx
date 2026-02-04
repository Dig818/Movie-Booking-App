import React, { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../config/Firebase";
import {
  Play,
  TrendingUp,
  Calendar,
  ChevronRight,
  ChevronLeft,
  Clock,
  ChevronDown,
} from "lucide-react";
import { Link } from "react-router-dom";

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Pagination States
  const [movieBuffer, setMovieBuffer] = useState([]); // Store extra movies (10)

  const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/original";

  const loadMovies = async () => {
    // If we have buffered movies, load them
    if (movieBuffer.length > 0) {
      setMovies((prev) => [...prev, ...movieBuffer]);
      setMovieBuffer([]); // Clear buffer
      setLoading(false);
      return;
    }

    setLoading(true);

    try {
      // Fetch from Firestore instead of API
      const querySnapshot = await getDocs(collection(db, "movies"));
      const firebaseMovies = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      // Map to view model
      const formattedMovies = firebaseMovies.map((movie) => ({
        id: movie.id,
        title: movie.title,
        description: movie.overview,
        image: movie.backdrop_path
          ? `${IMAGE_BASE_URL}${movie.backdrop_path}`
          : movie.poster_path
            ? `${IMAGE_BASE_URL}${movie.poster_path}`
            : "https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?q=80&w=2070&auto=format&fit=crop",
        poster: movie.poster_path
          ? `${IMAGE_BASE_URL}${movie.poster_path}`
          : "https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?q=80&w=2070&auto=format&fit=crop",
        rating:
          typeof movie.vote_average === "number"
            ? movie.vote_average.toFixed(1)
            : movie.vote_average,
        votes: movie.vote_count || 0,
        genre: "Trending",
        time: new Date(movie.release_date).getFullYear(),
      }));

      // Split items: 10 (display) + remaining (buffer)
      // Since we fetch all at once (20 items), we can just slice.
      // If user already has movies loaded (rare in this logic unless we add refresh), we normally just add.
      // But since this replaces the API loop, we only run this main fetch once if movies is empty?
      // Actually, the original logic called loadMovies() on mount.

      if (movies.length === 0) {
        const firstBatch = formattedMovies.slice(0, 10);
        const secondBatch = formattedMovies.slice(10);
        setMovies(firstBatch);
        setMovieBuffer(secondBatch);
      } else {
        // If called again and no buffer (already loaded all), strictly nothing to do or reload?
        // For now, if buffer empty and we fetched, it means we have everything.
        // We might want to disable the button if buffer is empty.
      }

      setLoading(false);
    } catch (err) {
      console.error("Error fetching movies from Firestore:", err);
      setError("Failed to load movies. Please try again later.");
      setLoading(false);
    }
  };

  // Initial Load
  useEffect(() => {
    loadMovies();
  }, []);

  // Auto-slide effect
  useEffect(() => {
    if (movies.length === 0) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % Math.min(5, movies.length)); // Carousel only top 5
    }, 2000);

    return () => clearInterval(timer);
  }, [currentSlide, movies]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % Math.min(5, movies.length));
  };

  const prevSlide = () => {
    setCurrentSlide(
      (prev) =>
        (prev - 1 + Math.min(5, movies.length)) % Math.min(5, movies.length),
    );
  };

  if (loading && movies.length === 0) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center text-white">
        <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center text-red-400">
        {error}
      </div>
    );
  }

  // Slice movies for Carousel (Top 5) and Popular Grid (Rest)
  const heroSlides = movies.slice(0, 5);
  const popularMovies = movies.slice(5); // Display all remaining movies
  const slide = heroSlides[currentSlide] || heroSlides[0];

  return (
    <div className="min-h-screen bg-slate-900 pb-20">
      {/* Hero Carousel Section */}
      {slide && (
        <div className="relative h-[85vh] w-full overflow-hidden group">
          {/* Background Image with KeyID to force re-render/anim */}
          <div key={slide.id} className="absolute inset-0 animate-fade-in">
            <img
              src={slide.image}
              alt="Hero Background"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/50 to-transparent"></div>
            {/* Left-heavy gradient for left alignment text readability */}
            <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/70 to-transparent"></div>
          </div>

          {/* Content Render Logic - Left Aligned */}
          <div className="relative h-full container mx-auto px-4 md:px-6 flex items-center justify-start">
            <div className="max-w-2xl animate-slide-up pt-20 text-left">
              <span className="inline-block px-3 py-1 rounded-full bg-accent/20 text-accent border border-accent/20 text-xs font-bold mb-4">
                #Now Showing
              </span>
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 leading-tight drop-shadow-2xl">
                {slide.title}
              </h1>
              <div className="flex items-center gap-4 text-gray-300 mb-6 text-sm md:text-base justify-start">
                <span className="flex items-center gap-1">
                  <TrendingUp className="w-4 h-4 text-primary" /> Trending
                </span>
                <span>•</span>
                <span>{slide.genre}</span>
                <span>•</span>
                <span className="text-yellow-400 font-bold">
                  ★ {slide.rating} ({slide.votes} reviews)
                </span>
              </div>
              <p className="text-gray-300 text-lg mb-8 line-clamp-3 md:line-clamp-none opacity-90 max-w-xl">
                {slide.description}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-start">
                <button className="px-8 py-4 rounded-xl bg-primary hover:bg-primary-hover text-white font-bold text-lg shadow-lg shadow-primary/30 transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-2">
                  <Clock className="w-5 h-5" />
                  Book Ticket
                </button>
                <Link to={`/movies/${slide.id}`}>
                  <button className="px-8 py-4 rounded-xl bg-white/10 hover:bg-white/20 border border-white/10 backdrop-blur-md text-white font-bold text-lg transition-all hover:scale-105 active:scale-95 text-center">
                    View Details
                  </button>
                </Link>
              </div>
            </div>
          </div>

          {/* Arrow Navigation */}
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/30 hover:bg-black/60 text-white backdrop-blur-sm border border-white/10 transition-all opacity-0 group-hover:opacity-100"
          >
            <ChevronLeft className="w-8 h-8" />
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/30 hover:bg-black/60 text-white backdrop-blur-sm border border-white/10 transition-all opacity-0 group-hover:opacity-100"
          >
            <ChevronRight className="w-8 h-8" />
          </button>
        </div>
      )}

      {/* Popular Movies Section */}
      <section className="container mx-auto px-4 md:px-6 mt-12 relative z-10">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-white flex items-center gap-3">
            <div className="w-1 h-8 bg-accent rounded-full"></div>
            Popular Movies
          </h2>
          <button className="text-primary hover:text-white transition-colors flex items-center gap-1 text-sm font-medium">
            View All <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {popularMovies.map((movie, index) => (
            <div
              key={`${movie.id}-${index}`}
              className="animate-slide-up"
              style={{ animationDelay: `${(index % 10) * 100}ms` }}
            >
              <div className="group relative w-full h-full bg-slate-800 border border-white/5 rounded-2xl overflow-hidden hover:shadow-2xl hover:shadow-primary/10 transition-all duration-300 hover:-translate-y-1 flex flex-col">
                {/* Poster Image */}
                <div className="aspect-[2/3] w-full relative overflow-hidden">
                  <img
                    src={movie.poster}
                    alt={movie.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute top-2 right-2 bg-black/60 backdrop-blur-md px-2 py-1 rounded-lg text-xs font-bold text-white flex items-center gap-1 border border-white/10">
                    <span className="text-yellow-400">★</span> {movie.rating}
                  </div>
                </div>

                {/* Content */}
                <div className="p-4 flex flex-col flex-1">
                  <h3
                    className="text-white font-bold text-lg truncate mb-1"
                    title={movie.title}
                  >
                    {movie.title}
                  </h3>

                  <div className="flex items-center justify-between text-xs text-gray-400 mb-4">
                    <span>{movie.time}</span>
                    <span>{movie.votes} votes</span>
                  </div>

                  <div className="mt-auto grid grid-cols-2 gap-2">
                    <button className="py-2.5 rounded-xl bg-primary hover:bg-primary-hover text-white font-semibold text-sm transition-all shadow-lg shadow-primary/20 active:scale-95 flex items-center justify-center">
                      Book
                    </button>
                    <Link to={`/movies/${movie.id}`}>
                      <button className="w-full py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white font-semibold text-sm transition-all active:scale-95">
                        Details
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Load More Button - Only show if there's more to load */}
        {movieBuffer.length > 0 && (
          <div className="mt-12 flex justify-center">
            <button
              onClick={loadMovies}
              disabled={loading}
              className="px-8 py-3 rounded-xl bg-slate-800 border border-white/10 text-white font-medium hover:bg-slate-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Loading...
                </>
              ) : (
                <>
                  Load More Movies
                  <ChevronDown className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        )}
      </section>

      {/* Coming Soon Section */}
      <section className="container mx-auto px-4 md:px-6 mt-20">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-white flex items-center gap-3">
            <div className="w-1 h-8 bg-primary rounded-full"></div>
            Coming Soon
          </h2>
        </div>

        <div className="bg-slate-800/30 rounded-2xl p-6 border border-white/5">
          <div className="flex items-center justify-center h-40 text-gray-500">
            <div className="text-center">
              <Calendar className="w-12 h-12 mx-auto mb-3 opacity-50" />
              <p>Coming Soon Movies Carousel will be implemented here</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
