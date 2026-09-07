const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

app.get('/api/volcano-status', async (req, res) => {
    try {
        const liveVolcanoData = [
            {
                id: "krakatau", name: "Krakatau", region: "Selat Sunda", coords: [-6.102, 105.423], active: true, statusType: "eruption",
                eruptionText: "Terdeteksi 2 lapisan abu: abu di ketinggian ~15.2 km bergerak ke arah Barat Daya; dan abu di ketinggian ~4.6 km bergerak ke arah Barat.",
                timeline: {
                    'now': { radius: 55000, latlng: [-6.25, 106.05], desc: "Zona sebaran abu Krakatau saat ini." },
                    '6h':  { radius: 75000, latlng: [-6.30, 106.30], desc: "Estimasi pergerakan sebaran abu +6 jam." },
                    '12h': { radius: 95000, latlng: [-6.35, 106.55], desc: "Estimasi pergerakan sebaran abu +12 jam." },
                    '18h': { radius: 120000, latlng: [-6.40, 106.80], desc: "Estimasi pergerakan sebaran abu +18 jam." }
                }
            },
            {
                id: "merapi", name: "Merapi", region: "Jawa Tengah / DIY", coords: [-7.540, 110.446], active: false, statusType: "anteng",
                eruptionText: "Merapi lagi anteng, gak ada abu vulkanik yang lagi dipantau dari sana.",
                timeline: {
                    'now': { radius: 10000, latlng: [-7.540, 110.446], desc: "Zona aman aktivitas normal." },
                    '6h':  { radius: 10000, latlng: [-7.540, 110.446], desc: "Kondisi stabil." },
                    '12h': { radius: 10000, latlng: [-7.540, 110.446], desc: "Kondisi stabil." },
                    '18h': { radius: 10000, latlng: [-7.540, 110.446], desc: "Kondisi stabil." }
                }
            },
            {
                id: "semeru", name: "Semeru", region: "Jawa Timur", coords: [-8.108, 112.922], active: true, statusType: "gdacs",
                eruptionText: "Semeru lagi erupsi dan ngeluarin abu vulkanik ke arah timur.",
                gdacsLevel: "Merah - bahaya tinggi",
                timeline: {
                    'now': { radius: 50000, latlng: [-8.150, 113.050], desc: "Zona sebaran abu Semeru saat ini." },
                    '6h':  { radius: 70000, latlng: [-8.200, 113.300], desc: "Estimasi sebaran +6 jam." },
                    '12h': { radius: 90000, latlng: [-8.250, 113.550], desc: "Estimasi sebaran +12 jam." },
                    '18h': { radius: 110000, latlng: [-8.300, 113.800], desc: "Estimasi sebaran +18 jam." }
                }
            },
            {
                id: "lewotobi", name: "Lewotobi Laki-laki", region: "Flores, NTT", coords: [-8.534, 122.778], active: true, statusType: "eruption",
                eruptionText: "Terdeteksi erupsi eksplosif dengan kolom abu tinggi di wilayah Flores.",
                timeline: {
                    'now': { radius: 45000, latlng: [-8.534, 122.778], desc: "Sebaran abu dominan ke arah Barat Laut." },
                    '6h':  { radius: 60000, latlng: [-8.500, 122.600], desc: "Estimasi sebaran +6 jam." },
                    '12h': { radius: 80000, latlng: [-8.450, 122.400], desc: "Estimasi sebaran +12 jam." },
                    '18h': { radius: 100000, latlng: [-8.400, 122.200], desc: "Estimasi sebaran +18 jam." }
                }
            },
            {
                id: "sinabung", name: "Sinabung", region: "Sumatera Utara", coords: [3.170, 98.392], active: true, statusType: "gdacs",
                eruptionText: "Aktivitas vulkanik tingkat III (Siaga). Potensi awan panas guguran.",
                gdacsLevel: "Oranye - waspada",
                timeline: {
                    'now': { radius: 40000, latlng: [3.170, 98.392], desc: "Sebaran abu mengarah ke Timur." },
                    '6h':  { radius: 60000, latlng: [3.150, 98.600], desc: "Estimasi sebaran +6 jam." },
                    '12h': { radius: 80000, latlng: [3.100, 98.800], desc: "Estimasi sebaran +12 jam." },
                    '18h': { radius: 100000, latlng: [3.050, 99.000], desc: "Estimasi sebaran +18 jam." }
                }
            },
            {
                id: "dukono", name: "Dukono", region: "Halmahera, Maluku Utara", coords: [1.693, 127.897], active: true, statusType: "eruption",
                eruptionText: "Erupsi menerus dengan hembusan abu vulkanik secara konsisten.",
                timeline: {
                    'now': { radius: 50000, latlng: [1.693, 127.897], desc: "Sebaran abu ke arah Timur Laut." },
                    '6h':  { radius: 70000, latlng: [1.700, 128.100], desc: "Estimasi sebaran +6 jam." },
                    '12h': { radius: 90000, latlng: [1.750, 128.300], desc: "Estimasi sebaran +12 jam." },
                    '18h': { radius: 110000, latlng: [1.800, 128.500], desc: "Estimasi sebaran +18 jam." }
                }
            },
            {
                id: "ibu", name: "Ibu", region: "Halmahera Barat", coords: [1.488, 127.630], active: true, statusType: "eruption",
                eruptionText: "Letusan abu vulkanik teramati dengan ketebalan sedang hingga tebal.",
                timeline: {
                    'now': { radius: 45000, latlng: [1.488, 127.630], desc: "Sebaran abu ke arah Barat." },
                    '6h':  { radius: 65000, latlng: [1.450, 127.400], desc: "Estimasi sebaran +6 jam." },
                    '12h': { radius: 85000, latlng: [1.400, 127.200], desc: "Estimasi sebaran +12 jam." },
                    '18h': { radius: 105000, latlng: [1.350, 127.000], desc: "Estimasi sebaran +18 jam." }
                }
            },
            {
                id: "kerinci", name: "Kerinci", region: "Jambi / Sumatera Barat", coords: [-1.697, 101.264], active: true, statusType: "gdacs",
                eruptionText: "Terpantau erupsi abu vulkanik periodik dari kawah utama G. Kerinci.",
                gdacsLevel: "Kuning - siaga",
                timeline: {
                    'now': { radius: 35000, latlng: [-1.697, 101.264], desc: "Sebaran abu mengarah ke Timur." },
                    '6h':  { radius: 50000, latlng: [-1.650, 101.400], desc: "Estimasi sebaran +6 jam." },
                    '12h': { radius: 70000, latlng: [-1.600, 101.600], desc: "Estimasi sebaran +12 jam." },
                    '18h': { radius: 90000, latlng: [-1.550, 101.800], desc: "Estimasi sebaran +18 jam." }
                }
            }
        ];

        res.json({
            success: true,
            last_update: new Date().toISOString(),
            data: liveVolcanoData
        });

    } catch (error) {
        res.status(500).json({ success: false, message: "Gagal mengambil data vulkanik." });
    }
});

app.listen(PORT, () => {
    console.log(`Backend proxy berjalan di http://localhost:${PORT}`);
});