import React, { useState, useEffect } from "react";
import axios from "axios";
import { Bar } from "react-chartjs-2";
import "chart.js/auto";

function App() {
  const [target, setUrl] = useState("");
  const [backlinks, setBacklinks] = useState([]);
  const [error, setError] = useState(null);

  /*
  const fetchBacklinks = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/backlinks?url=${url}`);
      setBacklinks(response.data);
      setError(null);
    } catch (err) {
      setError(err.message);
    }
  };
  
  const fetchBacklinks = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/backlinks?target=${target}`);
      setBacklinks(response.data);
      setError(null);
    } catch (err) {
      if (err.response) {
        setError(`Error: ${err.response.data.error}`);
        console.error("Server Error:", err.response.data.error);
      } else if (err.request) {
        setError("Error: No response from the server");
        console.error("Network Error:", err.request);
      } else {
        setError(`Error: ${err.message}`);
        console.error("Error:", err.message);
      }
    }
  };
  */

  const fetchBacklinks = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/backlinks?target=${target}`);
      setBacklinks(response.data);
      setError(null);
    } catch (err) {
      if (err.response) {
        setError(`Error: ${err.response.data.error}`);
        console.error("Server Error:", err.response.data.error);
      } else if (err.request) {
        setError("Error: No response from the server");
        console.error("Network Error:", err.request);
      } else {
        setError(`Error: ${err.message}`);
        console.error("Error:", err.message);
      }
    }
  };
  

  const data = {
    labels: backlinks.map(link => link.domain),
    datasets: [
      {
        label: "Backlinks",
        data: backlinks.map(link => link.count),
        backgroundColor: "rgba(75, 192, 192, 0.6)",
      },
    ],
  };

  return (
    <div>
      <input
        type="text"
        value={target}
        onChange={(e) => setUrl(e.target.value)}
        placeholder="Enter URL"
      />
      <button onClick={fetchBacklinks}>Get Backlinks</button>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <Bar data={data} />
    </div>
  );
}

export default App;
