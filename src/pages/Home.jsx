import React, { useState, useEffect } from "react";
import {
  Play,
  TrendingUp,
  Calendar,
  ChevronRight,
  ChevronLeft,
  Clock,
} from "lucide-react";

// Slide Data - Replaced Landing slide with more movies
const HERO_SLIDES = [
  {
    id: 1,
    title: "Dune: Part Two",
    description:
      "Paul Atreides unites with Chani and the Fremen while on a warpath of revenge against the conspirators who destroyed his family.",
    image:
      "https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?q=80&w=2070&auto=format&fit=crop",
    genre: "Sci-Fi / Adventure",
    rating: "8.9",
  },
  {
    id: 2,
    title: "Oppenheimer",
    description:
      "The story of American scientist J. Robert Oppenheimer and his role in the development of the atomic bomb.",
    image:
      "https://images.unsplash.com/photo-1596727147705-54a99637456c?q=80&w=1974&auto=format&fit=crop",
    genre: "Biography / Drama",
    rating: "8.8",
  },
  {
    id: 3,
    title: "The Creator",
    description:
      "Against the backdrop of a war between humans and artificial intelligence with a superweapon which could end mankind.",
    image:
      "https://images.unsplash.com/photo-1616530940355-351fabd9524b?q=80&w=1935&auto=format&fit=crop",
    genre: "Sci-Fi / Action",
    rating: "7.8",
  },
  {
    id: 4,
    title: "Black Panther: Wakanda Forever",
    description:
      "The people of Wakanda fight to protect their home from intervening world powers as they mourn the death of King T'Challa.",
    image:
      "https://images.unsplash.com/photo-1635805737707-575885ab0820?q=80&w=1887&auto=format&fit=crop",
    genre: "Action / Adventure",
    rating: "6.7",
  },
];

const POPULAR_MOVIES = [
  {
    id: 1,
    title: "Oppenheimer",
    time: "3h 00m",
    image:
      "https://images.unsplash.com/photo-1596727147705-54a99637456c?q=80&w=1974&auto=format&fit=crop",
  },
  {
    id: 2,
    title: "Poor Things",
    time: "2h 21m",
    image:
      "https://images.unsplash.com/photo-1594909122845-11baa439b7bf?q=80&w=2070&auto=format&fit=crop",
  },
  {
    id: 3,
    title: "The Creator",
    time: "2h 13m",
    image:
      "https://images.unsplash.com/photo-1616530940355-351fabd9524b?q=80&w=1935&auto=format&fit=crop",
  },
  {
    id: 4,
    title: "Spider-Man",
    time: "2h 20m",
    image:
      "https://images.unsplash.com/photo-1604200213928-ba3cf4fc8ef1?q=80&w=2070&auto=format&fit=crop",
  },
];

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto-slide effect
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 2000); // 2 seconds

    return () => clearInterval(timer);
  }, [currentSlide]); // Added currentSlide dependency to reset timer on manual change ideally, but simple interval works too

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
  };

  const prevSlide = () => {
    setCurrentSlide(
      (prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length,
    );
  };

  const slide = HERO_SLIDES[currentSlide];

  return (
    <div className="min-h-screen bg-slate-900 pb-20">
      {/* Hero Carousel Section */}
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
                ★ {slide.rating}
              </span>
            </div>
            <p className="text-gray-300 text-lg mb-8 line-clamp-3 md:line-clamp-none opacity-90 max-w-xl">
              {slide.description}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-start">
              <button className="px-8 py-4 rounded-xl bg-primary hover:bg-primary-hover text-white font-bold text-lg shadow-lg shadow-primary/30 transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-2">
                <Play className="w-5 h-5 fill-current" />
                Book Ticket
              </button>
              <button className="px-8 py-4 rounded-xl bg-white/10 hover:bg-white/20 border border-white/10 backdrop-blur-md text-white font-bold text-lg transition-all hover:scale-105 active:scale-95 text-center">
                View Details
              </button>
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
          {POPULAR_MOVIES.map((movie, index) => (
            <div
              key={movie.id}
              className="animate-slide-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="group relative w-full rounded-xl overflow-hidden cursor-pointer bg-slate-800 border border-white/5 transition-all duration-300 hover:shadow-2xl hover:shadow-primary/10 hover:-translate-y-2">
                <div className="aspect-[2/3] w-full relative overflow-hidden">
                  <img
                    src={movie.image}
                    alt={movie.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  {/* Overlay on hover */}
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <button className="bg-primary hover:bg-primary-hover text-white p-3 rounded-full transform scale-0 group-hover:scale-100 transition-transform duration-300 delay-75 shadow-lg">
                      <Play className="w-6 h-6 fill-current pl-1" />
                    </button>
                  </div>
                </div>

                <div className="p-4">
                  <h3 className="text-white font-bold text-lg truncate group-hover:text-primary transition-colors">
                    {movie.title}
                  </h3>
                  <div className="flex items-center gap-2 mt-2 text-gray-400 text-sm">
                    <Clock className="w-4 h-4 text-accent" />
                    <span>{movie.time}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
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
