import React, { useState, useEffect, useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Menu,
  X,
  Search,
  Bell,
  Film,
  LogOut,
  User,
  LayoutDashboard,
  ChevronDown,
} from "lucide-react";
import { AuthContext } from "../context/AuthContext";

export default function Navbar() {
  const { currentUser, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const location = useLocation();

  // Scroll effect for glassmorphism
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Updated Nav Links as requested
  const navLinks = [
    { name: "Movies", path: "/movies" },
    { name: "Category", path: "/category" }, // Note: Route might not exist yet, but link requested
    { name: "Genre", path: "/genre" }, // Note: Route might not exist yet
    { name: "Contact", path: "/contact" }, // Note: Route might not exist yet
  ];

  const isActive = (path) => location.pathname === path;

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (error) {
      console.error("Failed to log out", error);
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-slate-900/90 backdrop-blur-md shadow-lg py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center transform group-hover:rotate-12 transition-transform duration-300 shadow-lg shadow-primary/20">
              <Film className="text-white w-6 h-6" />
            </div>
            <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
              CineBook
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`text-sm font-medium transition-all hover:text-primary relative group ${
                  isActive(link.path) ? "text-primary" : "text-gray-300"
                }`}
              >
                {link.name}
                <span
                  className={`absolute -bottom-1 left-0 h-0.5 bg-primary transition-all duration-300 ${isActive(link.path) ? "w-full" : "w-0 group-hover:w-full"}`}
                ></span>
              </Link>
            ))}
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-5">
            <div
              className={`flex items-center bg-white/5 rounded-full border border-white/10 transition-all duration-300 ${isSearchOpen ? "w-64 pl-4 pr-1" : "w-10 bg-transparent border-transparent"}`}
            >
              <input
                type="text"
                placeholder="Search movies..."
                className={`bg-transparent text-white text-sm outline-none transition-all duration-300 ${isSearchOpen ? "w-full opacity-100" : "w-0 opacity-0"}`}
                onBlur={() => setIsSearchOpen(false)}
                autoFocus
              />
              <button
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className={`text-gray-300 hover:text-white transition-colors p-2 rounded-full ${isSearchOpen ? "" : "hover:bg-white/5"}`}
              >
                <Search className="w-5 h-5" />
              </button>
            </div>
            <button className="text-gray-300 hover:text-white transition-colors relative p-2 hover:bg-white/5 rounded-full">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-2 w-2 h-2 bg-accent rounded-full border border-slate-900"></span>
            </button>

            <div className="h-6 w-px bg-gray-700/50"></div>

            {currentUser ? (
              <div className="relative">
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex items-center gap-3 focus:outline-none"
                >
                  <div className="w-10 h-10 rounded-full border-2 border-primary/30 p-0.5">
                    <img
                      src={
                        currentUser.photoURL ||
                        `https://ui-avatars.com/api/?name=${currentUser.displayName || "User"}&background=random`
                      }
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = `https://ui-avatars.com/api/?name=${currentUser.displayName || "User"}&background=random`;
                      }}
                      alt="Profile"
                      className="w-full h-full rounded-full object-cover"
                    />
                  </div>
                  <div className="hidden lg:block text-left">
                    <p className="text-sm font-semibold text-white leading-none">
                      {currentUser.displayName?.split(" ")[0] || "User"}
                    </p>
                    <p className="text-xs text-gray-400">Member</p>
                  </div>
                  <ChevronDown
                    className={`w-4 h-4 text-gray-400 transition-transform ${isProfileOpen ? "rotate-180" : ""}`}
                  />
                </button>

                {/* Profile Dropdown */}
                {isProfileOpen && (
                  <div className="absolute right-0 top-full mt-3 w-56 bg-slate-800 border border-white/10 rounded-xl shadow-2xl py-2 animate-fade-in overflow-hidden">
                    <div className="px-4 py-3 border-b border-white/5">
                      <p className="text-sm font-semibold text-white">
                        {currentUser.displayName || "User"}
                      </p>
                      <p className="text-xs text-gray-400 truncate">
                        {currentUser.email}
                      </p>
                    </div>
                    <div className="py-1">
                      <Link
                        to="/dashboard"
                        className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-300 hover:bg-white/5 hover:text-white transition-colors"
                      >
                        <LayoutDashboard className="w-4 h-4" /> Dashboard
                      </Link>
                      <Link
                        to="/profile"
                        className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-300 hover:bg-white/5 hover:text-white transition-colors"
                      >
                        <User className="w-4 h-4" /> My Profile
                      </Link>
                    </div>
                    <div className="border-t border-white/5 mt-1 pt-1">
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-400 hover:bg-red-500/10 transition-colors text-left"
                      >
                        <LogOut className="w-4 h-4" /> Sign Out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Link to="/login">
                  <button className="px-5 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white font-medium transition-all hover:scale-105 active:scale-95">
                    Sign In
                  </button>
                </Link>
                <Link to="/register">
                  <button className="px-5 py-2.5 rounded-xl bg-primary hover:bg-primary-hover text-white font-medium shadow-lg shadow-primary/25 transition-all hover:scale-105 active:scale-95">
                    Sign Up
                  </button>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div
        className={`md:hidden absolute top-full left-0 w-full bg-slate-900/95 backdrop-blur-xl border-b border-white/10 shadow-xl transition-all duration-300 origin-top ${
          isMobileMenuOpen
            ? "opacity-100 scale-y-100"
            : "opacity-0 scale-y-0 h-0 overflow-hidden"
        }`}
      >
        <div className="flex flex-col p-4 space-y-4">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={`text-lg font-medium p-3 rounded-xl hover:bg-white/5 transition-colors ${
                isActive(link.path)
                  ? "text-primary bg-white/5"
                  : "text-gray-300"
              }`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {link.name}
            </Link>
          ))}
          <div className="h-px w-full bg-white/10 my-2"></div>

          {currentUser ? (
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-3 p-3 bg-white/5 rounded-xl mb-2">
                <img
                  src={
                    currentUser.photoURL ||
                    `https://ui-avatars.com/api/?name=${currentUser.displayName || "User"}&background=random`
                  }
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = `https://ui-avatars.com/api/?name=${currentUser.displayName || "User"}&background=random`;
                  }}
                  alt="Profile"
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <p className="text-white font-semibold">
                    {currentUser.displayName}
                  </p>
                  <p className="text-gray-400 text-xs">{currentUser.email}</p>
                </div>
              </div>
              <Link to="/dashboard" onClick={() => setIsMobileMenuOpen(false)}>
                <button className="w-full flex items-center gap-3 p-3 text-gray-300 hover:text-white rounded-xl hover:bg-white/5">
                  <LayoutDashboard className="w-5 h-5" /> Dashboard
                </button>
              </Link>
              <button
                onClick={() => {
                  handleLogout();
                  setIsMobileMenuOpen(false);
                }}
                className="w-full flex items-center gap-3 p-3 text-red-400 hover:text-red-300 rounded-xl hover:bg-red-500/10"
              >
                <LogOut className="w-5 h-5" /> Sign Out
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              <Link to="/login" onClick={() => setIsMobileMenuOpen(false)}>
                <button className="w-full py-3.5 rounded-xl bg-white/5 border border-white/10 text-white font-medium hover:bg-white/10">
                  Sign In
                </button>
              </Link>
              <Link to="/register" onClick={() => setIsMobileMenuOpen(false)}>
                <button className="w-full py-3.5 rounded-xl bg-primary text-white font-medium shadow-lg shadow-primary/20">
                  Sign Up
                </button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
