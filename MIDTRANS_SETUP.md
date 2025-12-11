# Setup Midtrans Payment Gateway

Dokumentasi lengkap untuk implementasi Midtrans sebagai payment gateway di aplikasi Cinetix.

## 📋 Prasyarat

- Akun Midtrans sandbox (untuk testing): https://midtrans.com
- Server Key dan Client Key dari Midtrans dashboard
- npm packages sudah terinstall:
  - Backend: `midtrans-client`
  - Frontend: Snap.js (sudah include di index.html)

## 🔧 Setup Backend

### 1. Environment Variables

Pastikan `.env` sudah berisi:

```env
MIDTRANS_SERVER_KEY=Mid-server-xxxxxxxxxxxx
MIDTRANS_CLIENT_KEY=Mid-client-xxxxxxxxxxxx
```

### 2. File-file Backend yang Sudah Diupdate

- **`server/controllers/PaymentController.js`** — Berisi 2 method:

  - `createTransaction()` — Generate snap token untuk payment
  - `handleNotification()` — Handle webhook dari Midtrans

- **`server/routes/PaymentsRoute.js`** — Route endpoints:
  - `POST /payments/create` — Create payment transaction
  - `POST /payments/webhook` — Receive payment notifications

### 3. Payment Flow Backend

```
Client request → /payments/create
     ↓
Generate Snap Token (via Midtrans API)
     ↓
Save Payment record to DB (status: pending)
     ↓
Return snapToken & redirectUrl to client
```

### 4. Webhook Handler

Midtrans akan POST ke `/payments/webhook` setelah user menyelesaikan/membatalkan pembayaran.

Status yang di-handle:

- **settlement** — Pembayaran berhasil ✅
- **deny** — Pembayaran ditolak ❌
- **expire** — Pembayaran expired ⏱
- **cancel** — User membatalkan pembayaran

## 🎨 Setup Frontend

### 1. File-file Frontend yang Dibuat

- **`client/components/PaymentModal.jsx`** — Modal untuk payment:

  - Tampilkan detail movie & harga
  - Trigger Midtrans Snap payment
  - Handle callback (success/pending/error)

- **`client/pages/CheckoutPage.jsx`** — Contoh halaman checkout:
  - Tampilkan movie yang akan dibayar
  - Button untuk buka payment modal
  - Info metode pembayaran

### 2. Midtrans Snap Script

Sudah include di `client/index.html`:

```html
<script
  type="text/javascript"
  src="https://app.sandbox.midtrans.com/snap/snap.js"
  data-client-key="Mid-client-xxxxxxxxxxxx"
></script>
```

### 3. Payment Flow Frontend

```
User click "Bayar Sekarang"
     ↓
PaymentModal terbuka
     ↓
User click "Lanjutkan Pembayaran"
     ↓
POST /payments/create dengan movie data
     ↓
Get snapToken dari server
     ↓
snap.pay() — Open Midtrans Snap payment UI
     ↓
User selesaikan payment di Snap
     ↓
Callback: onSuccess → Show success alert
```

## 📝 Cara Menggunakan

### Contoh 1: Tambah Button Payment di Movie Card

```jsx
import { useState } from "react";
import PaymentModal from "./PaymentModal";

export default function MovieCard({ movie }) {
  const [showPayment, setShowPayment] = useState(false);

  return (
    <div>
      <h3>{movie.title}</h3>
      <p>Price: Rp {movie.price.toLocaleString()}</p>

      <button onClick={() => setShowPayment(true)}>Beli Akses</button>

      {showPayment && (
        <PaymentModal
          movie={movie}
          onClose={() => setShowPayment(false)}
          onSuccess={(result) => {
            console.log("Payment success:", result);
            // Redirect to success page, update user watchlist, etc.
          }}
        />
      )}
    </div>
  );
}
```

### Contoh 2: Menggunakan di Detail Page

```jsx
// pages/DetailPage.jsx
import PaymentModal from "../components/PaymentModal";

export default function MovieDetailPage() {
  const [showPayment, setShowPayment] = useState(false);
  const movie = {
    id: 123,
    title: "Inception",
    price: 49999,
  };

  return (
    <div>
      <h1>{movie.title}</h1>
      <button onClick={() => setShowPayment(true)}>
        Akses Film (Rp {movie.price.toLocaleString()})
      </button>

      {showPayment && (
        <PaymentModal
          movie={movie}
          onClose={() => setShowPayment(false)}
          onSuccess={(result) => {
            // Update watchlist atau redirect
            navigate("/my-watchlist");
          }}
        />
      )}
    </div>
  );
}
```

## 🧪 Testing

### 1. Jalankan Aplikasi

```bash
# Terminal 1: Server
cd server
npm run dev

# Terminal 2: Client
cd client
npm run dev
```

### 2. Akses Checkout

```
http://localhost:5173/checkout
```

### 3. Test Payment (Sandbox)

Gunakan test card number Midtrans:

- **Card Number:** `4811 1111 1111 1114`
- **Expiry:** `12/25`
- **CVV:** `123`

### 4. Cek Payment Status

Payment akan disimpan di DB dengan status:

- Sebelum payment: `pending`
- Setelah settlement: `settlement`
- Jika ditolak: `deny`

Query database:

```sql
SELECT * FROM Payments WHERE status = 'settlement';
```

## 🔐 Keamanan

⚠️ **PENTING:**

1. **Jangan hardcode credentials di frontend** — Client Key sudah public (ada di HTML), tapi Server Key harus rahasia
2. **Enable CORS whitelist** di Midtrans dashboard untuk domain Anda
3. **Verify webhook** — Pastikan request benar-benar dari Midtrans
4. **HTTPS required** untuk production

## 📚 Link Referensi

- Midtrans Docs: https://docs.midtrans.com
- Snap Integration: https://docs.midtrans.com/en/snap/overview
- Webhook Notification: https://docs.midtrans.com/en/snap/advanced-feature?id=webhook-notification
- Test Payment Method: https://docs.midtrans.com/en/snap/advanced-feature?id=test-payment-method

## 🚀 Production Checklist

Sebelum go live:

- [ ] Ganti `isProduction: false` menjadi `true` di PaymentController
- [ ] Update Snap script URL: `https://app.midtrans.com/snap/snap.js`
- [ ] Konfigurasi Redirect URL di Midtrans dashboard
- [ ] Setup CORS dengan domain produksi
- [ ] Enable SSL/HTTPS
- [ ] Test dengan real card/payment method
- [ ] Setup proper error handling & logging

## 📞 Support

Jika ada error atau issue:

1. Cek **Browser Console** → Network tab untuk request details
2. Cek **Server Logs** untuk error messages
3. Verifikasi **Client Key** dan **Server Key** di .env
4. Pastikan **Snap script** loaded (cek browser console)
5. Hubungi Midtrans support: support@midtrans.com
