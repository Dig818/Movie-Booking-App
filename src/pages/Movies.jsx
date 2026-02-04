import React, { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../config/Firebase";
import { Play, TrendingUp, Clock, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function Movies() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "movies"));
        const moviesData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setMovies(moviesData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching movies from Firestore:", error);
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center text-white">
        <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/original";

  return (
    <div className="min-h-screen bg-slate-900 pb-20 pt-24">
      <section className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-white flex items-center gap-3">
            <div className="w-1 h-8 bg-accent rounded-full"></div>
            Now Showing
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {movies.map((movie, index) => (
            <div
              key={movie.id}
              className="animate-slide-up"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className="group relative w-full h-full bg-slate-800 border border-white/5 rounded-2xl overflow-hidden hover:shadow-2xl hover:shadow-primary/10 transition-all duration-300 hover:-translate-y-1 flex flex-col">
                {/* Poster Image */}
                <div className="aspect-[2/3] w-full relative overflow-hidden">
                  <img
                    src={
                      movie.poster_path
                        ? `${IMAGE_BASE_URL}${movie.poster_path}`
                        : "https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?q=80&w=2070&auto=format&fit=crop"
                    }
                    alt={movie.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute top-2 right-2 bg-black/60 backdrop-blur-md px-2 py-1 rounded-lg text-xs font-bold text-white flex items-center gap-1 border border-white/10">
                    <span className="text-yellow-400">★</span>{" "}
                    {typeof movie.vote_average === "number"
                      ? movie.vote_average.toFixed(1)
                      : movie.vote_average}
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
                    <span>{new Date(movie.release_date).getFullYear()}</span>
                    <span>{movie.vote_count} votes</span>
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
      </section>
    </div>
  );
}
