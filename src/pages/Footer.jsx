import React from "react";
import { Link } from "react-router-dom";
import {
  Film,
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-slate-950 border-t border-white/5 pt-16 pb-8">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand Column */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center transform group-hover:rotate-12 transition-transform duration-300 shadow-lg shadow-primary/20">
                <Film className="text-white w-6 h-6" />
              </div>
              <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
                CineBook
              </span>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed">
              Experience the magic of cinema with the ultimate booking platform.
              Find the latest blockbusters, book your seats, and enjoy the show.
            </p>
            <div className="flex gap-4">
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:bg-primary hover:text-white transition-all hover:scale-110"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:bg-primary hover:text-white transition-all hover:scale-110"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:bg-primary hover:text-white transition-all hover:scale-110"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:bg-primary hover:text-white transition-all hover:scale-110"
              >
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-bold text-lg mb-6 flex items-center gap-2">
              <div className="w-1 h-5 bg-primary rounded-full"></div>
              Quick Links
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/"
                  className="text-gray-400 hover:text-white hover:translate-x-1 transition-all inline-block"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/movies"
                  className="text-gray-400 hover:text-white hover:translate-x-1 transition-all inline-block"
                >
                  Movies
                </Link>
              </li>
              <li>
                <Link
                  to="/cinemas"
                  className="text-gray-400 hover:text-white hover:translate-x-1 transition-all inline-block"
                >
                  Cinemas
                </Link>
              </li>
              <li>
                <Link
                  to="/offers"
                  className="text-gray-400 hover:text-white hover:translate-x-1 transition-all inline-block"
                >
                  Offers
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-gray-400 hover:text-white hover:translate-x-1 transition-all inline-block"
                >
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-white font-bold text-lg mb-6 flex items-center gap-2">
              <div className="w-1 h-5 bg-accent rounded-full"></div>
              Browse By
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/movies?genre=action"
                  className="text-gray-400 hover:text-white hover:translate-x-1 transition-all inline-block"
                >
                  Action Movies
                </Link>
              </li>
              <li>
                <Link
                  to="/movies?genre=comedy"
                  className="text-gray-400 hover:text-white hover:translate-x-1 transition-all inline-block"
                >
                  Comedy
                </Link>
              </li>
              <li>
                <Link
                  to="/movies?genre=drama"
                  className="text-gray-400 hover:text-white hover:translate-x-1 transition-all inline-block"
                >
                  Drama
                </Link>
              </li>
              <li>
                <Link
                  to="/movies?genre=sci-fi"
                  className="text-gray-400 hover:text-white hover:translate-x-1 transition-all inline-block"
                >
                  Sci-Fi
                </Link>
              </li>
              <li>
                <Link
                  to="/coming-soon"
                  className="text-gray-400 hover:text-white hover:translate-x-1 transition-all inline-block"
                >
                  Coming Soon
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white font-bold text-lg mb-6 flex items-center gap-2">
              <div className="w-1 h-5 bg-green-500 rounded-full"></div>
              Contact
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-gray-400">
                <MapPin className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <span>123 Cinema Street, Movie City, MC 12345</span>
              </li>
              <li className="flex items-center gap-3 text-gray-400">
                <Phone className="w-5 h-5 text-primary shrink-0" />
                <span>+1 (234) 567-8900</span>
              </li>
              <li className="flex items-center gap-3 text-gray-400">
                <Mail className="w-5 h-5 text-primary shrink-0" />
                <span>support@cinebook.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} CineBook. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-gray-500">
            <Link to="/privacy" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms" className="hover:text-white transition-colors">
              Terms of Service
            </Link>
            <Link to="/faq" className="hover:text-white transition-colors">
              FAQ
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
