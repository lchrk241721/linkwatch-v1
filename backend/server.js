const express = require("express");
const axios = require("axios");
const cors = require("cors");
const path = require('path');
require("dotenv").config();

const app = express();
//const PORT = 5000;
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
// Serve static files from the React app
app.use(express.static(path.join(__dirname, '../frontend/build')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/build', 'index.html'));
});

app.get("/api/backlinks/", async (req, res) => {
  const { target } = req.query;
  const apiKey = process.env.SEO_API_KEY;
  const Mode = process.env.SEO_API_MODE;
  const Limit = process.env.SEO_API_LIMIT;
  const OrderBy = process.env.SEO_API_ORDER_BY;
  const PerDomain = process.env.SEO_API_PER_DOMAIN;
  const oP = process.env.SEO_API_OUTPUT;

  try {
    const response = await axios.get(`https://api.seopowersuite.com/backlinks/v1.0/get-backlinks?apikey=${apiKey}&target=${target}&mode=${Mode}&limit=${Limit}&order_by=${OrderBy}&per_domain=${PerDomain}&output=${oP}`);
    res.json(response.data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch backlinks" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
