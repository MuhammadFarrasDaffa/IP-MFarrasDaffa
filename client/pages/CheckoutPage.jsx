import { useState } from "react";
import PaymentModal from "../components/PaymentModal";

export default function CheckoutPage() {
  const [selectedMovie, setSelectedMovie] = useState(null);

  // Example movie data (bisa diganti dengan data dari Redux/API)
  const exampleMovie = {
    id: 1,
    title: "Inception",
    price: 49999,
    poster: "/path/to/poster.jpg",
  };

  return (
    <div
      className="min-h-screen px-6 py-10"
      style={{ background: "linear-gradient(135deg, #F0EDEE, #2C666E)" }}
    >
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold text-white mb-10">Checkout</h1>

        {/* Movie Card */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden p-6 mb-6">
          <div className="flex gap-6">
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-[#2C666E] mb-4">
                {exampleMovie.title}
              </h2>
              <p className="text-gray-600 mb-4">Akses penuh ke film premium</p>

              <div className="bg-gray-100 rounded-lg p-4 mb-6">
                <p className="text-gray-700 mb-2">
                  <span className="font-medium">Harga:</span>
                </p>
                <p className="text-3xl font-bold text-[#2C666E]">
                  Rp {(exampleMovie.price || 49999).toLocaleString("id-ID")}
                </p>
              </div>

              <button
                onClick={() => setSelectedMovie(exampleMovie)}
                className="w-full px-6 py-3 rounded-lg bg-[#2C666E] text-white font-medium hover:bg-[#1a4047] transition"
              >
                Bayar Sekarang
              </button>
            </div>
          </div>
        </div>

        {/* Payment Methods Info */}
        <div className="bg-white/90 rounded-lg p-6">
          <h3 className="text-xl font-bold text-[#2C666E] mb-4">
            Metode Pembayaran Tersedia
          </h3>
          <ul className="text-gray-700 space-y-2">
            <li className="flex items-center gap-2">
              <span className="text-green-500">✓</span> Transfer Bank
            </li>
            <li className="flex items-center gap-2">
              <span className="text-green-500">✓</span> E-Wallet (GCash, OVO,
              Dana)
            </li>
            <li className="flex items-center gap-2">
              <span className="text-green-500">✓</span> Cicilan Kartu Kredit
            </li>
            <li className="flex items-center gap-2">
              <span className="text-green-500">✓</span> QRIS
            </li>
          </ul>
        </div>
      </div>

      {/* Payment Modal */}
      {selectedMovie && (
        <PaymentModal
          movie={selectedMovie}
          onClose={() => setSelectedMovie(null)}
          onSuccess={() => {
            // Handle successful payment (redirect, update state, etc.)
            console.log("Payment successful!");
          }}
        />
      )}
    </div>
  );
}
