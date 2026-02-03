import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock, User, ArrowRight, Film, Phone } from "lucide-react";
import { useForm } from "react-hook-form";
import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  updateProfile,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../config/Firebase";
import { AuthContext } from "../context/AuthContext";

export default function Register() {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const googleProvider = new GoogleAuthProvider();

  // Handle Email Registration
  const onSubmit = async (data) => {
    if (data.password !== data.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password,
      );
      const user = res.user;

      // Update Auth Profile
      await updateProfile(user, {
        displayName: data.name,
      });

      const token = await user.getIdToken();

      // Save to Firestore
      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        name: data.name,
        email: data.email,
        phone: data.phone || "",
        provider: "password",
        createdAt: new Date(),
      });

      // NOTE: User requested redirect to Login page after email registration
      // We don't auto-login here for email based on request "redirect to login page"
      navigate("/login");
    } catch (err) {
      console.error(err);
      if (err.code === "auth/email-already-in-use") {
        setError("Email is already registered. Please login.");
      } else {
        setError("Failed to create an account. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  // Handle Google Registration/Login
  const handleGoogleSignIn = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await signInWithPopup(auth, googleProvider);
      const user = res.user;
      const token = await user.getIdToken();

      // Save/Merge to Firestore
      await setDoc(
        doc(db, "users", user.uid),
        {
          uid: user.uid,
          name: user.displayName,
          email: user.email,
          phone: user.phoneNumber || "",
          photo: user.photoURL,
          provider: "google",
          lastLogin: new Date(),
        },
        { merge: true },
      );

      login({
        uid: user.uid,
        displayName: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
        accessToken: token,
      });

      // Redirect to Home for Google Auth
      navigate("/");
    } catch (err) {
      console.error(err);
      setError("Failed to sign in with Google.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-[url('https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center flex items-center justify-center relative p-4">
      {/* Overlay */}
      <div className="absolute inset-0 bg-slate-900/80 backdrop-blur-sm"></div>

      {/* Register Card */}
      <div className="relative w-full max-w-md bg-slate-900/60 backdrop-blur-xl border border-white/10 p-8 rounded-2xl shadow-2xl animate-slide-up">
        <div className="flex flex-col items-center mb-8">
          <Link
            to="/"
            className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center mb-4 shadow-lg shadow-primary/30"
          >
            <Film className="w-6 h-6 text-white" />
          </Link>
          <h2 className="text-3xl font-bold text-white mb-2">Create Account</h2>
          <p className="text-gray-400 text-center">
            Join thousands of movie lovers today
          </p>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500/20 text-red-200 px-4 py-3 rounded-lg mb-6 text-sm">
            {error}
          </div>
        )}

        {/* Validation Errors Display */}
        {Object.keys(errors).length > 0 && (
          <div className="bg-red-500/10 border border-red-500/20 text-red-200 px-4 py-3 rounded-lg mb-6 text-sm">
            {errors.name?.message ||
              errors.email?.message ||
              errors.password?.message ||
              errors.confirmPassword?.message ||
              errors.phone?.message}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300 ml-1">
              Full Name
            </label>
            <div className="relative group">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 group-focus-within:text-primary transition-colors" />
              <input
                type="text"
                {...register("name", { required: "Full Name is required" })}
                className="w-full bg-slate-800/50 border border-white/10 focus:border-primary/50 text-white rounded-xl py-3 pl-12 pr-4 outline-none transition-all focus:bg-slate-800/80 focus:shadow-lg focus:shadow-primary/10"
                placeholder="John Doe"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300 ml-1">
              Email Address
            </label>
            <div className="relative group">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 group-focus-within:text-primary transition-colors" />
              <input
                type="email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Invalid email address",
                  },
                })}
                className="w-full bg-slate-800/50 border border-white/10 focus:border-primary/50 text-white rounded-xl py-3 pl-12 pr-4 outline-none transition-all focus:bg-slate-800/80 focus:shadow-lg focus:shadow-primary/10"
                placeholder="name@example.com"
              />
            </div>
          </div>

          {/* New Phone Number Field */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300 ml-1">
              Phone Number
            </label>
            <div className="relative group">
              <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 group-focus-within:text-primary transition-colors" />
              <input
                type="tel"
                {...register("phone", {
                  required: "Phone Number is required",
                  minLength: {
                    value: 10,
                    message: "Phone number must be at least 10 digits",
                  },
                })}
                className="w-full bg-slate-800/50 border border-white/10 focus:border-primary/50 text-white rounded-xl py-3 pl-12 pr-4 outline-none transition-all focus:bg-slate-800/80 focus:shadow-lg focus:shadow-primary/10"
                placeholder="+1 234 567 8900"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300 ml-1">
              Password
            </label>
            <div className="relative group">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 group-focus-within:text-primary transition-colors" />
              <input
                type="password"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                })}
                className="w-full bg-slate-800/50 border border-white/10 focus:border-primary/50 text-white rounded-xl py-3 pl-12 pr-4 outline-none transition-all focus:bg-slate-800/80 focus:shadow-lg focus:shadow-primary/10"
                placeholder="••••••••"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300 ml-1">
              Confirm Password
            </label>
            <div className="relative group">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 group-focus-within:text-primary transition-colors" />
              <input
                type="password"
                {...register("confirmPassword", {
                  required: "Please confirm your password",
                })}
                className="w-full bg-slate-800/50 border border-white/10 focus:border-primary/50 text-white rounded-xl py-3 pl-12 pr-4 outline-none transition-all focus:bg-slate-800/80 focus:shadow-lg focus:shadow-primary/10"
                placeholder="••••••••"
              />
            </div>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-primary to-accent hover:from-primary-hover hover:to-accent text-white font-bold py-3.5 rounded-xl transition-all shadow-lg shadow-primary/25 hover:shadow-primary/40 active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center transform hover:-translate-y-0.5"
            >
              {loading ? (
                <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              ) : (
                <>
                  Create Account <ArrowRight className="ml-2 w-5 h-5" />
                </>
              )}
            </button>
          </div>
        </form>

        <div className="relative my-8">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-white/10"></div>
          </div>
          <div className="relative flex justify-center text-xs">
            <span className="bg-slate-900/60 px-4 text-gray-500 backdrop-blur-xl">
              Or continue with
            </span>
          </div>
        </div>

        <button
          onClick={handleGoogleSignIn}
          disabled={loading}
          className="w-full bg-white text-slate-900 font-bold py-3.5 rounded-xl transition-all hover:bg-gray-100 active:scale-[0.98] flex items-center justify-center gap-3"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              fill="#4285F4"
            />
            <path
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              fill="#34A853"
            />
            <path
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.26.81-.58z"
              fill="#FBBC05"
            />
            <path
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              fill="#EA4335"
            />
          </svg>
          Google
        </button>

        <p className="mt-8 text-center text-sm text-gray-400">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-primary hover:text-primary-hover font-semibold hover:underline"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
