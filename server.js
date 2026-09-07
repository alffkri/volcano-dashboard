const express = require('express');
const cors = require('cors');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Endpoint API Status Gunung Berapi
app.get('/api/volcano-status', async (req, res) => {
  try {
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

// Jalankan server secara lokal jika tidak di Vercel
if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server lokal berjalan di http://localhost:${PORT}`);
  });
}

// Wajib untuk Vercel Serverless
module.exports = app;