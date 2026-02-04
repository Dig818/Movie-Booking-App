import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  doc,
  getDoc,
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { db } from "../config/Firebase";
import {
  Calendar,
  ChevronDown,
  ChevronLeft,
  Clock,
  MapPin,
  Play,
  Ticket,
} from "lucide-react";

export default function MovieDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [theatres, setTheatres] = useState([]);
  const [showtimes, setShowtimes] = useState([]);

  // Selection States
  const [selectedTheatreId, setSelectedTheatreId] = useState("");
  const [selectedTimeId, setSelectedTimeId] = useState("");
  const [isOverlayVisible, setIsOverlayVisible] = useState(true); // Control the blur overlay

  // 1. Fetch Movie Details
  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const movieRef = doc(db, "movies", id);
        const movieSnap = await getDoc(movieRef);

        if (movieSnap.exists()) {
          setMovie({ id: movieSnap.id, ...movieSnap.data() });
        } else {
          console.error("Movie not found");
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching movie:", error);
        setLoading(false);
      }
    };
    fetchMovieDetails();
  }, [id]);

  // 2. Fetch Showtimes & Theatres for this Movie
  useEffect(() => {
    const fetchShowtimes = async () => {
      try {
        const q = query(
          collection(db, "showtimes"),
          where("movieID", "==", parseInt(id)),
        );
        const querySnapshot = await getDocs(q);
        const fetchedShowtimes = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setShowtimes(fetchedShowtimes);

        // Extract unique Theatre IDs from showtimes
        const theatreIds = [
          ...new Set(fetchedShowtimes.map((s) => s.theatreID)),
        ];

        // Fetch Theatre details for these IDs
        if (theatreIds.length > 0) {
          // Note: In a real app with many theatres, you might fetch all or batch fetch.
          // Here we iterate or fetch all theatres and filter. For efficiency in this demo, fetching all theatres.
          const theatresSnap = await getDocs(collection(db, "theatres"));
          const allTheatres = theatresSnap.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));

          // Filter only theatres showing this movie
          const relevantTheatres = allTheatres.filter((t) =>
            theatreIds.includes(t.id),
          );
          setTheatres(relevantTheatres);
        } else {
          setTheatres([]); // No screenings
        }
      } catch (error) {
        console.error("Error fetching showtimes:", error);
      }
    };
    fetchShowtimes();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center text-white">
        <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!movie) {
    return (
      <div className="min-h-screen bg-slate-900 text-white flex items-center justify-center">
        Movie not found
      </div>
    );
  }

  const handleTheatreChange = (e) => {
    setSelectedTheatreId(e.target.value);
    setSelectedTimeId(""); // Reset time when theatre changes
  };

  const handleShowTiming = () => {
    if (selectedTheatreId) {
      setIsOverlayVisible(false);
    }
  };

  const availableShowtimes = showtimes.filter(
    (s) => s.theatreID === selectedTheatreId,
  );
  const selectedTheatre = theatres.find((t) => t.id === selectedTheatreId);
  const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/original";

  return (
    <div className="min-h-screen bg-slate-900 text-white pt-24 pb-20 px-4 md:px-8">
      <div className="max-w-7xl mx-auto mb-8">
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white font-medium transition-all hover:scale-105 active:scale-95"
        >
          <ChevronLeft className="w-5 h-5" /> Back
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {/* LEFT COLUMN: Trailer & Description */}
        <div className="lg:col-span-2 space-y-8">
          {/* Trailer Box */}
          <div className="aspect-video w-full bg-black rounded-3xl overflow-hidden border border-white/10 shadow-2xl relative group">
            {/* Placeholder for Trailer */}
            <img
              src={
                movie.backdrop_path
                  ? `${IMAGE_BASE_URL}${movie.backdrop_path}`
                  : movie.poster
              }
              alt="Trailer Placeholder"
              className="w-full h-full object-cover opacity-60 group-hover:opacity-40 transition-opacity duration-300"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <button className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center hover:scale-110 transition-transform pl-2 border border-white/30">
                <Play className="w-10 h-10 text-white fill-white" />
              </button>
            </div>
            <p className="absolute bottom-4 left-4 text-sm font-medium text-gray-300 bg-black/50 px-3 py-1 rounded-full backdrop-blur-sm">
              Trailer Box
            </p>
          </div>

          {/* Description */}
          <div>
            <h1 className="text-4xl font-bold mb-4">{movie.title}</h1>
            <div className="flex items-center gap-4 text-sm text-gray-400 mb-6">
              <span className="bg-white/10 px-2 py-1 rounded text-white">
                {movie.original_language?.toUpperCase() || "EN"}
              </span>
              <span>{new Date(movie.release_date).getFullYear()}</span>
              <span className="flex items-center gap-1 text-yellow-500">
                <Ticket className="w-4 h-4" /> {movie.vote_count} votes
              </span>
            </div>

            <h3 className="text-xl font-semibold mb-2 text-primary">Details</h3>
            <div className="bg-slate-800/50 p-6 rounded-2xl border border-white/5">
              <p className="text-gray-300 leading-relaxed text-lg">
                {movie.overview}
              </p>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Booking Widget */}
        <div className="lg:col-span-1">
          <div className="bg-white/5 border border-white/10 rounded-3xl p-6 sticky top-24 backdrop-blur-sm">
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-primary" />
              Now Showing
            </h2>

            <div className="relative min-h-[400px] flex flex-col">
              {/* Selected Info (Always Visible logic if needed, but per wireframe we select first) */}
              <div className="mb-6 space-y-4">
                <div className="space-y-2">
                  <label className="text-sm text-gray-400 ml-1">
                    Choose Theatre
                  </label>
                  <div className="relative">
                    <select
                      value={selectedTheatreId}
                      onChange={handleTheatreChange}
                      className="w-full bg-slate-900 border border-white/20 rounded-xl p-4 appearance-none outline-none focus:border-primary transition-colors cursor-pointer text-white"
                    >
                      <option value="" disabled>
                        Select a theatre
                      </option>
                      {theatres.map((t) => (
                        <option key={t.id} value={t.id}>
                          {t.name} - {t.location}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                  </div>
                </div>
              </div>

              {/* Show Timing Content (Hidden/Blurred Initially) */}
              <div
                className={`flex-1 transition-all duration-500 ${isOverlayVisible ? "blur-sm select-none opacity-50" : "blur-0 opacity-100"}`}
              >
                {selectedTheatreId && (
                  <div className="animate-fade-in">
                    {availableShowtimes.length > 0 ? (
                      <>
                        <h3 className="text-sm font-medium text-gray-400 mb-3 block">
                          Available Times
                        </h3>
                        <div className="grid grid-cols-2 gap-3 mb-8">
                          {availableShowtimes.map((show) => (
                            <button
                              key={show.id}
                              onClick={() => setSelectedTimeId(show.id)}
                              className={`py-3 px-4 rounded-xl border font-medium transition-all ${
                                selectedTimeId === show.id
                                  ? "bg-primary border-primary text-white shadow-lg shadow-primary/25"
                                  : "bg-slate-800 border-white/10 text-gray-300 hover:border-white/30 hover:bg-slate-700"
                              }`}
                            >
                              {show.time}
                            </button>
                          ))}
                        </div>
                      </>
                    ) : (
                      <div className="text-center py-10 bg-slate-800/50 rounded-2xl border border-white/5 mb-8">
                        <p className="text-gray-400">
                          There is no screening of this movie at this time.
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Overlay Layer */}
              {isOverlayVisible && (
                <div className="absolute inset-0 top-[100px] z-10 flex flex-col items-center justify-center bg-slate-900/60 backdrop-blur-md rounded-xl border border-white/5 transition-all duration-300">
                  <button
                    onClick={handleShowTiming}
                    disabled={!selectedTheatreId}
                    className="px-8 py-3 bg-white text-slate-900 font-bold rounded-xl hover:bg-gray-200 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-xl active:scale-95"
                  >
                    Show Timing
                  </button>
                  <p className="text-sm text-gray-400 mt-3">
                    Select a theatre to proceed
                  </p>
                </div>
              )}

              {/* Buy Ticket Button (Always at bottom) */}
              <div className="mt-auto pt-6 border-t border-white/10">
                <button
                  disabled={!selectedTimeId || isOverlayVisible}
                  className="w-full py-4 bg-primary rounded-xl font-bold text-lg shadow-lg shadow-primary/25 hover:bg-primary-hover transition-all disabled:opacity-50 disabled:cursor-not-allowed active:scale-95"
                >
                  Buy Ticket
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
