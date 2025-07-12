# 🔧 Troubleshooting Maps Sakha Clothing

Panduan lengkap untuk mengatasi masalah maps yang tidak muncul.

## 🚨 Masalah Umum dan Solusi

### 1. **Maps Tidak Muncul Sama Sekali**

#### Kemungkinan Penyebab:

- API key tidak valid atau belum di-setup
- Google Maps API belum di-enable
- Billing belum di-setup
- Network/connectivity issues

#### Solusi:

1. **Cek API Key**:

   ```javascript
   // Buka browser console dan ketik:
   console.log(typeof google);
   console.log(google.maps);
   ```

2. **Test dengan file test.html**:

   - Buka `maps/test.html` di browser
   - Lihat status API dan error messages

3. **Setup Google Cloud Project**:
   - Kunjungi [Google Cloud Console](https://console.cloud.google.com/)
   - Enable Maps JavaScript API
   - Setup billing account
   - Buat API key baru

### 2. **Error "This API project is not authorized"**

#### Solusi:

1. Enable Maps JavaScript API di Google Cloud Console
2. Pastikan billing account sudah di-link
3. Tunggu beberapa menit setelah enable API

### 3. **Error "API key not valid"**

#### Solusi:

1. Cek apakah API key sudah benar
2. Pastikan API key sudah di-restrict dengan benar
3. Cek apakah domain sudah ditambahkan di restrictions

### 4. **Maps Muncul Tapi Kosong**

#### Kemungkinan Penyebab:

- CSS yang menghalangi maps
- JavaScript error
- Koordinat tidak valid

#### Solusi:

1. **Cek CSS**:

   ```css
   #map {
     width: 100%;
     height: 100%;
     min-height: 400px;
   }
   ```

2. **Cek Console Error**:

   - Buka Developer Tools (F12)
   - Lihat tab Console untuk error messages

3. **Test Koordinat**:
   ```javascript
   console.log("Sakha Location:", SAKHA_LOCATION);
   ```

## 🧪 Testing Step by Step

### Step 1: Test Basic Setup

1. Buka `maps/test.html` di browser
2. Lihat status API di bagian debug
3. Klik tombol "Test API Connection"
4. Klik tombol "Initialize Test Map"

### Step 2: Test Main Application

1. Buka `maps/index.html` di browser
2. Buka Developer Tools (F12)
3. Lihat tab Console untuk error messages
4. Cek tab Network untuk API calls

### Step 3: Check API Key

1. Buka [Google Cloud Console](https://console.cloud.google.com/)
2. Pilih project Anda
3. Buka "APIs & Services" > "Credentials"
4. Cek apakah API key sudah benar

## 🔍 Debug Checklist

### ✅ API Setup

- [ ] Google Cloud Project dibuat
- [ ] Maps JavaScript API di-enable
- [ ] Places API di-enable (jika menggunakan search)
- [ ] Billing account di-setup
- [ ] API key dibuat
- [ ] API key di-restrict dengan benar

### ✅ Code Setup

- [ ] API key sudah benar di `index.html`
- [ ] Script loading order sudah benar
- [ ] CSS tidak menghalangi maps container
- [ ] JavaScript tidak ada syntax error

### ✅ Browser Setup

- [ ] JavaScript enabled
- [ ] No ad blockers blocking Google APIs
- [ ] Network connection stable
- [ ] Browser supports Google Maps

## 🛠️ Quick Fixes

### Fix 1: Fallback to iframe

Jika JavaScript maps tidak berfungsi, gunakan iframe sebagai fallback:

```html
<div class="map" id="map">
  <iframe
    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3963.816844730202!2d107.73572921083975!3d-6.544797393420786!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e693dca3d4217b1%3A0x67d48a54ade65e46!2sSakha%20Clothing!5e0!3m2!1sid!2sid!4v1732321920106!5m2!1sid!2sid"
    style="border:0; width: 100%; height: 100%;"
    allowfullscreen=""
    loading="lazy"
    referrerpolicy="no-referrer-when-downgrade"
  >
  </iframe>
</div>
```

### Fix 2: Simple Map Setup

Gunakan setup yang lebih sederhana:

```javascript
function initSimpleMap() {
  const map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: -6.544797393420786, lng: 107.73572921083975 },
    zoom: 16,
  });

  new google.maps.Marker({
    position: { lat: -6.544797393420786, lng: 107.73572921083975 },
    map: map,
    title: "Sakha Clothing",
  });
}
```

### Fix 3: Check Network

```javascript
// Test network connectivity
fetch("https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY")
  .then((response) => console.log("API accessible"))
  .catch((error) => console.error("API not accessible:", error));
```

## 📱 Mobile Testing

### Common Mobile Issues:

1. **Touch events not working**
2. **Maps not loading on mobile data**
3. **Viewport issues**

### Solutions:

1. **Add touch event handlers**:

   ```javascript
   map.addListener("touchstart", function (e) {
     console.log("Touch detected");
   });
   ```

2. **Check mobile network**:

   - Test on WiFi and mobile data
   - Check if mobile data allows Google APIs

3. **Fix viewport**:
   ```html
   <meta
     name="viewport"
     content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
   />
   ```

## 🔧 Advanced Debugging

### Debug Function

Tambahkan fungsi debug ini ke console:

```javascript
function debugMaps() {
  console.log("=== MAPS DEBUG ===");
  console.log("Google object:", typeof google);
  console.log("Google maps:", google?.maps);
  console.log("Map element:", document.getElementById("map"));
  console.log("Map object:", window.map);
  console.log("Marker object:", window.marker);
  console.log("API key valid:", google?.maps?.Map);
  console.log("==================");
}

// Jalankan di console browser
debugMaps();
```

### Network Debug

```javascript
// Check API calls
const observer = new PerformanceObserver((list) => {
  list.getEntries().forEach((entry) => {
    if (entry.name.includes("maps.googleapis.com")) {
      console.log("Maps API call:", entry);
    }
  });
});
observer.observe({ entryTypes: ["resource"] });
```

## 📞 Getting Help

### Information to Provide:

1. **Browser and version**
2. **Error messages from console**
3. **Network tab information**
4. **Steps to reproduce**
5. **API key status (without sharing the key)**

### Contact:

- Check Google Maps API documentation
- Review Google Cloud Console logs
- Test with different browsers
- Check if issue is local or global

## 🎯 Quick Test Commands

Buka browser console dan jalankan:

```javascript
// Test 1: Check API
console.log("Google Maps API:", typeof google !== "undefined" && google.maps);

// Test 2: Check element
console.log("Map element:", document.getElementById("map"));

// Test 3: Check coordinates
console.log("Sakha coordinates:", {
  lat: -6.544797393420786,
  lng: 107.73572921083975,
});

// Test 4: Create simple map
if (typeof google !== "undefined" && google.maps) {
  const testMap = new google.maps.Map(document.getElementById("map"), {
    center: { lat: -6.544797393420786, lng: 107.73572921083975 },
    zoom: 16,
  });
  console.log("Test map created:", testMap);
}
```

---

**Jika masih bermasalah, gunakan file `test.html` untuk debugging yang lebih detail!** 🧪
