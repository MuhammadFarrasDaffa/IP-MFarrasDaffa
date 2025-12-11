// ===================== LOGIN PAGE (JavaScript, No TypeScript) =====================
import React, { useState } from "react";

export function LoginPage({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function validate() {
    if (!email) return "Email tidak boleh kosong.";
    const re = /^\S+@\S+\.\S+$/;
    if (!re.test(email)) return "Email tidak valid.";
    if (!password) return "Password tidak boleh kosong.";
    return "";
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    const v = validate();
    if (v) return setError(v);

    setLoading(true);
    try {
      if (onLogin) {
        await onLogin({ email, password });
      } else {
        console.log("Login: ", { email, password });
        await new Promise((r) => setTimeout(r, 600));
      }
    } catch (err) {
      setError(err.message || "Terjadi kesalahan.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4"
      style={{ background: "linear-gradient(135deg, #2C666E, #F0EDEE)" }}
    >
      <div className="max-w-md w-full bg-white/90 shadow-xl rounded-2xl p-8">
        <h1 className="text-2xl font-bold text-center text-[#2C666E] mb-6">
          Login
        </h1>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full mt-1 border px-4 py-2 rounded-lg focus:ring-2 focus:ring-[#2C666E]"
              placeholder="name@example.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Password</label>

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full mt-1 border px-4 py-2 rounded-lg focus:ring-2 focus:ring-[#2C666E] pr-12"
                placeholder="••••••"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-xs"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          {error && <p className="text-red-600 text-sm">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#2C666E] text-white py-2 rounded-lg shadow hover:opacity-90"
          >
            {loading ? "Loading..." : "Masuk"}
          </button>
        </form>
      </div>
    </div>
  );
}

// ===================== REGISTER PAGE =====================

export function RegisterPage({ onRegister }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function validate() {
    if (!name) return "Nama wajib diisi.";
    if (!email) return "Email wajib diisi.";
    const re = /^\S+@\S+\.\S+$/;
    if (!re.test(email)) return "Email tidak valid.";
    if (password.length < 6) return "Password minimal 6 karakter.";
    if (password !== confirm) return "Konfirmasi password tidak cocok.";
    return "";
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    const v = validate();
    if (v) return setError(v);

    setLoading(true);
    try {
      if (onRegister) {
        await onRegister({ name, email, password });
      } else {
        console.log("Register: ", { name, email, password });
        await new Promise((r) => setTimeout(r, 600));
      }
    } catch (err) {
      setError(err.message || "Terjadi kesalahan.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4"
      style={{ background: "linear-gradient(135deg, #F0EDEE, #2C666E)" }}
    >
      <div className="max-w-md w-full bg-white/90 p-8 rounded-2xl shadow">
        <h1 className="text-2xl font-bold text-[#2C666E] text-center mb-6">
          Register
        </h1>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="text-sm font-medium">Nama Lengkap</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border mt-1 px-4 py-2 rounded-lg focus:ring-2 focus:ring-[#2C666E]"
              placeholder="Nama Anda"
            />
          </div>

          <div>
            <label className="text-sm font-medium">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border mt-1 px-4 py-2 rounded-lg focus:ring-2 focus:ring-[#2C666E]"
              placeholder="nama@example.com"
            />
          </div>

          <div>
            <label className="text-sm font-medium">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border mt-1 px-4 py-2 rounded-lg focus:ring-2 focus:ring-[#2C666E]"
              placeholder="••••••"
            />
          </div>

          <div>
            <label className="text-sm font-medium">Konfirmasi Password</label>
            <input
              type="password"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              className="w-full border mt-1 px-4 py-2 rounded-lg focus:ring-2 focus:ring-[#2C666E]"
              placeholder="••••••"
            />
          </div>

          {error && <p className="text-red-600 text-sm">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#2C666E] text-white py-2 rounded-lg hover:opacity-90"
          >
            {loading ? "Loading..." : "Daftar"}
          </button>
        </form>
      </div>
    </div>
  );
}

// ===================== LAYOUT + NAVBAR + FOOTER =====================
import { Link, Outlet } from "react-router-dom";

export function Navbar() {
  return (
    <nav
      className="w-full py-3 px-6 shadow flex justify-between items-center"
      style={{ backgroundColor: "#2C666E" }}
    >
      <Link className="text-white font-bold text-lg" to="/">
        MyApp
      </Link>

      <div className="flex gap-6 text-white text-sm">
        <Link to="/">Home</Link>
        <Link to="/profile">My Profile</Link>
        <Link to="/dashboard">Dashboard</Link>
        <button className="bg-white text-[#2C666E] px-3 py-1 rounded-lg">
          Logout
        </button>
      </div>
    </nav>
  );
}

export function Footer() {
  return (
    <footer
      className="text-center py-4"
      style={{ backgroundColor: "#F0EDEE", color: "#2C666E" }}
    >
      © {new Date().getFullYear()} MyApp — All rights reserved.
    </footer>
  );
}

export default function Layout() {
  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ backgroundColor: "#F0EDEE" }}
    >
      <Navbar />

      <main className="flex-grow p-6">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}

// ===================== MOVIE DETAIL PAGE =====================
export function MovieDetailPage({ movie, onBuy }) {
  if (!movie)
    return <p className="text-center text-gray-600">Movie not found.</p>;

  const durationToText = (min) => {
    const h = Math.floor(min / 60);
    const m = min % 60;
    return `${h}h ${m}m`;
  };

  return (
    <div
      className="min-h-screen w-full py-12 px-6 flex justify-center"
      style={{ background: "linear-gradient(135deg, #F0EDEE, #2C666E)" }}
    >
      <div className="max-w-5xl w-full bg-white/90 backdrop-blur-md shadow-2xl rounded-3xl overflow-hidden border border-[#2C666E]/20">
        {/* Header Image */}
        <div className="w-full h-80 overflow-hidden relative">
          <img
            src={movie.imageUrl}
            alt={movie.title}
            className="w-full h-full object-cover scale-105 hover:scale-110 transition-all duration-700"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
            <h1 className="text-4xl font-bold text-white drop-shadow-lg">
              {movie.title}
            </h1>
            <p className="text-gray-200 mt-1 text-sm">{movie.tagline || ""}</p>
          </div>
        </div>

        {/* Main Content */}
        <div className="p-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Left Info */}
          <div className="md:col-span-2 space-y-4">
            <h2 className="text-2xl font-semibold text-[#2C666E]">Overview</h2>
            <p className="text-gray-700 leading-relaxed text-sm">
              {movie.description}
            </p>

            {/* Genres */}
            <div className="flex flex-wrap gap-2 mt-4">
              {movie.genres?.map((g, i) => (
                <span
                  key={i}
                  className="px-3 py-1 rounded-full text-xs font-semibold bg-[#2C666E]/15 text-[#2C666E] shadow-sm"
                >
                  {g}
                </span>
              ))}
            </div>

            {/* Extra Info Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-6">
              <div className="p-4 bg-[#2C666E]/10 rounded-xl text-center shadow">
                <p className="text-xs text-[#2C666E]/80">Rating</p>
                <p className="text-xl font-bold text-[#2C666E]">
                  ⭐ {movie.rating}
                </p>
              </div>

              <div className="p-4 bg-[#2C666E]/10 rounded-xl text-center shadow">
                <p className="text-xs text-[#2C666E]/80">Duration</p>
                <p className="text-lg font-semibold text-[#2C666E]">
                  {durationToText(movie.duration)}
                </p>
              </div>

              <div className="p-4 bg-[#2C666E]/10 rounded-xl text-center shadow">
                <p className="text-xs text-[#2C666E]/80">Release Date</p>
                <p className="text-sm font-medium text-[#2C666E]">
                  {movie.releaseDate}
                </p>
              </div>

              <div className="p-4 bg-[#2C666E]/10 rounded-xl text-center shadow">
                <p className="text-xs text-[#2C666E]/80">Status</p>
                <p
                  className={`text-sm font-bold ${
                    movie.status === "Available"
                      ? "text-green-700"
                      : movie.status === "Upcoming Soon"
                      ? "text-orange-700"
                      : "text-gray-600"
                  }`}
                >
                  {movie.status}
                </p>
              </div>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="p-6 bg-[#2C666E]/10 rounded-2xl shadow-md h-fit">
            <h3 className="text-lg font-semibold text-[#2C666E] mb-2">
              Details
            </h3>
            <ul className="text-sm text-gray-800 space-y-2">
              <li>
                <strong>Director:</strong> {movie.director}
              </li>
              <li>
                <strong>Studio:</strong> {movie.studio}
              </li>
              <li>
                <strong>Country:</strong> {movie.country}
              </li>
              <li>
                <strong>Language:</strong> {movie.language}
              </li>
            </ul>

            {/* Buy Button */}
            <button
              onClick={() => onBuy?.(movie)}
              className="w-full mt-6 py-3 rounded-xl bg-[#2C666E] text-white font-semibold text-sm shadow-lg hover:bg-[#244f55] active:scale-95 transition"
            >
              Buy Movie
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
