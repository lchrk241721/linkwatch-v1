import React, { useState } from "react";
import axios from "axios";
import { Bar } from "react-chartjs-2";

function App() {
  const [target, setUrl] = useState("");
  const [backlinks, setBacklinks] = useState([]);
  const [error, setError] = useState(null);

  const fetchBacklinks = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/backlinks?target=${target}`);
      const data = response.data;
      if (Array.isArray(data)) {
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
    labels: Array.isArray(backlinks) ? backlinks.map(link => link.domain) : [],
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
