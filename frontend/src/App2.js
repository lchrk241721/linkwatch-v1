import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

// Register the required components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function App() {
  const [target, setUrl] = useState("");
  const [backlinks, setBacklinks] = useState([]);
  const [error, setError] = useState(null);

  const fetchBacklinks = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/backlinks?target=${target}`);
      const data = response.data;
      console.log(data);
      if (Array.isArray(data)) {
        //print_r(data);
        //console.log(data);
        setBacklinks(data);
        setError(null);
        
      } else {
        setBacklinks([]);
        setError("Unexpected API response format");
        
      }
    } catch (err) {
      setError(err.message);
      setBacklinks([]);
    }
  };

  const data = {
    labels: Array.isArray(backlinks) ? backlinks.map(link => link.target) : [],
    datasets: [
      {
        label: "Backlinks",
        data: Array.isArray(backlinks) ? backlinks.map(link => link.count) : [],
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
