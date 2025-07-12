# Sakha Clothing - Interactive Maps

Halaman maps interaktif untuk Sakha Clothing dengan fitur-fitur modern dan responsif.

## 🚀 Fitur Utama

### 🗺️ Maps Interaktif

- **Google Maps API** terintegrasi dengan tampilan custom
- **Marker animasi** dengan efek drop dan bounce
- **Info window** yang informatif dengan tombol aksi
- **Custom map style** untuk tampilan yang lebih menarik

### 🔍 Fitur Pencarian

- **Search box** untuk mencari lokasi
- **Autocomplete** dengan Google Places API
- **Geocoding** untuk konversi alamat ke koordinat
- **Multiple markers** untuk hasil pencarian

### 🎨 Tampilan Modern

- **Glassmorphism design** dengan efek blur
- **Gradient background** yang menarik
- **Animasi CSS** untuk transisi yang halus
- **Responsive design** untuk semua ukuran layar

### 📱 Kontrol Interaktif

- **Custom controls** untuk navigasi maps
- **Toggle map type** (Roadmap/Satellite)
- **Reset to Sakha** untuk kembali ke lokasi utama
- **Zoom controls** yang mudah digunakan

### 📞 Fitur Kontak

- **Form kontak** yang responsif
- **Input validation** dengan feedback visual
- **Notification system** untuk feedback user
- **Icon integration** dengan Font Awesome

## 🛠️ Cara Penggunaan

### 1. Setup Google Maps API

```html
<!-- Ganti YOUR_API_KEY dengan API key Google Maps Anda -->
<script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places"></script>
```

### 2. Konfigurasi Lokasi

Edit koordinat Sakha Clothing di `script.js`:

```javascript
const SAKHA_LOCATION = {
  lat: -6.544797393420786, // Latitude
  lng: 107.73572921083975, // Longitude
};
```

### 3. Customisasi Tampilan

- Edit `syle.css` untuk mengubah warna dan style
- Modifikasi `getCustomMapStyle()` di `script.js` untuk custom map style
- Sesuaikan animasi dan efek di CSS

## 📋 Daftar File

```
maps/
├── index.html          # File HTML utama
├── syle.css           # Stylesheet dengan design modern
├── script.js          # JavaScript untuk interaktivitas
└── README.md          # Dokumentasi ini
```

## 🎯 Fitur Detail

### Maps Features

- ✅ Custom marker dengan animasi
- ✅ Info window dengan informasi lengkap
- ✅ Tombol petunjuk arah
- ✅ Tombol telepon langsung
- ✅ Search functionality
- ✅ Custom map controls
- ✅ Responsive design

### Form Features

- ✅ Input validation
- ✅ Real-time feedback
- ✅ Success notifications
- ✅ Icon integration
- ✅ Hover effects

### Visual Effects

- ✅ Glassmorphism design
- ✅ Gradient backgrounds
- ✅ Smooth animations
- ✅ Hover transitions
- ✅ Mobile responsive

## 🔧 Customization

### Mengubah Warna Tema

Edit variabel CSS di `syle.css`:

```css
:root {
  --primary-color: #00d4ff;
  --secondary-color: #0099cc;
  --background-gradient: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}
```

### Menambah Marker Baru

```javascript
// Di script.js
function addCustomMarker(lat, lng, title) {
  new google.maps.Marker({
    position: { lat: lat, lng: lng },
    map: map,
    title: title,
    animation: google.maps.Animation.DROP,
  });
}
```

### Mengubah Map Style

Edit fungsi `getCustomMapStyle()` di `script.js` untuk custom styling.

## 📱 Responsive Breakpoints

- **Desktop**: > 1024px
- **Tablet**: 768px - 1024px
- **Mobile**: < 768px
- **Small Mobile**: < 480px

## 🚀 Deployment

1. Upload semua file ke web server
2. Pastikan Google Maps API key sudah dikonfigurasi
3. Test di berbagai device dan browser
4. Optimasi performa jika diperlukan

## 🔍 Browser Support

- ✅ Chrome (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Edge (latest)
- ✅ Mobile browsers

## 📞 Support

Untuk pertanyaan atau bantuan teknis, silakan hubungi tim development Sakha Clothing.

---

**Dibuat dengan ❤️ untuk Sakha Clothing**
