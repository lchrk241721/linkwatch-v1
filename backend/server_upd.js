const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
const cors = require('cors');
require("dotenv").config();

const app = express();
const port = 5000;

app.use(bodyParser.json());
app.use(cors());

app.get("/api/backlinks/", async (req, res) => {
  const { target } = req.query;
  //const endPoint = process.env.SEO_API_END_POINT;
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


// SEO PowerSuite Backlinks API endpoint
//const API_ENDPOINT = 'https://api.link-assistant.com/backlinks/';

/* Route to get backlinks
app.post('/getBacklinks', async (req, res) => {
    const { domain } = req.body;

    try {
        const response = await axios.post(API_ENDPOINT, { domain });
        res.json(response.data);
    } catch (error) {
        res.status(500).send('Error fetching backlinks');
    }
});
*/

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
