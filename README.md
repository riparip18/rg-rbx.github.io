# Roblox Regional Price Checker

Website sederhana untuk mengecek apakah regional pricing aktif pada gamepass Roblox.

## 🚀 Cara Menjalankan

### Local Development
```bash
npm run dev
```

Website akan terbuka di `http://localhost:3000`

## 📦 Deploy ke Netlify

### Cara 1: Drag & Drop
1. Buka [Netlify Drop](https://app.netlify.com/drop)
2. Drag folder project ini ke area drop
3. Selesai! Website otomatis live

### Cara 2: Git Integration
1. Push project ke GitHub
2. Login ke [Netlify](https://netlify.com)
3. Klik "Add new site" → "Import an existing project"
4. Pilih repository GitHub Anda
5. Deploy settings sudah otomatis terdeteksi dari `netlify.toml`
6. Klik "Deploy site"

### Cara 3: Netlify CLI
```bash
npm install -g netlify-cli
netlify login
netlify deploy --prod
```

## 🎯 Cara Pakai

1. Masukkan ID gamepass Roblox
2. Klik "Cek Status"
3. Lihat hasilnya:
   - ✅ Regional Pricing AKTIF
   - ❌ Regional Pricing TIDAK AKTIF

## 🔗 API yang Digunakan

```
https://apis.roblox.com/game-passes/v1/game-passes/{gamepassId}/details
```
