const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Contoh Endpoint API Real-time untuk Status Gunung Berapi
app.get('/api/volcano-status', async (req, res) => {
  try {
    // Anda bisa memasukkan logika atau fetch data real-time di sini
    const volcanoData = {
      status: "WASPADA (Level II)",
      lastUpdate: new Date().toISOString(),
      location: "Indonesia",
      monitoring: "Active Real-time Stream",
      seismicActivity: "Moderate tremor detected"
    };
    
    res.json({
      success: true,
      data: volcanoData
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      error: "Gagal mengambil data vulkanik real-time" 
    });
  }
});

// Jalankan server secara lokal jika tidak sedang di Vercel (Production)
if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server lokal berjalan di http://localhost:${PORT}`);
  });
}

// WAJIB ADA di baris paling bawah untuk sistem Vercel Serverless
module.exports = app;